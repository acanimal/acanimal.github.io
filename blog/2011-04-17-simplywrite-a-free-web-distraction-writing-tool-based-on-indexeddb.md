---
layout: post
title: SimplyWrite, a free web distraction writing tool based on IndexedDB
date: 2011-04-17 19:26
tags:
- html5
- indexeddb
- jquery
---
<a href="http://www.acuriousanimal.com/SimplyWrite">SimplyWrite </a>is a free web distraction writing tool. It is based in the IndexedDB HTML5 so you need a browser compliant. Because the use of IndexedDB <strong>all the content is stored locally on your machine</strong>, no data is transferred or stored in a remote server.

<p>There are many other solutions, like <a href="http://www.hogbaysoftware.com/products/writeroom">WriteRoom</a>, <a href="http://www.ommwriter.com/">OmmWriter</a> or <a href="http://gottcode.org/focuswriter/">FocusWritter</a>, but SimplyWrite benefits from the fact it is a web tool clone.</p>

<blockquote><strong>NOTE: This post is obsolete see <a href="//2013/04/29/simplywrite-a-free-web-distraction-writing-tool.html">SimplyWrite, a free web distraction writing tool</a>.</strong></blockquote>

<p>You can download the source from <a href="https://github.com/acanimal/SimplyWrite">github</a>.</p>
<p>Please take a look and let me know your suggestions.</p>
<blockquote><p>For the moment SimplyWrite has only been tested on Chromium 9 because the requirement of a IndexedDB browser implementarion.</p></blockquote>
<p style="text-align: center;"><a href="http://www.acuriousanimal.com/SimplyWrite"><img class="aligncenter size-full wp-image-262" title="simplywrite" alt="" src="./images/simplywrite.png" width="507" height="290" /></a></p>
<h2>Beyond the amazing announce</h2>
<p>All right, SimplyWrite is awesome and this announce will change the world but... the truth is all these is because I need a target to work with IndexedDB.</p>
<p>HTML5 is out since a long time (almost a year is like 100 hundreds at internet) and it comes will lot of new features browser will implement in successive releases (at least I hope it).</p>
<h2>Client-Side Storage</h2>
<p>HTML5 comes with different solutions for client-side storage: WebStorage, Web SQL Database and IndexedDB.</p>
<p>At this moment one of the main issues is HTML5 is great specification but big and complex to implement by browsers. Because this you need to check if a desired feature is supported/implemented by the browser you are going to use.</p>
<p>As a summary, <a href="http://www.w3.org/TR/webstorage/">WebStorage</a> is a key-value mechanism, <a href="http://www.w3.org/TR/webdatabase/">WebSQLDatabase</a> is, unfortunately, a not really good idea (because this it was abandoned), and finally IndexedDB can be understood as a perfect mix between WebStorage and WebSQLDatabase.</p>
<p>WebSQLDatabase, like Google Gears, was mainly though around SQLite, because this many HTML5 implementations were based too on SQLite, inheriting its limitations too. Mozilla never agree with WebDatabase standard and because this never implement it on their bowser. They prefer to work in the IndexedDB.</p>
<p>An important consideration is IndexedDB defines two "working modes": asynchronous and synchronous, but at this moment only asynchronous seems to be supported.</p>
<h2>Working with IndexedDB</h2>
<p>Here are pieces of source code for the common action.</p>
<h3>Getting reference to IndexedDB</h3>
<p>To work with IndexedDB you need to get a reference. Currently there is no common way to achieve it. On Chromium you need to access to <span style="font-family: Consolas, Monaco, 'Courier New', Courier, monospace; font-size: 12px; line-height: 18px; white-space: pre;">window.webkitIndexedDB</span> while on Firefox you need to use <span style="font-family: Consolas, Monaco, 'Courier New', Courier, monospace; font-size: 12px; line-height: 18px; white-space: pre;">window.mozIndexedDB</span>.</p>
<pre class="brush:js">if ( "webkitIndexedDB" in window ) {
	window.indexedDB      = window.webkitIndexedDB;
	window.IDBTransaction = window.webkitIDBTransaction;
	window.IDBTransaction = window.webkitIDBTransaction;
	window.IDBKeyRange    = window.webkitIDBKeyRange;
} else if ( "moz_indexedDB" in window ) {
	window.indexedDB = window.moz_indexedDB;
}
if ( !window.indexedDB ) {
	// Browser doesn’t support indexedDB, do something
	// clever, and then exit early.
	alert("IndexedDB not supported !!!");
}</pre>
<h3>Creating/Opening the database</h3>
<p>Once you have access to IndexedDB reference the next step is create or open the database:</p>
<pre class="brush:js">var dbRequest = window.indexedDB.open(
	"SimplyWriteDB",        // Database ID
	"All my SimplyWrities" // Database Description
);</pre>
<p>Every command is executed asynchronously and generates a request object where you can execute code on events 'onsuccess' or 'onerror'.</p>
<h3>Initializing the database for the first time</h3>
<p>Using the request object returned by the previous command we execute next code on success:</p>
<pre class="brush:js">dbRequest.onsuccess = function ( e ) {
	var db = e.result;
	if ( db.version === "" ) {
		// Empty string means the database hasn’t been versioned.
		var versionRequest = db.setVersion( "1.0" );
		versionRequest.onsuccess = function ( e ) {
			var store = db.createObjectStore(
			"written",	// The Object Store’s name
			"title",  				// The name of the property to use as a key
			false         		// Is the key auto-incrementing?
			);
		};
	}
};</pre>
<p>IndexedDB databases can have different versions. You can use version to initialize the DB for the first time or to update the structure of the database. For example, you have a database with some structure in version 1.0 and want to update it creating a new object store up and increasing the version number to 2.0.</p>
<h3>Adding, getting and removing content</h3>
<p>At this point we have a database created with one object store, that uses 'title' as the key. Now we can add and get content to it.</p>
<pre class="brush:js">var writeTransaction = dbase.transaction(
  ["simplywriteOS"],           // The Object Stores to lock
  IDBTransaction.READ_WRITE,  // Lock type (READ_ONLY, READ_WRITE)
  0
);
// Open a store and generate a write request:
var store = writeTransaction.objectStore("written");
var writeRequest = store.add( {
    "title":  this_is_the_title,
    "text": this_is_the_text
} );
writeRequest.onerror = function ( e ) {

};
writeRequest.onsuccess = function ( e ) {
};</pre>
<p>Basically, we need to create a database transaction, specify the object store to use in the transaction and make the action like add, get or remove.</p>
<p>One important action is to iterate over all the elements in an object store. You can do that using a cursor:</p>
<pre class="brush:js">var readCursor = store.openCursor();
readCursor.onsuccess = function ( e ) {
  if ( e.result ) {
    console.log(e.result.value.title);
    e.result.continue();
  } else {
    // If the `success` event’s `result` is null, you’ve reached
    // the end of the cursor’s list.
  }
};</pre>
<h2>Final words about SimplyWrite</h2>
<p>SimplyWrite is written using HTML and JavaScript (of course) and I make use of a couple of other projects. I would like to note the use, in addition to jQuery and jQueryUI, two projects:</p>
<ul>
<li><a href="http://css3buttons.michaelhenriksen.dk/">css3buttons</a>, nice set of CSS3 for buttons.</li>
<li><a href="http://html5boilerplate.com/">html5boilerplate</a> the Swiss knife of HTML5.</li>
</ul>
<h2>References</h2>
<ul>
<li><a href="http://www.html5rocks.com/tutorials/#storage">http://www.html5rocks.com/tutorials/#storage</a> - HTML5 Storage</li>
<li><a href="http://mikewest.org/2010/12/intro-to-indexeddb">http://mikewest.org/2010/12/intro-to-indexeddb</a> - Intro to IndexedDB with good slides.</li>
<li><a href="http://msdn.microsoft.com/en-us/scriptjunkie/gg679063">http://msdn.microsoft.com/en-us/scriptjunkie/gg679063</a> - Another great IndexedDB description</li>
<li><a href="http://www.w3.org/TR/webstorage">http://www.w3.org/TR/webstorage</a> - WebStore specification.</li>
<li><a href="http://www.w3.org/TR/IndexedDB/">http://www.w3.org/TR/IndexedDB</a> - IndexedDB specification.</li>
<li><a href="http://caniuse.com/indexeddb">http://caniuse.com/indexeddb</a> - IndexedDB compatibility.</li>
</ul>
