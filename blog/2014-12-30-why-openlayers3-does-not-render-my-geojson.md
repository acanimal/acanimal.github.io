---
layout: post
title: Why OpenLayers3 does not render my GeoJSON?
date: 2014-12-30 23:10
tags:
- hoto
- openlayers
- tricks
---
OpenLayers3 offers the `ol.source.GeoJSON` class that allows to read data from a GeoJSON source (an URL, a JavaScript object or a text string).

Maybe you, like me, has spent some time trying to understand why your GeoJSON data is not rendering properly: projection is fine, your GeoJSON is well formed and validated but OpenLayers3 doesn't return any features and so nothing is rendered in the map.

## What is the problem?

The `ol.source.GeoJSON` class is a subclass of `ol.source.StaticVector` that uses an `ol.format.GeoJSON` instance to read content:![](./images/0d1aff07.png)

A source class, by definition, acts as a source of features for a vector layers, that is, it is like a container of features. Because of this, the `ol.source.GeoJSON` source is limited to read GeoJSON features and not geometries. So next GeoJSON will be ignored by OpenLayers3 (really if you use de debug version you will see an assertion message):

{% highlight javascript %}
{
    "type": "Point",
    "coordinates": [
        -105.01621,
        39.57422
    ]
}
{% endhighlight %}

While the next is a valid GeoJSON suitable to be read by the source:

{% highlight javascript %}
{
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [
            -105.01621,
            39.57422
        ]
    },
    "properties": {
        "name": "Some feature property"
    }
}
{% endhighlight %}

##  That means we can't read GeoJSON geometries?

Absolutely no, simply means source classes follows the source concept, and that means, work with features.

The `ol.format.GeoJSON` format class allows to read and write features and geometries. To read a GeoJSON file composed of geometries we need to read the geometries and, manually, create a feature for each one. For example:

{% highlight javascript %}
var point = {
    "type": "Point",
    "coordinates": [
        -105.01621,
        39.57422
    ]
};

// Read the GeoJSON geometries using the format class
var format = new ol.format.GeoJSON();
var geometry = format.readGeometry(point);

// Create a feature using the geometry
var feature = new ol.Feature({
  geometry: geometry,
  propA: 'Some feature property'
});

// Add feature to the source of some vector layer
vectorLayer.getSource().addFeature(feature);
{% endhighlight %}
