---
layout: post
title: 'Using cluster module with HTTP servers'
date: 2017-08-13 01:34
excerpt_separator: <!--more-->
tags:
- nodejs
- cluster
- express
- shutdown
- tip
---

*TL;DR* The [cluster](https://nodejs.org/api/cluster.html) module allow us improve performance of our application in multicore CPU systems. This is specially important no matter if working on an APIs or an, i.e. ExpressJS based, web servers, what we desire is to take advantage of all the CPUs on each machine our NodeJS application is running.

The cluster module allow us to load balance the incoming request among a set of worker processes and, because of this, improving the throughput of our application.

<!--more-->

In the previous post [Understanding the NodeJS cluster module]({{ site.baseurl }}{% post_url 2017-08-12-understanding-the-nodejs-cluster-module %}) I introduced the cluster module and show some basic usages of it to create worker processes and comunicate them with the master process. This post is specifically oriented to talk about using the cluster module and HTTP server, both using plain NodeJS http and with ExpressJS.

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

