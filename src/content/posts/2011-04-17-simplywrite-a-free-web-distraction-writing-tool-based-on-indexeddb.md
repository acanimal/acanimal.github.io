---
title: SimplyWrite, a free web distraction writing tool based on IndexedDB
pubDatetime: 2011-04-17T19:26:00Z
description: SimplyWrite is a free web distraction writing tool. It is based in the IndexedDB HTML5 so you need a browser compliant. Because the use of IndexedDB all the content is stored locally on your machine,…
tags:
  - html5
  - indexeddb
  - jquery
---

[SimplyWrite](http://www.acuriousanimal.com/SimplyWrite) is a free web distraction writing tool. It is based in the IndexedDB HTML5 so you need a browser compliant. Because the use of IndexedDB **all the content is stored locally on your machine**, no data is transferred or stored in a remote server.

There are many other solutions, like [WriteRoom](http://www.hogbaysoftware.com/products/writeroom), [OmmWriter](http://www.ommwriter.com/) or [FocusWritter](http://gottcode.org/focuswriter/), but SimplyWrite benefits from the fact it is a web tool clone.

> **NOTE: This post is obsolete see [SimplyWrite, a free web distraction writing tool](//2013/04/29/simplywrite-a-free-web-distraction-writing-tool.html).**

You can download the source from [github](https://github.com/acanimal/SimplyWrite).

Please take a look and let me know your suggestions.

> For the moment SimplyWrite has only been tested on Chromium 9 because the requirement of a IndexedDB browser implementarion.

![simplywrite](@/content/posts/images/simplywrite.png)

## Beyond the amazing announce

All right, SimplyWrite is awesome and this announce will change the world but... the truth is all these is because I need a target to work with IndexedDB.

HTML5 is out since a long time (almost a year is like 100 hundreds at internet) and it comes will lot of new features browser will implement in successive releases (at least I hope it).

## Client-Side Storage

HTML5 comes with different solutions for client-side storage: WebStorage, Web SQL Database and IndexedDB.

At this moment one of the main issues is HTML5 is great specification but big and complex to implement by browsers. Because this you need to check if a desired feature is supported/implemented by the browser you are going to use.

As a summary, [WebStorage](http://www.w3.org/TR/webstorage/) is a key-value mechanism, [WebSQLDatabase](http://www.w3.org/TR/webdatabase/) is, unfortunately, a not really good idea (because this it was abandoned), and finally IndexedDB can be understood as a perfect mix between WebStorage and WebSQLDatabase.

WebSQLDatabase, like Google Gears, was mainly though around SQLite, because this many HTML5 implementations were based too on SQLite, inheriting its limitations too. Mozilla never agree with WebDatabase standard and because this never implement it on their bowser. They prefer to work in the IndexedDB.

An important consideration is IndexedDB defines two "working modes": asynchronous and synchronous, but at this moment only asynchronous seems to be supported.

## Working with IndexedDB

Here are pieces of source code for the common action.

### Getting reference to IndexedDB

To work with IndexedDB you need to get a reference. Currently there is no common way to achieve it. On Chromium you need to access to window.webkitIndexedDB while on Firefox you need to use window.mozIndexedDB.

```javascript
if ("webkitIndexedDB" in window) {
  window.indexedDB = window.webkitIndexedDB;
  window.IDBTransaction = window.webkitIDBTransaction;
  window.IDBTransaction = window.webkitIDBTransaction;
  window.IDBKeyRange = window.webkitIDBKeyRange;
} else if ("moz_indexedDB" in window) {
  window.indexedDB = window.moz_indexedDB;
}
if (!window.indexedDB) {
  // Browser doesn’t support indexedDB, do something
  // clever, and then exit early.
  alert("IndexedDB not supported !!!");
}
```

### Creating/Opening the database

Once you have access to IndexedDB reference the next step is create or open the database:

```javascript
var dbRequest = window.indexedDB.open(
  "SimplyWriteDB", // Database ID
  "All my SimplyWrities" // Database Description
);
```

Every command is executed asynchronously and generates a request object where you can execute code on events 'onsuccess' or 'onerror'.

### Initializing the database for the first time

Using the request object returned by the previous command we execute next code on success:

```javascript
dbRequest.onsuccess = function (e) {
  var db = e.result;
  if (db.version === "") {
    // Empty string means the database hasn’t been versioned.
    var versionRequest = db.setVersion("1.0");
    versionRequest.onsuccess = function (e) {
      var store = db.createObjectStore(
        "written", // The Object Store’s name
        "title", // The name of the property to use as a key
        false // Is the key auto-incrementing?
      );
    };
  }
};
```

IndexedDB databases can have different versions. You can use version to initialize the DB for the first time or to update the structure of the database. For example, you have a database with some structure in version 1.0 and want to update it creating a new object store up and increasing the version number to 2.0.

### Adding, getting and removing content

At this point we have a database created with one object store, that uses 'title' as the key. Now we can add and get content to it.

```javascript
var writeTransaction = dbase.transaction(
  ["simplywriteOS"], // The Object Stores to lock
  IDBTransaction.READ_WRITE, // Lock type (READ_ONLY, READ_WRITE)
  0
);
// Open a store and generate a write request:
var store = writeTransaction.objectStore("written");
var writeRequest = store.add({
  title: this_is_the_title,
  text: this_is_the_text,
});
writeRequest.onerror = function (e) {};
writeRequest.onsuccess = function (e) {};
```

Basically, we need to create a database transaction, specify the object store to use in the transaction and make the action like add, get or remove.

One important action is to iterate over all the elements in an object store. You can do that using a cursor:

```javascript
var readCursor = store.openCursor();
readCursor.onsuccess = function (e) {
  if (e.result) {
    console.log(e.result.value.title);
    e.result.continue();
  } else {
    // If the `success` event’s `result` is null, you’ve reached
    // the end of the cursor’s list.
  }
};
```

## Final words about SimplyWrite

SimplyWrite is written using HTML and JavaScript (of course) and I make use of a couple of other projects. I would like to note the use, in addition to jQuery and jQueryUI, two projects:

- [css3buttons](http://css3buttons.michaelhenriksen.dk/), nice set of CSS3 for buttons.
- [html5boilerplate](http://html5boilerplate.com/) the Swiss knife of HTML5.

## References

- [http://www.html5rocks.com/tutorials/#storage](http://www.html5rocks.com/tutorials/#storage) - HTML5 Storage
- [http://mikewest.org/2010/12/intro-to-indexeddb](http://mikewest.org/2010/12/intro-to-indexeddb) - Intro to IndexedDB with good slides.
- [http://msdn.microsoft.com/en-us/scriptjunkie/gg679063](http://msdn.microsoft.com/en-us/scriptjunkie/gg679063) - Another great IndexedDB description
- [http://www.w3.org/TR/webstorage](http://www.w3.org/TR/webstorage) - WebStore specification.
- [http://www.w3.org/TR/IndexedDB](http://www.w3.org/TR/IndexedDB/) - IndexedDB specification.
- [http://caniuse.com/indexeddb](http://caniuse.com/indexeddb) - IndexedDB compatibility.
