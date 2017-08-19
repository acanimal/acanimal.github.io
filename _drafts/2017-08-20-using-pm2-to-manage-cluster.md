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

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();  
}

function masterProcess() {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);

    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log(`Forking a new process...`);

    cluster.fork();
  });
}

function childProcess() {
  console.log(`Worker ${process.pid} started...`);

  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World');

    process.exit(1);
  }).listen(3000);
}
```

The worker process is a very simple HTTP server listening on port 3000 and programmed to return a `Hello World` and exit (to simulate a failure).

If we run the program with `$ node app.js` the output will show something like:

```bash
$ node app.js

Master 2398 is running
Forking process number 0...
Forking process number 1...
Worker 2399 started...
Worker 2400 started...
```

If we go to browser at URL `http://localhost:3000` we will get a `Hello World` and in the console see something like:

```bash
Worker 2400 died
Forking a new process...
Worker 2401 started...
```

That's very nice, now lets go to see how PM2 can simplify our application.

### The PM2 way

Before continue, you need to install PM2 on your system. Typically it is installed as a global module with `$ npm install pm2 -g` or `$ yarn global add pm2`.

When using PM2 we can forget the part of the code related with the master process, that will responsibility of PM2, so our very basic HTTP server can be rewriteen as:

```javascript
const http = require('http');

console.log(`Worker ${process.pid} started...`);

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello World');

  process.exit(1);
}).listen(3000);
```

Now run PM2 with `$ pm2 start app.js -i 3` and you will see an output similar to:

> Note the option `-i` that is used to indicate the number of instances to create. The idea is that number be the same as your number of CPU cores. If you don't know them you can set `-i 0` to leave PM2 detect it automatically.

```bash
$ pm2 start app.js -i 3

[PM2] Starting /Users/blablabla/some-project/app.js in cluster_mode (3 instances)
[PM2] Done.

| Name      | mode    | status | ↺ | cpu | memory    |
| ----------|---------|--------|---|-----|-----------|
| app       | cluster | online | 0 | 23% | 27.1 MB   |
| app       | cluster | online | 0 | 26% | 27.3 MB   |
| app       | cluster | online | 0 | 14% | 25.1 MB   |
```




https://keymetrics.io/2015/03/26/pm2-clustering-made-easy/

## Graceful shutdown

http://glynnbird.tumblr.com/post/54739664725/graceful-server-shutdown-with-nodejs-and-express
