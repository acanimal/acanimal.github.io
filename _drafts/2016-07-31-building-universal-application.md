---
layout: post
title: Building a universal web application with React, Redux and Webpack (I - Concepts)
date: 2016-07-31 08:32
excerpt_separator: <!--more-->
tags:
- javascript
- webpack
- react
- redux
- universal
- isomorphic
---

In this article series I'm going to describe: What is an universal (previously called isomorphic) web application? Why are them important? What benefits offers a universal web apps? and How to create a boilerplate to start a universal app project. Note, JavaScript ecosystem is incredible bast and, because we can create an universal web app with almost any combination of framework and libraries, we will use in this series [React][react], [Redux][redux] and [Webpack][webpack].

<!--more-->

## TOC

- Concepts

---

The web is evolving faster than ever, mainly by the evolution and improvements of the JavaScript language. Besides, NodeJS project has made possible to use JavaScript on the server side demonstrating JS is a *first class language* as good -or bad- like Java, PHP or Python. But, in contrast to them, the fact that we can use JS both for server and client side, converts JS in a really special language, which brings us possibility to create what was called *universal applications*.


## JavaScript on the client side

The use of JS on client side has evolve from a couple of lines to validate some input text to really complex applications. Nowadays everybody uses some [RIA](https://en.wikipedia.org/wiki/Rich_Internet_application) application: email, social networks, photo sharing, etc.

Trivializing a bit, we can summarize a RIA works as follows: an HTML file is loaded by the browser, which usually are organized like:

- In the `<head>` section all CSS needed to style our application is loaded.
- Main DOM elements are placed in the `<body>`.
- At the end a `<script>` tag includes all the JavaScript code required by our app. This is responsible to add or remove new DOM elements (like modal windows, menus, ...), load data asynchronously, etc.

TODO - Talks about characteristics of this apps. We spent time loading and time to load initial data.


These kind of applications can be summarized as follows:

- The `index.html` (or whatever) file is loaded.
-

## JavaScript on the server side






[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org
[webpack]: https://webpack.github.io
