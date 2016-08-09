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
- web
- application
---

In this article series I'm going to describe: What is an universal (previously called isomorphic) web application? Why are them important? What benefits offers a universal web apps? and How to create a boilerplate to start a universal app project. Note, JavaScript ecosystem is incredible bast and, because we can create an universal web app with almost any combination of framework and libraries, we will use in this series [React][react], [Redux][redux] and [Webpack][webpack].

<!--more-->

## TOC

- Concepts

---

The web is evolving faster than ever, mainly by the evolution and improvements of the JavaScript language. Besides, NodeJS project has made possible to use JavaScript on the server side demonstrating JS is a *first class language* as good -or bad- like Java, PHP or Python. But, in contrast to them, the fact that we can use JS both for server and client side, converts JS in a really special language, which brings us possibility to create what are called *universal applications* (previously known as *isomorphic applications*).


## JavaScript on the client side

The use of JavaScript in the browser was the initial reason to exists for the language. Its use has evolve from having a couple of lines to validate some input text to really complex applications. Nowadays everybody uses some [RIA](https://en.wikipedia.org/wiki/Rich_Internet_application) application for email, social networks, photo sharing, etc.

As a summary, RIA works as follows:

- The browser loads a HTML file. This file is usually organized in like:

  - The `<head>` section of the HTML contains all needed CSS code required to style the DOM elements of our application.
  - The `<body>` tag contains almost no DOM elements (*these elements are dynamically generated be JS code*).
  - At the end a `<script>` tag includes all the JavaScript code required by our app.

- At this point the client, the browser, contains all the required code to work. The JavaScript loaded in the `<script>` tag is responsible to add or remove new DOM elements (like modal windows, menus, list items, ...), load data asynchronously from the server, authenticate, etc.

### Pros and cons of RIA applications

RIA have meant a significant step in the context of web based applications. I remember when GMail appears and how its UX was better than other competitors. In GMail the app was loaded once and any change or data loading was handled asynchronously, without the need to reload the page.

This is probably the most important fact about RIA apps, the similarity with native applications.

But real life always teach us something and the truth is RIA apps has a problem. Lets examine how a RIA works:

- First you need to access to an URL and load the app.
- Second, once the app is loaded, the content is requested asynchronously and added to the page.

As you can see, with this flow **the user needs to wait double of time to get some initial content** of the app.


## JavaScript on the server side

There are some alternatives to run JavaScript on the server side, but the one that has beat all them has been the NodeJS project.

Based on Google [V8 JavaScript Engine](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) NodeJS allows to run JavaScript code on the server side. Because of the nature of JavaScript it is extremely easy to create asynchronous event-driven applications, which are easier to develop than the traditional concurrent applications.

Working with JavaScript at serve side is similar to any other language and technologies:

- clients makes request to the server,
- the server process incoming data, computes or queries any needed values, constructs an HTML page as response and returns to the client.
- the client interprets the returned HTML page, loading any included image, CSS or JavaScript script.

This is, for example, the way to work of ancient email clients where each action (click in a link or button) implied a call to a different URL on the server and the user must to wait until server resolves the new HTML code and returns it to the browser.

### Pros and cons of server side applications

Time has pass and everybody can think on server side applications has a bad option, because of the need of waiting for a server response on each client action.

That's right, but the truth is server side applications was great in one aspect: **the always return pages with content**, that is, when you request some URL you always get the page with the content you expect.

This fact is what makes necessary server side processing when building universal apps. We need to speed up the app and improve the UX returning as much content as possible when user access some URL.




## The big picture: universal app execution flow

Next picture summarizes how universal apps works:

![Universal/Isomorphic flow]({{ site.url }}{{ site.baseurl }}assets/uploads/2016-08_universal_js.png)

**TODO Describe...**


[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org
[webpack]: https://webpack.github.io
