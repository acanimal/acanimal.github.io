---
layout: post
title: I'm working on ClydeIO
date: 2015-07-27 22:08
tags:
- clydeio
- nodejs
---

[ClydeIO][clydeio] is an open source API gateway and management layer based on [nodejs](https://nodejs.org/).

> The project is currently a proof of concept (I'm currently working to apply it in a real system) and most of the developed filters are basic implementation to demonstrate its usefulness.

## What is an API gateway and why I need one?

The most important part when designing and implementing an API is to model your business correctly and offer a set of well defined operations accordingly with them.

Unfortunately, that is only an small part of the job and it is not enough to ensure the success. As a real World system you require to secure your API, store logs, apply rate limits, etc. The task of publishing an API becomes much more complex than understanding your business, you have entered the world of security, monitoring and... the unknown !!!

An API gateway is a single point of entry responsible to apply actions (like security or logging) before redirecting the request to a private API. We can see the gateway as a kind/mix of firewall and proxy and is really useful implementing [microservices](http://microservices.io/patterns/apigateway.html).

**put figure**

Thanks to ClydeIO you can spend your efforts implementing your business API leaving the rest (security, rate limiting, monitoring, ...) to the gateway:

- Secure an existent API
- Log access to any resource
- Filter request (allow/deny) depending on the query parameters
- Rate limiting

The glory of [ClydeIO][clydeio] is its simplicity, its easy to extent with new filters and the fact you can use the myriad of awesome node packages out there on your filters.

## Why a new system instead contribute to an existent one?

I was looking for similar projects before start ClydeIO. There is plenty of [services](http://apievangelist.com/2014/10/05/taking-a-fresh-look-at-what-open-source-api-management-architecture-is-available/) that provides same functionalities (and many more) as well as many projects with a great maturity level, but no one satisfies my needs.

Services implies a cost for its usage that, sometimes, can be hard to calculate and in some cases requires you adapt your systems (your business API) to accommodate to the service requirements.

Other software projects means you must be comfortable with the technology they are implemented with, mainly its programming language and database used to store configuration and information.

One thing I saw in common in most of the software projects is the fact they do what they do, that is, they are prepared to make many things, do it well but are not allowed to extend the gateway easily with new requirements users can have. They are designed to make the most common things: rate limiting, security, logging, etc but it is hard to know how we can extend the gateway to send us an email when there was more than ten invalid accesses. In addition, I found some of them really complex to configure, based on monster XML configuration files.

Once last comment on why I created ClydeIO: to take advantage of the node modules.

There exists other API gateways implemented using NGINX server, lua, go or python language but nonetheless implemented with node. To be honest I must point here the [StrongLoop LoopBack API Gateway](https://strongloop.com/strongblog/open-source-node-js-api-gateway/) product.

## This is ClydeIO

dqwdqwd


[clydeio]: https://github.com/clydeio
