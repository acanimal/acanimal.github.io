---
layout: post
title: A word about LESS
date: 2011-08-29 08:32
tags:
- css
- html5
- javascript
- webdesign
---
**Woow!!!** That is the word that best defines <a href="http://lesscss.org/">Less</a>.

<p>From time to time someone creates something really useful with a touch of magic. John Resig creates jQuery, not the only one neither the first one, but it is the most famous JavaScript library.</p>

<p>Now, <a href="http://cloudhead.io/">Alexis Sellier</a> (alias cloudhead) has created the amazing Less tool which can be defined as "The dynamic stylesheet language".</p>
<blockquote><p>LESS extends CSS with dynamic behavior such as variables, mixins, operations and functions</p></blockquote>
<h3></h3>
<h3>A brief sample</h3>
<p>Imagine a web project with many lines of CSS defining your nice styles about buttons, borders, backgrounds, etc. Image you have a nice #aaaaaa color shared among many elements (borders, text color, ...). What happends if you decide to change that color? you need to rewrite the color code on every place you put it.</p>
<p>The magic of Less allows you to define a color variable and use it around. Later if you decide to change the color, simply change the variable value.</p>
<h3>How it works?</h3>
<p>Instead create CSS files you need to create LESS files, they are similar to CSS bit more "powerful" (you can use variables, functions, ...).</p>
<p>Less library is responsible to read the LESS file and create a CSS file for you.</p>
<h3>How to use</h3>
<p>You can use LessCSS in different ways. Developing it is best to use the "dynamic" way, that is, include the Less JavaScript code in your page a LESS file and let Less code to create and "inject" the generated CSS in your page.</p>
<p>In a production environment, once set the LESS file, it is better to compile it to a CSS and incluthe this last.</p>
<p>&nbsp;</p>
