---
layout: post
title: 'Local storage: Storing sticky notes on your machine with HTML5'
date: 2011-08-12 11:00
tags:
- html5
- indexeddb
- javascript
- localstorage
- webstorage
---
Every history has a beginning and for this post it starts when some time ago I saw <a href="http://tutorialzine.com/2010/01/sticky-notes-ajax-php-jquery/">this good post from tutorialzine.com</a>. Really I love the tutorials at tutorialzine.com, they are great quality examples to learn.</p>
<p>Looking for similar things, it seems I was not the first trying to do something similar :) <a href="http://rqru.com/sticky">http://rqru.com/sticky</a>. but what I wanted too was to learn a bit more about HTML5 features, concretely about local storage.

<h2>Client-Side Storage</h2>
<p>HTML5 comes with different solutions for client-side storage: WebStorage, Web SQL Database and IndexedDB.</p>
<p>At this moment one of the main issues is HTML5 is great specification but big and complex to implement by browsers. Because this you need to check if a desired feature is supported/implemented by the browser you are going to use.</p>
<p>As a summary, <a href="http://www.w3.org/TR/webstorage/">WebStorage</a> is a key-value mechanism, <a href="http://www.w3.org/TR/webdatabase/">WebSQLDatabase</a> is, unfortunately, a not really good idea (because this it was abandoned), and finally IndexedDB can be understood as a perfect mix between WebStorage and WebSQLDatabase.</p>
<p>WebSQLDatabase, like Google Gears, was mainly though around SQLite, because this many HTML5 implementations were based too on SQLite, inheriting its limitations too. Mozilla never agree with WebDatabase standard and because this never implement it on their bowser. They prefer to work in the IndexedDB.</p>
<blockquote><p><strong>Note</strong>: A sample about local storage using IndexedDB can be found at <a href="//2011/04/17/simplywrite-a-free-web-distraction-writing-tool-based-on-indexeddb.html">SimplyWrite, a free web distraction writing tool based on IndexedDB</a>.</p></blockquote>
<h2>The user interface</h2>
<p>I base the code on the previously commented tutorialzine.com tutorial. I use most of CSS and pieces of HTML but code from scratch the JavaScript.</p>
<p><img class="aligncenter size-full wp-image-361" title="stickies" src="./images/stickies.png" alt="" width="671" height="437" /></p>
<p>This is only a personal exercise and many things need to be improves like remove notes, clean the whole board or put some nice message with the total number of notes in the "<em>Here put some info</em>" label.</p>

<blockquote><p><strong>SOURCE</strong>: Code is open source so fell free to contribute at: <a href="https://github.com/acanimal/stickies">https://github.com/acanimal/stickies</a>.</p></blockquote>
<blockquote><p><strong>DEMO</strong>: Please feel free to test the demo and check code at: <a href="http://www.acuriousanimal.com/stickies">http://www.acuriousanimal.com/stickies</a>.</p></blockquote>

<h2>The implementation</h2>
<p>I rewrite almost all the JavaScript code in this stickies post but I continue using the same libraries and plugins as in the original, that is, <a href="http://jquery.com/">jQuery</a>, jQuery-UI and <a href="http://fancybox.net/">Fancybox</a> with a couple of addition:</p>
<p><a href="http://www.jstorage.info/">jStorage</a>: A nice wrapper plugin for Prototype, MooTools and jQuery to cache data (string, numbers, objects, even XML nodes) on browser side. It helps a lot because make transparent for you the initialization of the storage engine and is compatible with many browsers.</p>
<p><img class="aligncenter size-full wp-image-357" title="jstorage_compat" src="./images/jstorage_compat.png" alt="" width="735" height="310" /></p>
<p><a href="http://code.google.com/p/jquery-json/">jquery-json</a>: This plugin makes it simple to convert to and from JSON.</p>
<h2>References</h2>
<p><a href="http://tutorialzine.com/2010/01/sticky-notes-ajax-php-jquery">http://tutorialzine.com/2010/01/sticky-notes-ajax-php-jquery</a> - Stickies demo tutorial at tutorialzine</p>
<p><a href="http://www.html5rocks.com/tutorials/#storage">http://www.html5rocks.com/tutorials/#storage</a> - HTML5 Storage</p>
<p><a href="http://mikewest.org/2010/12/intro-to-indexeddb">http://mikewest.org/2010/12/intro-to-indexeddb</a> - Intro to IndexedDB with good slides.</p>
<p><a href="http://msdn.microsoft.com/en-us/scriptjunkie/gg679063">http://msdn.microsoft.com/en-us/scriptjunkie/gg679063</a> - Another great IndexedDB description</p>
<p><a href="http://www.w3.org/TR/webstorage">http://www.w3.org/TR/webstorage</a> - WebStore specification.</p>
<p><a href="http://www.w3.org/TR/IndexedDB/">http://www.w3.org/TR/IndexedDB</a> - IndexedDB specification.</p>
<p><a href="http://caniuse.com/indexeddb">http://caniuse.com/indexeddb</a> - IndexedDB compatibility.</p>
<p><a href="http://www.jstorage.info">http://www.jstorage.info</a> - Wrapper for Prototype, MooTools and jQuery to cache data (string, numbers, objects, even XML nodes) on browser side.</p>
