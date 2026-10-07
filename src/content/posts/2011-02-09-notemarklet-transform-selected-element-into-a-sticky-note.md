---
title: "notemarklet: Transform selected element into a sticky note"
pubDatetime: 2011-02-09T22:59:00Z
description: Bookmarklets are nothing new but I never created one. There are tons of available bookmarklets to make tons of useful little things but here is my little but nice bookmarklet :) called notemarklet…
tags:
  - bookmarklet
  - javascript
  - tools
---

[Bookmarklets](http://en.wikipedia.org/wiki/Bookmarklet) are nothing new but I never created one. There are tons of available bookmarklets to make tons of useful little things but here is my little but nice bookmarklet :) called _**[notemarklet](<javascript:(function() {       if (!window.notemarkletDiv) {         window.notemarkletDiv = {};     }       var notemarklet = window.notemarklet;     var notemarkletDiv = null;       function createnotemarkletDiv() {         notemarkletDiv = document.createElement('div');         notemarkletDiv.style.position = 'absolute';         notemarkletDiv.style.display = 'none';         notemarkletDiv.style.border = '1px solid #DEE184';         notemarkletDiv.style.borderRadius = '1px';         notemarkletDiv.style.padding = '0px';         notemarkletDiv.style.margin = '0px';         notemarkletDiv.style.backgroundColor = '#F4F39E';         notemarkletDiv.style.opacity = '0.4';         notemarkletDiv.style.zIndex = 9999;         notemarkletDiv.style.boxShadow = '3px 3px 6px #000';         notemarkletDiv.style.webkitBoxShadow = '3px 3px 6px #000';         notemarkletDiv.style.mozBoxShadow = '3px 3px 6px #000';         notemarkletDiv.style.background = '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#EBEB00), to(#C5C500))';         document.getElementsByTagName('body')[0].appendChild(notemarkletDiv);     };       var previousTarget = null;     function notemarkElement(event) {         if(!notemarkletDiv) {             createnotemarkletDiv();         }         setTimeout(function(){             previousTarget = target;             notemarkletDiv.style.display = 'none';               var target = event.target;             var targetRect = target.getBoundingClientRect();             notemarkletDiv.style.top = (window.pageYOffset+targetRect.top-5)+'px';             notemarkletDiv.style.left = (window.pageXOffset+targetRect.left-5)+'px';             notemarkletDiv.style.width = (targetRect.right-targetRect.left+10)+'px';             notemarkletDiv.style.height = (targetRect.bottom-targetRect.top+10)+'px';         }, 200);         setTimeout(function(){             notemarkletDiv.style.display = 'block';         }, 500);     };       document.addEventListener('mousemove', notemarkElement, false); })();>)**_ that helps reading marking the element under the mouse and changing its looks as a sticky note. Next there are a couple of samples:

![notemarker1](@/content/posts/images/notemarker1.png)

As you can see notemarker can help you reading text pages. It is a pure JavaScript code without the need of external libraries. So not expect great effects.

![notemarker2](@/content/posts/images/notemarker2.png)

Next is the source code.

To use this bookmarlet simply create a new bookmark on your broser and paste the next code as URL. Looking at source code, you can learn how to get the current target element under the mouse, its position, dimensions, etc.

```javascript
javascript: (function () {
  if (!window.notemarkletDiv) {
    window.notemarkletDiv = {};
  }

  var notemarklet = window.notemarklet;
  var notemarkletDiv = null;

  function createnotemarkletDiv() {
    notemarkletDiv = document.createElement("div");
    notemarkletDiv.style.position = "absolute";
    notemarkletDiv.style.display = "none";
    notemarkletDiv.style.border = "1px solid #DEE184";
    notemarkletDiv.style.borderRadius = "1px";
    notemarkletDiv.style.padding = "0px";
    notemarkletDiv.style.margin = "0px";
    notemarkletDiv.style.backgroundColor = "#F4F39E";
    notemarkletDiv.style.opacity = "0.4";
    notemarkletDiv.style.zIndex = 9999;
    notemarkletDiv.style.boxShadow = "3px 3px 6px #000";
    notemarkletDiv.style.webkitBoxShadow = "3px 3px 6px #000";
    notemarkletDiv.style.mozBoxShadow = "3px 3px 6px #000";
    notemarkletDiv.style.background =
      "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#EBEB00), to(#C5C500))";
    document.getElementsByTagName("body")[0].appendChild(notemarkletDiv);
  }

  var previousTarget = null;
  function notemarkElement(event) {
    if (!notemarkletDiv) {
      createnotemarkletDiv();
    }
    setTimeout(function () {
      previousTarget = target;
      notemarkletDiv.style.display = "none";

      var target = event.target;
      var targetRect = target.getBoundingClientRect();
      notemarkletDiv.style.top = window.pageYOffset + targetRect.top - 5 + "px";
      notemarkletDiv.style.left =
        window.pageXOffset + targetRect.left - 5 + "px";
      notemarkletDiv.style.width =
        targetRect.right - targetRect.left + 10 + "px";
      notemarkletDiv.style.height =
        targetRect.bottom - targetRect.top + 10 + "px";
    }, 200);
    setTimeout(function () {
      notemarkletDiv.style.display = "block";
    }, 500);
  }

  document.addEventListener("mousemove", notemarkElement, false);
})();
```

I think code is really simple and self explanatory. Only note the use of  _getBoundingClientRect_ function to get target position and dimension. Also, take into account, to avoid modifying the target element we create a new div element that overlaps the target.

Simple, easy and useful... anything more?
