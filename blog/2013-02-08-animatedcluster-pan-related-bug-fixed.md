---
layout: post
title: AnimatedCluster pan related bug... fixed !!!
date: 2013-02-08 18:59
tags:
- animatedcluster
- gis
- openlayers
---
If you regularly follow this blog and are web mapping developer that works with OpenLayers, (too much coincidences???) probably you know about the the <a href="/2012/08/19/animated-marker-cluster-strategy-for-openlayers/">Animated marker cluster strategy for OpenLayers</a> I created some time ago.

<p>Unfortunally, the last version (v0.2) has a ugly <a href="https://github.com/acanimal/AnimatedCluster/issues/2">bug</a>. The code works fine when you change the zoom level but clusters are not updated when you pan the map.</p>
<p>I'm happy to say right now I have uploaded a new version (v0.3) which fixes this bug on my <a href="https://github.com/acanimal/AnimatedCluster">GitHub repository</a>. Basically, now the code controls if the action is a zoom change or a pan movement and updates and animates the clusters accordingly. That is, if you pan the map the clusters on the current level are recomputed.</p>
<p><strong>Take into account this can cause the features where clustered in different clusters</strong>, so you can see how bubbles changes its position and number of features within it.</p>
<p>In addition, the demo page has been updated with the new version. Check it !!!</p>
<p style="text-align: center;"><a href="http://www.acuriousanimal.com/AnimatedCluster"><img class="aligncenter size-medium wp-image-806" alt="animatedcluest" src="./images/animatedcluest-300x149.png" width="300" height="149" /></a></p>
<blockquote><p>Thanks to all the great people that has sent me their experiences when using the AnimatedCluster !!!</p></blockquote>
