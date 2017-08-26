---
layout: post
title: 'Graceful shutdown ExpressJS server when using PM2'
date: 2017-08-30 12:34
excerpt_separator: <!--more-->
tags:
- nodejs
- cluster
- express
- pm2
- shutdown
- tip
---

So you have created a NodeJS server that receives tons of requests and you are really happy but, as every piece of software, you found a bug or add a new feature to it. It is clear you will need to shutdown your NodeJS process/es and restart again so that the new code takes place. The question is: how can you do that in a graceful way that allows continue serving incoming requests?

<!--more-->

## How to shutdown properly an ExpressJS server ?

Lets start talking about how we should shutdown an ExpressJS based server.

---
More on this series:

1. [Understanding the NodeJS cluster module]({{ site.baseurl }}{% post_url 2017-08-12-understanding-the-nodejs-cluster-module %})
2. [Using cluster module with HTTP servers]({{ site.baseurl }}{% post_url 2017-08-18-using-cluster-module-with-http-servers %})
3. [Using PM2 to manage a NodeJS cluster]({{ site.baseurl }}{% post_url 2017-08-20-using-pm2-to-manage-cluster %})
4. **Graceful shutdown ExpressJS server when using PM2**



## Graceful shutdown

http://glynnbird.tumblr.com/post/54739664725/graceful-server-shutdown-with-nodejs-and-express
