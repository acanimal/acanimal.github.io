---
title: Things I learnt creating a jQuery Plugin (Part I)
pubDatetime: 2013-01-15T23:31:00Z
description: "jQuery is one of the most used JavaScript libraries, if not the most used one, which allows to make great things with the big set of little tools it offers to the web developers: HTML/DOM…"
tags:
  - javascript
  - jquery
  - plugins
  - tricks
---

[jQuery](http://jquery.com/) is one of the most used JavaScript libraries, if not the most used one, which allows to make great things with the big set of little tools it offers to the web developers: HTML/DOM manipulation, CSS manipulation, HTML event methods, effects and animations, AJAX, utilities, ...

One of the key aspects of jQuery is the possibility to extend it with new functionalities, so called _plugins_. For those who has a basic knowledge of jQuery and want or need to create a new jQuery plugin this post tries to be a helping summary of good things to take into account.

## Before to start

Because of the flexibility and powerful of the language, the Perl community is proud of his _Tim Today_ motto,  that is:

> There's more than one way to do it

You can consider the same for JavaScript, that's true. The fact JavaScript is not an object oriented language but a [prototype based language](https://developer.mozilla.org/en-US/docs/JavaScript/Introduction_to_Object-Oriented_JavaScript#Prototype-based_programming) allows to follow the OOP paradigm in many different ways. Looking for a template code to create a jQuery plugin I found tons and not all following the same conventions and ideas.

Here I present a mix of the most accepted templates and its key aspects.

## The code

Accompanying the article you can find the self documented version of the boilerplate code at my [GitHub repository](https://github.com/acanimal/jQuery-Plugin-Boilerplate).

## Where to start

If you are planning to create a jQuery plugin, the first places I suggest you to start reading is the [Plugins/Authoring](http://docs.jquery.com/Plugins/Authoring) section of the project documentation. It is a great starting resource but in the real live you will find soon you need to know a bit more of that.

---

## Using a jQuery plugin

Suppose we have a jQuery plugin called `beautyLink`, that transform a normal link (the `<a>` element) into a really nice one changing the font family, text and background color. So we need to include it in our page before start using it:

```
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="jquery-beautylink.js"></script>
```

The conventional way to create and apply it on an element would be:

```
$('#linkID').beautyLink();
```

or, if you want to apply on each link of the current page:

```
$('a').beautyLink();
```

Later, to change the text color to red we could invoke a plugin's public method like:

```
$('#linkID').beautyLink('color', 'red');
```

or to retrieve the current text color:

```
$('#linkID').beautyLink('color');
```

that is, the `color` method can act as a setter or getter depending if we pass a value or not.

## Creating a new plugin

All right, we know how to use a plugin but we want to create a new one. The first step we need to do is to create a new JavaScript file where to place our code. As a good practice this file must contain a documentation header section with the plugin's name, version, author contact information, license, etc

When we include the JavaScript file in a web page we need the code to be auto-executed so the plugin can be registered within the jQuery. To do so all the JavaScript code in the file must be inside the code:

```
(function($, window, document, undefined) {
  // The code here
})(jQuery, window, document);
```

This way, the code of our plugin will receive a reference to the jQuery library, the window and the document and, also, an undefined reference on the `undefined` parameter that we can use to compare undefined values (wow, that was too much undefineds in a sentence).

## The wrapper function

To create a jQuery plugin we need to register a new function in the `jQuery.fn` object. This is an array where jQuery stores references to all available or included plugins in the current page. To add a new one simply write something like:

```
jQuery.fn.myPlugin = function(options) {
  // Do your awesome plugin stuff here
};
```

or

```
jQuery.fn['myPlugin'] = function(options) {
  // Do your awesome plugin stuff here
};
```

**The function you define here is the entry point to your plugin. It is a wrapper function that must handle the plugins initialization or invocation to any plugin's method.**

### How to distinguish the action?

The question is, how do we implement the plugin's wrapper function to distinguish if it must initialize the plugin or call a method? The answer is in the `options` parameter.

When we instantiate a plugin without passing any argument the `options` parameter is `undefined`:

```
$('#linkID').beautyLink();
```

If we instantiate passing any argument the `options` parameter is an `Object`:

```
$('#linkID').beautyLink({
  someOption: 'a',
  someOther: 123
});
```

Finally, if we are calling a plugin's method like:

```
$('#linkID').beautyLink('color', 'red');
```

then the `options` parameter is an array with two elements `['color', 'red']`

## The starter code for the wrapper function

With the above in mind, we can write the base code for the wrapper function:

```
$.fn[pluginName] = function(options) {
    var args = arguments;

    if (options === undefined || typeof options === 'object') {
        // Creates a new plugin instance

    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
        // Call a public pluguin method (not starting with an underscore) and different
        // from the 'init' one

    }
};
```

## Chainable or not chainable

jQuery is famous (and powerful) by its chainable way to work, that is, a call to a method returns a reference to the same element so we can make another call. For example:

```
$('#someID')
  .parents(".pane")
  .animate({ opacity: "hide" }, "slow");
```

or applied to our plugin:

```
$('#linkID')
  .beautyLink('color', 'red')
  .beautyLink('backgroundColor', 'black');
```

We must think which of our methods must be chainable and which ones not. For example, **the getter methods must break the chainability**. In our case we want a call to:

```
$('#linkID').beautyLink('color');
```

returns the `red` value and not a reference to the element to make another call.

### Implementing chainability

When the wrapper function `$.fn[pluginName]` is called the this reference points to:

- the selected DOM element, like when using:

```
$('#linkID').beautyLink('color', 'red');
```

    or

- a list of selected DOM elements, like when using:

```
$('a').beautyLink('color', 'red');
```

Next code shows a very basic wrapper function that initializes a Plugin instance for each selected element. This results in a chainable call that returns a reference to the same element ready to make another chained call:

```
$.fn[pluginName] = function(options) {
    return this.each(function() {
        new Plugin(this, options);
    });
}
```

### Avoiding chainability

The solution to avoid a method were chainable is easy, simply doesn't write the `this.each()` and execute code on the first occurrence, that is, the `this[0]`.

> This will be more clear in the final code.

## The jQuery.data() function

We make use of the `$.data()` function in our code so a short explanation is required.  
The [`$.data()`](http://api.jquery.com/jQuery.data/) function allows to store arbitrary data on an element (or get is value).

It is important because we store a reference to the Plugin instance on each element it is applied. This allow us to check if an element has already applied a plugin or we need to instantiate it. This will be clarified in the final wrapper function code.

## The backbone wrapper function code

With all the above in mind, we can write our final plugin's wrapper function. To summarize:

- If plugin is called without arguments, then the plugin is initialized and a reference is stored in the DOM element.
- If a plugin's method is called and it isn't a getter method, then the method is called maintaining chainability.
- If a plugin's method is called and it is a getter method, then we return a value and break the chainability.

```
$.fn[pluginName] = function(options) {
    var args = arguments;

    if (options === undefined || typeof options === 'object') {
        // Creates a new plugin instance, for each selected element, and
        // stores a reference withint the element's data
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
        // Call a public pluguin method (not starting with an underscore) for each
        // selected element.
        if (Array.prototype.slice.call(args, 1).length == 0 && $.inArray(options, $.fn[pluginName].getters) != -1) {
            // If the user does not pass any arguments and the method allows to
            // work as a getter then break the chainability so we can return a value
            // instead the element reference.
            var instance = $.data(this[0], 'plugin_' + pluginName);
            return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        } else {
            // Invoke the speficied method on each selected element
            return this.each(function() {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
        }
    }
};
```

Take into account, we have also defined an array where to specify which method can act as getters when they are invoked without any argument:

```
$.fn[pluginName].getters = ['someGetterMethod'];
```

## To be continue...

We have seen the basis on how to create a jQuery plugin and learnt about the importance of the wrapper function, which is the entry point to our plugin.  
In the next post I will explain how we can organize our plugin code, the responsible to implement functionality, how to create private and public method, etc.

Continuation article [Things I learned creating a jQuery Plugin (Part II)](//2013/02/25/things-i-learned-creating-a-jquery-plugin-part-ii.html "Things I learned creating a jQuery Plugin (Part II)")
