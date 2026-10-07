---
title: Awesome clustered markers in Leaflet
pubDatetime: 2012-08-12T10:14:00Z
description: Some time ago someone asked at gis.stackexchange.com for nice cluster marker implementation, both for Leaflet or OpenLayers, something similar to Redfin. A couple of weeks ago I discover a great…
tags:
  - gis
  - javascript
  - leaflet
---

Some time ago someone asked at [gis.stackexchange.com](http://gis.stackexchange.com/questions/17250/how-to-create-animated-cluster-markers-in-openlayers-leaflet/18594) for nice cluster marker implementation, both for [Leaflet](http://leaflet.cloudmade.com/) or  
[OpenLayers](http://openlayers.org/), something similar  
to [Redfin](http://www.redfin.com/homes-for-sale#!disp_mode=M&market=socal&region_id=16904&region_type=6&v=6).  
A couple of weeks ago I discover a great implementation for Leaflet, the  
[Leaflet.markercluster](https://github.com/danzel/Leaflet.markercluster) from Dave Leaver.

It is simply awesome !!! ![Screenshot from 2012-08-11 20:23:56](@/content/posts/images/Screenshot-from-2012-08-11-202356.png)

## Features

The [Leaflet.markercluster](https://github.com/danzel/Leaflet.markercluster) plugin for Leaflet is documented enough on its web page, so I'm not going to repeat it here, but I would like to make a short summary of its features.

### Add/remove _mark\**er_

 We can easily add or remove marker with the methods `addLayer` and `removeLayer`. For example:

```
markers.addLayer( new L.Marker(new L.LatLng(lat, lon), { title: title }) );
```

### Events

We have available the events `clusterclick`, `clustermouseover`, `clustermouseout` and `zoomend` to interact with the new layer.

### Options

The [Leaflet.markercluster](https://github.com/danzel/Leaflet.markercluster) plugin has some nice options, which by default they are set as:

```
options: {
 maxClusterRadius: 60,
 iconCreateFunction: null,
 spiderfyOnMaxZoom: true,
 showCoverageOnHover: true,
 zoomToBoundsOnClick: true
 },
```

- **_maxClusterRadius_:** All the markers within this radius becomes a cluster.
- **_iconCreateFunction_:** Allows to customize the icons for the clusters. (See more [here](https://github.com/danzel/Leaflet.markercluster#customising-the-clustered-markers)).
- **_spiderfyOnMaxZoom_:** When you click a cluster at the bottom zoom level we spiderfy it so you can see all of its markers.
- **_showCoverageOnHover_:** When you click a cluster we zoom to its bounds.
- **_zoomToBoundsOnClick_:** When you mouse over a cluster it shows the bounds of its markers.

To change the default values simply specify the values when instantiation the cluster group:

```
var markers = new L.MarkerClusterGroup({
 maxClusterRadius: 100,
 spiderfyOnMaxZoom: true,
 showCoverageOnHover: false,
 zoomToBoundsOnClick: true
});
```

## A short note

Many posts ago I write about [Open Alternatives to Google Maps](//2011/11/14/open-alternaties-to-google-maps) where I talk about the nice Leaflet project, finishing with the sentence: _Believe me, put an eye on this project, it has many more to say_. And seems this great marker cluster is one of that thins to say :) In addition, I was seeing lot of activity about the Leaflet project, much more than on OpenLayers.

Do not confuse please, I'm talking about activity related to news where many web pages are changing from Google Maps API to Leaflet. I know the OpenLayers community is make a great job, as always, on the next major release of the project, OpenLayers 3.0, with a great amount of improvements.

At this moment, the comparison between Leaflet and OpenLayers is something like comparing the clothes to go to run or an armor to go to a battle.  What I want to say is OpenLayers is a big and complex project but, because of this, it allows to do almost anything you can need in a GIS application. On the other hand Leaflet is a more agile and lightweight project, designed to to only a bunch of things. While OpenLayers allows to access tile server (TMS or WMTS), WMS, WFS, etc Leaflet is designed to access TMS (like OpenStreetMap, CloudMade tiles, etc).

The summary is Leaflet implements the 10% (to say a number) of things implements OpenLayers but that 10% is the required to do the most common things for a weg application.

## Challenge !!!

Who wants to create an awesome cluster implementation for OpenLayers?
