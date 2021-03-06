---
layout: post
title: OpenLayers, how compute the tile "name" under the mouse
date: 2013-01-01 11:53
tags:
- gis
- openlayers
- howto
- tricks
---
I have working on a web page using OpenLayers which among others shows a 
  <a href="http://www.openstreetmap.org/">OpenStreetMap</a> layer.
  The issue is I need to move the mouse over the map and print on a label the tile <em>name</em> 
  in the form of <strong>z/x/y</strong>, for example, <strong>5/15/10</strong>.

<p>The approach to done this is:</p>
<ol>
<li>register a listener to the OpenLayers <em>map</em> instance and then, for every mouse event triggered,</li>
<li>get the lonlat and translate it from current map projection to the <a href="http://spatialreference.org/ref/epsg/4326/">EPSG:4326 (WGS84)</a>.</li>
</ol>
<p>&nbsp;</p>
<pre class="lang:js decode:true ">map.events.register( 'mousemove', this, function(evt){
	var lonlat = new OpenLayers.LonLat(0, 0);
	if(evt){
		lonlat = map.getLonLatFromPixel(evt.xy);
		lonlat.transform(this.map.getProjectionObject(), newOpenLayers. Projection("EPSG:4326") );
	}
	tileX = long2tile(lonlat.lon, map.getZoom());
	tileY = latg2tile(lonlat.lat, map.getZoom());
	tileZ = map.getZoom();

	// Print the tilez, tilex and tiley values
});</pre>
<p>To compute the tile X,Y grid coordinate from latlon you can use next functions (obtained from <a href="http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#X_and_Y">OpenStreetMaps</a> site):</p>
<p>&nbsp;</p>
<pre class="lang:js decode:true ">// Functions to compute tiles from lat/lon
function long2tile(lon,zoom) {
	return (Math.floor((lon+180)/360*Math.pow(2,zoom)));
}
function lat2tile(lat,zoom)  {
	return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
} 
</pre>
