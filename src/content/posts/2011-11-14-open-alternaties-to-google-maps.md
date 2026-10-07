---
title: Open alternatives to Google Maps
pubDatetime: 2011-11-14T20:43:00Z
description: Lately there was a not much surprising news about Google products and services. Among other things Google has changed the Google Maps API use policy and will charge to those users that exceed some…
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

It is well known that Google Maps is one of the most (or the most) famous mapping service used around the net and it starts the web GIS revolution some years ago but hopefully it is not the only API we can use. Bing and the discontinued Yahoo Maps, are great competitors but this post is related to open source alternatives you can find to create your web mapping applications.

> Please, don't confuse the API with the imagery you are using. Google will charge you by the imagery usage so if you use an alternative API but continues consuming Google tiles you are in a similar situacion.

## OpenLayers

[OpenLayers](www.openlayers.org) is probably the most famous open source web mapping project. I want to think so because two factors: first it is the older project presented on this post and second because it is the most complete and, because this, the most complex.

OpenLayers is close to [OGC](http://www.opengeospatial.org/) standards, it separates between geometries, features and styles. You can load raster tiles layers from Google, Bing, OpenStreetMaps, etc or vector data from [GML](http://en.wikipedia.org/wiki/Geography_Markup_Language), [KML](http://en.wikipedia.org/wiki/Keyhole_Markup_Language) or [GeoJSON](http://en.wikipedia.org/wiki/GeoJSON) formats.

OpenLayers is not only restricted to spherical mercator, you can use almost any projection you know (plus many others), you can load data from [WMS](http://en.wikipedia.org/wiki/Web_Map_Service) or [WFS](http://en.wikipedia.org/wiki/Web_Feature_Service) servers and most important, you are not limited to visualise data, you can create and edit new features sending them to the WFS server.

## Polymaps

![polymaps](@/content/posts/images/polymaps.png)

[Polymaps](http://polymaps.org/) is a project born from [SimpleGeo](http://simplegeo.com/) and [Stamen](http://stamen.com/) association. The main reason behind Polymaps is the use of vector-tiled layers.

What we mean by vector-tiled data? Since GoogleMaps everybody knows about raster-tiled layers, where each zoom level contains more tiles with more resolution.

A vector-tiles layer is similar, in the sense every zoom level has more resolution, but the data of every tile is not an image but vector data is rendered using [SVG](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics). This means you need a SVG compliant browser to use Polymaps.

## Leaflet

[Leaflet](http://leaflet.cloudmade.com/) is a lightweight library specially oriented to make tile-based maps for desktop and mobile web browser.

It is really easy to use and offers the basic things everybody needs for a typical web mapping application: access to tile-based imagery, markers, popups, polygons, points, etc. Believe me, put an eye on this project, it has many more to say.

As a note, I would like to say Leaflet is a project from CloudMade and it is close to their Web Map API ([http://cloudmade.com/products/web-maps-api](http://cloudmade.com/products/web-maps-api)).

## And what about imagery?

Google Maps is not the unique imagery provider and there are other alternatives like Bing or Yahoo imagery, but the question is: _where can I found real open imagery I can use for commercial applications and not limited by their usage_?

I think the most famous open source alternative is [OpenStreetMap](http://www.openstreetmap.org). Their data is maintained by the community, anybody can add data or improve it. It demonstrates its quality and usefulness in the Haiti disaster because their information was more accurate than any other provider.

In addition, some time ago there was a similar project called [OpenAerialMap](http://www.openaerialmap.org), currently discontinued, that tries to create something similar than OpenStreetMap but with aerial images. The problem in this case is that obtain aerial data isn't as easy as get vector data with a GPS. If you have a plane and a good camera and want to share your imagery then contact with OpenAerialMap author.

Finally, I would like to mention one more service provider. Yes it is not completely open source, but it is close. [CloudMade](http://cloudmade.com/) (yes the creators of Leaflet and other free tools) is a company based on OpenStreetMap data. Among other great tools they allow to configure the style of the tiles you can later add to your map in a similar way Google Style Maps doesn but they do some year before Google.
