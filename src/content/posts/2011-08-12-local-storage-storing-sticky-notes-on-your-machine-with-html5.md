---
title: "Local storage: Storing sticky notes on your machine with HTML5"
pubDatetime: 2011-08-12T11:00:00Z
description: Every history has a beginning and for this post it starts when some time ago I saw this good post from tutorialzine.com. Really I love the tutorials at tutorialzine.com, they are great quality…
tags:
  - html5
  - indexeddb
  - javascript
  - localstorage
  - webstorage
---

Every history has a beginning and for this post it starts when some time ago I saw [this good post from tutorialzine.com](http://tutorialzine.com/2010/01/sticky-notes-ajax-php-jquery/). Really I love the tutorials at tutorialzine.com, they are great quality examples to learn.

Looking for similar things, it seems I was not the first trying to do something similar :) [http://rqru.com/sticky](http://rqru.com/sticky). but what I wanted too was to learn a bit more about HTML5 features, concretely about local storage.

## Client-Side Storage

HTML5 comes with different solutions for client-side storage: WebStorage, Web SQL Database and IndexedDB.

At this moment one of the main issues is HTML5 is great specification but big and complex to implement by browsers. Because this you need to check if a desired feature is supported/implemented by the browser you are going to use.

As a summary, [WebStorage](http://www.w3.org/TR/webstorage/) is a key-value mechanism, [WebSQLDatabase](http://www.w3.org/TR/webdatabase/) is, unfortunately, a not really good idea (because this it was abandoned), and finally IndexedDB can be understood as a perfect mix between WebStorage and WebSQLDatabase.

WebSQLDatabase, like Google Gears, was mainly though around SQLite, because this many HTML5 implementations were based too on SQLite, inheriting its limitations too. Mozilla never agree with WebDatabase standard and because this never implement it on their bowser. They prefer to work in the IndexedDB.

> **Note**: A sample about local storage using IndexedDB can be found at [SimplyWrite, a free web distraction writing tool based on IndexedDB](//2011/04/17/simplywrite-a-free-web-distraction-writing-tool-based-on-indexeddb.html).

## The user interface

I base the code on the previously commented tutorialzine.com tutorial. I use most of CSS and pieces of HTML but code from scratch the JavaScript.

![stickies](@/content/posts/images/stickies.png)

This is only a personal exercise and many things need to be improves like remove notes, clean the whole board or put some nice message with the total number of notes in the "_Here put some info_" label.

> **SOURCE**: Code is open source so fell free to contribute at: [https://github.com/acanimal/stickies](https://github.com/acanimal/stickies).

> **DEMO**: Please feel free to test the demo and check code at: [http://www.acuriousanimal.com/stickies](http://www.acuriousanimal.com/stickies).

## The implementation

I rewrite almost all the JavaScript code in this stickies post but I continue using the same libraries and plugins as in the original, that is, [jQuery](http://jquery.com/), jQuery-UI and [Fancybox](http://fancybox.net/) with a couple of addition:

[jStorage](http://www.jstorage.info/): A nice wrapper plugin for Prototype, MooTools and jQuery to cache data (string, numbers, objects, even XML nodes) on browser side. It helps a lot because make transparent for you the initialization of the storage engine and is compatible with many browsers.

![jstorage_compat](@/content/posts/images/jstorage_compat.png)

[jquery-json](http://code.google.com/p/jquery-json/): This plugin makes it simple to convert to and from JSON.

## References

[http://tutorialzine.com/2010/01/sticky-notes-ajax-php-jquery](http://tutorialzine.com/2010/01/sticky-notes-ajax-php-jquery) - Stickies demo tutorial at tutorialzine

[http://www.html5rocks.com/tutorials/#storage](http://www.html5rocks.com/tutorials/#storage) - HTML5 Storage

[http://mikewest.org/2010/12/intro-to-indexeddb](http://mikewest.org/2010/12/intro-to-indexeddb) - Intro to IndexedDB with good slides.

[http://msdn.microsoft.com/en-us/scriptjunkie/gg679063](http://msdn.microsoft.com/en-us/scriptjunkie/gg679063) - Another great IndexedDB description

[http://www.w3.org/TR/webstorage](http://www.w3.org/TR/webstorage) - WebStore specification.

[http://www.w3.org/TR/IndexedDB](http://www.w3.org/TR/IndexedDB/) - IndexedDB specification.

[http://caniuse.com/indexeddb](http://caniuse.com/indexeddb) - IndexedDB compatibility.

[http://www.jstorage.info](http://www.jstorage.info) - Wrapper for Prototype, MooTools and jQuery to cache data (string, numbers, objects, even XML nodes) on browser side.
