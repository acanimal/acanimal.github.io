---
layout: post
title: 'Understanding the NodeJS cluster module'
date: 2017-08-12 12:34
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

---
More on this series:

1. **Understanding the NodeJS cluster module**
2. [Using cluster module with HTTP servers]({{ site.baseurl }}{% post_url 2017-08-13-using-cluster-module-with-http-servers %})
3. Using PM2 to manage a NodeJS cluster
4. Graceful shutdown of a NodeJS cluster

## Introducing the cluster module

The cluster module is a NodeJS module that contains a set of functions and properties that help us forking processes to take advantage of multi-core systems. It is propably the first level of scalability you must take care in your node application, specifally if you are working in a HTTP server application, before going to a higher scalability levels (I mean scaling vertically and horizontally in different machines).

With the cluster module a *parent/master* process can be forked in any number of *child/worker* processes and communicate with them sending messages via [IPC](https://en.wikipedia.org/wiki/Inter-process_communication) communication. **Remember there is no shared memory among processes.**

Next lines are a compilation of sentences from the NodeJS documentation I have taken the liberty to copy&pasta to put it in a way I think can help you understand thw whole thing in a few lines.

> A single instance of Node.js runs in a single thread. To take advantage of multi-core systems the user will sometimes want to launch a cluster of Node.js processes to handle the load.
>
> The cluster module allows easy creation of child processes that all share server ports.
>
> The worker (child) processes are spawned using the `child_proces.fork()` method, so that they can communicate with the parent via IPC and pass server handles back and forth. The `child_process.fork()` method is a special case of `child_process.spawn()` used specifically to spawn new Node.js processes. Like `child_process.spawn()`, a `ChildProcess` object is returned. The returned `ChildProcess` will have an additional communication channel built-in that allows messages to be passed back and forth between the parent and child, through the `send()` method. See `subprocess.sen()` for details.
>
> It is important to keep in mind that spawned Node.js child processes are independent of the parent with exception of the IPC communication channel that is established between the two. Each process has its own memory, with their own V8 instances. Because of the additional resource allocations required, spawning a large number of child Node.js processes is not recommended.

So, most of the magic is done by the [child_process](https://nodejs.org/api/child_process.html) module, which is resposible to spawn new process and help communicate among them, for example, creating pipes. You can find a great article at [Node.js Child Processes: Everything you need to know](https://medium.freecodecamp.org/node-js-child-processes-everything-you-need-to-know-e69498fe970a).

## A basic example

Stop talking and lets see a real exampe. Next we show a very basic code that:

- Creates a master process that retrives the number of CPUs and forks a worker process for each CPU, and
- Each child process prints a message in console and exit.

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

Note, we explicitly terminate the master and worker processes with `process.exit()`, which by default return value of zero. 

> NOTE: NodeJS also offers the [Child Processes](https://nodejs.org/api/child_process.html) module that simplifies the creation and comunication with other processes. For example we can spawn the `ls -l` terminal command and pipe with another process that handles the results.

## Comunicating master and worker processes

When a worker process is created, an IPC channel is created among the worker and the master, allowing us to communicated between them with the `send()` method, which accepts a JavaScript object as parameter. Remember they are different processes (not threads) so we can't use shared memory as a way of communcation.

From the master process, we can send a message to a worker process using the process reference, i.e. `someChild.send({ ... })`, and within the worker process we can messages to the master simply using the current `process` reference, i.e. `process.send()`.

We have updated slighly the previous code to allow master send and receive messages from/to the workers and also the workers receive and send messages from the master process:

```javascript
function childProcess() {
  console.log(`Worker ${process.pid} started`);

  process.on('message', function(message) {
    console.log(`Worker ${process.pid} recevies message '${JSON.stringify(message)}'`);
  });

  console.log(`Worker ${process.pid} sends message to master...`);
  process.send({ msg: `Message from worker ${process.pid}` });

  console.log(`Worker ${process.pid} finished`);
}
```

The worker process is simply to understand. First we listen for the `message` event registering a listener with the `process.on('message', handler)` method. Later we send a messages with `process.send({...})`. Note the message is a plain JavaScript object.

```javascript
let workers = [];

function masterProcess() {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);

    const worker = cluster.fork();
    workers.push(worker);

    // Listen for messages from worker
    worker.on('message', function(message) {
      console.log(`Master ${process.pid} recevies message '${JSON.stringify(message)}' from worker ${worker.process.pid}`);
    });
  }

  // Send message to the workers
  workers.forEach(function(worker) {
    console.log(`Master ${process.pid} sends message to worker ${worker.process.pid}...`);
    worker.send({ msg: `Message from master ${process.pid}` });    
  }, this);
}
```

The `masterProcess` function has been divided in two parts. In the first loop we fork as much workers as CPUs we have. The `cluster.fork()` returns a `worker` object representing the worker process, we store the reference in an array and register a listener to receive messages that comes from that worker instance.

Later, we loop over the array of workers and send a message from the master process to that concrete worker.

If you run the code the output will be something like:

```bash
$ node app.js

Master 4045 is running
Forking process number 0...
Forking process number 1...
Master 4045 sends message to worker 4046...
Master 4045 sends message to worker 4047...
Worker 4047 started
Worker 4047 sends message to master...
Worker 4047 finished
Master 4045 recevies message '{"msg":"Message from worker 4047"}' from worker 4047
Worker 4047 recevies message '{"msg":"Message from master 4045"}'
Worker 4046 started
Worker 4046 sends message to master...
Worker 4046 finished
Master 4045 recevies message '{"msg":"Message from worker 4046"}' from worker 4046
Worker 4046 recevies message '{"msg":"Message from master 4045"}'
```

Here we are not terminating the process with `process.exit()` so to close the application you need to use `ctrl+c`.

## Conclusion

The [cluster module](https://nodejs.org/api/cluster.html) offers to NodeJS the needed capabilities to use the whole power of a CPU. Although not seen in this post, the cluster module is complemented with the [child process](https://nodejs.org/api/child_process.html) module that offers plenty of tools to work with processes: start, stop and pipe input/out, etc.

Cluster module allow us to easily create worker processes. In addition it **magically** creates an IPC channel to communicate the master and worker process passing JavaScript objects.

In my next post I will show how important is the cluster module when working in an HTTP server, no matter if an API or web server working with ExpressJS. The cluster module can increase performance of our application having as many worker processes as CPUs cores.
