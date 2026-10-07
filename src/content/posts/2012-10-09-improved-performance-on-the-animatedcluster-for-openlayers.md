---
title: Improved performance on the AnimatedCluster for OpenLayers
pubDatetime: 2012-10-09T23:42:00Z
description: Yes, now I'm really proud to present the AnimatedCluster strategy for OpenLayers. Some time ago I created an AnimatedCluster strategy for OpenLayers that extends the basic Cluster strategy, animating…
tags:
  - animatedcluster
  - gis
  - javascript
  - openlayers
---

Yes, now I'm really proud to present the AnimatedCluster strategy for OpenLayers. Some time ago I created an [AnimatedCluster strategy for OpenLayers](//2012/08/19/animated-marker-cluster-strategy-for-openlayers.html "Animated marker cluster strategy for OpenLayers") that extends the basic Cluster strategy,  
animating cluster when user changes the zoom.

![anim_cluster_212](@/content/posts/images/anim_cluster_212.png)

The problem with the previous version is the code makes some computations for all the clusters, no matter if they are inside or outside the map's viewport.

## The problem

This issues is clearly reproducible in the old version. Zoom in until cluster contains one or two features and you will see a degradation of the animation.

Now, compare with the [new improved version](http://www.acuriousanimal.com/AnimatedCluster), which supports 50.000 features without problem (at least on my computer :) ).

## How do I improve it?

The solution was easy, only manage the animation of those clusters inside the map's viewport:

```javascript
for(var i=0; i<this.features.length; ++i) {
    feature = this.features[i];

    // Check if the feature's geometry is on the map's viewport,
    // if so then manages it, otherwise ignore.
    if(this.layer && this.layer.map) {
        var screenBounds = this.layer.map.getExtent();
        var featureBounds = feature.geometry.getBounds();
        if(!screenBounds.intersectsBounds(featureBounds)) {
            continue;
        }
    }
    ...
}
```

Yes, it can seem obvious, but I have needed some time before I realized about this fact (dummy?)

## References

- GitHub source code [here](https://github.com/acanimal/AnimatedCluster)
- GitHub demo source code [here](http://www.acuriousanimal.com/AnimatedCluster/)
