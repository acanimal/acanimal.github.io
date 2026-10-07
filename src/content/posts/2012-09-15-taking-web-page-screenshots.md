---
title: Taking web page screenshots
pubDatetime: 2012-09-15T16:12:00Z
description: Recently I have worked on system that requires to take web page screenshots. Not only a screenshot of the whole page but of a concrete element.
tags:
  - phantomjs
  - screenshot
  - tools
  - tricks
---

Recently I have worked on system that requires to take web page screenshots. Not only a screenshot of the whole page but of a concrete element.

Looking on the net I have found many solutions for this problems, which can be classified in to categories:

- _Local applications_: I mean a screen capture program or a plugin for your browser (both Chrome and FireFox has some nice plugins for this).

- _Online services_: There are some online services that offers possibility to get a screenshots (like [url2png](http://url2png.com/)), test your web site on different browsers (like [browsershots](http://browsershots.org/) or [browserling](https://browserling.com/)) or even an API to automatize the task to capture a web page (like [thumbalizer](http://www.thumbalizr.com/) or [url2png](http://url2png.com/)).

## The solution

There are alternatives but I like to go beyond the easy solutions and try things, so, after looking a bit more I found a powerful solution: [PhantomJS](http://phantomjs.org/).![phantomjs-logo](@/content/posts/images/phantomjs-logo.png)

Oh, wonderful, but.. what is PhantomJS and what is it good for?

As the project page says:

> PhantomJS is a headless WebKit with JavaScript API. It has **fast** and **native** support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG.
>
> PhantomJS is created by [Ariya Hidayat](http://twitter.com/AriyaHidayat).

This means you have all the powerful of a WebKit based browser within a program, so you can use it for: headless website testing, site scraping, page rendering, network monitoring, ...

## How to use PhantomJS to take a web page screenshot?

Go to the [project page](http://phantomjs.org/download.html) and download the binary package . In my case I download the Linux 64-bit system.

PhantomJS is a command line tool and, once and uncompressed the previous package, you will find it in the `bin/phantomjs`. As a command tool the usage looks like:

```
./phantomjs [options] script.[js|coffee] [script argument [script argument ...]]
```

You can get more usage information with: `./phantomjs --help`

PhantomJS accepts programs coded in JavaScript or CoffeeScript and, hopefully, the package comes with a `examples` folder which is full of examples in both languages.

One of the sample programs is the rasterize.\[js|coffee\] which shows how we can rasterize a web page to an image file.  
The program usage is:

```
./phantomjs rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]
```

And the whole program code is:

```
var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

if (system.args.length < 3 || system.args.length > 5) {
    console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]');
    console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
    phantom.exit(1);
} else {
    address = system.args[1];
    output = system.args[2];
    page.viewportSize = { width: 600, height: 600 };
    if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
        size = system.args[3].split('*');
        page.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' }
                                           : { format: system.args[3], orientation: 'portrait', margin: '1cm' };
    }
    if (system.args.length > 4) {
        page.zoomFactor = system.args[4];
    }
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
        } else {
            window.setTimeout(function () {
                page.render(output);
                phantom.exit();
            }, 200);
        }
    });
}
```

Probably the most important sentences are:

- The inclusion of the webpage module:

```
var page = require('webpage').create();
```

- Load the web page with `open`function:

```
page.open(address, function (status) { ...};
```

- Render the web page to a file with the `render`function:

```
page.render(output);
```

Note also in the rasterize.js source code the `page.viewportSize` is defined to be `600x600` which is equivalent as we where navigating a page with a screen resolution of `600x600`.

Lets to to see a sample and take a screenshot of this blog site:

```
./bin/phantomjs ./examples/rasterize.js http://acuriousanimal.com/blog acanimal_blog.png
```

This makes a screenshot of the whole blog site. Here I attached a modified version of the image with lot less resolution of the original, but you can get an idea of the powerful of PhantomJS.:

![acanimal_blog_little](@/content/posts/images/acanimal_blog_little.png)
