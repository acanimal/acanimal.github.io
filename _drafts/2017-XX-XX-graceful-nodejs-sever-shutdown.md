---
layout: post
title: 'Graceful NodeJS server shutdown'
date: 2017-08-06 12:34
excerpt_separator: <!--more-->
tags:
- nodejs
- cluster
- express
- shutdown
- tip
---

*TL;DR* NodeJS processes runs on a single process, which means it does not take adavantage from multi-core systems by default. If you have an 8 core CPU and run a  NodeJS program via `$ node app.js` it will run in a single process, wasting the rest of CPUs.

Hopefully for us NodeJS offers the [cluster](https://nodejs.org/api/cluster.html) module that contains a set of functions and properties that help us to create programs that uses all the CPUs. Not a surprise the mechanism the cluster module uses to maximize the CPU usage was via forking processes, similar to the old [fork()](http://www.includehelp.com/c-programs/c-fork-function-linux-example.aspx) system call Unix systems.

<!--more-->


https://medium.freecodecamp.org/scaling-node-js-applications-8492bd8afadc


## Using cluster module with HTTP servers

https://stackoverflow.com/questions/9830741/how-does-the-cluster-module-work-in-node-js
http://onlinevillage.blogspot.com.es/2011/11/how-nodejs-multiprocess-load-balancing.html

## Balancing HTTP

Cluster module is really powerfull when we are creating a HTTP server, no matter if an API, an ExpressJS web site to return some web pages, what we want is nodejs to be 

https://medium.com/@fermads/node-js-process-load-balancing-comparing-cluster-iptables-and-nginx-6746aaf38272

## Cluster module and network connections

How does it works?


## PM2

https://keymetrics.io/2015/03/26/pm2-clustering-made-easy/

## Graceful shutdown

http://glynnbird.tumblr.com/post/54739664725/graceful-server-shutdown-with-nodejs-and-express

