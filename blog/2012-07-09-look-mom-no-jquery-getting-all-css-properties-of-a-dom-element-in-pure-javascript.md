---
layout: post
title: Look mom no jQuery !!! Getting all CSS properties of a DOM element in JavaScript
date: 2012-07-09 22:25
tags:
- css
- html
- javascript
- jquery
- tricks
---
Getting and setting CSS properties is a simple task. We can make it in pure JavaScript:

<pre class="prettyprint">var color = domElem.style.color;    // Get color
domElem.style.color='blue';    // Set new color</pre>
<p>Using jQuery it can be done with the <code>$.css()</code> method:</p>
<pre class="prettyprint">var color = $(domElem).css('color');    // Get color
$(domElem).css('color', 'blue');    // Set new color</pre>
<blockquote><p>The recent <a href="http://jquerypp.com/">jQuery++</a> project claims to have a <code>$.styles()</code> method fastest than <code>$.css()</code> one.</p></blockquote>
<p>The issue is: <strong>How to get all the styles of a given DOM element?</strong> Not only those applied directly with the <code>style</code> attribute but those applied using CSS classes.</p>

<h2>The solution</h2>
<p>Next code retrieves an object with all the style properties of a given DOM element, no matter if they were specified in CSS classes or withint the style attribute of the element.</p>
<p>The idea behind the code is simply: we invoke the browser function that computes the whole element's style or, if it is not possible, retrieves the CSS properties from the <code>style</code> attribute.</p>
<pre class="prettyprint">    function getComputedStyle( dom ) {
        var style;
        var returns = {};
        // FireFox and Chrome way
        if(window.getComputedStyle){
            style = window.getComputedStyle(dom, null);
            for(var i = 0, l = style.length; i &lt; l; i++){
                var prop = style[i];
                var val = style.getPropertyValue(prop);
                returns[prop] = val;
            }
            return returns;
        }
        // IE and Opera way
        if(dom.currentStyle){
            style = dom.currentStyle;
            for(var prop in style){
                returns[prop] = style[prop];
            }
            return returns;
        }
        // Style from style attribute
        if(style = dom.style){
            for(var prop in style){
                if(typeof style[prop] != 'function'){
                    returns[prop] = style[prop];
                }
            }
            return returns;
        }
        return returns;
    };</pre>
<p>The code works (or must work) on any browser. For FireFox and Chrome browser the right way to get the computed style is through the window.getComputedStyle() method, while on IE and Opera browsers the dom.currentStyle property is the right place.</p>
