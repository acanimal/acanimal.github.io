---
layout: post
title: How to create a preloader in Dojo
date: 2010-12-05 11:22
tags:
- ajax
- dojo
- javascript
---
<a href="http://www.dojotoolkit.org/">Dojo</a> is a great framework to create <a href="http://en.wikipedia.org/wiki/Rich_Internet_application">RIA </a>applications. Dojo isn't only a bunch of utility functions to select DOM nodes, change styles, make some effects, etc in contrast it is a whole framework with a great set of UI widgets.

<h3>Working in a declarative way</h3>
<p>Like other JavaScript libraries and frameworks Dojo allows us to create widgets directly from JavaScript code but, and this is one of its key values, Dojo allows to work in a declarative way. If you know HTML then you are allowed to create a Dojo UI. For example:</p>
<pre class="brush:xml">&lt;button dojoType="dijit.form.Button" type="button"&gt;Click Me&lt;/button&gt;</pre>
<p>In the declarative way we only need to add the <em>dojoType</em> attribute to a HTML element we to create Dojo components. But, <strong>how the declarative way works?</strong> Well, as a short answer you need to understand <strong>once Dojo is loaded by the browser, the JavaScript code parses the DOM structure of the page and "<em>tansforms</em>" any element with the <em>dojoType </em>to the appropriate Dojo component</strong>.</p>
<h3>What's the problem with the declarative way?</h3>
<p>Unfortunately, using this way, while Dojo is going to be loaded you will see a normal button in the browser and some seconds later, once Dojo is loaded and has parsed the page, you will see how your normal button <a href="./images/2010/12/normal_button.png"><img class="alignnone size-full wp-image-58" title="normal_button" src="./images/normal_button.png" alt="" width="81" height="32" /></a> becomes a Dojo button <a href="./images/2010/12/dojo_button.png"><img class="alignnone size-full wp-image-59" title="dojo_button" src="./images/dojo_button.png" alt="" width="78" height="35" /></a>.</p>
<p>So, I want to use Dojo but don't want that ugly effect on my pages? That what we are going to talk in the next lines.</p>
<h3>Creating a preloader</h3>
<p>The basic idea is to hide the page content until Dojo has parsed the content and created all the Dijit widgets. This way when users access our pages they will see a nice preloader page and once the content is prepared it will appear in an smooth way. That is from:</p>
<p><a href="./images/2010/12/dojo_preloader.png"><img class="size-medium wp-image-65 alignnone" title="dojo_preloader" src="./images/dojo_preloader-300x191.png" alt="" width="300" height="191" /></a></p>
<p>to:</p>
<p><a href="./images/2010/12/dojo_content.png"><img class="size-medium wp-image-66 alignnone" title="dojo_content" src="./images/dojo_content-300x197.png" alt="" width="300" height="197" /></a></p>
<p><em>Considerations: Please, what I'm going to explain here is all related to Dojo 1.5. I have test on FF3.5, Chrome 8 and IE8.</em></p>
<h4>Avoid parse on load</h4>
<p>The first step is to tell Dojo don't parse the page automatically, we want to control when to do that, so when including Dojo library we need to explicitly tell that using '<em>parseOnLoad</em>' property:</p>
<pre class="brush:xml">&lt;script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/dojo/1.5/dojo/dojo.xd.js"
    djConfig="parseOnLoad: false, isDebug: false, locale: 'en-us'"&gt;&lt;/script&gt;</pre>
<p>and then include the parser code. Note it is always necessary this line, including when setting <em>parseOnLoad </em>to true.</p>
<pre class="brush:xml">&lt;script type="text/javascript"&gt;
    dojo.require("dojo.parser");
    ...
&lt;/script&gt;</pre>
<h4>Put a div in the body to act as the preloader layer</h4>
<p>In the body of your page you need to add a div element to be used as the preloader. This will be initially visible and will hide the real content of your page until it was ready for the user.</p>
<pre class="brush:xml">&lt;div id="preloader"&gt;
    &lt;div id="preloaderContent" style="visibility: hidden;"&gt;
        &lt;strong&gt;This is your preloader... &lt;/strong&gt;
        &lt;img width="20px" height="20px" src="http://ajax.googleapis.com/ajax/libs/dojo/1.5/dojox/image/resources/images/loading.gif"&gt;&lt;br&gt;
        Put someting nice here !!!
    &lt;/div&gt;
&lt;/div&gt;</pre>
<h4>Style the preloader</h4>
<p>As we say, the preloader needs to hide the real content of our page, so it needs some styling.</p>
<p>The <em>preloader </em>section is responsible to cover the whole viewport, while the preloaderContent contains our preloader message. (Later you will we center the message by code).</p>
<pre class="brush:css">#preloader {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	margin:0;
	padding:0;
	background:#aaa;
	z-index:999;
}
#preloaderContent {
	position: absolute;
	border: 2px solid #fff;
	color: #fff;
	padding: 25px;
	-moz-border-radius: 15px;
	border-radius: 15px;
}</pre>
<h4>Hide the preloader once the content is ready</h4>
<p>We have the preloader div section and we have styled it a bit. Now we need to add the code that hides it once the content was parsed by Dojo and ready for the user.</p>
<p>To do that we need to add next code in the <em>dojo.addOnLoad</em> function:</p>
<pre class="brush:js">dojo.addOnLoad(function(){
	showPreloader();
	dojo.parser.parse();
	hidePreloader();
});</pre>
<p>The <em>addOnLoad </em>function is executed once the Dojo code is loaded by the browser. Meanwhile the user will see the preloader on the screen. Once Dojo is loaded what we want is to parse the content</p>
<pre class="brush:js">dojo.parser.parse();</pre>
<p>and then hide the preloader</p>
<pre class="brush:js">var hidePreloader = function(){
	// This really hides the preloader
	var hide = function(){
		dojo.fadeOut({
				node:"preloader",
				duration:700,
				onEnd: function(){
					dojo.style("preloader", "display", "none");
				}
		}).play();
	};

	// Set a timeout to ensure the preloader is visible.
	// This is only for testing !!!
	setTimeout(hide, 5000);
};</pre>
<p><em>Please, note to force you can see the preloader in the screen I have added a 5secs timeout. Probably you don't want that on your site</em>.</p>
<p>To make preloader a bit more beautiful I have created the <em>showPreloader </em>function which computes the viewport size and centers the preloader message.</p>
<pre class="brush:js">function showPreloader() {
	// Show the preloader centered in the viewport
	var ps = dojo.position('preloaderContent');
	var ws = dojo.window.getBox();
	dojo.style("preloaderContent", "top" , (ws.h/2-ps.h/2)+"px");
	dojo.style("preloaderContent", "left", (ws.w/2-ps.w/2)+"px");
	dojo.style("preloaderContent", "visibility" , "visible");
};</pre>
<h3>Demo</h3>
<p>You can see the demo <a href="http://www.acuriousanimal.com/dojo-preloader/">here</a>. Source code is available at Github repository <a href="https://github.com/acanimal/dojo-preloader">dojo-preloader</a></p>
<h3>References</h3>
<ul>
<li><a href="http://www.preloaders.net/">http://www.preloaders.net</a> - To create nice preloader images.</li>
<li><a href="http://www.sitepen.com/blog/2008/10/06/implementing-a-web-application-preloading-overlay/">http://www.sitepen.com/blog/2008/10/06/implementing-a-web-application-preloading-overlay/</a></li>
<li><a href="http://www.sitepen.com/blog/2008/10/06/implementing-a-web-application-preloading-overlay/"></a><a href="http://dojocampus.org/content/2008/03/08/the-dojo-parser/">http://dojocampus.org/content/2008/03/08/the-dojo-parser/</a> - Better understand of the Dojo parser.</li>
</ul>
