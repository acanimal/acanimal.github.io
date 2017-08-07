---
layout: post
title: 'Graceful NodeJS server shutdown'
date: 2017-08-06 12:34
excerpt_separator: <!--more-->
tags:
- nodejs
- express
- shutdown
- tip
---

*TL;DR* NodeJS processes runs on a single process, which means it does not take adavantage from multi-core systems by default. If you have an 8 core CPU and run a  NodeJS program via `$ node app.js` it will run in a single process, wasting the rest of CPUs.

Hopefully for us NodeJS offers the [cluster](https://nodejs.org/api/cluster.html) module that contains a set of functions and properties that help us to create programs that uses all the CPUs. Not a surprise the mechanism the cluster module uses to maximize the CPU usage was via forking processes, similar to the old [fork()](http://www.includehelp.com/c-programs/c-fork-function-linux-example.aspx) system call Unix systems.

<!--more-->

