---
layout: post
title: Webpack, not another task runner tool
date: 2015-10-15 21:50
tags:
- webpack
- howto
- expressjs
- nodejs
---

It seems we are living an gold era about JavaScript and front end world with a myriad of frameworks, language improvements and, what is related to this article, build systems, tasks runner or whatever you want to call them.
We have adepts to [Grunt](http://gruntjs.com/), firm believers of [Gulp](http://gulpjs.com/) or purists preferring the use of old fashion [npm scripts](https://docs.npmjs.com/misc/scripts) way. Well, I'm sorry for all of you but there is a new kid on the block and it is (IMO) a really strong competitor. It's name is [webpack](http://webpack.github.io/) and it is a module bundler. OMG !!! A module what?

### What is webpack ?

Webpack is a module bundler. It has nothing to do with a tasks runner, although in many cases can substitute the need of gulp or grunt. Webpack understands about modules and its dependencies (among JavaScript files, CSS or whatever) and generates assets. Probably you don't understand the importance of the last sentence, so I repeat it again:

> Remember webpack understands about modules and its dependencies and is good to generate assets from it.

That is probably the main impact I see when developing with webpack. To get all its potential you need to change your mind from programming a set of JavaScript files, that finally and concatenated and minimized, to a set of modules, that exports variables and has dependencies among them.


### A brief presentation

Here I present a short slideshow I prepared to introduce webpack to my team. Any feedback will be appreciated.

<iframe src="//slides.com/acanimal/webpack/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

*You can also view at [slid.es](http://slides.com/acanimal/webpack#/)*

The two samples present in the slideshow are available at github at the [webpack-presentation](https://github.com/acanimal/webpack-presentation) repository.
