---
title: How to create a preloader in Dojo
pubDatetime: 2010-12-05T11:22:00Z
description: Dojo is a great framework to create RIA applications. Dojo isn't only a bunch of utility functions to select DOM nodes, change styles, make some effects, etc in contrast it is a whole framework with…
tags:
  - ajax
  - dojo
  - javascript
---

[Dojo](http://www.dojotoolkit.org/) is a great framework to create [RIA](http://en.wikipedia.org/wiki/Rich_Internet_application) applications. Dojo isn't only a bunch of utility functions to select DOM nodes, change styles, make some effects, etc in contrast it is a whole framework with a great set of UI widgets.

### Working in a declarative way

Like other JavaScript libraries and frameworks Dojo allows us to create widgets directly from JavaScript code but, and this is one of its key values, Dojo allows to work in a declarative way. If you know HTML then you are allowed to create a Dojo UI. For example:

```xml
<button dojoType="dijit.form.Button" type="button">Click Me</button>
```

In the declarative way we only need to add the _dojoType_ attribute to a HTML element we to create Dojo components. But, **how the declarative way works?** Well, as a short answer you need to understand **once Dojo is loaded by the browser, the JavaScript code parses the DOM structure of the page and "_tansforms_" any element with the _dojoType_ to the appropriate Dojo component**.

### What's the problem with the declarative way?

Unfortunately, using this way, while Dojo is going to be loaded you will see a normal button in the browser and some seconds later, once Dojo is loaded and has parsed the page, you will see how your normal button ![normal_button](@/content/posts/images/normal_button.png) becomes a Dojo button ![dojo_button](@/content/posts/images/dojo_button.png).

So, I want to use Dojo but don't want that ugly effect on my pages? That what we are going to talk in the next lines.

### Creating a preloader

The basic idea is to hide the page content until Dojo has parsed the content and created all the Dijit widgets. This way when users access our pages they will see a nice preloader page and once the content is prepared it will appear in an smooth way. That is from:

![dojo_preloader](@/content/posts/images/dojo_preloader-300x191.png)

to:

![dojo_content](@/content/posts/images/dojo_content-300x197.png)

_Considerations: Please, what I'm going to explain here is all related to Dojo 1.5. I have test on FF3.5, Chrome 8 and IE8._

#### Avoid parse on load

The first step is to tell Dojo don't parse the page automatically, we want to control when to do that, so when including Dojo library we need to explicitly tell that using '_parseOnLoad_' property:

```xml
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/dojo/1.5/dojo/dojo.xd.js"
    djConfig="parseOnLoad: false, isDebug: false, locale: 'en-us'"></script>
```

and then include the parser code. Note it is always necessary this line, including when setting _parseOnLoad_ to true.

```xml
<script type="text/javascript">
    dojo.require("dojo.parser");
    ...
</script>
```

#### Put a div in the body to act as the preloader layer

In the body of your page you need to add a div element to be used as the preloader. This will be initially visible and will hide the real content of your page until it was ready for the user.

```xml
<div id="preloader">
    <div id="preloaderContent" style="visibility: hidden;">
        <strong>This is your preloader... </strong>
        <img width="20px" height="20px" src="http://ajax.googleapis.com/ajax/libs/dojo/1.5/dojox/image/resources/images/loading.gif"><br>
        Put someting nice here !!!
    </div>
</div>
```

#### Style the preloader

As we say, the preloader needs to hide the real content of our page, so it needs some styling.

The _preloader_ section is responsible to cover the whole viewport, while the preloaderContent contains our preloader message. (Later you will we center the message by code).

```css
#preloader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #aaa;
  z-index: 999;
}
#preloaderContent {
  position: absolute;
  border: 2px solid #fff;
  color: #fff;
  padding: 25px;
  -moz-border-radius: 15px;
  border-radius: 15px;
}
```

#### Hide the preloader once the content is ready

We have the preloader div section and we have styled it a bit. Now we need to add the code that hides it once the content was parsed by Dojo and ready for the user.

To do that we need to add next code in the _dojo.addOnLoad_ function:

```javascript
dojo.addOnLoad(function () {
  showPreloader();
  dojo.parser.parse();
  hidePreloader();
});
```

The _addOnLoad_ function is executed once the Dojo code is loaded by the browser. Meanwhile the user will see the preloader on the screen. Once Dojo is loaded what we want is to parse the content

```javascript
dojo.parser.parse();
```

and then hide the preloader

```javascript
var hidePreloader = function () {
  // This really hides the preloader
  var hide = function () {
    dojo
      .fadeOut({
        node: "preloader",
        duration: 700,
        onEnd: function () {
          dojo.style("preloader", "display", "none");
        },
      })
      .play();
  };

  // Set a timeout to ensure the preloader is visible.
  // This is only for testing !!!
  setTimeout(hide, 5000);
};
```

_Please, note to force you can see the preloader in the screen I have added a 5secs timeout. Probably you don't want that on your site_.

To make preloader a bit more beautiful I have created the _showPreloader_ function which computes the viewport size and centers the preloader message.

```javascript
function showPreloader() {
  // Show the preloader centered in the viewport
  var ps = dojo.position("preloaderContent");
  var ws = dojo.window.getBox();
  dojo.style("preloaderContent", "top", ws.h / 2 - ps.h / 2 + "px");
  dojo.style("preloaderContent", "left", ws.w / 2 - ps.w / 2 + "px");
  dojo.style("preloaderContent", "visibility", "visible");
}
```

### Demo

You can see the demo [here](http://www.acuriousanimal.com/dojo-preloader/). Source code is available at Github repository [dojo-preloader](https://github.com/acanimal/dojo-preloader)

### References

- [http://www.preloaders.net](http://www.preloaders.net/) - To create nice preloader images.
- [http://www.sitepen.com/blog/2008-10-06-implementing-a-web-application-preloading-overlay/](http://www.sitepen.com/blog/2008-10-06-implementing-a-web-application-preloading-overlay/)
- [](http://www.sitepen.com/blog/2008-10-06-implementing-a-web-application-preloading-overlay/)[http://dojocampus.org/content/2008/03/08/the-dojo-parser/](http://dojocampus.org/content/2008/03/08/the-dojo-parser/) - Better understand of the Dojo parser.
