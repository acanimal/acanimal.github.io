---
layout: post
title: I'm working on ClydeIO
date: "2015-09-08 22:08"
tags:
- clydeio
- nodejs
---

[ClydeIO][clydeio] is an open source API gateway and management layer based on [nodejs](https://nodejs.org/). It is extremely flexibly, configurable and simply to extend. It is designed to simplify the development of new APIs (or simply improving existing ones) adding authentication, logging, rate limiting, etc.

> Note, the project is currently a proof of concept (I'm currently working to apply it in a real system) and most of the developed filters are basic implementation to demonstrate its usefulness.

## What is an API gateway and why I need one?

The most important part when designing and implementing an API is to model your business correctly and offer a set of well defined operations accordingly with them.

Unfortunately, that is only an small part of the job and it is not enough to ensure the success. As a real World system you require to secure your API, store logs, apply rate limits, etc. The task of publishing an API becomes much more complex than understanding your business, you have entered the world of security, monitoring and... the unknown !!!

An API gateway is a single point of entry responsible to apply actions (like security or logging) before redirecting the request to your *real-do-the-job* API. We can see the gateway as a kind (or mix) of firewall and proxy and is really useful implementing [microservices](http://microservices.io/patterns/apigateway.html).

![ClydeIO]({{ site.url }}{{ site.baseurl }}assets/uploads/2015-09-clyde.png)

Thanks to [ClydeIO][clydeio] you can spend your efforts implementing your business API leaving the rest of things to the gateway. The glory of [ClydeIO][clydeio] is its simplicity and its easy to extent with new filters like:

- Secure an existent API
- Log access to any resource
- Rate limiting
- Filter request (allow/deny) depending on the query parameters
- Cache data
- or whatever you need

 Because it is based on node we can use the myriad of awesome node packages out there and integrate within your filters.

![Rquest flow]({{ site.url }}{{ site.baseurl }}assets/uploads/2015-09-clyde-dataflow.png)

## Why a new system instead contribute to an existent one?

I was looking for similar projects before start [ClydeIO][clydeio]. There is plenty of [services](http://apievangelist.com/2014/10/05/taking-a-fresh-look-at-what-open-source-api-management-architecture-is-available/) that provides same functionalities (and many more) as well as many projects with a great maturity level, but no one satisfies my needs.

Services implies a cost for its usage that, sometimes, can be hard to calculate and in some cases requires you adapt your systems (your business API) to accommodate to the service requirements.

Other software projects means you must be comfortable with the technology they are implemented with, mainly its programming language and database used to store configuration and information.

One thing I saw in common in most of the software projects is the fact they do what they do, that is, they are prepared to make many things, do it well but are not allowed to extend the gateway easily with new requirements users can have. They are designed to make the most common things: rate limiting, security, logging, etc but it is hard to know how we can extend the gateway to send us an email when there was more than ten invalid accesses. In addition, I found some of them really complex to configure, based on monster XML configuration files.

Once last comment on why I created [ClydeIO][clydeio]: to take advantage of the node modules.

There exists other API gateways implemented using NGINX server, lua, go or python language but nonetheless implemented with node. To be honest I must point here the [StrongLoop LoopBack API Gateway](https://strongloop.com/strongblog/open-source-node-js-api-gateway/) product.

## Current status

[ClydeIO][clydeio] is currently a proof of concept and I have implemented a bunch of filters to test its capabilities. Currently all configuration is provided via a JSON file. That's nice and simply but not much secure when working with authentication filters that needs specify users and passwords or with a real scenario that requires manage hundred of users.

Because of this I'm currently working hard trying to create the configuration module, responsible to manage the whole configuration, and designing to be easy to implement for different backends: memory, redis, mongodb, postgresql, ...

I have great feeling about [ClydeIO][clydeio]'s possibilities but to be honest it is currently a personal side project I write on my few free time. I have no contributors neither sponsors. So, if you arrive to this page and are interested in the project feel free to contact with me and start helping with your money or time :)

## Documentation

I have create the [ClydeIO](https://github.com/clydeio) github *organization* to host all the related projects related with ClydeIO.

We can differentiate among the core project, so called [clydeio](https://github.com/clydeio/clydeio) too and the rest of projects that are clyde's filters.

The current core project documentation can be found at the project's wiki: [https://github.com/clydeio/clydeio/wiki](https://github.com/clydeio/clydeio/wiki). It will probably change soon, once finished the configuration module, but the concepts remains the same.

## Contributions

As a said, for the moment this is a personal project I develop on my free time. So don't hesitate to contact with me for any kind of support and help.

[clydeio]: https://github.com/clydeio
