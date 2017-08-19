---
layout: post
title: 'PM2 to manage NodeJS cluster'
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

*TL;DR* The [cluster](https://nodejs.org/api/cluster.html) module allow us improve performance of our application in multicore CPU systems. This is specially important no matter if working on an APIs or an, i.e. ExpressJS based, web servers, what we desire is to take advantage of all the CPUs on each machine our NodeJS application is running.

<!--more-->

---
More on this series:

1. [Understanding the NodeJS cluster module]({{ site.baseurl }}{% post_url 2017-08-12-understanding-the-nodejs-cluster-module %})
2. [Using cluster module with HTTP servers]({{ site.baseurl }}{% post_url 2017-08-13-using-cluster-module-with-http-servers %})
3. **Using PM2 to manage a NodeJS cluster**
4. Graceful shutdown of a NodeJS cluster

## PM2

Workers are separated processes, they can be killed or re-spawned from the master process. More important, processes can be killed from command line or system can reboot and kill all the running processes.

NodeJS does not automatically manage the number of processes, it is responsibility of the application and, as we can imagine, there are many casuistics that can arise and we need to control.

For these reason have appeared different modules and tools to simlpify the lifecycle of worker processes. In my opinion the most active developed and complete solution is [PM2](https://github.com/Unitech/pm2).

https://keymetrics.io/2015/03/26/pm2-clustering-made-easy/

## Graceful shutdown

http://glynnbird.tumblr.com/post/54739664725/graceful-server-shutdown-with-nodejs-and-express
