---
layout: post
title: 'JavaScript animations (tweening): Why maths are important?'
date: 2010-12-18 19:50
tags:
- animation
- javascript
- math
---
In a <a href="//2010/11/23/animated-scrolling-to-dom-element.html">previous post</a> I show how to make a simple scrolling animation using jQuery. jQuery library has lots of effects, many more added in jQuery UI and much more as plugins. Of course it is fine to use existing libraries to not reinvent the wheel, but there are times you need to do an animation by your hand without the help of existing libraries and because this one needs to know the basics to implement JavaScript animations. Right, so how we can make animations in JavaScript and how we can make it smooth? Let's go.

<p>Unlike other languages, <a href="http://www.javascriptkata.com/2007/06/04/ajax-and-javascript-dont-use-threads/">JavaScript doesn't have the concept of threads</a> so we need to use another approaches to make different things at the same time. This can be achieved with the use of <a href="https://developer.mozilla.org/en/window.setTimeout">setTimeout</a> and <a href="https://developer.mozilla.org/en/DOM/window.setInterval">setInterval</a> functions:</p>
<blockquote><p><em>setTimeout </em>executes a code snippet or a function after specified delay</p>
<p><em>setInterval </em>calls a function repeatedly, with a fixed time delay between each call to that function.</p></blockquote>
<p>Both functions returns an identifier which allows us to remove the timeout or interval using <a href="https://developer.mozilla.org/en/DOM/window.clearTimeout">clearTimeout </a>or <a href="https://developer.mozilla.org/en/DOM/window.clearInterval">clearInterval</a>.</p>
<p>Ok, we are able to execute some code asynchronously but the question is: How we can smoothly scroll to an element?</p>
<p>The answer requires a decent explanation so lets start with a couple of basic samples:</p>
<h3>Step 1: Scrolling to an element without animation</h3>
<p>On this sample we put a button on our page which execute the <em>pageScroll </em>function:</p>
<pre class="brush:xml">&lt;button id="scroll" onclick="pageScroll();"&gt;Scroll&lt;/button&gt;</pre>
<p>This function scrolls the browser viewport till our desired element, which we have identified as <em>target</em>:</p>
<pre class="brush:js">function pageScroll() {
	// Get a reference to the target element and its top offset.
	var target = document.getElementById('target');
	var scroll = target.offsetTop;

	// Scroll viewport to the target element.
	window.scrollBy(0,scroll);
}</pre>
<p>Simply get the vertical offset till our desired target element and use the <em>scrollBy </em>method to scroll the viewport.</p>
<h3>Step 2: Scrolling to an element with basic animation</h3>
<p>The previous sample isn't much impressive, the page simply moves to the target element, it isn't a nice smooth animation.</p>
<p>This second sample introduces the previously commented <em>setTimeout </em>functions:</p>
<pre class="brush:js">function pageScroll() {
	// Get a reference to the target element and its top offset.
	var target = document.getElementById('target');
	var scroll = target.offsetTop;
	var viewScroll = window.pageYOffset;

	// Scroll viewport only a step and call this function again in 10 miliseconds
	if(viewScroll&lt;scroll) {
		window.scrollBy(0,10);
		setTimeout('pageScroll()', 10);
	}
}</pre>
<p>The idea is to move the window scroll step by step until arrive the target element. Again the code gets the offset till our target element and also the current offset of the browser. Next we check if the current window offset has arrived to the target element. If so the code finish, otherwise move the window scroll 10 pixels and create a timeout to invoke the function again in 10ms.</p>
<h3>Improving animation</h3>
<p>The second sample is nicer than the first once but we want a really fashion animation with smooth movements decelerating when we are near the target element.</p>
<p>If you look at the code you can see that animation we have done is linear, in the sense we are stepping a fixed amount of pixels. Next figure represents a linear movement:</p>
<p><object width="330" height="165" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="FlashVars" value="mode=linear" /><param name="quality" value="high" /><param name="src" value="http://hosted.zeh.com.br/mctween/examples/tracer.swf" /><param name="flashvars" value="mode=linear" /><embed width="330" height="165" type="application/x-shockwave-flash" src="http://hosted.zeh.com.br/mctween/examples/tracer.swf" flashvars="mode=linear" quality="high" /></object></p>
<p>We would like something smoother like (called <em>easeinquad</em>):</p>
<p><object width="330" height="165" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="FlashVars" value="mode=easeinquad" /><param name="quality" value="high" /><param name="src" value="http://hosted.zeh.com.br/mctween/examples/tracer.swf" /><param name="flashvars" value="mode=easeinquad" /><embed width="330" height="165" type="application/x-shockwave-flash" src="http://hosted.zeh.com.br/mctween/examples/tracer.swf" flashvars="mode=easeinquad" quality="high" /></object></p>
<p>which starts at zero velocity then accelerates, or this (called <em>easeInOutSine</em>)</p>
<p><object width="330" height="165" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="FlashVars" value="mode=easeInOutSine" /><param name="quality" value="high" /><param name="src" value="http://hosted.zeh.com.br/mctween/examples/tracer.swf" /><param name="flashvars" value="mode=easeInOutSine" /><embed width="330" height="165" type="application/x-shockwave-flash" src="http://hosted.zeh.com.br/mctween/examples/tracer.swf" flashvars="mode=easeInOutSine" quality="high" /></object></p>
<p>which starts at zero velocity, accelerates until halfway, then deaccelerates to zero velocity again.</p>
<h3>Here comes the maths !!!</h3>
<p>Yes, this is incredible but truth :). Maths are the key to create these and many other good animations and the star actor is <a href="http://en.wikipedia.org/wiki/Inbetweening">tweening</a>.</p>
<p>We need a tweening function that given a start and end values, a total duration and a relative time computes a position. For example, for values <em>start=0, end=10</em>, <em>duration=5secs</em> what would be the position if <em>time=1.5secs</em> ?</p>
<pre class="brush:js">var tweenPosition = function (time, begin, final, duration) {
    // calculate position here
    return position;
};</pre>
<p>So the secret is found the formula to compute the position in the desired way. For example,  we can obtain a linear movement using the next function:</p>
<pre>var tweenLinearPosition = function (t, b, c, d) {
    return c*t/d + b;
};</pre>
<blockquote><p>If you remember your maths in school this is the linear <a href="http://en.wikipedia.org/wiki/Linear_equation#Slope.E2.80.93intercept_form">slope-intercept</a> form of a line.</p></blockquote>
<p>For the <em>easyInQuad </em>animation the formula would be:</p>
<pre>var tweenEaseInQuadPosition = function (t, b, c, d) {
    return c*(t/=d)*t + b;
};</pre>
<h3>Using tweening function for animation</h3>
<p>Now we know a bit about tweening functions needed to create a nice animation and now we need to put it all together in our JavaScript code.</p>
<p>First, using <a href="http://www.robertpenner.com/easing/penner_chapter7_tweening.pdf">one </a>of the functions you can found in the bottom references, we have created a nice bounce tweening function:</p>
<pre class="brush:js">var tweenEeaseOutBouncePosition = function (t, b, c, d) {
	if ((t/=d) &lt; (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t &lt; (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	} else if (t &lt; (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	}
};</pre>
<p>Now, define some needed parameters:</p>
<pre class="brush:js">// Compute the initial and final offset
var target = document.getElementById('target');
var endOffset = target.offsetTop;
var beginOffset = window.pageYOffset;
var total = endOffset - beginOffset;
var time = 0;
var duration = 3000;	// The aproximate duration of animation in miliseconds
var interval = 10;		// The interval of every step</pre>
<p>Similarly than previous samples we need to get the initial and final vertical offset and define the duration of our animation.</p>
<p>Finally the animation function, responsibly to use tweening function, results in:</p>
<pre class="brush:js">function pageScroll() {
	var currentOffset = window.pageYOffset;

	// Scroll viewport only a step and call this function again in 'interval' miliseconds
	if(time &lt; duration &amp;&amp; currentOffset &lt; endOffset) {
		var p = tweenEeaseOutBouncePosition(time, beginOffset, total, duration);
		window.scroll(0,p);	// Scroll viewport
		time+=interval;
		setTimeout('pageScroll()', interval);
	} else {
		time = 0;
	}
}</pre>
<p>While we are not over animation duration and the current page offset is less than the target one, we scroll the page computing the position using the tweening function. Take care of this considerations in this sample:</p>
<ul>
<li>The JavaScript code has moved to the end of the page. This way we are sure all body content (and also the target element) has been loaded before execute our code.</li>
<li>We scroll the page using <em>window.scroll()</em> instead <em>window.scrollBy()</em>.</li>
</ul>
<h3>Considerations</h3>
<p>This third and final sample is a really simple demonstration using a tweening function. A more powerful implementation must allow to start/stop animation, forward/rewind one frame, etc.</p>
<p>This is simply a tutorial post with a simple introduction to animations. As I commented early there are times when you need to do things without the help of a library, or simply you one create a new library (an amazing alternative to jQuery, MooTools, Prototype, ...) and need to do the things by hand.</p>
<p>Hope it can help you.</p>
<h3>References</h3>
<p><a href="http://www.mediacollege.com/internet/javascript/page/scroll.html">http://www.mediacollege.com/internet/javascript/page/scroll.html</a> - A basic animation.</p>
<p><a href="http://hosted.zeh.com.br/mctween/animationtypes.html">http://hosted.zeh.com.br/mctween/animationtypes.html</a> - Tweet functions and samples.</p>
<p><a href="http://www.robertpenner.com/easing/penner_chapter7_tweening.pdf">http://www.robertpenner.com/easing/penner_chapter7_tweening.pdf</a> - A great PDF chapter about tweening in ActionScript from Robert Penner.</p>
<p><a href="http://sixrevisions.com/javascript/10-impressive-javascript-animation-frameworks">http://sixrevisions.com/javascript/10-impressive-javascript-animation-frameworks</a> - A list of animation JavaScript libraries.</p>
<p><a href="http://berniesumption.com/software/animator">http://berniesumption.com/software/animator</a> - A light, powerful and pure JavaScript animator library.</p>
