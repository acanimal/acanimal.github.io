---
layout: post
title: Resilience PHP applications with Phystrix
date: 2016-07-06 19:32
tags:
- symfony
- phystrix
- resilience
---

No matter how well designed be your system, no matter the number, kind or quality of your tests. There is only once thing for sure: *your system will fail*. Although we can well design, implement and test our systems we have dependencies with third party services: databases, queues, another systems, ...

In the decade of [microservices](http://martinfowler.com/articles/microservices.html) where dependency/communication among systems becomes a main pilar we need mechanisms to make our systems resistant among third party failures. We need to [resilience](http://www.dictionary.com/browse/resilience), that is, recover quickly from disasters.

## The problem with dependencies

In the best case you can be sure your system will work fine but you can make the same assumption for the third party systems you communicate with (another microservices, databases, queues, ...).

So the problems arise when some third party services starts failing. This can be because of:

1. The system is near collapse, your requests arrives but they take too much time to be replied. This means each request that arrives to our system is hold until the third party service responds. Because the third party system works slowly we start holding too much connections which could collapse our system too. In addition, although the third party system is near collapse we continue sending requests, so we are not helping to mitigate the problem, we are increasing it. **Collapse of a third party service can collapse our system**.

2. The system is down. Many drivers tries to establish a connection during a given period of time before raising an exception. **Why to wait for a connection if we know the system is down?**

## The classic (and bad way)

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

As I said, setting timeouts is a good practice, but this not resolves the problem. If the third party is down and we have a timeout of 2 seconds we guaranty our systems will finish the query in two seconds but, why send request and spend 2 seconds while we know the system is down?

## A solution

The goal is to make our system resilient, that is, it must adapt to third party failures and recover quickly from them.

TALK ABOUT NETFLIX OSS AND HYSTRIX.


<iframe src="//slides.com/acanimal/resiliency-php-apps/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
