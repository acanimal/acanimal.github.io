---
title: OpenLayers presentation and OpenLayers Cookbook examples code update
pubDatetime: 2012-12-04T21:29:00Z
description: A few months after the release of the OpenLayers Cookbook I have been working on a presentation about OpenLayers for @geoinquiets at Barcelona (BCN) that will be celebrated the next December 20th…
tags:
  - book
  - code
  - dojo
  - gis
  - javascript
  - openlayers
---

A few months after the release of the [OpenLayers Cookbook](//2012/09/02/openlayers-cookbook-is-out) I have been working on a presentation about OpenLayers for [@geoinquiets](http://twitter.com/geoinquiets) at Barcelona (BCN) that will be celebrated the next December 20th (see the event [here](http://www.eventbrite.es/event/4934313665/eorg?ebtv=C)) at the offices of [Cantera-Tech](http://www.cantera-tech.com/es/).

Both the presentation and source code examples materials are freely available at my repository on [GitHub](https://github.com/acanimal) as open projects and I would like you contribute to:

- **OpenLayers Cookbook Examples**: [https://github.com/acanimal/Openlayers-Cookbook](https://github.com/acanimal/Openlayers-Cookbook)
- **OpenLayers Presentation**: [https://github.com/acanimal/OpenLayers-Presentation](https://github.com/acanimal/OpenLayers-Presentation).

The presentation is available online at [http://acanimal.github.com/OpenLayers-Presentation](http://acanimal.github.com/OpenLayers-Presentation) and the cookbook examples at [http://acanimal.github.com/Openlayers-Cookbook](http://acanimal.github.com/Openlayers-Cookbook).

> Please take into account some examples do not work because there is no backend PHP server to serve some required content.

## About the OpenLayers Cookbook Examples

The OpenLayers Cookbook was released with a set of samples showing almost all the recipes in the book in action.

I built the samples as a RIA application with a menu bar for each chapter which allows to select te recipe to load and allowing to show the related source of each recipe.

![ol_source_code_examples](@/content/posts/images/ol_source_code_examples.png)

To create the application I used [Dojo Toolkit](http://dojotoolkit.org/) because it is a great JavaScript framework with a nice set of rich and homogeneous widgets.

As any piece of software, the book samples requires some updates from time to time and, because of this I decide to upload the source code to GitHub and update it to the version 1.1.

Next are some of the improvements you will find:

- Use of [Dojo Toolkit](http://dojotoolkit.org/) from Google CDN (`<script src="//ajax.googleapis.com/ajax/libs/dojo/1.8.0/dojo/dojo.js"></script>`)
- Updated Dojo version to 1.8
- Updated OpenLayers version to 2.12
- Source code updated to use Dojo 1.8 syntax (using HTML5 `data` attribute) instead old one (non standar `dojoType`).
- Source code highlighted via [CodeMirror](http://codemirror.net/) project.
- Use of relative paths to load data files (attached to the project).

To run the samples you need download the code and put within your local web server (take a look to the [documentation](https://github.com/acanimal/Openlayers-Cookbook#how-to-run-the-examples-)).

Remember, you are welcome to contribute and create new recipes !!!

## About the OpenLayers Presentation

As a said at the beginning, I have the opportunity to make a presentation for the [@geoinquiets](http://twitter.com/geoinquiets) folks at Barcelona.

But who are the GeoInquiets? Well, we are (I like to include me) a bunch of enthusiast and professionals related with GIS close to Barcelona.

> **Note**: The GeoInquiets initiative has been successfully replicated in other hispanic places like: Madrid, Buenos Aires, Valencia, Tenerife, Galicia, Córdoba, Cantabria, ...

![ol-presentation](@/content/posts/images/ol-presentation.png)

The presentation was made using simply HTML technologies to maximize its portability and avoid proprietary formats. Croncretely, I used the next set of tools to generate it::

- [deck.js](https://github.com/imakewebthings/deck.js): A JavaScript library for building modern HTML presentations.
- [deck.js-codemirror](https://github.com/iros/deck.js-codemirror) extension: Allows you to embed codemirror code snippets in your slides
- All UML class diagrams have been made with the free and online [yUML](http://yuml.me/diagram/scruffy/class/draw) tool.

Again, remember it is open sourced so you can contribute and use to make your own presentations.
