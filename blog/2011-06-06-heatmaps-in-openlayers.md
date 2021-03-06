---
layout: post
title: Heatmaps in OpenLayers
date: 2011-06-06 07:30
tags:
- canvas
- heatmaps
- html5
- javascript
- openlayers
---
Some month ago I found nice post on how to create <a href="http://www.patrick-wied.at/static/heatmapjs/">heatmaps </a>using HTML5 canvas element. Its author, <a href="http://www.patrick-wied.at/">Patrick Wied</a>, created a nice JavaScript code responsible to create a heatmap over an image depending on the mouse click or mouse move events.

<p><img class="aligncenter size-full wp-image-291" title="heatmap" src="./images/heatmap.png" alt="" width="304" height="193" /></p>
<p>Instantly, I though to take a look and try to create an OpenLayers heatmap layer. Unfortunately I was very busy and have no time to work on. But... fortunately the project author has enough time to continue improving it and he has created the desired heatmap OpenLayers layer (and also one more for Google Maps), which you can test <a href="http://www.patrick-wied.at/static/heatmapjs/demo/maps_heatmap_layer/openlayers.php">here</a> and looks like:</p>
<p><img class="aligncenter size-full wp-image-292" title="heatmap-ol" src="./images/heatmap-ol.png" alt="" width="237" height="155" /></p>
<p>The big issue at this moment is the <strong>heatmap isn't a layer by itself</strong> and it needs a reference to a "real" layer (like a WMS layer) to render it. If we look at code we need three things:</p>
<ul>
<li>Some data for the hetmap.</li>
</ul>
<pre class="brush:js">var testData={
	max: 46,
	data: [{lat: 33.5363, lon:-117.044, count: 1}, ... ,{lat: 35.8278, lon:-78.6421, count: 1}]
};</pre>
<ul>
<li>A "real" OpenLayers layer.</li>
</ul>
<pre class="brush:js">layer = new OpenLayers.Layer.MapServer( "OpenLayers WMS",
	"http://labs.metacarta.com/wms/vmap0", {layers: 'basic'}
);</pre>
<ul>
<li>Create the heatmap layer based on previous data and layer.</li>
</ul>
<pre class="brush:js">heatmap = new OpenLayers.Layer.Heatmap( "Heatmap Layer", map, layer,
	{visible: true, radius:10}, {isBaseLayer: false, opacity: 0.3}
);
heatmap.setDataSet(testData);
map.addLayers([layer, heatmap]);</pre>
<p>Although it is not perfect really it is a great job. Thanks Patrick.</p>
<p>&nbsp;</p>
