---
layout: post
title: Using webpack with an ExpressJS application
date: 2015-09-07 07:24
tags:
- webpack
- howto
- expressjs
- nodejs
---

It seems we are living an gold era about JavaScript and front end world with a myriad of frameworks, language improvements and, what is related to this article, build systems, tasks runner or whatever you want to call them.
We have adepts to [Grunt](http://gruntjs.com/), firm believers of [Gulp](http://gulpjs.com/) or purists preferring the use of old fashion [npm scripts](https://docs.npmjs.com/misc/scripts) way.

Well, I'm sorry for all of you but there is a new kid on the block and it is (IMO) a really strong competitor. It's name is [webpack](http://webpack.github.io/) and it is a module bundler. OMG !!! A module what?

## What is webpack ?

Webpack is a module bundler. It has nothing to do with a tasks runner, although in many cases can substitute the need of gulp or grunt. Webpack understands about modules and its dependencies (among JavaScript files, CSS or whatever) and generates assets.



## The scene

We are working on a web site using node+express for the backend. We have the need  









```javascript
"use strict";

var Webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanPlugin = require("clean-webpack-plugin");
var path = require("path");

var nodeModulesPath = path.resolve(__dirname, "node_modules");
var assetsPath = path.resolve(__dirname, "public", "assets");
var mainPath = path.resolve(__dirname, "client");
var packageVersion = require("./package.json").version;

var config = {

  // Genera source maps
  devtool: "eval",

  // Entrades per les diferents "apps" (una per pagina.).
  entry: {
    "temps-ara": path.resolve(mainPath, "temps-ara.js"),
    "prediccio-per-dies": path.resolve(mainPath, "prediccio-per-dies.js")
  },
  output: {
    // Directori de sortida dels assets
    path: assetsPath,
    filename: "[name].[hash].js",
    chunkFilename: "[name].chunk.js",

    // Path de la URL publica a partir del qual estaran accesibles.
    // Exemple: http://localhost:8888/assets/
    // TODO - Modificar segun estemos en produccion o desarrollo
    publicPath: "/assets/"
  },
  module: {
    loaders: [
      // Los modulos CSS requeridos por algun "entry" son extraidos y almacenados
      // en el fichero style.css.
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$|\.sass$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: /\.png$|\.svg$|\.jpg$|\.gif$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.eot$|\.woff$|\.ttf$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    // Netejem directori de sortida en cada build
    // Nota: "assetsPath" es absolut i necessitem indicar el segon parameter "context"
    // per indicar el rootPath.
    new CleanPlugin([assetsPath], "/"),
    // Extraemos los CSS a un fichero de estilos
    new ExtractTextPlugin("style.[hash].css"),
    // Minimizamos codigo JavaScript
    // TODO - Minimizar en produccion
    // new Webpack.optimize.UglifyJsPlugin({minimize: true}),
    // Generamos paginas HTML con referencias a los assets
    new HtmlWebpackPlugin({
      packageVersion: packageVersion,
      inject: false,
      template: "views/webpack/link-css.webpack.nunjucks.html",
      filename: "../../views/generated/link-css.nunjucks.html"
    }),
    new HtmlWebpackPlugin({
      packageVersion: packageVersion,
      inject: false,
      template: "views/webpack/link-js.webpack.nunjucks.html",
      filename: "../../views/generated/link-js_temps-ara.nunjucks.html",
      chunks: ["temps-ara"]
    }),
    new HtmlWebpackPlugin({
      packageVersion: packageVersion,
      inject: false,
      template: "views/webpack/link-js.webpack.nunjucks.html",
      filename: "../../views/generated/link-js_prediccio-per-dies.nunjucks.html",
      chunks: ["prediccio-per-dies"]
    })
  ]
};

module.exports = config;
```
