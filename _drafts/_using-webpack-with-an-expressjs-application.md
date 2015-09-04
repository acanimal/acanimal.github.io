---
layout: post
title: Using webpack with an ExpressJS application
date: 2015-07-27 22:08
tags:
- webpack
- howto
- expressjs
- nodejs
---

Seems we are living an interesting time about build systems, tasks runner or whatever you want to call them.
We have adepts to [Grunt](http://gruntjs.com/), firm believers of [Gulp](http://gulpjs.com/), purists preferring use [npm scripts](https://docs.npmjs.com/misc/scripts) in the old way.

Well, I'm sorry but there is a new kid on the block and it is (IMO) a really strong competitor. It's name is [webpack](http://webpack.github.io/) and it is a module bundler. OMG !!! a module what?

## What is webpack ?

Webpack is a module bundler. It is not a build system or a tasks runner. It understands about modules, dependencies and generate assets. That means in many cases can substitute the need of grunt or gulp in your projects.
