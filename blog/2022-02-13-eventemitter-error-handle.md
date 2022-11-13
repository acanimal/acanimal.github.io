---
layout: post
title: Managing errors when working with Eventemitter in async/await methods
date: 2022-02-13 10:05
excerpt_separator: <!--more-->
tags:
- tips
- node
- event
- listener
- eventemitter
- error
---

JavaScript is, by it's nature within the browser, an event driven programming language. Everything starts with an event, a page is loaded, a click on a button, etc.

In NodeJs we have also the possibility to build event-listener pattern with the [events](https://nodejs.org/api/events.html) module and in particular with the `EventEmitter` class.

<!--more-->

Thanks to `EventEmitter` we can use the event-lister pattern in the backend easily. For example, suppose a system that must send a confirmation email to the users when he/she updates his profile. The update logic will reside in our domain layer and we don't want to mess it up this layer with tasks related to send emails. With `EventEmitter` we can easily trigger a `USER_UPDATED` event and let a listener residing on another layer to make the dirty job of sending emails.



```javascript
const events = require("events");

const emitter = new events.EventEmitter({ captureRejections: true });

emitter.on("emit", async () => {
  console.log("listener A");
});

emitter.on("emit", async () => {
  // try {
  console.log("listener B");
  throw new Error("dummy");
  // } catch (e) {
  //   console.log("list B error", e);
  //   throw e;
  //   // emitter.emit("error", e);
  // }
});

emitter.on("emit", async () => {
  console.log("listener C");
});

emitter.on("error", (e) => {
  console.error("== managin error", e);
});

(async () => {
  try {
    emitter.emit("emit");
  } catch (error) {
    console.log("--- managed");
    console.error(error);
  }
})();
```


## References

- https://nodejs.dev/learn/the-nodejs-event-emitter
- https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm
- https://softwareengineering.stackexchange.com/questions/378748/whats-the-difference-between-observer-pattern-and-listeners
