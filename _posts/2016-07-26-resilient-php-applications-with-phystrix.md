---
layout: post
title: Resilient PHP applications with Phystrix
date: 2016-07-06 19:32
tags:
- symfony
- phystrix
- resilience
---

> *TL;DR: This post talks about how to make our PHP applications more resilient, that is, they must be able to adapt to third party failures and recover quickly from them. You will see why configuring timeouts is not enough to protect your system and what better tools exists. We will explain briefly Hystrix concepts and introduce an alternative for PHP called Phystrix.*
>
> <iframe src="//slides.com/acanimal/resiliency-php-apps/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

No matter how well designed be your system, no matter the number, kind or quality of your tests. There is only once thing for sure: *your system will fail*. Although we can well design, implement and test our systems we have dependencies with third party services: databases, queues, call REST API on another systems, ...

<!--more-->

In the decade of [microservices](http://martinfowler.com/articles/microservices.html) where dependency/communication among systems becomes a main pilar we need mechanisms to make our systems resistant among third party failures. We need to [resilience](http://www.dictionary.com/browse/resilience), that is, recover quickly from disasters.

## The problem with dependencies

In the best case you can be sure your system will work fine but you can make the same assumption for the third party systems you communicate with (another microservices, databases, queues, ...).

So the problems arise when some third party services starts failing. This can be because of:

1. The system is near collapse, your requests arrives but they take too much time to be replied. This means each request that arrives to our system is hold until the third party service responds. Because the third party system works slowly we start holding too much connections which could collapse our system too. In addition, although the third party system is near collapse we continue sending requests, so we are not helping to mitigate the problem, we are increasing it. **Collapse of a third party service can collapse our system**.

2. The system is down. Many drivers tries to establish a connection during a given period of time before raising an exception. **Why to wait for a connection if we know the system is down?**

## The classic (and not the right) way to solve

The classic way and, a good practice, to mitigate this problem is to configure the timeouts for each library and driver you use to communicate to every third party service.

As example, [Guzzle](http://docs.guzzlephp.org/en/latest/) allows to set a `timeout` when instatiating a `Client`:

```php
$client = new Client([
    'base_uri' => 'http://microservice/api',
    'timeout'  => 2.0,
]);
```

Or the [SncRedisBundle](https://github.com/snc/SncRedisBundle/blob/master/Resources/doc/index.md) for Symfony allows to specify the timeout both for connection and read/write actions:

```yaml
snc_redis:
    clients:
        default:
            type: predis
            alias: default
            dsn: redis://localhost
            logging: %kernel.debug%
        cache:
            type: predis
            alias: cache
            dsn: redis://secret@localhost/1
            options:
                profile: 2.2
                connection_timeout: 10
                read_write_timeout: 30
```

As I said, setting timeouts is a good practice, but it not solves the problem. If the third party is down and we have a timeout of 2 seconds we guaranty our systems will finish the query in two seconds but, why send request and spend 2 seconds while we know the system is down?

## A robust solution

As we talk at the beginning, the goal is to make our system resilient, that is, it must be able to adapt to third party failures and recover quickly from them. This means:

- Do not call a third party if we know it is down or takes too much time to respond.
- Fail quickly. If our system receives a request and we can't complete due lack of support from a third party service, we can fail quickly. The client, although it will receive a bad response, will receive a response quickly and our system should be able to attend a new request. *You can see how this will avoid a cascade failure of our system*.

Hopefully, some years ago the Netflix engineers worked in a solution called [Hystrix](https://github.com/Netflix/Hystrix) which is so good that has become one of the most famous tools when working with microservices in Java.

> Hystrix is a latency and fault tolerance library designed to isolate points of access to remote systems, services and 3rd party libraries, stop cascading failure and enable resilience in complex distributed systems where failure is inevitable.

Hystrix implements the [circuit breaker](http://martinfowler.com/bliki/CircuitBreaker.html) pattern. Following the electrical circuits analogy, each dependency of our system to a third party service can be seen as a cable with an interruptor. While the communications with the third party works fine, the interruptor is closed (allowing flow the electricity), but when a problem is detected in the third party system (i.e due a timeout) the interruptor is opened making our system impossible to communicate with the third party, which makes our system fail quickly when a dependency fails.

## A robust solution for PHP

After looking some libraries I finally decide to use [Phystrix](https://github.com/odesk/phystrix), a Hystrix port to PHP made by [oDesk (now Upwork)](https://www.upwork.com).

Following Hystrix design, Phyxtrix requires all the actions we want to make against a third party service (querying a database, inserting into a queue, etc) must be encapsulated as a command (see the [command pattern](http://www.oodesign.com/command-pattern.html)). The library offers and abstract command class from we can inherit when creating our commands. It is up to us to implement the `run()` method responsible to make the real action (the call to a service, the insert into database, etc) and optionally the `getFallback()` method that returns a result if the third party is not available.

The good part is each time a command is executed, the base command class collects metrics (like the number of failed call to a third party) and is responsible to manage the circuit state (open or close) depending on the current metric values.

> Note Phystrix stores all the metric in APC, so you should have this extension enabled.

Additionally, the people from oDesk implemented two more tools:

- [phystrix-bundle](https://github.com/odesk/phystrix-bundle): A bundle for Symfony2 that can help us integrate Phystrix into our Symfony projects.
- [phystrix-dashboard](https://github.com/odesk/phystrix-dashboard): Some classes that helps creating an endpoint in our application to serve the metrics stores by Phystrix. This endpoint can be added to the [hystrix-dashboard](https://github.com/Netflix/Hystrix/wiki/Dashboard) tool to monitor our metrics in almost real time.

![hystrix-dashboard](https://raw.githubusercontent.com/wiki/Netflix/Hystrix/images/hystrix-dashboard-single-row.png)

## Conclusions

Our systems has dependencies to other systems we can't control. Setting timeouts in our connections is a good practice but it is not enough. Hystrix is a tool that implements the circuit breaker pattern, which can help our systems to be more resilient.

Phystrix is a Hystrix port for PHP. It is easy to integrate in our PHP applications and protect against latency, fault tolerance and cascade failures when working with third party systems.
