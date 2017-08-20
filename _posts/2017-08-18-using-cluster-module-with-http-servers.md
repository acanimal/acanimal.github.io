---
layout: post
title: 'Using cluster module with HTTP servers'
date: 2017-08-18 19:18
excerpt_separator: <!--more-->
tags:
- nodejs
- cluster
- express
- shutdown
- tip
---

The [cluster](https://nodejs.org/api/cluster.html) module allow us improve performance of our application in multicore CPU systems. This is specially important no matter if working on an APIs or an, i.e. ExpressJS based, web servers, what we desire is to take advantage of all the CPUs on each machine our NodeJS application is running.

The cluster module allow us to load balance the incoming request among a set of worker processes and, because of this, improving the throughput of our application.

In the previous post [Understanding the NodeJS cluster module]({{ site.baseurl }}{% post_url 2017-08-12-understanding-the-nodejs-cluster-module %}) I introduced the cluster module and show some basic usages of it to create worker processes and comunicate them with the master process. In this post we are going to see how to use the cluster module when creating HTTP servers, both using plain [HTTP](https://nodejs.org/api/http.html) module and with ExpressJS.

<!--more-->

---
More on this series:

1. [Understanding the NodeJS cluster module]({{ site.baseurl }}{% post_url 2017-08-12-understanding-the-nodejs-cluster-module %})
2. **Using cluster module with HTTP servers**
3. [Using PM2 to manage a NodeJS cluster]({{ site.baseurl }}{% post_url 2017-08-20-using-pm2-to-manage-cluster %})
4. Graceful shutdown of a NodeJS cluster


## Using cluster module with HTTP servers

Lets go to see how we can create a really basic HTTP server that takes profit of the cluster module.

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
}

function childProcess() {
  console.log(`Worker ${process.pid} started...`);

  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World');
  }).listen(3000);
}
```

We have diveded the code in two parts, the one corresponding to the master process and the one where we initialize the worker processes. This way the `masterProcess` function forks a worker process per CPU code. On the other hand the `childProcess` simply creates an HTTP server listenen on port 3000 and returning a nice `Hello World` text string with a 200 status code.

If you run the code the output must show something like:

```bash
$ node app.js

Master 1859 is running
Forking process number 0...
Forking process number 1...
Forking process number 2...
Forking process number 3...
Worker 1860 started...
Worker 1862 started...
Worker 1863 started...
Worker 1861 started...
```

Basically our initial process (the master) is spawing a new worker process per CPU that runs an HTTP server that handle requests. As you can see this can improve a lot your server performance because it is not the same having one processing attending one million of requests than having four processes attending one millun requests.

## How cluster module works with network connections ?

The previous example is simple but hides something tricky, some *magic* NodeJS make to simplify our live as developer.

In any OS a process can use a port to communicate with other systems and, that means, the given port can only be used by that process. So, the question is, **how can the forked worker processes use the same port?**

The answer, the simplified answer, is the master process is the one who listens in the given port and load balances the requests among all the child/worker processes. From the offical documentation:

> The worker processes are spawned using the child_process.fork() method, so that they can communicate with the parent via IPC and pass server handles back and forth.
>
> The cluster module supports two methods of distributing incoming connections.
>
> * The first one (and the default one on all platforms except Windows), is the round-robin approach, where the master process listens on a port, accepts new connections and distributes them across the workers in a round-robin fashion, with some built-in smarts to avoid overloading a worker process.
>
> * The second approach is where the master process creates the listen socket and sends it to interested workers. The workers then accept incoming connections directly.
>
> **As long as there are some workers still alive, the server will continue to accept connections. If no workers are alive, existing connections will be dropped and new connections will be refused.**

## Other alternatives to cluster module load balancing

Cluster module allow the master process to receive request and load balance it among all the worker processes. This is a way to improve performance but it is not the only one.

In the post [Node.js process load balance performance: comparing cluster module, iptables and Nginx](https://medium.com/@fermads/node-js-process-load-balancing-comparing-cluster-iptables-and-nginx-6746aaf38272) you can find a performance comparison among: node cluster module, iptables and nginx reverse proxy.

## Conclusions

Nowadays performance is mandatory on any web applications, we need to support high throughput and serve data fast.

The cluster module is one possible solution, it allows us to have one master process and create a worker processes for each core, so that they run an HTTP server. The cluster module offers two great features:

* simplifies communication among master and workers, by creating an IPC channel and allowing send messages with `process.send()`,
* allow worker processes share the same port. This is done making the master process the one which receives requests and multiplexe them among workers.
