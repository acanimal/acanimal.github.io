---
title: Animated marker cluster strategy for OpenLayers
pubDatetime: 2012-08-19T18:32:00Z
description: Yes, this posts talks about my implementation of a cluster strategy that animates clusters when changing the zoom level. So, if you are one of those don't like to read the blog posts from others and…
tags:
  - cluster
  - gis
  - openlayers
  - tools
---

Yes, this posts talks about my implementation of a **cluster strategy that animates clusters when changing the zoom level**. So, if you are one of those don't like to read the blog posts from others and like the action, you can go directly to see [AnimatedCluster demo page](http://www.acuriousanimal.com/AnimatedCluster/). or to the [github repository](https://github.com/acanimal/AnimatedCluster) to see the source code.

> Read this post if you want to know how the sample works.

![animatedcluest](@/content/posts/images/animatedcluest.png)

Next, you can find a descriptions on how the implementation works. I have tried to be has much OpenLayers compliant as possible, without using any other framework, library or classes outside the OpenLayers and following its design of concepts.

It is necessary to make a short introduction of concepts about OpenLayers, like vector layers and strategies, so the reader can understand more in depth the implementation.

> _**NOTE: It was only tested with OpenLayers 2.11 !!!**_

## Some background

Many time ago (at the end of 2011 year) I saw a great question in stackoverflow about [How to Create Animated Cluster Markers in OpenLayers/Leaflet?](http://gis.stackexchange.com/questions/17250/how-to-create-animated-cluster-markers-in-openlayers-leaflet/18594) and, also, a similar one about [OpenLayers, nice marker clustering](http://stackoverflow.com/questions/6641919/openlayers-nice-marker-clustering).

Everybody knows [_a picture is worth a thousand words_](http://en.wikipedia.org/wiki/A_picture_is_worth_a_thousand_words) and when working with data visualization this is not an exception. It is not only important the look but the feel and having a nice animation of features while changing the zoom level is something visually funny and attractive.

On that days, I was completely busy involved on writing the book [OpenLayers Cookbook](//2012/06/28/openlayers-cookbook/). Initially I think to put hands on and try to implement a solution in OpenLayers, so it can serve as another recipe for the book. Unfortunately,  I had no much time to spent in that challenge and I forget it to concentrate writing the book with a bunch of more practical recipes.

A month ago, Dave Leaver answers in the forum pointing to its [awesome clustered marker](//2012/08/12/awesome-clustered-markers-in-leaflet/) implementation for Leaflet, which I must say is terrific.

Fortunately for the community, the implementation animated cluster for Leaflet was like a kick on my ass, it was what I need to start the challenge :)

Last week I start working in an implementation for OpenLayers. Spending my few nigh time on it and after some tries and errors, today I'm able to publish the source code and documentation in addition to this post to the masses.

## A short Vector Layer class description

In OpenLayers, when you want to render any feature within a map yo need to previously create a vector layer:

```
var vector = new OpenLayers.Layer.Vector("Features");
```

Vector layers are one of the most complex and powerful kind of layers within the OpenLayers and because of this there is a great ecosystem of classes related with the vector layers:

![978c1a0a](@/content/posts/images/978c1a0a.png) Approximated conceptual model

### Features and Geometries

A vector layer is nothing more than a container for features, which are real world observations: a city, a river, a mountain peak, a country, a continent, ... all these are features. In addition, a feature can have a set of attributes like: population, length, height, etc.

![GeometryClasses](@/content/posts/images/GeometryClasses.png)

Each feature can be visualized in a different way and this way is determined by a geometry associated with the feature. Points, LineString, Polygons, .. are different kinds of geometries we can use to visualize a feature.

```
// This code adds a point feature to a vector layer
var pointGeometry = new OpenLayers.Geometry.Point(px, py);
var pointFeature = new OpenLayers.Feature.Vector(pointGeometry);
vector.push([pointFeatures]);
```

### Renderers and Styles

Browsers can have support for different technologies: [Canvas](http://en.wikipedia.org/wiki/Canvas_element), [SVG](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics), etc. So to make the process of draw geometries in the map independent from the vector layer, OpenLayers has the concept of renderer. A renderer is a special kind of class responsible to draw a geometry using a concrete technology.

Next code creates a new vector layer where we are specifying OpenLayers tries to render features using Canvas capabilities at first instance or otherwise using SVG technology.

```
var vector = new OpenLayers.Layer.Vector("Features", {
    renderers: ['Canvas','SVG']
});
```

In addition, a feature (or the vector layer itself) can have a style associated that is used by the renderer to draw the geometry that represents a feature. This way we can have cities rendered as blue points with radius 10px and mountain peaks rendered as brown points with radius 7px.

### Protocols and Formats

A vector layer can have a protocol class associated with it. Protocols are special classes that knows how to read/write features from different sources and uses Format classes to read/write data in a specific format. For example: we can load features using the HTTP protocol from a GeoJSON or KML file.

Protocols and format classes makes the vector layer independent from the data source.

```
var vector = new OpenLayers.Layer.Vector("Features", {
    protocol: new OpenLayers.Protocol.HTTP({
        url: "world_cities.json",
        format: new OpenLayers.Format.GeoJSON()
    })
});
```

Previous code creates a new vector layer that load data via HTTP from a GeoJSON format file.

### Strategies

A vector layer can have one or more strategies attached to it. An strategy is a kind of class that, once activated, makes _things_ on the vector layer without layer knows what is happening.

Examples of strategies are:

- `OpenLayers.Strategy.Fixed`, which loads the content of a data source attached to the vector layer only once. This is usually used to load a data file in a vector layer, because it is only required to be loaded once.
- `OpenLayers.Strategy.Box`, which loads content from a data source each time the bounding box of the viewport changed. This strategy is useful for vector layers that loads content from a WFS server and needs to update its contents every time the BBOX changes.

```
var vector = new OpenLayers.Layer.Vector("Features", {
    protocol: new OpenLayers.Protocol.HTTP({
        url: "world_cities.json",
        format: new OpenLayers.Format.GeoJSON()
    }),
    strategies: [new OpenLayers.Strategy.Fixed()]
});
```

The previous code creates a vector layer that load data from a GeoJSON file. The Fixed strategy allows to load the file content once and only once, no mater if viewport BBOX changes.

## The cluster strategy

When a vector layer contains tons of features and, they are rendered as points, an ugly effect can appear in our map. Depending on the zoom level and the point radius the points can be rendered overlapping each others.

One of the most useful strategies offered by OpenLayers is the `OpenLayers.Strategy.Cluster`. Given the set of features withint a layer and a zoom level, this strategy computes the distance among the features and clusters them so no cluster overlaps any other.

Next figures show a sample without and with applying the cluster strategy to a set of features within a vector layer:

![nocluster](@/content/posts/images/nocluster.png) Without cluster strategy

![cluster](@/content/posts/images/cluster.png) With cluster strategy

The code required for the second figure is:

```
var vector = new OpenLayers.Layer.Vector("Features", {
    protocol: new OpenLayers.Protocol.HTTP({
        url: "world_cities.json",
        format: new OpenLayers.Format.GeoJSON()
    }),
    strategies: [
        new OpenLayers.Strategy.Fixed(),
        new OpenLayers.Strategy.Cluster()
    ]
});
```

### How the cluster strategy works?

The cluster strategy instance holds a reference to the vector layers features. In addition each time the zoom level changes, it computes a set of clusters each one containing some number of features.

The clusters are nothing more than point geometry features with a new `count` attribute (an holding references to the features it contains).

In addition the cluster strategy, removes the "original" set of features from the vector layers and adds the computed clusters to it.

## So (IMO)... What is the problem with the cluster strategy?

Really there is no problem with cluster strategy, it works like a charm. From my point of view the problem is related with the user experience, more concretely to the look and feel.

IMO, the ugly effect with cluster strategy is done when the user changes the zoom level of the map. The clusters are computed again and they are drawn fine but without a nice animation that indicates the user the new cluster division or merge.

> Once can think no matter the look and feel of a bunch features on the screen, but I think _if we can have a good functionality with a nice experience that is twice better than only as good functionality_.

## How to use the AnimatedCluster

The `OpenLayers.Strategy.AnimatedCluster` class is a subclass of `OpenLayers.Strategy.Cluster` class so it inherits all the properties and extends some features.  
The usage is as easy as the cluster strategy. When you create a vector layer you need to pass an instance of OpenLayers.Strategy.AnimatedCluster in the strategies property:

```
var vector = new OpenLayers.Layer.Vector("Features", {
    ...
    strategies: [
        new OpenLayers.Strategy.Fixed(),
        new OpenLayers.Strategy.AnimatedCluster({
            distance: 45,
            animationMethod: OpenLayers.Easing.Expo.easeOut,
            animationDuration: 10
        })
    ],
    ...
});
```

### Properties

In addition to the inherited properties distance and threshold the AnimatedCluster offers a two new ones:

- `animationMethod`: The tweening method to use. By default if is `OpenLayers.Easing.Expo.easeOut`.
- `animationDuration`: The duration of the tween in number of steps. By default it is 20.

## How the AnimatedCluster works?

Like its parent class the animated cluster strategy holds a reference to the features of the vector layer and each the zoom level changes the next steps takes place:

- Store a reference to the previous computed cluster (that related with the previous zoom level we come from)
- Compute the new cluster
- Start a tween to animate from the previous to the new cluster positions.

These means animated cluster makes use of an extra array of clustered features (the previous one) but its size is relatively small, so there is no performance problem. In addition and, in the same way the cluster strategy does, the animated cluster only the computes the new cluster

The animation is a bit cumbersome. If we zoom in the view, it means we go to a level with  more clusters than the previous one, that is, a cluster at level N becomes M clusters at level N+1.

![zoom1](@/content/posts/images/zoom1.png)  ![zoom2](@/content/posts/images/zoom2.png)

The vice-versa occurs for zoom out actions, we go to a new level with less clusters than the previous one, that is, M clusters at level N becomes 1 cluster at level N-1.

## Things to take into account with the AnimatedCluster

There are two important things to understand and take into account when working with the AnimateCluster.

First, the animation is made using the `OpenLayers.Tween` class OpenLayers offers. This class is used to make animation when map panning and offers basic actions to make animations.

Unfortunately, the class does not allows specify the animation duration in second but in steps. You must know that the `OpenLayers.Tween` wait 10 milliseconds between steps (see documentation for the `OpenLayers.Tween.INTERVAL` property), so a duration of 50 steps means the animation is made in 500 milliseconds.

Second, each animation steps implies to redraw the vector layer again, to refresh the new position of the clusters. As you can see this has a direct performance impact.

## Conclusions

To be the first implementation I proudly enough of the work but I am aware of the improvements it can be made.  
Any help will be appreciated.
