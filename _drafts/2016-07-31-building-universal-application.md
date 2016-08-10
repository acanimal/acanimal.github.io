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

RIA have meant a significant step in the context of web based applications. I remember when GMail appears and how its UX was much better than other competitors. In GMail the app was loaded once and any change or data loading was handled asynchronously, without the need to reload the page. This is, probably, the most important fact about RIA apps, their similarity with native applications.

But real life always teach us something and the truth is RIA apps has a problem. Lets examine what the flow of a RIA app:

- First you need to access to an URL and wait until the app is loaded.
- Then, the app requested some data asynchronously and user must wait until it is loaded and added to the page.

As you can see, with this flow **the user needs to wait double of time to get some initial content** of the app.

*Time ago, with the apparition of HTML5 many companies changed from developing native mobile apps to develop [hybrid apps](http://developer.telerik.com/featured/what-is-a-hybrid-mobile-app/). They quickly found users do not like to wait much time until get some content. See [How Loading Time Affects Your Bottom Line](https://blog.kissmetrics.com/loading-time/).*


## JavaScript on the server side

There are some alternatives to run JavaScript on the server side, but the one that has beat all them has been the NodeJS project.

Based on Google [V8 JavaScript Engine](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) NodeJS allows to run JavaScript code on the server side. Because of the nature of JavaScript it is extremely easy to create asynchronous event-driven applications, which are easier to develop than the traditional concurrent applications.

Working with JavaScript at serve side is similar to work with any other language and technologies:

- clients makes a request to the server,
- the server process incoming data, computes or queries any needed values, constructs an HTML page as response and returns to the client.
- the client interprets the returned HTML page, loading any included image, CSS or JavaScript script.

This is, for example, the way to work of ancient email clients where each action (click in a link or button) implied a call to a different URL on the server and the user must to wait until server resolves the new HTML code and returns it to the browser.

### Pros and cons of server side applications

Time has passed and everybody can think on server side applications as a bad option to develop a web app, because of the need of waiting for a server response on each client action.

That's right, but the truth is server side applications are great in one aspect: **they can return pages with content**, that is, when you request some URL you get the page with the content you expect.

This fact is what makes important server side processing when building universal apps. We need to speed up the app and improve the UX returning as much content as possible when user access some URL.

## Universal applications

An universal app is a mix between client side and server side app. The idea is the first time we access a website the server responds with all the code and content user expects, for example, in an e-commerce site the first access could include the initial twenty items and later let the user continue loading more asynchronously.

This behavior is something we can achieve with almost any language and technologies. For example, we could have a Tomcat server using Java+JSP that returns the initial HTML code include some JavaScript bundle with the code needed to work the app in the client side. That might work, but that's not an universal application.

**To be an universal app our application must use the same code both on client and server side to render the application components**. That means that, following the previous example of an e-commerce site, when accessing the first time the code used by the server to request items to the API and render them (convert to DOM elements) must be the same code used by the client when user want to load more items. This way, the JavaScript code of our app is *universal* because can run everywhere.


### The execution flow

Ok, I have described how universal apps works but a picture is worth a thousand words.

![Universal/Isomorphic flow]({{ site.url }}{{ site.baseurl }}assets/uploads/2016-08_universal_js.png)

1. **Request**: The browser requests the server. This is the initial and main request because tt is responsible to return a web page that points to the bundles with the JavaScript and CSS code, besides with as much content as possible (included as DOM elements in the page) for the request made by the user.

2. **Process and render**: The server handles the request. The server must retrieve the route the user is requesting for (main page, about section, item detail, ...), must query for the needed data to render the HTML page elements.

3. **Response**: The server returns the previously built HTML page to the client. The client loads the images included in the document along the CSS and JavaScript files.

4. **Interaction**: The client has all the needed code to work as a RIA application. The initial content of the page has been rendered by the server, bringing better UX to the user, and from now the app is responsible to request new content asynchronously, without the need to reload the web page.

Remember the code you made must works both on client and server side, some examples are:

- Code needed to get the current route and render the right section. Given an app with three tabs: *main*, *help* and *about*, if we can write the absolute URL to the *about* section in the browser we expect to get the app with the *about* section enabled. Later, once the app is loaded in the browser, if we change to the *help* section the components must change. In both cases the code that detects the visited route and renders the page elements must be the same.

- Code needed to retrieve data. Because data can be retrieved by the server but also from the client once the app is loaded in the browser, the code you use to get data must work in the two sides. Because of this, usually, universal apps requests data to an API server.

## Conclusions

An universal app must comply one requirement: code must be the same both for the client and the server. Currently this only can be achieved using JavaScript.

To improve UX the first time we access the server to load the app, the HTML should contain all the expected DOM elements of the page. This way we reduce the time user must wait until have the first content of the page.

The JavaScript code must be *compatible* to run on the server and client. For example, you can't access directly to a database to retrieve some data because that code will not work in the client side.

Great !! Now you know the basis of how universal applications works. From here, there is a long, but awesome, way until implement a real application.


[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org
[webpack]: https://webpack.github.io
