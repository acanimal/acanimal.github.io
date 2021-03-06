---
layout: post
title: Taking web page screenshots
date: 2012-09-15 16:12
tags:
- phantomjs
- screenshot
- tools
- tricks
---
Recently I have worked on system that requires to take web page screenshots. Not only a screenshot of the whole page but of a concrete element.

Looking on the net I have found many solutions for this problems, which can be classified in to categories:
<ul>
<li><em>Local applications</em>: I mean a screen capture program or a plugin for your browser (both Chrome and FireFox has some nice plugins for this).</li>
<li><em>Online services</em>: There are some online services that offers possibility to get a screenshots (like <a href="http://url2png.com/">url2png</a>), test your web site on different browsers (like <a href="http://browsershots.org/">browsershots</a> or <a href="https://browserling.com/">browserling</a>) or even an API to automatize the task to capture a web page (like <a href="http://www.thumbalizr.com/">thumbalizer</a> or <a href="http://url2png.com/">url2png</a>).</li>
</ul>
<h2>The solution</h2>
<p>There are alternatives but I like to go beyond the easy solutions and try things, so, after looking a bit more I found a powerful solution: <a href="http://phantomjs.org/">PhantomJS</a>.<a style="color: #ff4b33; line-height: 24px;" href="./images/2012/09/phantomjs-logo.png"><img class="size-full wp-image-877 alignnone" title="phantomjs-logo" src="./images/phantomjs-logo.png" alt="" width="240" height="80" /></a></p>
<p>Oh, wonderful, but.. what is PhantomJS and what is it good for?</p>
<p>As the project page says:</p>
<blockquote><p>PhantomJS is a headless WebKit with JavaScript API. It has <strong>fast</strong> and <strong>native</strong> support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG.<br />
PhantomJS is created by <a href="http://twitter.com/AriyaHidayat">Ariya Hidayat</a>.</p></blockquote>
<p>This means you have all the powerful of a WebKit based browser within a program, so you can use it for: headless website testing, site scraping, page rendering, network monitoring, ...</p>
<h2>How to use PhantomJS to take a web page screenshot?</h2>
<p>Go to the <a href="http://phantomjs.org/download.html">project page</a> and download the binary package . In my case I download the Linux 64-bit system.</p>
<p>PhantomJS is a command line tool and, once and uncompressed the previous package, you will find it in the <code>bin/phantomjs</code>. As a command tool the usage looks like:</p>
<pre class="prettyprint">./phantomjs [options] script.[js|coffee] [script argument [script argument ...]]</pre>
<p>You can get more usage information with: <code>./phantomjs --help</code></p>
<p>PhantomJS accepts programs coded in JavaScript or CoffeeScript and, hopefully, the package comes with a <code>examples</code> folder which is full of examples in both languages.</p>
<p>One of the sample programs is the rasterize.[js|coffee] which shows how we can rasterize a web page to an image file.<br />
The program usage is:</p>
<pre class="prettyprint">./phantomjs rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]</pre>
<p>And the whole program code is:</p>
<pre class="prettyprint">var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

if (system.args.length &lt; 3 || system.args.length &gt; 5) {
    console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]');
    console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
    phantom.exit(1);
} else {
    address = system.args[1];
    output = system.args[2];
    page.viewportSize = { width: 600, height: 600 };
    if (system.args.length &gt; 3 &amp;&amp; system.args[2].substr(-4) === ".pdf") {
        size = system.args[3].split('*');
        page.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' }
                                           : { format: system.args[3], orientation: 'portrait', margin: '1cm' };
    }
    if (system.args.length &gt; 4) {
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
}</pre>
<p>Probably the most important sentences are:</p>
<ul>
<li>The inclusion of the webpage module:
<pre class="prettyprint">var page = require('webpage').create();</pre>
</li>
<li>Load the web page with <code>open</code>function:
<pre class="prettyprint">page.open(address, function (status) { ...};</pre>
</li>
<li>Render the web page to a file with the <code>render</code>function:
<pre class="prettyprint">page.render(output);</pre>
</li>
</ul>
<p>Note also in the rasterize.js source code the <code>page.viewportSize</code> is defined to be <code>600x600</code> which is equivalent as we where navigating a page with a screen resolution of <code>600x600</code>.</p>
<p>Lets to to see a sample and take a screenshot of this blog site:</p>
<pre class="prettyprint">./bin/phantomjs ./examples/rasterize.js http://acuriousanimal.com/blog acanimal_blog.png</pre>
<p>This makes a screenshot of the whole blog site. Here I attached a modified version of the image with lot less resolution of the original, but you can get an idea of the powerful of PhantomJS.:</p>
<p><img class="aligncenter size-full wp-image-890" title="acanimal_blog_little" src="./images/acanimal_blog_little.png" alt="" width="164" height="460" /></p>
<div>
</div>
