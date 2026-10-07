---
title: "JavaScript animations (tweening): Why maths are important?"
pubDatetime: 2010-12-18T19:50:00Z
description: In a previous post I show how to make a simple scrolling animation using jQuery. jQuery library has lots of effects, many more added in jQuery UI and much more as plugins. Of course it is fine to use…
tags:
  - animation
  - javascript
  - math
---

In a [previous post](//2010/11/23/animated-scrolling-to-dom-element.html) I show how to make a simple scrolling animation using jQuery. jQuery library has lots of effects, many more added in jQuery UI and much more as plugins. Of course it is fine to use existing libraries to not reinvent the wheel, but there are times you need to do an animation by your hand without the help of existing libraries and because this one needs to know the basics to implement JavaScript animations. Right, so how we can make animations in JavaScript and how we can make it smooth? Let's go.

Unlike other languages, [JavaScript doesn't have the concept of threads](http://www.javascriptkata.com/2007/06/04/ajax-and-javascript-dont-use-threads/) so we need to use another approaches to make different things at the same time. This can be achieved with the use of [setTimeout](https://developer.mozilla.org/en/window.setTimeout) and [setInterval](https://developer.mozilla.org/en/DOM/window.setInterval) functions:

> _setTimeout_ executes a code snippet or a function after specified delay
>
> _setInterval_ calls a function repeatedly, with a fixed time delay between each call to that function.

Both functions returns an identifier which allows us to remove the timeout or interval using [clearTimeout](https://developer.mozilla.org/en/DOM/window.clearTimeout) or [clearInterval](https://developer.mozilla.org/en/DOM/window.clearInterval).

Ok, we are able to execute some code asynchronously but the question is: How we can smoothly scroll to an element?

The answer requires a decent explanation so lets start with a couple of basic samples:

### Step 1: Scrolling to an element without animation

On this sample we put a button on our page which execute the _pageScroll_ function:

```xml
<button id="scroll" onclick="pageScroll();">Scroll</button>
```

This function scrolls the browser viewport till our desired element, which we have identified as _target_:

```javascript
function pageScroll() {
  // Get a reference to the target element and its top offset.
  var target = document.getElementById("target");
  var scroll = target.offsetTop;

  // Scroll viewport to the target element.
  window.scrollBy(0, scroll);
}
```

Simply get the vertical offset till our desired target element and use the _scrollBy_ method to scroll the viewport.

### Step 2: Scrolling to an element with basic animation

The previous sample isn't much impressive, the page simply moves to the target element, it isn't a nice smooth animation.

This second sample introduces the previously commented _setTimeout_ functions:

```javascript
function pageScroll() {
  // Get a reference to the target element and its top offset.
  var target = document.getElementById("target");
  var scroll = target.offsetTop;
  var viewScroll = window.pageYOffset;

  // Scroll viewport only a step and call this function again in 10 miliseconds
  if (viewScroll < scroll) {
    window.scrollBy(0, 10);
    setTimeout("pageScroll()", 10);
  }
}
```

The idea is to move the window scroll step by step until arrive the target element. Again the code gets the offset till our target element and also the current offset of the browser. Next we check if the current window offset has arrived to the target element. If so the code finish, otherwise move the window scroll 10 pixels and create a timeout to invoke the function again in 10ms.

### Improving animation

The second sample is nicer than the first once but we want a really fashion animation with smooth movements decelerating when we are near the target element.

If you look at the code you can see that animation we have done is linear, in the sense we are stepping a fixed amount of pixels. Next figure represents a linear movement:

_(Flash demo no longer available: linear movement)_

We would like something smoother like (called _easeinquad_):

_(Flash demo no longer available — see [easeInQuad](https://easings.net/#easeInQuad))_

which starts at zero velocity then accelerates, or this (called _easeInOutSine_)

_(Flash demo no longer available — see [easeInOutSine](https://easings.net/#easeInOutSine))_

which starts at zero velocity, accelerates until halfway, then deaccelerates to zero velocity again.

### Here comes the maths !!!

Yes, this is incredible but truth :). Maths are the key to create these and many other good animations and the star actor is [tweening](http://en.wikipedia.org/wiki/Inbetweening).

We need a tweening function that given a start and end values, a total duration and a relative time computes a position. For example, for values _start=0, end=10_, _duration=5secs_ what would be the position if _time=1.5secs_ ?

```javascript
var tweenPosition = function (time, begin, final, duration) {
  // calculate position here
  return position;
};
```

So the secret is found the formula to compute the position in the desired way. For example,  we can obtain a linear movement using the next function:

```
var tweenLinearPosition = function (t, b, c, d) {
    return c*t/d + b;
};
```

> If you remember your maths in school this is the linear [slope-intercept](http://en.wikipedia.org/wiki/Linear_equation#Slope.E2.80.93intercept_form) form of a line.

For the _easyInQuad_ animation the formula would be:

```
var tweenEaseInQuadPosition = function (t, b, c, d) {
    return c*(t/=d)*t + b;
};
```

### Using tweening function for animation

Now we know a bit about tweening functions needed to create a nice animation and now we need to put it all together in our JavaScript code.

First, using [one](http://www.robertpenner.com/easing/penner_chapter7_tweening.pdf) of the functions you can found in the bottom references, we have created a nice bounce tweening function:

```javascript
var tweenEeaseOutBouncePosition = function (t, b, c, d) {
  if ((t /= d) < 1 / 2.75) {
    return c * (7.5625 * t * t) + b;
  } else if (t < 2 / 2.75) {
    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
  } else if (t < 2.5 / 2.75) {
    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
  } else {
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
  }
};
```

Now, define some needed parameters:

```javascript
// Compute the initial and final offset
var target = document.getElementById("target");
var endOffset = target.offsetTop;
var beginOffset = window.pageYOffset;
var total = endOffset - beginOffset;
var time = 0;
var duration = 3000; // The aproximate duration of animation in miliseconds
var interval = 10; // The interval of every step
```

Similarly than previous samples we need to get the initial and final vertical offset and define the duration of our animation.

Finally the animation function, responsibly to use tweening function, results in:

```javascript
function pageScroll() {
  var currentOffset = window.pageYOffset;

  // Scroll viewport only a step and call this function again in 'interval' miliseconds
  if (time < duration && currentOffset < endOffset) {
    var p = tweenEeaseOutBouncePosition(time, beginOffset, total, duration);
    window.scroll(0, p); // Scroll viewport
    time += interval;
    setTimeout("pageScroll()", interval);
  } else {
    time = 0;
  }
}
```

While we are not over animation duration and the current page offset is less than the target one, we scroll the page computing the position using the tweening function. Take care of this considerations in this sample:

- The JavaScript code has moved to the end of the page. This way we are sure all body content (and also the target element) has been loaded before execute our code.
- We scroll the page using _window.scroll()_ instead _window.scrollBy()_.

### Considerations

This third and final sample is a really simple demonstration using a tweening function. A more powerful implementation must allow to start/stop animation, forward/rewind one frame, etc.

This is simply a tutorial post with a simple introduction to animations. As I commented early there are times when you need to do things without the help of a library, or simply you one create a new library (an amazing alternative to jQuery, MooTools, Prototype, ...) and need to do the things by hand.

Hope it can help you.

### References

[http://www.mediacollege.com/internet/javascript/page/scroll.html](http://www.mediacollege.com/internet/javascript/page/scroll.html) - A basic animation.

[http://hosted.zeh.com.br/mctween/animationtypes.html](http://hosted.zeh.com.br/mctween/animationtypes.html) - Tweet functions and samples.

[http://www.robertpenner.com/easing/penner\_chapter7\_tweening.pdf](http://www.robertpenner.com/easing/penner_chapter7_tweening.pdf) - A great PDF chapter about tweening in ActionScript from Robert Penner.

[http://sixrevisions.com/javascript/10-impressive-javascript-animation-frameworks](http://sixrevisions.com/javascript/10-impressive-javascript-animation-frameworks) - A list of animation JavaScript libraries.

[http://berniesumption.com/software/animator](http://berniesumption.com/software/animator) - A light, powerful and pure JavaScript animator library.
