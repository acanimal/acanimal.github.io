---
title: Generating map tiles without a map server. GeoTools the GIS swissknife.
pubDatetime: 2011-07-23T22:14:00Z
description: Recently I was playing with latest version of GeoServer. It includes the GeoWebCache, something which can improve your server performance greatly. GeoServer solves and helps lots of problems to work…
tags:
  - geotools
  - gis
  - java
---

Recently I was playing with latest version of [GeoServer](http://geoserver.org/). It includes the [GeoWebCache](http://geowebcache.org/), something which can improve your server performance greatly. GeoServer solves and helps lots of problems to work and visualize geospatial data but as you know map servers lakes from scalability.

Because this GeoWebCache is a great tool. Basically, each map request is processed and the result image is stored to be directly returned on subsequent requests. The processed images are stored as a pyramid of tiles depending on the bounding box or zoom level of the request.

Another way to solve scalability problems is directly pre-generate the pyramid of tiles, something that makes Google, Bing, Yahoo, OpenStreetMaps, etc.

### What I need?

I have a lightnings database with thousands of lightnings for a period of some months. I need to show lightnings in my maps but only those corresponding to a period or interval of time. For example, render the lightnings from 00:00h to 00:30h and allow the user to go forward or backward in time.

One important thing is I only need an "image" with the information in that period. I don't need to render each lightning as a feature in the map -this will degrade the performance rendering in a storm with thousands of lightnings per period.

### The problem

So why don't use GeoServer+GeoWebCache for this? I can configure a layer pointing to my lightning database, make requests and rest assured subsequent call will get the previously created map.

The problem is at this moment -while I write this post- GeoServer lakes from TIME support in requests. That means if I define a layer from my lightnings table on DB, every GeoServer request will work against all data while I only need a subset of my data -determined by an interval- to be rendered in the requested maps.

### Adopted solution

Ok, be quiet. GeoServer is build on top of [GeoTools](http://geotools.org/), an open source Java library which provides standards compliant methods for the manipulation of geospatial data and, more important, GeoTools library implements [Open Geospatial Consortium](http://www.opengeospatial.org) (OGC) specifications as they are developed.

![geotools logo](@/content/posts/images/geotools-logo.png)

With all this the solution seems easy: code a program to query the desired period of lightning data and generate a pyramid of tiles (for the desired levels).

##  A brief description of the implementation

Next is a brief summary of things to do, or take into account, to generate your own pyramid of tiles programmatically with Geotools.

All the lightnings information is stored on a PostgreSQL/PostGIS table called 'lightnings'. Data related with a lightning are: date (the UTC instant in which the lightning occurs, represented as a long number in [Unix time](http://en.wikipedia.org/wiki/Unix_time)), position (latitude/longitude/altitude), value and sign (the electric charge).

### Set the DataSource connection

GeoTools tries to simplify thing and because this it tries to abstracts as much as possible. Features can be provided from many source: files (shapefiles, GML, ...) or a database (PostgreSQL/PostGIS, Oracle, ...).

The first step then is to set a DataSource instance pointing to our database:

```java
Map<String, Object> params = new HashMap<String, Object>();
params.put(PostgisNGDataStoreFactory.DBTYPE.key, dbconn.getType());
params.put(PostgisNGDataStoreFactory.HOST.key, dbconn.getHost());
params.put(PostgisNGDataStoreFactory.PORT.key, dbconn.getPort());
params.put(PostgisNGDataStoreFactory.SCHEMA.key, "public");
params.put(PostgisNGDataStoreFactory.DATABASE.key, dbconn.getDatabase());
params.put(PostgisNGDataStoreFactory.USER.key, dbconn.getUser());
params.put(PostgisNGDataStoreFactory.PASSWD.key, dbconn.getPassword());
params.put(PostgisNGDataStoreFactory.EXPOSE_PK.key, true);

// Get lightning store
DataStore dataStore = DataStoreFinder.getDataStore(params);
SimpleFeatureSource sfs = dataStore.getFeatureSource("lightnings");
```

> Note: 'dbconn' is an object which stores my DB connection parameters.

### Filtering data

We don't want to get all the lightnings in the database but only those withing a period of tim, so what we need is to filter the data using Filter classes. Given a period of time represented by values 'long start\_date' and 'long end\_date' we can define the desired filter as:

```java
FilterFactory2 filterFactory = CommonFactoryFinder.getFilterFactory2(null);
// Create filter for specified initial and end dates
Filter filterStart = filterFactory.greaterOrEqual(filterFactory.property("date"), filterFactory.literal(start_date));
Filter filterEnd = filterFactory.less(filterFactory.property("date"), filterFactory.literal(end_date));
Filter filterTime = filterFactory.and(filterStart, filterEnd);
```

### Create styles before rendering for features

There are some ways to create styles for our features. One is to use a SLD document and the other is doing programmatically.

In my case, I chose to use the second form so here is a bit of cumbersome code (I ommited the try/catch section) which create the desired style to identify positive and negative lightnings.

```java
// Create style
StyleBuilder styleBuilder = new StyleBuilder();
StyleFactory styleFactory = styleBuilder.getStyleFactory();
FilterFactory2 filterFactory = styleBuilder.getFilterFactory();

// Style for Positivos
Graphic grP = styleFactory.createDefaultGraphic();
Mark markP = styleFactory.getCircleMark();
markP.setStroke(styleFactory.createStroke(filterFactory.literal(Color.BLUE), filterFactory.literal(1)));
markP.setFill(styleFactory.createFill(filterFactory.literal(Color.CYAN)));
grP.graphicalSymbols().clear();
grP.graphicalSymbols().add(markP);
grP.setSize(filterFactory.literal(5));

// Style for Negativos
Graphic grN = styleFactory.createDefaultGraphic();
Mark markN = styleFactory.getCircleMark();
markN.setStroke(styleFactory.createStroke(filterFactory.literal(Color.RED), filterFactory.literal(1)));
markN.setFill(styleFactory.createFill(filterFactory.literal(Color.ORANGE)));
grN.graphicalSymbols().clear();
grN.graphicalSymbols().add(markN);
grN.setSize(filterFactory.literal(5));

Filter filterPositiveValor = ff.and(filter, CQL.toFilter("value >= 0"));
Filter filterNegativeValor = ff.and(filter, CQL.toFilter("value < 0"));

// Create symbols and rules to render every feature
PointSymbolizer symPositivos = styleFactory.createPointSymbolizer(grP, null);
PointSymbolizer symNegativos = styleFactory.createPointSymbolizer(grN, null);

Rule ruleP = styleFactory.createRule();
ruleP.symbolizers().add(symPositivos);
ruleP.setFilter(filterPositiveValor);
FeatureTypeStyle ftsP = styleFactory.createFeatureTypeStyle(new Rule[]{ruleP});

Rule ruleN = styleFactory.createRule();
ruleN.symbolizers().add(symNegativos);
ruleN.setFilter(filterNegativeValor);
FeatureTypeStyle ftsN = styleFactory.createFeatureTypeStyle(new Rule[]{ruleN});

// Finally create out style
Style style = styleFactory.createStyle();
style.featureTypeStyles().add(ftsP);
style.featureTypeStyles().add(ftsN);
```

### Create the map and render to a file

The map creating is straightforward:

```java
MapContext map = new DefaultMapContext();
CoordinateReferenceSystem crs = CRS.decode("EPSG:3785");
map.setCoordinateReferenceSystem(crs);
```

and then render it to a file. I will paste here the code on the [GTRenderer tutorial](http://docs.geotools.org/latest/userguide/library/render/gtrenderer.html). You can play a bit with the code and change some values: area of interest, size of the output image, etc.

```java
public void saveImage(final MapContent map, final String file, final int imageWidth) {

    GTRenderer renderer = new StreamingRenderer();
    renderer.setMapContent(map);

    Rectangle imageBounds = null;
    ReferencedEnvelope mapBounds = null;
    try {
        mapBounds = map.getMaxBounds();
        double heightToWidth = mapBounds.getSpan(1) / mapBounds.getSpan(0);
        imageBounds = new Rectangle(
                0, 0, imageWidth, (int) Math.round(imageWidth * heightToWidth));

    } catch (Exception e) {
        // failed to access map layers
        throw new RuntimeException(e);
    }

    BufferedImage image = new BufferedImage(imageBounds.width, imageBounds.height, BufferedImage.TYPE_INT_RGB);

    Graphics2D gr = image.createGraphics();
    gr.setPaint(Color.WHITE);
    gr.fill(imageBounds);

    try {
        renderer.paint(gr, imageBounds, mapBounds);
        File fileToSave = new File(file);
        ImageIO.write(image, "jpeg", fileToSave);

    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}
```

# Conclusions

Every tool is designed and built with a goal in mind, because this normally the use of a map server is always the proper selection. But sometimes you have specific needs that general tools doesn't solve and here is when open source project like GeoTools can help you.

I would to note that programing this way the image generation is much more faster than use of GeoServer because we are avoiding lots of intermediate steps a map server does: get request, parse, check and validate parameters and once query is executed, image composed it must be returned to the client via HTTP protocol.

# References

[http://docs.geotools.org](http://docs.geotools.org)

[http://docs.geotools.org/latest/userguide/library/render/gtrenderer.html](http://docs.geotools.org/latest/userguide/library/render/gtrenderer.html)

[http://docs.geotools.org/stable/tutorials/filter/query.html](http://docs.geotools.org/stable/tutorials/filter/query.html)
