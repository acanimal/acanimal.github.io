---
layout: post
title: OpenLayers presentation and OpenLayers Cookbook examples code update
date: 2012-12-04 21:29
tags:
- book
- code
- dojo
- gis
- javascript
- openlayers
---
A few months after the release of the <a href="//2012/09/02/openlayers-cookbook-is-out">OpenLayers Cookbook</a> I have been working on a presentation about OpenLayers for <a href="http://twitter.com/geoinquiets">@geoinquiets</a> at Barcelona (BCN) that will be celebrated the next December 20th (see the event <a href="http://www.eventbrite.es/event/4934313665/eorg?ebtv=C">here</a>) at the offices of <a href="http://www.cantera-tech.com/es/">Cantera-Tech</a>.

<p>Both the presentation and source code examples materials are freely available at my repository on <a href="https://github.com/acanimal">GitHub</a> as open projects and I would like you contribute to:</p>
<ul>
<li><strong>OpenLayers Cookbook Examples</strong>: <a href="https://github.com/acanimal/Openlayers-Cookbook">https://github.com/acanimal/Openlayers-Cookbook</a></li>
<li><strong>OpenLayers Presentation</strong>: <a href="https://github.com/acanimal/OpenLayers-Presentation">https://github.com/acanimal/OpenLayers-Presentation</a>.</li>
</ul>
<p>The presentation is available online at <a href="http://acanimal.github.com/OpenLayers-Presentation">http://acanimal.github.com/OpenLayers-Presentation</a> and the cookbook examples at <a href="http://acanimal.github.com/Openlayers-Cookbook">http://acanimal.github.com/Openlayers-Cookbook</a>.</p>
<blockquote><p>Please take into account some examples do not work because there is no backend PHP server to serve some required content.</p></blockquote>
<h2>About the OpenLayers Cookbook Examples</h2>
<p>The OpenLayers Cookbook was released with a set of samples showing almost all the recipes in the book in action.</p>
<p>I built the samples as a RIA application with a menu bar for each chapter which allows to select te recipe to load and allowing to show the related source of each recipe.</p>
<p><a href="http://acanimal.github.com/Openlayers-Cookbook/"><img class="aligncenter size-full wp-image-1094" title="ol_source_code_examples" src="./images/ol_source_code_examples.png" alt="" width="550" height="314" /></a></p>
<p>To create the application I used <a href="http://dojotoolkit.org/">Dojo Toolkit</a> because it is a great JavaScript framework with a nice set of rich and homogeneous widgets.</p>
<p>As any piece of software, the book samples requires some updates from time to time and, because of this I decide to upload the source code to GitHub and update it to the version 1.1.</p>
<p>Next are some of the improvements you will find:</p>
<ul>
<li>Use of <a href="http://dojotoolkit.org/">Dojo Toolkit</a> from Google CDN (<code>&lt;script src="//ajax.googleapis.com/ajax/libs/dojo/1.8.0/dojo/dojo.js"&gt;&lt;/script&gt;</code>)</li>
<li>Updated Dojo version to 1.8</li>
<li>Updated OpenLayers version to 2.12</li>
<li>Source code updated to use Dojo 1.8 syntax (using HTML5 <code>data</code> attribute) instead old one (non standar <code>dojoType</code>).</li>
<li>Source code highlighted via <a href="http://codemirror.net/">CodeMirror</a> project.</li>
<li>Use of relative paths to load data files (attached to the project).</li>
</ul>
<p>To run the samples you need download the code and put within your local web server (take a look to the <a href="https://github.com/acanimal/Openlayers-Cookbook#how-to-run-the-examples-">documentation</a>).</p>
<p>Remember, you are welcome to contribute and create new recipes !!!</p>
<h2>About the OpenLayers Presentation</h2>
<p>As a said at the beginning, I have the opportunity to make a presentation for the <a href="http://twitter.com/geoinquiets">@geoinquiets</a> folks at Barcelona.</p>
<p>But who are the GeoInquiets? Well, we are (I like to include me) a bunch of enthusiast and professionals related with GIS close to Barcelona.</p>
<blockquote><p><strong>Note</strong>: The GeoInquiets initiative has been successfully replicated in other hispanic places like: Madrid, Buenos Aires, Valencia, Tenerife, Galicia, Córdoba, Cantabria, ...</p></blockquote>
<p style="text-align: center;"><a href="http://acanimal.github.com/OpenLayers-Presentation"><img class="aligncenter size-full wp-image-1096" title="ol-presentation" src="./images/ol-presentation.png" alt="" width="550" height="347" /></a></p>
<p>The presentation was made using simply HTML technologies to maximize its portability and avoid proprietary formats. Croncretely, I used the next set of tools to generate it::</p>
<ul>
<li><a href="https://github.com/imakewebthings/deck.js">deck.js</a>: A JavaScript library for building modern HTML presentations.</li>
<li><a href="https://github.com/iros/deck.js-codemirror">deck.js-codemirror</a> extension: Allows you to embed codemirror code snippets in your slides</li>
<li>All UML class diagrams have been made with the free and online <a href="http://yuml.me/diagram/scruffy/class/draw">yUML</a> tool.</li>
</ul>
<p>Again, remember it is open sourced so you can contribute and use to make your own presentations.</p>
