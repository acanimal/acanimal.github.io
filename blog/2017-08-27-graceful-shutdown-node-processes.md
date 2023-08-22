---
layout: post
title: 'Graceful shutdown NodeJS HTTP server when using PM2'
date: 2017-08-27 12:10
excerpt_separator: <!--more-->
tags:
- nodejs
- cluster
- express
- pm2
- shutdown
- tip
---

So you have created a NodeJS server that receives tons of requests and you are really happy but, as every piece of software, you found a bug or add a new feature to it. It is clear you will need to shutdown your NodeJS process/es and restart again so that the new code takes place. The question is: **how can you do that in a graceful way that allows continue serving incoming requests?**

<!--more-->

---
More on this series:

1. [Understanding the NodeJS cluster module](/blog/20170812/understanding-the-nodejs-cluster-module)
2. [Using cluster module with HTTP servers](/blog/20170818/using-cluster-module-with-http-servers)
3. [Using PM2 to manage a NodeJS cluster](/blog/20170820/using-pm2-to-manage-cluster)
4. **Graceful shutdown NodeJS HTTP server when using PM2**

## Starting a HTTP server

Before see how we must shutdown a HTTP server lets see how usually create one. Next code shows a very basic code with an ExpressJS service that will return `Hello World !!!` when accessing the `/hello` path. You can also pass a path param, i.e. `/hello/John` with a name so it returns `Hello John !!!`.

```javascript
const express = require('express')

const expressApp = express()

// Responds with Hello World or optionally the name you pass as path param
expressApp.get('/hello/:name?', function (req, res) {
  const name = req.params.name

  if (name) {
    return res.send(`Hello ${name}!!!`)
  }

  return res.send('Hello World !!!')
})

// Start server
expressApp.listen(3000, function () {
  console.log('App listening on port 3000!')
})
```

What `app.listen()` function does is start a new HTTP server using the core `http` module and return a reference to the HTTP server object. In concrete, the source code of the `listen()` is as follows:

```javascript
app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

> NOTE: Another way to create an express server is pass our `expressApp` reference directly to the `http. createServer()`, something like: `const server = http.createServer(app).listen(3000)`.

## How to shutdown properly an HTTP server ?

The proper way to shutdown an HTTP server is to invoke the `server.close()` function, this will stop server from accepting new connections while keeps existing ones until response them.

Next code presents a new `/close` endpoint that once invoked will stop the HTTP server and exit the applications (stopping the nodejs process):

```javascript
app.get('/close', (req, res) => {
  console.log('Closing the server...')

  server.close(() => {
    console.log('--> Server call callback run !!')

    process.exit()
  })
})
```

It is clear shutting down a server through an endpoint is not the right way to it.

## Graceful shutdown/restart with and without PM2

The goal of a graceful shutdown is to close the incoming connections to a server without killing the current ones we are handling.

When using a process manager like PM2, we manage a cluster of processes each one acting as a HTTP server. The way PM2 achieves the graceful restart is:

- sending a `SIGNINT` signal to each worker process,
- the worker are responsible to catch the signal, cleanup or free any used resource and finish the its process,
- finally PM2 manager spawns a new process

Because this is done sequentially with our cluster processes customers must not be affected by the restart because there will always be some processes working and attending requests.

This is very useful when we deploy new code and want to restart our servers so the new changes take effect without risk for incoming requests. We can achieve this putting next code in out app:

```javascript
// Graceful shutdown
process.on('SIGINT', () => {
  const cleanUp = () => {
    // Clean up other resources like DB connections
  }

  console.log('Closing server...')

  server.close(() => {
    console.log('Server closed !!! ')

    cleanUp()
    process.exit()
  })

  // Force close server after 5secs
  setTimeout((e) => {
    console.log('Forcing server close !!!', e)

    cleanUp()
    process.exit(1)
  }, 5000)
})
```

When the `SINGINT` signal it catch we invoke the `server.close()` to avoid accepting more requests and once it is closed we clean up any resource used by our app, like close database connection, close opened files, etc invoking the `cleanUp()` function and, finally, we exits the process with `process.exit()`.  In addition, if for some reason our code spends too much time to close the server we force it running a very similar code within a `setTimeout()`.

## Conclusions

When creating a HTTP server, no matter if a web server to serve pages or an API, we need to take into account the fact it will be updated in time with new features and bug fixes, so we need to think in a way to minimize the impact on customers.

Running nodejs processes in cluster mode is a common way to improve our applications performance and we need to think on how to graceful shutdown all them to not affect incoming requests.

Terminating a node process with `process.exit()` is not enough when working with an HTTP server because it will terminate abruptly all the communications, we need to first stop accepting new connections, free any resource used by our application and, finally, stop the process.
