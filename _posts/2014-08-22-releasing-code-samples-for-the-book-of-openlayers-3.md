---
layout: post
title: Releasing code samples for The Book of OpenLayers 3
date: 2014-08-22 23:05
tags:
- javascript
- openlayers
- book
---
Writing a book is hard, requires constance and motivation and, more important, be strong to keep them both. Least but not last you need time. Time to see the source code and learn. Time to see the examples and learn. Time to understand all the concepts and learn. Time to explain in your words what you have learnt.

Today, I announced the links where you can find the [online samples](http://acanimal.github.io/thebookofopenlayers3/) and [code repository](https://github.com/acanimal/thebookofopenlayers3) for [The book of OpenLayers3](https://leanpub.com/thebookofopenlayers3). **Code repository is open, so don't hesitate to download and contribute with new samples**.

The work is not complete, I need to finish the theory part of a chapter related to vector information and write two more chapters I have in mind and, of course, create some samples to see the theory in practice. I will write another post introducing the book with a more in depth chapter description. This post is only about the code samples. **Your feedback is really valuable for me !!!**

[![The book of OpenLayers3]({{ site.url }}{{ site.baseurl }}assets/uploads/thebookofopenlayers3-230x300.jpeg)](https://leanpub.com/thebookofopenlayers3)

## About the code samples

For those interested in contribute, the project for the code samples is built using the [Yeoman](http://yeoman.io/) tool, which combines [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/), and the generator for web application `generator-webapp`, which offers a project skeleton with a bunch of good practices.

In addition to the default plugins used by the generator, I made use of the Grunt's plugin `grunt-includes` (see [here](https://github.com/vanetix/grunt-includes)) that implement like PHP include directive. This way, I can create a page layout (with headers, footers, etc) reusable for all the pages. See the [`package.json`](https://github.com/acanimal/thebookofopenlayers3/blob/master/package.json) file for more details about plugins.

For the implementation I made use of the [Bootstrap](http://getbootstrap.com/) framework, the nice [Yeti](http://bootswatch.com/yeti/) theme from [Bootswatch](http://bootswatch.com) project and the [highlight.js](https://highlightjs.org/) project to highlight the samples code. See more details of project dependencies in the [`bower.json`](https://github.com/acanimal/thebookofopenlayers3/blob/master/bower.json) file.
