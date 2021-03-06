---
layout: post
title: Open alternatives to Google Maps
date: 2011-11-14 20:43
tags:
- gis
- javascript
- leaflet
- mapping
- open source
- openlayers
- polymaps
- tools
---
Lately there was a not much surprising news about Google products and services. Among other things Google has changed the Google Maps API use policy and will charge to those users that exceed some download limits.

<p>It is well known that Google Maps is one of the most (or the most) famous mapping service used around the net and it starts the web GIS revolution some years ago but hopefully it is not the only API we can use. Bing and the discontinued Yahoo Maps, are great competitors but this post is related to open source alternatives you can find to create your web mapping applications.</p>

<blockquote><p>Please, don't confuse the API with the imagery you are using. Google will charge you by the imagery usage so if you use an alternative API but continues consuming Google tiles you are in a similar situacion.</p></blockquote>
<h2>OpenLayers</h2>
<p><a href="www.openlayers.org">OpenLayers</a> is probably the most famous open source web mapping project. I want to think so because two factors: first it is the older project presented on this post and second because it is the most complete and, because this, the most complex.<img class="alignright" src="./images/OpenLayers.trac.png" alt="" width="49" height="44" /></p>
<p>OpenLayers is close to <a href="http://www.opengeospatial.org/">OGC</a> standards, it separates between geometries, features and styles. You can load raster tiles layers from Google, Bing, OpenStreetMaps, etc or vector data from <a href="http://en.wikipedia.org/wiki/Geography_Markup_Language">GML</a>, <a href="http://en.wikipedia.org/wiki/Keyhole_Markup_Language">KML</a> or <a href="http://en.wikipedia.org/wiki/GeoJSON">GeoJSON</a> formats.</p>
<p>OpenLayers is not only restricted to spherical mercator, you can use almost any projection you know (plus many others), you can load data from <a href="http://en.wikipedia.org/wiki/Web_Map_Service">WMS</a> or <a href="http://en.wikipedia.org/wiki/Web_Feature_Service">WFS</a> servers and most important, you are not limited to visualise data, you can create and edit new features sending them to the WFS server.</p>
<h2>Polymaps</h2>
<p><a href="http://polymaps.org/">Polymaps</a> is a project born from <a href="http://simplegeo.com/">SimpleGeo</a> and <a href="http://stamen.com/">Stamen</a> association. The main reason behind P<a href="./images/2011/11/polymaps.png"><img class="alignright size-full wp-image-473" title="polymaps" src="./images/polymaps.png" alt="" width="269" height="57" /></a>olymaps is the use of vector-tiled layers.</p>
<p>What we mean by vector-tiled data? Since GoogleMaps everybody knows about raster-tiled layers, where each zoom level contains more tiles with more resolution.</p>
<p>A vector-tiles layer is similar, in the sense every zoom level has more resolution, but the data of every tile is not an image but vector data is rendered using <a href="http://en.wikipedia.org/wiki/Scalable_Vector_Graphics">SVG</a>. This means you need a SVG compliant browser to use Polymaps.</p>
<h2>Leaflet</h2>
<p><a href="http://leaflet.cloudmade.com/">Leaflet</a> is a lightweight library specially oriented to make tile-based maps for desktop and mobile web browser. <img class="alignright" src="./images/logo.png" alt="" width="187" height="65" /></p>
<p>It is really easy to use and offers the basic things everybody needs for a typical web mapping application: access to tile-based imagery, markers, popups, polygons, points, etc. Believe me, put an eye on this project, it has many more to say.</p>
<p>As a note, I would like to say Leaflet is a project from CloudMade and it is close to their Web Map API (<a href="http://cloudmade.com/products/web-maps-api">http://cloudmade.com/<wbr>products/web-maps-api</wbr></a>).</p>
<h2>And what about imagery?</h2>
<p>Google Maps is not the unique imagery provider and there are other alternatives like Bing or Yahoo imagery, but the question is: <em>where can I found real open imagery I can use for commercial applications and not limited by their usage</em>?</p>
<p>I think the most famous open source alternative is <a href="http://www.openstreetmap.org">OpenStreetMap</a>. <img class="alignright" src="./images/osm_logo-b8bb9ce023c2e1fb1ef4f5e7eae204e1.png" alt="" />Their data is maintained by the community, anybody can add data or improve it. It demonstrates its quality and usefulness in the Haiti disaster because their information was more accurate than any other provider.</p>
<p>In addition, some time ago there was a similar project called <a href="http://www.openaerialmap.org">OpenAerialMap</a>, currently discontinued, that tries to create something similar than OpenStreetMap but with aerial images. The problem in this case is that obtain aerial data isn't as easy as get vector data with a GPS. If you have a plane and a good camera and want to share your imagery then contact with OpenAerialMap author.</p>
<p>Finally, I would like to mention one more service provider. Yes it is not completely open source, but it is close. <a href="http://cloudmade.com/">CloudMade</a> (yes the creators of Leaflet and other free tools) is a company based on OpenStreetMap data. Among other great tools they allow to configure the style of the tiles you can later add to your map in a similar way Google Style Maps doesn but they do some year before Google.</p>
<p>&nbsp;</p>
