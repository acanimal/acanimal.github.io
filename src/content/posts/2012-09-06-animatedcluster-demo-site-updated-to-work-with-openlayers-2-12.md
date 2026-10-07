---
title: AnimatedCluster demo site updated to work with OpenLayers 2.12
pubDatetime: 2012-09-06T19:50:00Z
description: Not an awesome post but for any interested in the AnimatedCluster strategy I have updated the demo site to work properly with OpenLayers 2.12.
tags:
  - openlayers
---

Not an awesome post but for any interested in the [AnimatedCluster strategy](//2012/08/19/animated-marker-cluster-strategy-for-openlayers.html) I have updated the demo site to work properly with OpenLayers 2.12.

In version 2.12 symbolizer are richest than in 2.11 and required to set the `labelOutlineWidth` property to some low value to show the labels fine:

```
var lowRule = new OpenLayers.Rule({
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.LESS_THAN,
        property: "count",
        value: 15
    }),
    symbolizer: {
        fillColor: colors.low,
        fillOpacity: 0.9,
        strokeColor: colors.low,
        strokeOpacity: 0.5,
        strokeWidth: 12,
        pointRadius: 10,
        label: "${count}",
        labelOutlineWidth: 1,
        fontColor: "#ffffff",
        fontOpacity: 0.8,
        fontSize: "12px"
    }
});
```

See in action:  
![anim_cluster_212](@/content/posts/images/anim_cluster_212.png)
