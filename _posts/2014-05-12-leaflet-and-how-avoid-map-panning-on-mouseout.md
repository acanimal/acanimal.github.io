---
layout: post
title: Leaflet and how avoid map panning on mouseout
date: 2014-05-12 08:31
tags:
- gis
- leaflet
- tricks
- javascript
---
A couple of days ago
, a friend asked this simple question in a Spanish forum. The scenario is simple, you have a map and when dragging it you would like to stop the action when the mouse goes beyond the limits of the map, really beyond the `div` (or any other DOM element that) contains the map.

The first try anyone can try could be something like:

{% highlight javascript %}
// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([51.505, -0.09], 13);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Register event to enable/disable dragging on mouse out.
map.on('mouseout', function() {
    map.dragging.disable();
});
map.on('mouseover', function() {
    map.dragging.enable();
});
{% endhighlight %}

but that has no effect. ([See here](http://jsfiddle.net/2yvtV/1/))

Now, remove the `mouseover` listener and try again:

{% highlight javascript %}
// create a map and add the layer
var map = ...

// Register event to enable/disable dragging on mouse out.
map.on('mouseout', function() {
    map.dragging.disable();
});
{% endhighlight %}

surprisingly, when the mouse goes out the map the dragging action continues active and once you finish dragging the `disable()` method seems to take place and you can't drag the map again. ([See here](http://jsfiddle.net/2yvtV/2/)).

After some time looking at Leaflet source code (we aware I have done it for Leaflet 0.7.2) I found a possible solution but, first, let me do some explanation.

The `L.Map` class has attached _hooks_, like drag, or zoom actions, which provides the map with some behavior.

The `L.Map.Drag` class is responsible to control the dragging action. It has `enable`/`disable` methods and, more important, it uses internally a `L.Draggable` instance, which is responsible to detect and catch mouse events on the map. This way:

*   the `L.Draggable` catches mouse events on  the map panel (also for mouse move),
*   makes some process and triggers some new events that are catch by the `L.Map.Drag` instance
*   the `L.Map.Drag` instance makes some process and triggers the know map events `move` and `drag`.

In addition, invoking `L.Map.Drag.disable()` implies a call to `L.Draggable.disable()` too but (I don't understand yet why), it seems not takes effect until you release the mouse button. The `L.Draggable` instance continues catching mouse event and _informing_ `L.Map.Drag.`

All this say, a possible solution to stop the dragging action when the mouse goes out the map panel is to _freeze_ the work of `L.Draggable.`

> Please, note the next code violates almost all the [SOLID](http://en.wikipedia.org/wiki/SOLID_(object-oriented_design) principles, so don't fire me.

{% highlight javascript %}
L.Draggable.prototype._freeze=false;
L.Draggable.prototype._updatePosition= function () {
    if(this._freeze) {
        return;
    }

    this.fire('predrag');
    L.DomUtil.setPosition(this._element, this._newPos);
    this.fire('drag');
};
{% endhighlight %}

The code adds a new `_freeze` property to the `L.Draggable` class and redefines the `_updatePosition` method to check the property.

Now, you can freeze the mouse dragging action as:

{% highlight javascript %}
map.on('mouseout', function() {
    map.dragging._draggable._freeze=true;
});
map.on('mouseover', function() {
    map.dragging._draggable._freeze=false;
});
{% endhighlight %}

You can see it in action [here](http://jsfiddle.net/v7P8P/1/).
