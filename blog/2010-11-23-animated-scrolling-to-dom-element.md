---
layout: post
title: Animated scrolling to a DOM element
date: 2010-11-23 20:05
tags:
- javascript
- jquery
---
Creating my <a href="http://www.acuriousanimal.com">web page</a> I have wanted to create a smooth movement to a given page element, for example from top to about section. One possibility, of course, is to code it yourself, but we are lucky to have tons of JavaScript libraries and frameworks to help us on that tasks. On of them are <a href="http://www.jquery.com">jQuery</a>, one of the most used libraries.

<p>Ok, lets go to see the required code:</p>
<pre class="brush:js">$('html,body').animate({ scrollTop: $(element).offset().top },
        { duration: 'slow', easing: 'swing'});</pre>
<p>What the sentence is doing? First we are selecting the HTML body section:</p>
<pre class="brush:js">$('html,body').animate()</pre>
<p>apply an animation. The animation must scroll the browser view until the desired DOM element. So the next step is get the desired element top offset:</p>
<pre class="brush:js">$(element).offset().top</pre>
<p>For example, given an HTML element identified by:</p>
<pre class="brush:js">id="my_id"</pre>
<p>we can get its top offset writting:</p>
<pre class="brush:js">$('#my_id').offset().top</pre>
<p>Finally, the <a href="http://api.jquery.com/animate/">animate </a>function is responsible to perform a custom animation of a set of CSS properties.</p>
<p>To avoid code duplication, it is a good practice to wrap the call on a function, this way we can call it passing an string with the identifier of the element we want to scroll to (really we need to pass the string with desired the jQuery selector):</p>
<pre class="brush:js">function scrollTo(element) {
	$('html,body').animate({ scrollTop: $(element).offset().top },
		{ duration: 'slow', easing: 'swing'});
};</pre>
<p>You can see a demo of this at <a href="http://www.acuriousanimal.com">acuriousanimal</a>.</p>
