---
layout: post
title: Awesome clustered markers in Leaflet
date: 2012-08-12 10:14
tags:
- GIS
- javascript
- leaflet
---
Some time ago someone asked at <a href="http://gis.stackexchange.com/questions/17250/how-to-create-animated-cluster-markers-in-openlayers-leaflet/18594">gis.stackexchange.com</a> for nice cluster marker implementation, both for <a href="http://leaflet.cloudmade.com/">Leaflet</a> or
  <a href="http://openlayers.org/">OpenLayers</a>, something similar
  to <a href="http://www.redfin.com/homes-for-sale#!disp_mode=M&amp;market=socal&amp;region_id=16904&amp;region_type=6&amp;v=6">Redfin</a>.
  A couple of weeks ago I discover a great implementation for Leaflet, the
  <a href="https://github.com/danzel/Leaflet.markercluster">Leaflet.markercluster</a> from Dave Leaver.

<p>It is simply awesome !!! <a href="http://danzel.github.com/Leaflet.markercluster/example/marker-clustering-realworld.50000.html" 
 ><img class="alignnone size-full wp-image-725" title="Screenshot from 2012-08-11 20:23:56"
  src="./images/Screenshot-from-2012-08-11-202356.png" alt="" width="574" height="408" /></a></p>

<h2>Features</h2>
<p>The <a href="https://github.com/danzel/Leaflet.markercluster">Leaflet.markercluster</a> plugin for Leaflet is documented enough on its web page, so I'm not going to repeat it here, but I would like to make a short summary of its features.</p>
<h3>Add/remove<em> mark</em><em>er</em></h3>
<p><em></em> We can easily add or remove marker with the methods <code>addLayer</code> and <code>removeLayer</code>. For example:</p>
<pre class="prettyprint">markers.addLayer( new L.Marker(new L.LatLng(lat, lon), { title: title }) );</pre>
<h3>Events</h3>
<p>We have available the events <code>clusterclick</code>, <code>clustermouseover</code>, <code>clustermouseout</code> and <code>zoomend</code> to interact with the new layer.</p>
<h3>Options</h3>
<p>The <a href="https://github.com/danzel/Leaflet.markercluster">Leaflet.markercluster</a> plugin has some nice options, which by default they are set as:</p>
<pre class="prettyprint">options: {
 maxClusterRadius: 60,
 iconCreateFunction: null,
 spiderfyOnMaxZoom: true,
 showCoverageOnHover: true,
 zoomToBoundsOnClick: true
 },</pre>
<ul>
<li><strong><em>maxClusterRadius</em>:</strong> All the markers within this radius becomes a cluster.</li>
<li><strong><em>iconCreateFunction</em>:</strong> Allows to customize the icons for the clusters. (See more <a href="https://github.com/danzel/Leaflet.markercluster#customising-the-clustered-markers">here</a>).</li>
<li><strong><em>spiderfyOnMaxZoom</em>:</strong> When you click a cluster at the bottom zoom level we spiderfy it so you can see all of its markers.</li>
<li><strong><em>showCoverageOnHover</em>:</strong> When you click a cluster we zoom to its bounds.</li>
<li><strong><em>zoomToBoundsOnClick</em>:</strong> When you mouse over a cluster it shows the bounds of its markers.</li>
</ul>
<div><span style="font-size: medium;"><span style="line-height: 24px;">To change the default values simply specify the values when instantiation the cluster group:</span></span></div>
<div>
<pre class="prettyprint">var markers = new L.MarkerClusterGroup({
 maxClusterRadius: 100,
 spiderfyOnMaxZoom: true,
 showCoverageOnHover: false,
 zoomToBoundsOnClick: true
});</pre>
</div>
<div></div>
<h2>A short note</h2>
<p>Many posts ago I write about <a href="//2011/11/14/open-alternaties-to-google-maps">Open Alternatives to Google Maps</a> where I talk about the nice Leaflet project, finishing with the sentence: <em>Believe me, put an eye on this project, it has many more to say</em>. And seems this great marker cluster is one of that thins to say :) In addition, I was seeing lot of activity about the Leaflet project, much more than on OpenLayers.</p>
<p>Do not confuse please, I'm talking about activity related to news where many web pages are changing from Google Maps API to Leaflet. I know the OpenLayers community is make a great job, as always, on the next major release of the project, OpenLayers 3.0, with a great amount of improvements.</p>
<p>At this moment, the comparison between Leaflet and OpenLayers is something like comparing the clothes to go to run or an armor to go to a battle.  What I want to say is OpenLayers is a big and complex project but, because of this, it allows to do almost anything you can need in a GIS application. On the other hand Leaflet is a more agile and lightweight project, designed to to only a bunch of things. While OpenLayers allows to access tile server (TMS or WMTS), WMS, WFS, etc Leaflet is designed to access TMS (like OpenStreetMap, CloudMade tiles, etc).</p>
<p>The summary is Leaflet implements the 10% (to say a number) of things implements OpenLayers but that 10% is the required to do the most common things for a weg application.</p>
<h2>Challenge !!!</h2>
<p>Who wants to create an awesome cluster implementation for OpenLayers?</p>
