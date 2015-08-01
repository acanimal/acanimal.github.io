---
layout: post
title: Generate and host your own raster tiles customized with Mapbox Studio
date: 2015-07-26 16:47
tags:
- gis
- tools
---

If you have never saw maps hosted in Mapbox platform you would probably agree on the quality of its designs. The business of [Mapbox](https://www.mapbox.com/) is to host and server geospatial data. For this reason, all the great tools Mapbox facilitates are oriented to help their users to prepare and work with their data.

One of the provided tools is [Mapbox Studio](https://www.mapbox.com/mapbox-studio/). Mapbox Studio (MbS) is a desktop application that allows to create [CartoCSS](https://www.mapbox.com/guides/cartocss-in-studio/) themes that are later used to generate raster tiles. Briefly explained, what MbS does is to download OpenStreetMap data in vector format and render it on the fly applying the specified CartoCSS style.

The result of working with MbS is not a set of tiles but a style, that is, a set of rules that express which colour must be used to render roads, at which levels must labels appears and with which size, which colour must be used for ground, etc. This style can be later uploaded to Mapbox platform so that raster tiles were generated on the cloud and we can consume the tiles paying for the service. (Hope one day I can contract their services, they deserve by their great job).

The question we can make us is: _**how we can generate the raster tiles locally from a given MbS style?**_

Well, this article is about that. Continue reading.

## Working with Mapbox Studio and create your custom style

Let's start from the beginning so [download](https://www.mapbox.com/mapbox-studio/) Mapbox Studio application and install on your system. Once installed execute it and you will be asked to be connected to the Mapbox platform.![]({{ site.baseurl }}assets/uploads/Screen-Shot-2015-07-25-at-23.43.15-1024x680.png)

There are two main reasons why Mapbox requires you to register as a user. First, the power of the platform is on the cloud and the goal is you upload all your data to the servers. That includes the styles you create.

Second, MbS retrieves data in vector format from Mapbox servers. When you register as a user you get an API token that identifies your requests. Each time MbS makes a request to extract data it has your token that identifies you as user. This way Mapbox can control if any user is making a bad usage of their platform.  
![Screen Shot 2015-07-25 at 23.43.26]({{ site.baseurl }}assets/uploads/Screen-Shot-2015-07-25-at-23.43.26-1024x680.png)

Once logged in you will be allowed to create new map styles. The easiest way is to start using one of the starter styles created by the great Mapbox designers:

![Screen Shot 2015-07-25 at 23.47.38]({{ site.baseurl }}assets/uploads/Screen-Shot-2015-07-25-at-23.47.38-1024x680.png)

Here we have chose the _Mapbox Outdoors_ style. In the image you can see the style code (CartoCSS which is inspered by CSS) and the resultant tiles obtaining from painting the vector information with the given style rules:

> [CartoCSS](http://wiki.openstreetmap.org/wiki/CartoCSS) is a [Mapnik](http://wiki.openstreetmap.org/wiki/Mapnik "Mapnik") [stylesheet](http://wiki.openstreetmap.org/wiki/Stylesheet "Stylesheet") pre-processor developed by [MapBox](http://wiki.openstreetmap.org/wiki/MapBox "MapBox") and inspired by [Cascadenik](http://wiki.openstreetmap.org/wiki/Cascadenik "Cascadenik"). It is like a CSS language specially developed to style maps.

![Screen Shot 2015-07-25 at 23.54.20]({{ site.baseurl }}assets/uploads/Screen-Shot-2015-07-25-at-23.54.20-1024x680.png)

Store the style with a new name somewhere on your computer, for example, `customstyle`. If you look at your disk you will see a `customstyle.tm2` folder has been created containing a bunch of files that defines the style rules (take a look they are not dangerous).

Finally, modify some properties, for example `@land` or `@crop` colors and save to see the result:

![Screen Shot 2015-07-25 at 23.54.47]({{ site.baseurl }}assets/uploads/Screen-Shot-2015-07-25-at-23.54.47-1024x680.png)

Great !!! You just have created your first custom style.

## Generating raster tiles from MbS style

Looking for a solution I discovered the [tessera](https://github.com/mojodna/tessera) and [tl](https://github.com/mojodna/tl) tools. _Tessera_ is a node based command line application. It is based in some modules from mapbox (concretely tilelive) plus others implemented by the author ([Seth Fitzsimmons](https://github.com/mojodna)). The result is we can execute tessera passing a MbS defined style, open a browser pointing to a local address and see a map with the raster tiles generated with our MbS style.

Similarly, _tl_ is a node based command line tool we can execute, passing a set of options, to generate a [MBTiles](https://www.mapbox.com/guides/an-open-platform/#mbtiles) file or a pyramid of tiles following the well known `z/x/y.png` format.

> I know about both tools at the article [Converting Mapbox Studio Vector Tiles to Rasters](http://www.azavea.com/blogs/labs/2015/05/converting-mapbox-studio-vector-tiles-to-rasters/) from [Azavea](http://www.azavea.com/) Labs.

### How to install the tools?

_**NOTE**: You need to have [NodeJS](https://nodejs.org/) installed in your system, along with the npm package manager command line tools._

I don't like to install global node packages (or at least more than the necessary) so I'm going to install the previous tools in a custom folder:

{% highlight bash %}
> mkdir tiletools
> cd tiletools
{% endhighlight %}

Inside the directory execute next sentence, which install the `tessera` and `tl` packages among others:

{% highlight bash %}
> npm install tessera tl mbtiles mapnik tilelive tilelive-file tilelive-http tilelive-mapbox tilelive-mapnik tilelive-s3 tilelive-tmsource tilelive-tmstyle tilelive-utfgrid tilelive-vector tilejson
{% endhighlight %}

You will see a hidden directory named `.npm_modules` has been created which contains some subdirectories with the same name as the previous packages.

### Running tessera

Let's try to run tessera for the first time. Because it is installed as a local node module execute:

{% highlight bash %}
> ./node_modules/tessera/bin/tessera.js

Usage: node tessera.js [uri] [options]

uri     tilelive URI to serve

Options:
   -C SIZE, --cache-size SIZE          Set the cache size (in MB)  [10]
   -c CONFIG, --config CONFIG          Provide a configuration file
   -p PORT, --port PORT                Set the HTTP Port  [8080]
   -r MODULE, --require MODULE         Require a specific tilelive module
   -S SIZE, --source-cache-size SIZE   Set the source cache size (in # of sources)  [10]
   -v, --version                       Show version info

A tilelive URI or configuration file is required.
{% endhighlight %}

Tessera requires you pass an URI so it can server its content. It accepts URIs from Mapbox hosted file, Mapnik, Tilemill, Mapbox Studio, ...

Repeat again indicating the path to our previously created style indicating the protocol `tmstyle://`.

{% highlight bash %}
> ./node_modules/tessera/bin/tessera.js tmstyle://./customstyle.tm2
Listening at http://0.0.0.0:8080/

/Users/antonio/Downloads/tiletools/node_modules/tessera/server.js:43
        throw err;
              ^
Error: A Mapbox access accessToken is required. `export MAPBOX_ACCESS_TOKEN=...` to set.
...
{% endhighlight %}

First seems tessera is working at port 8080 but later we get an error about `MAPBOX_ACCESS_TOKEN`. If you remember from the first section, Mapbox requires all the requests be signed with the user token. So, you need to get the access token from your account and set it as environment variable before execute tessera:

{% highlight bash %}
> export MAPBOX_ACCESS_TOKEN=your_token_here
> ./node_modules/tessera/bin/tessera.js tmstyle://./customstyle.tm2
Listening at http://0.0.0.0:8080/

/Users/antonio/Downloads/tiletools/node_modules/tessera/server.js:43
        throw err;
              ^
Error: Failed to find font face 'Open Sans Bold' in FontSet 'fontset-0' in FontSet
{% endhighlight %}

We are close to make it work. The problem now is our MbS style is using a font we have not installed in our system. One easy, but brute force, solution is to install all Google Web Fonts on your system. For this purpose you can use the [Web Font Load](http://webfontload.com/) installation script. In my case I have installed them in the user's fonts folder `~/Library/Fonts`.

Once fonts were installed try executing tessera again:

{% highlight bash %}
> ./node_modules/tessera/bin/tessera.js tmstyle://./customstyle.tm2
Listening at http://0.0.0.0:8080/

/Users/antonio/Downloads/tiletools/node_modules/tessera/server.js:43
        throw err;
              ^
Error: Failed to find font face 'Open Sans Bold' in FontSet 'fontset-0' in FontSet
{% endhighlight %}

That' s a bit strange, we have just installed the fonts but they are not found. What is happening? Well, tessera uses mapnik to create the raster tiles and it looks for fonts in the folders specified by the environment variable `MAPNIK_FONT_PATH`, so let define the variable:

{% highlight bash %}
> export MAPNIK_FONT_PATH=~/Library/Fonts/
{% endhighlight %}

and execute the script again:

{% highlight bash %}
> ./node_modules/tessera/bin/tessera.js tmstyle://./customstyle.tm2
Listening at http://0.0.0.0:8080/

/Users/antonio/Downloads/tiletools/node_modules/tessera/server.js:43
        throw err;
              ^
Error: Failed to find font face 'Arial Unicode MS Regular' in FontSet 'fontset-0' in FontSet
{% endhighlight %}

OMG !!! This seems a never ending story. Now we need to install the Arial Unicode font. [Look for it](https://code.google.com/p/tuanphamvu/downloads/detail?name=Arial%20Unicode%20MS.rar&can=2&q=), install in your system and execute tessera again:

{% highlight bash %}
> ./node_modules/tessera/bin/tessera.js tmstyle://./customstyle.tm2
Listening at http://0.0.0.0:8080/
{% endhighlight %}

Great !!! It seems tessera is working fine. Let's go to open our browser pointing to `http://localhost:8080` and see the result:

![]({{ site.baseurl }}assets/uploads/Screen-Shot-2015-07-26-at-16.01.43.png)

A map implemented using Leaflet web mapping library is shown, rendering raster tiles that are created in the fly. Look at the console to see the tessera output information:

![]({{ site.baseurl }}assets/uploads/Screen-Shot-2015-07-26-at-16.03.20.png)

We can see how tiles at current zoom, the zoom level 8, has been generated.

At this point we have tessera working but what about generate a local pyramid of tiles for a given zoom levels and a given bounding box?

### Generating a custom pyramid of tiles with tl command line tool

Before continue we need to know which bounding box we want to generate, the whole World? or only a piece. In my case I want three zoom levels (7, 8 and 9) wrapping Catalonia.

There are some online tools you can use to get the bbox of a region, but one I like it the [Bounding Box Tool](http://boundingbox.klokantech.com/) from [Klokan Technologies](http://www.klokantech.com/).

The tl tool can run three main commands but are only interested in the copy one, which copies data between two providers. In our case the MbS style is one provider and the file system is the other. Run the tl command to see the available options:

{% highlight bash %}
> ./node_modules/tl/bin/tl.js copy --help

Usage: node tl.js copy <source> <sink> [options]

source     source URI
sink       sink URI

Options:
   -v, --version                 Show version info
   -b BBOX, --bounds BBOX        WGS84 bounding box  [-180,-85.0511,180,85.0511]
   -z ZOOM, --min-zoom ZOOM      Min zoom (inclusive)  [0]
   -Z ZOOM, --max-zoom ZOOM      Max zoom (inclusive)  [22]
   -r MODULE, --require MODULE   Require a specific tilelive module
   -s SCHEME, --scheme SCHEME    Copy scheme  [scanline]
   -i FILE, --info FILE          TileJSON

copy data between tilelive providers
{% endhighlight %}

So let's go to execute the command to copy data from our MbS style to the local `tiles` folder. We want to generate tiles from zoom level 7 to 9 and indicating a bounding box wrapping Catalonia.

> Remember the `-b` options must be indicated as `[minLon minLat maxLon maxLat]`.

{% highlight bash %}
> ./node_modules/tl/bin/tl.js copy -z 7 -Z 9 -b "0.023293972 40.4104003077 3.6146087646 42.9542303723" tmstyle://./customstyle.tm2/ file://./tiles
Segmentation fault: 11
{% endhighlight %}

Ough !!! That hurts, a segmentation fault. After looking for a while I realised it [seems a bug](https://github.com/mojodna/tessera/issues/9). To solve it go to `tl/node_modules/abaculus/node_modules` and remove the `mapnik` folder dependency. It is redundant because there is one installed in parent folder.

Execute the command again and see the output:

![]({{ site.baseurl }}assets/uploads/Screen-Shot-2015-07-26-at-16.27.56.png)

The tl tool has created a local tiles directory and generated all the raster tiles for the given zoom levels and bounding box. The output shows in addition the time required to generate each tile.

That's all. Now we only need to host the tiles at our own servers !!!
