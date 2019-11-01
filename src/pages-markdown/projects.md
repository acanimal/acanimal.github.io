---
layout: page
title: Projects & Works
date: 2012-08-06 14:34
path: /projects
---

Like any other restless minds I do a lot of things but, unfortunately,  I am in enough wars to not finish most of them.

Feel free to explore this section to know a bit more about my work.

- [Presentations](#presentations)
	- [Introduction to Node & Express](#introduction-to-node--express)
	- [Resilient PHP applications with Phystrix](#resilient-php-applications-with-phystrix)
	- [Webpack, the not another task runner tool](#webpack-the-not-another-task-runner-tool)
	- [Git, a short introduction with some pictures](#git-a-short-introduction-with-some-pictures)
	- [OpenLayers Presentation](#openlayers-presentation)
	- [Brief introduction to Dojo Widgets creation](#brief-introduction-to-dojo-widgets-creation)
- [Projects](#projects)
	- [The Book of OpenLayers3 Examples](#the-book-of-openlayers3-examples)
	- [The Nobel Prize](#the-nobel-prize)
	- [AnimatedCluster Strategy](#animatedcluster-strategy)
	- [OpenLayers Cookbook Examples](#openlayers-cookbook-examples)
	- [SimplyWrite](#simplywrite)
	- [Stickies](#stickies)
- [Contributions](#contributions)
	- [Heatmap](#heatmap)
  
---

# Presentations

## Introduction to Node & Express

Short intro to main JS concepts, like asynchronous programming and event loop, NodeJS and Express framework.

<iframe src="//slides.com/acanimal/node-express/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Resilient PHP applications with Phystrix

Introductory talk to resilient application. Our applications must be able to adapt to third party failures and recover quickly from them. You will see why configuring timeouts is not enough to protect your system and what better tools exists. We will explain briefly Hystrix concepts and introduce an alternative for PHP called Phystrix.

<iframe src="//slides.com/acanimal/resiliency-php-apps/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Webpack, the not another task runner tool

This slideshow describes what is and the main features of webpack, a module bundler tool:

<iframe src="//slides.com/acanimal/webpack/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

*You can also view at [slid.es](http://slides.com/acanimal/webpack#/)*

## Git, a short introduction with some pictures

This is a short introduction about Git version control system describing the main topics:

<iframe src="//slides.com/acanimal/git/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

*You can also view at [slid.es](http://slides.com/acanimal/git#/)*

## OpenLayers Presentation

A free and online presentation about the main concepts and design of the OpenLayers mapping library. [Read more](/2012/12/04/openlayers-presentation-and-openlayers-cookbook-sample-code-update)...

[![](../../blog/images/ol-presentation.png)](http://acanimal.github.com/OpenLayers-Presentation)

## Brief introduction to Dojo Widgets creation

Dojo Toolkit is a great JavaScript framework. It is has a powerful and homogeneous API and offers a rich set of visual components (so called widgets, like buttons, tabs, grids, trees, ...) that makes it perfect to build RIA (_Rich Internet Applications_).

One of the key features of the Dojo is the possibility to create new widgets to simplify the development of complex applications. This is a introductory presentation to the custom widgets development. [Read more](/2012/07/08/brief-introduction-to-dojo-widgets-creation)...

---

# Projects

## The Book of OpenLayers3 Examples

[The Book of OpenLayers3](https://leanpub.com/thebookofopenlayers3) contains an extensive set of samples that helps better understand of the concepts explained.

The examples source code are freely available at [https://github.com/acanimal/thebookofopenlayers3](https://github.com/acanimal/thebookofopenlayers3) github repository. You can find a hosted version too at [http://www.acuriousanimal.com/thebookofopenlayers3](http://www.acuriousanimal.com/thebookofopenlayers3).

[![demo](../../blog/images/thebookofopenlayers3_demo.png)](http://www.acuriousanimal.com/thebookofopenlayers3/)

## The Nobel Prize

After discovering [Nobel Prize](http://www.nobelprize.org/nobel_organizations/nobelmedia/nobelprize_org/developer/) web site offers an API to query both prizes and laureates from the beginning of the history of the prizes, I was thinking in the creating of a kind of dynamic infography to allow explore the information in a useful and simplified way.

[![](../../blog/images/Screenshot-08142013-042534-PM.png)](http://www.acuriousanimal.com/nobel-prize-explorer/)

## AnimatedCluster Strategy

Working with vector data, many times we need to render a big number of points. In this situations the Cluster strategy is really helpful allowing to group point and avoiding collisions or overlapping.
 The AnimatedCluster strategy is an improvement of the original Cluster, allowing to animate the clusters when the user changes the zoom level. [Read more](/2012/08/19/animated-marker-cluster-strategy-for-openlayers)...

![animatedcluest](../../blog/images/animatedcluest.png)

## OpenLayers Cookbook Examples

For the OpenLayers Cookbook I wrote a set of examples so the readers can also see in action and play with the code results.
 The initial work was placed at the PacktPublishing web site freely available. But, because nothing is forever, I made some improvements and changes in the original code. [Read more](/2012/12/04/openlayers-presentation-and-openlayers-cookbook-sample-code-update)...

![ol_source_code_examples](../../blog/images/ol_source_code_examples.png)

## SimplyWrite

[SimplyWrite](http://www.acuriousanimal.com/SimplyWrite/) is a free web distraction writing tool that recognizes the lightweight markup language [Markdown](http://en.wikipedia.org/wiki/Markdown), an easy-to-read, easy-to-write plain format which allow to enrich the text.. [Read more](/2013/04/29/simplywrite-a-free-web-distraction-writing-tool)...

![](../../blog/images/simplywrtie2.png)

## Stickies

Storing sticky notes on your machine with HTML5 and IndexedDBStickies was developed to have my custom sticky board where to place my notes. Similarly to SimplyWrite it makes use of IndexedDB capabilities so all the notes are stored in your local machine instead on a server. [Read more](/2011/08/12/local-storage-storing-sticky-notes-on-your-machine-with-html5)...

![stickies](../../blog/images/stickies.png)

---

# Contributions

## Heatmap

[Heatmap](http://www.patrick-wied.at/static/heatmapjs/) is a library to create density maps. It helps to visualize and quicly understand some kind of data, like temperatures in a map, number most click zones in a web pages, etc - [Read more](/2011/06/09/a-heatmaps-layer-for-openlayers/)...

![heatmap_ol](../../blog/images/heatmap_ol1.png)
