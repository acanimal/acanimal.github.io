---
title: OpenLayers, how compute the tile "name" under the mouse
pubDatetime: 2013-01-01T11:53:00Z
description: I have working on a web page using OpenLayers which among others shows a OpenStreetMap layer. The issue is I need to move the mouse over the map and print on a label the tile name in the form of…
tags:
  - gis
  - openlayers
  - howto
  - tricks
---

I have working on a web page using OpenLayers which among others shows a   
[OpenStreetMap](http://www.openstreetmap.org/) layer.  
The issue is I need to move the mouse over the map and print on a label the tile _name_   
in the form of **z/x/y**, for example, **5/15/10**.

The approach to done this is:

1.  register a listener to the OpenLayers _map_ instance and then, for every mouse event triggered,
2.  get the lonlat and translate it from current map projection to the [EPSG:4326 (WGS84)](http://spatialreference.org/ref/epsg/4326/).

```javascript
map.events.register("mousemove", this, function (evt) {
  var lonlat = new OpenLayers.LonLat(0, 0);
  if (evt) {
    lonlat = map.getLonLatFromPixel(evt.xy);
    lonlat.transform(
      this.map.getProjectionObject(),
      newOpenLayers.Projection("EPSG:4326")
    );
  }
  tileX = long2tile(lonlat.lon, map.getZoom());
  tileY = latg2tile(lonlat.lat, map.getZoom());
  tileZ = map.getZoom();

  // Print the tilez, tilex and tiley values
});
```

To compute the tile X,Y grid coordinate from latlon you can use next functions (obtained from [OpenStreetMaps](http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#X_and_Y) site):

```javascript
// Functions to compute tiles from lat/lon
function long2tile(lon, zoom) {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
}
function lat2tile(lat, zoom) {
  return Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom)
  );
}
```
