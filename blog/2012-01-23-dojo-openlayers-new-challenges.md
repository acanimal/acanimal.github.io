---
layout: post
title: Dojo + OpenLayers = New Challenges
date: 2012-01-23 23:23
tags:
- dojo
- gis
- openlayers
---
Recently, the new Dojo 1.7 was released with many improvements and important changes.
As a developer, I'm pleased to work with Dojo on RIA application because simple reasons:

<ul>
<li>It offers almost all I need: module organization, an extensive set of widgets to create interfaces, manipulation of DOM elements, AJAX communications, etc.</li>
<li>It is relatively easy to use and learn. Here I found the declarative way to work really useful because helps developers and designers work together but on different things.</li>
<li>Creating custom widgets, after some relatively easy learning curve, brings you more power and flexibility.</li>
</ul>
<p>Yes, Dojo is a great project, but as I mentioned at the beginning I like it for RIA projects, that is, for big or complex CRUD applications. For small things, like nice web pages, I prefer jQuery plus some plugins.</p>
<p>Looking at the new features of Dojo 1.7 I found a new module dojox.geo.openlayers which acts as a wrapper around OpenLayers GIS library and extends with some Dojo capabilities.</p>
<p>Now, add Dojo GFX shapes or Dojo widgets on top OpenLayers is possible, opining new possibilities. With this merge we can do things like add pie charts to our maps to show to statistics information. It is awesome !!!</p>
<p style="text-align: center;"><img class="aligncenter" src="./images/openlayers_dojo.png" alt="" width="340" height="218" /></p>
<h2>A very short introdutcion to <em>dojox.geo.openlayers</em> package</h2>
<p>Before making a little demo playing with all this new things, we need a short description.</p>
<p>The main class in the package is <em>dojox.geo.openlayers.Map</em> which acts as a kind of wrapper around the <em>OpenLayers.Map</em> class. You can access at any time to the OpenLayers underline object with the <em>getOLMap()</em> method.</p>
<p>Next, there is the <em>dojox.geo.openlayers.Layer</em> class which is a wrapper around the <em>OpenLayers.Layer</em> class. It allows to attach to the map any Dojo element.</p>
<p>The <em>dojox.geo.openlayers.GfxLayer</em> is a subclass of the previous class specially designed to work with GFX shapes and render them on top of OpenLayers map.</p>
<p>The <em>dojox.geo.openlayers.Feature</em> class represents the features we can attach to a <em>dojox.geo.openlayers.Layer</em>. The subclass <em>dojox.geo.openlayers.GeometryFeature</em> is designed to render LineString, Points and Collections of geometries.</p>
<blockquote><p>Because GeometryFeature works with <em>dojox.gfx</em> package to render the geometries you need to add it always to a<em> dojox.geo.openlayers.GfxLayer</em> layer.</p></blockquote>
<h2>Hands on code</h2>
<p>We are going to create a map with three features:</p>
<ul>
<li>a <em>dojox.gfx</em> shape feature, with an animation attached to it to change it fill color,</li>
<li>a pie chart and</li>
<li>a stacked area chart.</li>
</ul>
<p>You can see the demo in action <a href="http://www.acuriousanimal.com/dojo-openlayers/">http://www.acuriousanimal.com/dojo-openlayers/</a>, (source code at <a href="https://github.com/acanimal/dojo-openlayers">GitHub</a>) and it should looks something like:</p>
<p><a href="http://www.acuriousanimal.com/dojo-openlayers/"><img class="size-full wp-image-540  " title="sc01_dojo_openlayers" src="./images/sc01_dojo_openlayers1.png" alt="" width="450" height="312" /></a></p>

<p>Lets go. Start creating new HTML page and paste the next code, which correspond to the skeleton of our demo:</p>
<pre class="brush:js">&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
    &lt;head&gt;
		&lt;title&gt;Dojo + OpenLayers = New Challenge&lt;/title&gt;
        &lt;style&gt;
            html, body {
                width: 100%;
                height: 100%;
            }
        &lt;/style&gt;
        &lt;script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/dojo/1.7.1/dojo/dojo.js"&gt;&lt;/script&gt;
        &lt;link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/dojo/1.7.1/dijit/themes/claro/claro.css"/&gt;
        &lt;link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/dojo/1.7.1/dijit/themes/claro/document.css"/&gt;
        &lt;script type="text/javascript" src="http://openlayers.org/api/2.10/OpenLayers.js"&gt;&lt;/script&gt;
        &lt;script type="text/javascript"&gt;
            require([
                "dojo/ready",
                "dojo/parser",
                "dojo/dom-construct",
                "dojox/geo/openlayers/Map",
                "dojox/geo/openlayers/GfxLayer",
                "dojox/geo/openlayers/GeometryFeature",
                "dojox/geo/openlayers/WidgetFeature",
                "dojox/gfx/fx",
                "dojox/charting/widget/Chart2D",
                "dojox/charting/themes/PlotKit/blue"
            ], function(ready) {

                ready(function(){
                    console.log(dojo.version.major + "." + dojo.version.minor + "." + dojo.version.patch);

					// Here put the magic !!!
                })
            });
        &lt;/script&gt;
    &lt;/head&gt;

    &lt;body class="claro"&gt;
        &lt;div id="map" style="width: 100%; height: 100%;"&gt;&lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;</pre>
<p>I'm using Dojo 1.7 and the new way to work using <em>require</em>. As you can see I'm referencing the modules my code requires from <em>dojo</em> and <em>dojox</em> packages</p>
<p>Once Dojo is loaded the ready is executed showing the Dojo version in the console and executing the code shown next, which really creates the map and the features.</p>
<p>In the "here put the magic" section we can place the code that creates a new <em>dojox.geo.openlayers.Map</em> instance:</p>
<pre class="brush:js">//
// Define some Map options.
//
// openLayersMapOptions: Options for the underlaying OpenLayers.Map instance
// baseLayerName: Name of the base layer for the map
// baseLayerType: Type of the base layer. See 'dojox.geo.openlayers.BaseLayerType'
// baseLayerUrl: Necessary, for example, for WMS.
// accessible: Adds a OpenLayers.Control.KeyboardDefaults control to the map
//     to move it using keyboard.
// touchHandler: Touch support for the map.
//
var options = {
    baseLayerName : "OSM",
    baseLayerType : dojox.geo.openlayers.BaseLayerType.OSM,
    touchHandler : true,
    accessible : true
};

// Create a map instance
var map = new dojox.geo.openlayers.Map('map');
map.fitTo([-10,30,40,62]);</pre>
<p>Next create a GFX layer. On it we can attach geometry features or any other Dojo widget feature.</p>
<blockquote><p>Remember you only can attach geometry features to a GFX layer.</p></blockquote>
<pre class="brush:js">// Create a GFX layer
var gfxLayer = new dojox.geo.openlayers.GfxLayer();
map.addLayer(gfxLayer);</pre>
<p>Now create a geometry feature, defined by a LineString with some points, and add it to the layer:</p>
<pre class="brush:js">// Create a geometry feature
var line = new dojox.geo.openlayers.LineString([{x:0, y:45},{x:0, y:55},{x:20, y:55},{x:20, y:50},{x:0, y:45}]);
var feature = new dojox.geo.openlayers.GeometryFeature(line);
feature.setStroke({color: "#666", width: 2});
feature.setFill("#999");

// Add to the GFX layer
gfxLayer.addFeature(feature);
gfxLayer.redraw();</pre>
<p>We want to animate the fill color of the geometry feature so we need to create a couple of animation. The first one will change the fill color from the original color to transparent, while the second will change from transparent to the original color again.</p>
<p>The trick is once the first animation ends we start the second animation (using the '<em>onEnd</em>' method) and the same for the second animation. This way we create an infinite animation effect.</p>
<pre class="brush:js">// Add an animation to change the color of the feature
var animA = dojox.gfx.fx.animateFill({
    shape : feature,
    duration : 700,
    color : {
        start: "#999",
        end: "transparent"
    },
    onAnimate: function() {
        // Required to update the layer while feature change it fill color
        gfxLayer.redraw();
    },
    onEnd: function() {
        animB.play();
    }
});
var animB = dojox.gfx.fx.animateFill({
    shape : feature,
    duration : 700,
    color : {
        start: "transparent",
        end: "#999"
    },
    onAnimate: function() {
        // Required to update the layer while feature change it fill color
        gfxLayer.redraw();
    },
    onEnd: function() {
        animA.play();
    }
});
animA.play();</pre>
<p>Now, we are going to create a pie chart widget feature. We are going to use the <em>dojox.geo.openlayers.WidgetFeature</em> class which required an object in the constructor defining the widget to create, the lat/lon where to place the widget and some more parameters. You can find all the available parameters in the source code documentation:</p>
<pre class="brush:js">//	* _createWidget_: Function for widget creation. Must return a `dijit._Widget`.
//	* _dojoType_: The class of a widget to create;
//	* _dijitId_: The digitId of an existing widget.
//	* _widget_: An already created widget.
//	* _width_: The width of the widget.
//	* _height_: The height of the widget.
//	* _longitude_: The longitude, in decimal degrees where to place the widget.
//	* _latitude_: The latitude, in decimal degrees where to place the widget.</pre>
<p>The pie chart widget have a 100x100 size and will we located at (lon,lat)=(5, 40). The <em>createWidget</em> property must point to a function responsible to create the appropriate widget:</p>
<pre class="brush:js">// Add a widget feature
var chartSize1 = 100;
var co1 = [5,40];
var descr1 = {
    // location of the widget
    longitude : co1[0],
    latitude : co1[1],
    // the function which creates the widget
    createWidget : function(){
        var div = dojo.create("div", {}, dojo.body());
        var chart = new dojox.charting.widget.Chart({
            margins : {
                l : 0,
                r : 0,
                t : 0,
                b : 0
            }
        }, div);
        var c = chart.chart;
        c.addPlot("default", {
            type : "Pie",
            radius : chartSize1 / 2,
            labelOffset : chartSize1,
            fontColor : "black"
        });

        var ser = [2, 8, 12, 43, 56, 23, 43, 1, 33];
        c.addSeries("Series", ser);
        c.setTheme(dojox.charting.themes.PlotKit.blue);
        c.render();
        c.theme.plotarea.fill = undefined;  // Transparent background
        return chart;
    },
    width : chartSize1,
    height : chartSize1
};
var graphFeature1 = new dojox.geo.openlayers.WidgetFeature(descr1);
gfxLayer.addFeature(graphFeature1);</pre>
<p>Similarly, we create a second widget feature with a stacked area chart with different dimensions and location:</p>
<pre class="brush:js">// Add a second plot feature
var chartSize2 = [300,200];
var co2 = [15,45];
var descr2 = {
    // location of the widget
    longitude : co2[0],
    latitude : co2[1],
    // the function which creates the widget
    createWidget : function(){
        var div = dojo.create("div", {}, dojo.body());
        var chart = new dojox.charting.widget.Chart({
            margins : {
                l : 0,
                r : 0,
                t : 0,
                b : 0
            }
        }, div);
        var c = chart.chart;

        c.addPlot("default", {type: "StackedAreas", tension:3})
        .addAxis("x", {fixLower: "major", fixUpper: "major"})
        .addAxis("y", {vertical: true, fixLower: "major", fixUpper: "major", min: 0})
        .addSeries("Series A", [1, 2, 0.5, 1.5, 1, 2.8, 0.4])
        .addSeries("Series B", [2.6, 1.8, 2, 1, 1.4, 0.7, 2])
        .addSeries("Series C", [6.3, 1.8, 3, 0.5, 4.4, 2.7, 2])
        .setTheme(dojox.charting.themes.PlotKit.blue);
        c.render();
        return chart;
    },
    width : chartSize2[0],
    height : chartSize2[1]
};
var graphFeature2 = new dojox.geo.openlayers.WidgetFeature(descr2);
gfxLayer.addFeature(graphFeature2);</pre>
<p>Once we have all the features in the layer, it is a good idea to refresh it:</p>
<pre class="brush:js">gfxLayer.redraw();</pre>
<h2>Conclusions</h2>
<p>I think the fusion of Dojo with OpenLayers opens new possibilities to create rich content and behavior mapping applications. We can create <em>dojo features</em> and make them really amazing using effects, animation and events (like <a href="http://dojotoolkit.org/documentation/tutorials/1.6/charting/demo/monthly-sales-moveslice.html">this</a>).</p>
<p>I usually work with OpenLayers and, because Dojo simply acts as a wrapper on some OpenLayers classes, we can access them and work directly adding data from WFS server, GML files, etc</p>
<p>Is it a perfect solution? As always it depends on your needs but for all of us which work in complex RIA applications that needs some GIS features the <em>dojox.geo.openlayers</em> package offers a new spot light :)</p>
