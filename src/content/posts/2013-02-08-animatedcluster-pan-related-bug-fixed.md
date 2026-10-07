---
title: AnimatedCluster pan related bug... fixed !!!
pubDatetime: 2013-02-08T18:59:00Z
description: If you regularly follow this blog and are web mapping developer that works with OpenLayers, (too much coincidences???) probably you know about the the Animated marker cluster strategy for OpenLayers…
tags:
  - animatedcluster
  - gis
  - openlayers
---

If you regularly follow this blog and are web mapping developer that works with OpenLayers, (too much coincidences???) probably you know about the the [Animated marker cluster strategy for OpenLayers](/2012/08/19/animated-marker-cluster-strategy-for-openlayers/) I created some time ago.

Unfortunally, the last version (v0.2) has a ugly [bug](https://github.com/acanimal/AnimatedCluster/issues/2). The code works fine when you change the zoom level but clusters are not updated when you pan the map.

I'm happy to say right now I have uploaded a new version (v0.3) which fixes this bug on my [GitHub repository](https://github.com/acanimal/AnimatedCluster). Basically, now the code controls if the action is a zoom change or a pan movement and updates and animates the clusters accordingly. That is, if you pan the map the clusters on the current level are recomputed.

**Take into account this can cause the features where clustered in different clusters**, so you can see how bubbles changes its position and number of features within it.

In addition, the demo page has been updated with the new version. Check it !!!

![animatedcluest](@/content/posts/images/animatedcluest-300x149.png)

> Thanks to all the great people that has sent me their experiences when using the AnimatedCluster !!!
