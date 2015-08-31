---
layout: post
title: "How to read from a writable stream (http.ServerResponse) in Node"
date: "2015-08-31 21:05"
tags:
- node
- streams
- howto
---

I'm working on a personal side project (when I have free time to spend on) where a bunch of middlewares are chained to do something awesome (*Take a look at [ClydeIO](https://github.com/clydeio/clydeio). Note it is currently a proof of concept*). Remember a middleware is nothing more than a function that receives three parameters: the `request`, the `response` and the `next` function:

```javascript
function(req, res, next) {
  ...
}
```

The `req` parameter is an instance of `http.IncomingMessage`, a readable stream, while the `res` parameter is an instance of `http.ServerResponse`, a writable stream (something similar to Java servlets).

Usually a middleware reads the request, optionally attach more data or modifies it, maybe writes some content on the response and continues the execution in the next middleware invoking the `next()` function. If any of the middlewares writes content and invokes the `res.end()` method the response is sent to the client and middleware chain is aborted.

```javascript
// First middleware
function(req, res, next) {
  if (req.url === "/blablabla") {
    res.write("I have requested the /blablabla resource");
  }
  next(); // Continue the middleware chain
}

// Second middleware want to read the response content
function(req, res, next) {
  // ???
}
```

> Note, I'm working with [Connect](https://github.com/senchalabs/connect) and not [Express](http://expressjs.com/), but the concepts are the same.
> Express uses the `send()` mehtod to write content, which is based in the `write()` and `end()` core node methods. Also Express extends with request and response object with its own methods.

Now, suppose in a middleware you need to get the current content (the response body) other middlewares has been written. The response is an output stream and it is designed to have write oriented operations: write content, write headers, etc but not read operations. ***[So how we can read the content written on a writable stream?](http://stackoverflow.com/questions/31851894/nodejs-middleware-how-to-read-from-a-writable-stream-http-serverresponse)***

> Do not confuse the response reference we have in a middleware (or simply in a `http.Server` listener), which is a writable stream, with the object we obtain when using `http.request()`. With `http.request()` we obtain an instance of `http.ClientRequest` and when listen on it for the `response` event we get a `http.IncomingMessage`, a readable stream. That is, the response we obtain is a readable stream where we can read data sent from the server. In a middleware we are the server and are responsible to write data in an output/writable stream.

The solution I found is override the `write()` method.

The `write()` method is defined by the `stream.Writable` interface and it is mandatory each writable stream class implements it. So, they idea is to override the method in a way we can store the data is written and later invoking the parent method so they what usually do:

```javascript
// Second middleware want to read the response content
function(req, res, next) {
  var data = "";

  res._originalWrite = res.write; // Store reference to the original write method
  res.write = function(chunck, encoding, callback) {
    data += chunck;

    res._originalWrite.call(res, chunck, encoding, callback);
  }
}
```

Now, the second middleware can read all the chunks of data any other middleware writes to the response and continues the normal execution of the `write()` function invoking the original version.

Note, if you need to access the response headers the solution is similar but, in this case, you need to override the methods `writeHead()`, `setHeader()` and `removeHeader()`.
