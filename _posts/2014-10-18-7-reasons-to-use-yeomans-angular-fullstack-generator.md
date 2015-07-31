---
layout: post
title: 7 reasons to use Yeoman's angular-fullstack generator
date: 2014-10-18 12:17
tags:
- javascript
- angular
- mean
- yeoman
---
For my next project and, after looking for candidates and reading some hundreds of lines of documentation, I finally choose to work with the so called MEAN stack: mongodb, express, angular and node.

As with any other technology ecosystem, the great number of frameworks, libraries and tools can make our choice a challenge, and JavaScript is not an exception. But for JavaScript projects we have lot of help and I decide to use the awesome [Yeoman](http://yeoman.io/) tool. Yeoman combines the power of [grunt](http://gruntjs.com/), [bower](http://bower.io/), [npm](https://www.npmjs.org/) and adds its own salt: the generators.

> Yeoman generators are tasks responsible to build the initial project scaffolding.

Yeoman offers an extensive set of official generators oriented to create: webapps, backbone app, chrome extension, etc but we can also found a myriad of non official generators (yes, because anyone can create a new generator to satisfy his/her needs).

Within all the generators I chose [angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) to create my MEAN project structure and next are my reasons:

## 1. Easy to install

You require to have [node](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed on your system. Once you have them install[Yeoman](http://yeoman.io/) and the [angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) is as easy as:

<pre class="lang:sh decode:true">$ npm install -g yo
$ npm install -g generator-angular-fullstack</pre>

Once installed the generator you simply need to create a new folder and initialise your project:

{% highlight bash %}
> mkdir my-new-project && cd $_
> yo angular-fullstack [app-name]
{% endhighlight %}

## 2. Creates both client and server scaffoldings

The generator generates the _full stack_ of your project, both the client and server code. Your project will start well organised and prepared to create an awesome RIA application.

## 3. Introduces good practices in the generated code

Because the generated is made by experienced developers, they applies good practices in code organisation and style programming (like the environment configuration on the server side using node).

For me, this is one of the most important reasons to use this generator. Anybody knows starting with a new technology is always hard, but it is nothing when you start with four new technologies :)

## 4. Server side API prepared to use authentication

Following best practices the code is prepared so you can easily add security to you API via a node middleware so each request requires authentication of the client side.

## 5. Support HTML or jade templating on client side

You can use any template engine for client side but by default the generator works with HTML and Jade. I don't really like Jade too much so I always try to use EJS or similar (_Warning this last sentence is the author's opinion_).

## 6. Support for different CSS preprocessors

For different opinions there are different alternatives. This way [angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) has support for plain CSS, [Stylus](http://learnboost.github.io/stylus/), [Sass](http://sass-lang.com/) or [LESS](http://lesscss.org/) pre-processors. Choose your preferred.

## 7. Commands to scaffold anything

With the[angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) you can create new end points for the server side or client side components (like routes, controllers, services, filters, directives, ...) with a sentences. So, next command:

{% highlight bash %}
>yo angular-fullstack:endpoint message
[?] What will the url of your endpoint to be? /api/messages
{% endhighlight %}

will produce:

{% highlight bash %}
server/api/message/index.js
server/api/message/message.spec.js
server/api/message/message.controller.js
server/api/message/message.model.js  (optional)
server/api/message/message.socket.js (optional)
{% endhighlight %}

##  Conclusion

In my opinion, [angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) is a really powerful tool that simplifies our day to day work.

As always it is not the panacea, it is simply a generic tool to automatize many common tasks. Because of this we can found situations it lacks some feature.
