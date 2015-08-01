---
layout: post
title: The mystery of no flash session variables in Express + Passport auth
date: 2015-03-30 21:09
tags:
- nodejs
- tricks
---

Recently I started an application using [NodeJS](https://nodejs.org/) with [ExpressJS](http://expressjs.com/) framework and decided to use [passport](http://passportjs.org/) for authenticate the users. As many other times I wanted to use flash messages so, when user authentication fails, the application shows a message informing about bad credentials. Nothing new on the horizon until.... OMG !!! I can't see the flash messages !!!

> Disclaimer: This is a really stupid history with me as starring.

I like to learn from my errors and because of this I decide to write this post both as a punishment and to ensure I don't forget it again.

### The crime scene

I was working implementing a sign up process, where the user writes its credentials and system creates as a new user or returns an error message like "Sorry, but a username with that email exists" or similar.

Before introduce any code, the flow is as follows:

*   User access the `/signup` page via GET method.
*   Data is sent to `/signup` resource via POST method, which is responsible to:
    *   Check if data is fine, create a new user and redirected to the `/profile` page.
    *   If a user with the same email exists we redirect again to the `/signup` page (that is, using the GET method) with a flash message related to bad credentials.

> Note: A flash message is a variable stored within a session that is only available once, for the next request. That is if we put a flash variable and renders a page, the flash variable is available but if we render the same (or other) page again the flash variable is not present (it is destroyed).

The approximate code for the previous flow is as follows. First, the next code is responsible to receive the post data and register the user:

{% highlight javascript %}
// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));</pre>

The authentication is delegated to passport, which is implemented as:

<pre class="lang:js decode:true">passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) {
    process.nextTick(function() {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'email' :  email }, function(err, user) {
          // if there are any errors, return the error
          if (err) {
            return done(err);
          }
          // check to see if theres already a user with that email
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
            // if there is no user with that email
            // create the user
            var user = new User();
            user.local.email    = email;
            user.local.password = user.generateHash(password);
            user.save(function(err) {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          }
      });
    });
}));
{% endhighlight %}

As you can see, if the user exists we add a flash session message with: `req.flash('signupMessage', 'That email is already taken.'));`.

On the other side, we show the signup form each time user access to the `/signup` resource via GET method:

{% highlight javascript %}
router.get('/signup', function(req, res) {
  res.render('signup',  { message: req.flash('signupMessage') });
});
{% endhighlight %}

Here we are rendering the `signup` template passing a message with the value of the signupMessage message. This way if user is redirected to the form, because the signup process fails (that is, the access to the `/signup` resource via POST), then the error message is shown.

### The mystery

The problem was I never get a value for the flash variable. What? Yes, I never get a value for the flash variable.

There was no error, I can't set and (in the same method) get the flash value, but I can't get value any value among different resources, that is, between GET `/signup` and POST `/signup`.

### The solution

After too much time (too many to be recognised publicly) I found my problem was with the way I initialise my sessions. What ? Yes, I said it was my fault due the way I initialise the session. This I did it:

{% highlight javascript %}
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
{% endhighlight %}

Can you see the problem? Here goes a clue, think I was working with a `dev` profile, that is, in my local machine accessing resources without HTTPS.

_**Yes, the problem was to set the `secure: true`  and does not access resources via HTTPS.**_

The [express-session](https://github.com/expressjs/session) middleware documentation says (yes, go to the cookie section):

> Please note that `secure: true` is a **recommended** option. However, it requires an https-enabled website, i.e., HTTPS is necessary for secure cookies. **If `secure` is set, and you access your site over HTTP, the cookie will not be set**. If you have your node.js behind a proxy and are using `secure: true`, you need to set "trust proxy" in express.

### Conclusions

I'm happy to found the problem. Right now, while I write this lines, I'm at a tattoo shop waiting to be tattooed with the previous beautiful sentence.
