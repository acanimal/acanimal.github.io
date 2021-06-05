---
layout: post
title: Animated marker cluster strategy for OpenLayers
date: 2012-08-19 18:32
tags:
- cluster
- gis
- openlayers
- tools
---
Yes, this posts talks about my implementation of a <strong>cluster strategy that animates clusters when changing the zoom level</strong>. So, if you are one of those don't like to read the blog posts from others and like the action, you can go directly to see <a href="http://www.acuriousanimal.com/AnimatedCluster/">AnimatedCluster demo page</a>. or to the <a href="https://github.com/acanimal/AnimatedCluster">github repository</a> to see the source code.

<blockquote><p>Read this post if you want to know how the sample works.</p></blockquote>
<p style="text-align: center;"><a href="http://www.acuriousanimal.com/AnimatedCluster/"><img class="aligncenter size-full wp-image-806" title="animatedcluest" alt="" src="./images/animatedcluest.png" width="600" height="299" /></a></p>
<p>Next, you can find a descriptions on how the implementation works. I have tried to be has much OpenLayers compliant as possible, without using any other framework, library or classes outside the OpenLayers and following its design of concepts.</p>
<p>It is necessary to make a short introduction of concepts about OpenLayers, like vector layers and strategies, so the reader can understand more in depth the implementation.</p>
<blockquote><p><em><strong>NOTE: It was only tested with OpenLayers 2.11 !!!</strong></em></p></blockquote>
<h2>Some background</h2>
<p>Many time ago (at the end of 2011 year) I saw a great question in stackoverflow about <a href="http://gis.stackexchange.com/questions/17250/how-to-create-animated-cluster-markers-in-openlayers-leaflet/18594">How to Create Animated Cluster Markers in OpenLayers/Leaflet?</a> and, also, a similar one about <a href="http://stackoverflow.com/questions/6641919/openlayers-nice-marker-clustering">OpenLayers, nice marker clustering</a>.</p>
<p>Everybody knows <a href="http://en.wikipedia.org/wiki/A_picture_is_worth_a_thousand_words"><em>a picture is worth a thousand words</em></a> and when working with data visualization this is not an exception. It is not only important the look but the feel and having a nice animation of features while changing the zoom level is something visually funny and attractive.</p>
<p>On that days, I was completely busy involved on writing the book <a href="//2012/06/28/openlayers-cookbook/">OpenLayers Cookbook</a>. Initially I think to put hands on and try to implement a solution in OpenLayers, so it can serve as another recipe for the book. Unfortunately,  I had no much time to spent in that challenge and I forget it to concentrate writing the book with a bunch of more practical recipes.</p>
<p>A month ago, Dave Leaver answers in the forum pointing to its <a href="//2012/08/12/awesome-clustered-markers-in-leaflet/">awesome clustered marker</a> implementation for Leaflet, which I must say is terrific.</p>
<p>Fortunately for the community, the implementation animated cluster for Leaflet was like a kick on my ass, it was what I need to start the challenge :)</p>
<p>Last week I start working in an implementation for OpenLayers. Spending my few nigh time on it and after some tries and errors, today I'm able to publish the source code and documentation in addition to this post to the masses.</p>
<h2>A short Vector Layer class description</h2>
<p>In OpenLayers, when you want to render any feature within a map yo need to previously create a vector layer:</p>
<pre class="prettyprint">var vector = new OpenLayers.Layer.Vector("Features");</pre>
<p>Vector layers are one of the most complex and powerful kind of layers within the OpenLayers and because of this there is a great ecosystem of classes related with the vector layers:</p>
<p>[caption id="" align="aligncenter" width="384"]<img alt="" src="./images/978c1a0a.png" width="384" height="305" /> Approximated conceptual model[/caption]</p>
<h3>Features and Geometries</h3>
<p>A vector layer is nothing more than a container for features, which are real world observations: a city, a river, a mountain peak, a country, a continent, ... all these are features. In addition, a feature can have a set of attributes like: population, length, height, etc.</p>
<p style="text-align: center;"><img class=" aligncenter" alt="" src="./images/GeometryClasses.png" /></p>
<p>Each feature can be visualized in a different way and this way is determined by a geometry associated with the feature. Points, LineString, Polygons, .. are different kinds of geometries we can use to visualize a feature.</p>
<pre class="prettyprint">// This code adds a point feature to a vector layer
var pointGeometry = new OpenLayers.Geometry.Point(px, py);
var pointFeature = new OpenLayers.Feature.Vector(pointGeometry);
vector.push([pointFeatures]);</pre>
<h3>Renderers and Styles</h3>
<p>Browsers can have support for different technologies: <a href="http://en.wikipedia.org/wiki/Canvas_element">Canvas</a>, <a href="http://en.wikipedia.org/wiki/Scalable_Vector_Graphics">SVG</a>, etc. So to make the process of draw geometries in the map independent from the vector layer, OpenLayers has the concept of renderer. A renderer is a special kind of class responsible to draw a geometry using a concrete technology.</p>
<p>Next code creates a new vector layer where we are specifying OpenLayers tries to render features using Canvas capabilities at first instance or otherwise using SVG technology.</p>
<pre class="prettyprint">var vector = new OpenLayers.Layer.Vector("Features", {
    renderers: ['Canvas','SVG']
});</pre>
<p>In addition, a feature (or the vector layer itself) can have a style associated that is used by the renderer to draw the geometry that represents a feature. This way we can have cities rendered as blue points with radius 10px and mountain peaks rendered as brown points with radius 7px.</p>
<h3>Protocols and Formats</h3>
<p>A vector layer can have a protocol class associated with it. Protocols are special classes that knows how to read/write features from different sources and uses Format classes to read/write data in a specific format. For example: we can load features using the HTTP protocol from a GeoJSON or KML file.</p>
<p>Protocols and format classes makes the vector layer independent from the data source.</p>
<pre class="prettyprint">var vector = new OpenLayers.Layer.Vector("Features", {
    protocol: new OpenLayers.Protocol.HTTP({
        url: "world_cities.json",
        format: new OpenLayers.Format.GeoJSON()
    })
});</pre>
<p>Previous code creates a new vector layer that load data via HTTP from a GeoJSON format file.</p>
<h3>Strategies</h3>
<p>A vector layer can have one or more strategies attached to it. An strategy is a kind of class that, once activated, makes <em>things</em> on the vector layer without layer knows what is happening.</p>
<p>Examples of strategies are:</p>
<ul>
<li><code>OpenLayers.Strategy.Fixed</code>, which loads the content of a data source attached to the vector layer only once. This is usually used to load a data file in a vector layer, because it is only required to be loaded once.</li>
<li><code>OpenLayers.Strategy.Box</code>, which loads content from a data source each time the bounding box of the viewport changed. This strategy is useful for vector layers that loads content from a WFS server and needs to update its contents every time the BBOX changes.</li>
</ul>
<pre class="prettyprint">var vector = new OpenLayers.Layer.Vector("Features", {
    protocol: new OpenLayers.Protocol.HTTP({
        url: "world_cities.json",
        format: new OpenLayers.Format.GeoJSON()
    }),
    strategies: [new OpenLayers.Strategy.Fixed()]
});</pre>
<p>The previous code creates a vector layer that load data from a GeoJSON file. The Fixed strategy allows to load the file content once and only once, no mater if viewport BBOX changes.</p>
<h2>The cluster strategy</h2>
<p>When a vector layer contains tons of features and, they are rendered as points, an ugly effect can appear in our map. Depending on the zoom level and the point radius the points can be rendered overlapping each others.</p>
<p>One of the most useful strategies offered by OpenLayers is the <code>OpenLayers.Strategy.Cluster</code>. Given the set of features withint a layer and a zoom level, this strategy computes the distance among the features and clusters them so no cluster overlaps any other.</p>
<p>Next figures show a sample without and with applying the cluster strategy to a set of features within a vector layer:</p>
<p>[caption id="attachment_790" align="aligncenter" width="600"]<img class="size-full wp-image-790 " title="nocluster" alt="" src="./images/nocluster.png" width="600" height="297" /> Without cluster strategy[/caption]</p>
<p>[caption id="attachment_791" align="aligncenter" width="600"]<img class="size-full wp-image-791 " title="cluster" alt="" src="./images/cluster.png" width="600" height="300" /> With cluster strategy[/caption]</p>
<p>The code required for the second figure is:</p>
<pre class="prettyprint">var vector = new OpenLayers.Layer.Vector("Features", {
    protocol: new OpenLayers.Protocol.HTTP({
        url: "world_cities.json",
        format: new OpenLayers.Format.GeoJSON()
    }),
    strategies: [
        new OpenLayers.Strategy.Fixed(),
        new OpenLayers.Strategy.Cluster()
    ]
});</pre>
<h3>How the cluster strategy works?</h3>
<p>The cluster strategy instance holds a reference to the vector layers features. In addition each time the zoom level changes, it computes a set of clusters each one containing some number of features.</p>
<p>The clusters are nothing more than point geometry features with a new <code>count</code> attribute (an holding references to the features it contains).</p>
<p>In addition the cluster strategy, removes the "original" set of features from the vector layers and adds the computed clusters to it.</p>
<h2>So (IMO)... What is the problem with the cluster strategy?</h2>
<p>Really there is no problem with cluster strategy, it works like a charm. From my point of view the problem is related with the user experience, more concretely to the look and feel.</p>
<p>IMO, the ugly effect with cluster strategy is done when the user changes the zoom level of the map. The clusters are computed again and they are drawn fine but without a nice animation that indicates the user the new cluster division or merge.</p>
<blockquote><p>Once can think no matter the look and feel of a bunch features on the screen, but I think <em>if we can have a good functionality with a nice experience that is twice better than only as good functionality</em>.</p></blockquote>
<h2>How to use the AnimatedCluster</h2>
<p>The <code>OpenLayers.Strategy.AnimatedCluster</code> class is a subclass of <code>OpenLayers.Strategy.Cluster</code> class so it inherits all the properties and extends some features.<br />
The usage is as easy as the cluster strategy. When you create a vector layer you need to pass an instance of OpenLayers.Strategy.AnimatedCluster in the strategies property:</p>
<pre class="prettyprint">var vector = new OpenLayers.Layer.Vector("Features", {
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
});</pre>
<h3>Properties</h3>
<p>In addition to the inherited properties distance and threshold the AnimatedCluster offers a two new ones:</p>
<ul>
<li><code>animationMethod</code>: The tweening method to use. By default if is <code>OpenLayers.Easing.Expo.easeOut</code>.</li>
<li><code>animationDuration</code>: The duration of the tween in number of steps. By default it is 20.</li>
</ul>
<h2>How the AnimatedCluster works?</h2>
<p>Like its parent class the animated cluster strategy holds a reference to the features of the vector layer and each the zoom level changes the next steps takes place:</p>
<ul>
<li>Store a reference to the previous computed cluster (that related with the previous zoom level we come from)</li>
<li>Compute the new cluster</li>
<li>Start a tween to animate from the previous to the new cluster positions.</li>
</ul>
<p>These means animated cluster makes use of an extra array of clustered features (the previous one) but its size is relatively small, so there is no performance problem. In addition and, in the same way the cluster strategy does, the animated cluster only the computes the new cluster</p>
<p>The animation is a bit cumbersome. If we zoom in the view, it means we go to a level with  more clusters than the previous one, that is, a cluster at level N becomes M clusters at level N+1.</p>
<p><img class="size-full wp-image-818" title="zoom1" alt="" src="./images/zoom1.png" width="273" height="260" />  <img class=" wp-image-819" title="zoom2" alt="" src="./images/zoom2.png" width="273" height="260" /></p>
<p>The vice-versa occurs for zoom out actions, we go to a new level with less clusters than the previous one, that is, M clusters at level N becomes 1 cluster at level N-1.</p>
<h2>Things to take into account with the AnimatedCluster</h2>
<p>There are two important things to understand and take into account when working with the AnimateCluster.</p>
<p>First, the animation is made using the <code>OpenLayers.Tween</code> class OpenLayers offers. This class is used to make animation when map panning and offers basic actions to make animations.</p>
<p>Unfortunately, the class does not allows specify the animation duration in second but in steps. You must know that the <code>OpenLayers.Tween</code> wait 10 milliseconds between steps (see documentation for the <code>OpenLayers.Tween.INTERVAL</code> property), so a duration of 50 steps means the animation is made in 500 milliseconds.</p>
<p>Second, each animation steps implies to redraw the vector layer again, to refresh the new position of the clusters. As you can see this has a direct performance impact.</p>
<h2>Conclusions</h2>
<p>To be the first implementation I proudly enough of the work but I am aware of the improvements it can be made.<br />
Any help will be appreciated.</p>
