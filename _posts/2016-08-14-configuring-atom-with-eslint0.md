---
layout: post
title: 'fetch API and Express sessions'
date: 2016-12-11 09:12
excerpt_separator: <!--more-->
tags:
- fetch
- express
- tip
---

*TL;DR* fetch API is the successor of XHR and although it's really powerful ( see [What is the difference between the Fetch API and XMLHttpRequest?](http://stackoverflow.com/questions/35549547/what-is-the-difference-between-the-fetch-api-and-xmlhttprequest)) you should take care of some things, like the fact you are responsible to determine if cookies must be sent to the server.

<!--more-->

This is not a tutorial on how to use the `fetch` API neither Express framework. This post is a short reminder on how to work with cookies in an Express application that uses fetch in the client side.

----

## My custom scenario

Before continue I'm going to describe my application scenario so you can be centered in the *problem* produced me a real headache.

* Client side application. The user access some URL which serves all the code of the application. From this point all the interaction happens in the client side. (It is a react+redux client side application without server side rendering).
* API. Client communicates with the same server that serves the HTML+CSS+JS page, invoking API endpoints for login, create resources, get list of resources, etc.
  * API implemented with Express+passport.
  * authentication based on sessions. Once the user is logged in a session is created which serves to authenticate next operations.

## fetch, cookies and the `credentials` property

Simply remember you must use the [credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) property to send cookies in your requests.

> The credentials read-only property of the Request interface indicates whether the user agent should send cookies from the other domain in the case of cross-origin requests. This is similar to XHR’s withCredentials flag.

The allowed values are:

* `omit`: Never send cookies. **Default value**.
* `same-origin`: Only send cookies if the URL is on the same origin as the calling script.
* `include`: Always send cookies, even for cross-origin calls.

So, **you must set the `credentials` property in all your client requests** so that any operation, a login, an operation that retrieves resources or creates a new resource, sends the cookie to the API and can be authenticated. In my case I choose `credentials: same-origin`.

*Note, if your API is in a different domain that the page that serves your client code you must use the [mode](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode) property too to indicate a CORS request.*

## Express, sessions and passport

On the server side, the API, we have configured Express to allow sessions and configured passport to store local authentication in sessions. It is important to remember initialize the passport session middleware after the express session one.

```javascript
import session from 'express-session';
import passport from 'passport';

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'supersecret',
  cookie: {
    httpOnly: false,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sessionOptions.proxy = true;
  sessionOptions.cookie.secure = true; // serve secure cookies
}
```

Lets describe the previous session configuration properties:

* `cookies`: this object contains configuration on how cookies must be handled in the session.
  * `secure`: Specified if `Set-Cookie` header will contains `Secure` flag. **Be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection.**
  * `httpOnly`: Specified if `Set-Cookie` header will contains `HttpOnly` flag. **Be careful when setting this to true, as compliant clients will not allow client-side JavaScript to see the cookie in document.cookie.**

This two `cookies` properties can become your worst enemy while developing because usually you do not work using HTTPS. So, take them into account.

## Final words

As always the process of developing is a cycle of *pain and ecstasy*, where pain is almost always produced by stupid or really subtle things that transform your productive day in a hell.

<iframe src="//giphy.com/embed/4TMqcN59kg3Yc" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/burning-dr-steve-brule-4TMqcN59kg3Yc">via GIPHY</a></p>
