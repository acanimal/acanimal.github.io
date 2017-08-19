---
layout: post
title: 'Using PM2 to manage NodeJS cluster'
date: 2017-08-20 01:34
excerpt_separator: <!--more-->
tags:
- nodejs
- cluster
- express
- pm2
- shutdown
- tip
---

The cluster module allows us to create worker processes to improve our NodeJS applications performance. This is specially important in web applications, where a master process receives all the requests and load balances them among the worker processes.

But all this power comes with the cost that must be the application who manages all the complexity associated with process managements: what happens if a worker process exists unexpectly, how exit gracefully the worker processes, what if you need to restart all your workers, etc.

In this post we present [PM2](http://pm2.keymetrics.io) tool. although it is a general process manager, that means it can manage any kind of process like python, ruby, ... and not only NodeJS processes, the tool is specially designed to manage NodeJS applications that want to work with the cluster module.

<!--more-->

---
More on this series:

1. [Understanding the NodeJS cluster module]({{ site.baseurl }}{% post_url 2017-08-12-understanding-the-nodejs-cluster-module %})
2. [Using cluster module with HTTP servers]({{ site.baseurl }}{% post_url 2017-08-13-using-cluster-module-with-http-servers %})
3. **Using PM2 to manage a NodeJS cluster**
4. Graceful shutdown of a NodeJS cluster
---

## Introducing PM2

As said previously, PM2 is a general process manager, that is, a program that controls the execution of other process (like a python program that check if you have new emails) and does things like: check your process is running, re-execute your process if for some reason it exits unexpectly, log its output, etc.

The most important thing for us is PM2 simplifies the execution of NodeJS applications to run as a cluster. Yes, you write your application without worrying about cluster module and is PM2 who creates a given number of worker processes to run your application.

### The hard part of cluster module

Lets see an example where we create a very basic HTTP server using the cluster module. The master process will spawn as many workers as CPUs and will take care if any of the workers exists to spawn a new worker.





### The PM2 way




https://keymetrics.io/2015/03/26/pm2-clustering-made-easy/

## Graceful shutdown

http://glynnbird.tumblr.com/post/54739664725/graceful-server-shutdown-with-nodejs-and-express
