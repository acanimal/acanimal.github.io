---
layout: post
title: 'Understanding the NodeJS cluster module'
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

## Introducing the cluster module

The cluster module is a NodeJS module that contains a set of functions and properties that help us forking processes to take advantage of multi-core systems. It is propably the first level of scalability you must take care in your node application, before going to a higher scalability levels (I mean scaling vertically and horizontally in different machines).

With the cluster module a *parent/master* process can be forked in any number of *child/worker* processes and communicate them sending messages via [IPC](https://en.wikipedia.org/wiki/Inter-process_communication) communication. **Remember there is no shared memory among processes.**

Next we show a very basic code that:

- Creates a master process that:
  - Retrives the number of CPUs
  - Forks the process for each CPU
- Child processes prints a message in console and exit.

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

  process.exit();
}

function childProcess() {
  console.log(`Worker ${process.pid} started and finished`);

  process.exit();
}
```

Save the code in `app.js` file and run executing: `$ node app.js`. The output should be something similar to:

```bash
$ node app.js

Master 8463 is running
Forking process number 0...
Forking process number 1...
Forking process number 2...
Forking process number 3...
Worker 8464 started and finished
Worker 8465 started and finished
Worker 8467 started and finished
Worker 8466 started and finished
```

### Code explanation

When we run the `app.js` program an OS process is created that starts running our code. At the beginning the cluster mode is imported `const cluster = require('cluster')` and in the `if` sentence we check if the `isMaster` property.

Because the process is the *first* process the `isMaster` property is `true` and then we run the code of `masterProcess` function. This function has not much secret, it loops depending on the number of CPUs of your machine and forks the current process using the `cluster.fork()` method.

What the `fork()` really does is to create a new node process, like if you run it via command line with `$node app.js`, that is you have many processes running your `app.js` program.

When a child process is created and executed, it does the same as the master, that is, imports the cluster module and executes the `if` statement. Once of the differences is for the child process the value of `cluster.isMaster` is `false`, so they ends running the `childProcess` function.

> NOTE: We explicitly terminate the master and worker processes with `process.exit()`, which by default return value of zero. 


> NOTE: NodeJS also offers the [Child Processes](https://nodejs.org/api/child_process.html) module which 

## What happens with TCP/IP connections ?