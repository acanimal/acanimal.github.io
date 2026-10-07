---
title: Animated scrolling to a DOM element
pubDatetime: 2010-11-23T20:05:00Z
description: Creating my web page I have wanted to create a smooth movement to a given page element, for example from top to about section. One possibility, of course, is to code it yourself, but we are lucky to…
tags:
  - javascript
  - jquery
---

Creating my [web page](http://www.acuriousanimal.com) I have wanted to create a smooth movement to a given page element, for example from top to about section. One possibility, of course, is to code it yourself, but we are lucky to have tons of JavaScript libraries and frameworks to help us on that tasks. On of them are [jQuery](http://www.jquery.com), one of the most used libraries.

Ok, lets go to see the required code:

```javascript
$("html,body").animate(
  { scrollTop: $(element).offset().top },
  { duration: "slow", easing: "swing" }
);
```

What the sentence is doing? First we are selecting the HTML body section:

```javascript
$("html,body").animate();
```

apply an animation. The animation must scroll the browser view until the desired DOM element. So the next step is get the desired element top offset:

```javascript
$(element).offset().top;
```

For example, given an HTML element identified by:

```javascript
id = "my_id";
```

we can get its top offset writting:

```javascript
$("#my_id").offset().top;
```

Finally, the [animate](http://api.jquery.com/animate/) function is responsible to perform a custom animation of a set of CSS properties.

To avoid code duplication, it is a good practice to wrap the call on a function, this way we can call it passing an string with the identifier of the element we want to scroll to (really we need to pass the string with desired the jQuery selector):

```javascript
function scrollTo(element) {
  $("html,body").animate(
    { scrollTop: $(element).offset().top },
    { duration: "slow", easing: "swing" }
  );
}
```

You can see a demo of this at [acuriousanimal](http://www.acuriousanimal.com).
