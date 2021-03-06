---
layout: post
title: 'notemarklet: Transform selected element into a sticky note'
date: 2011-02-09 22:59
tags:
- bookmarklet
- javascript
- tools
---
<a href="http://en.wikipedia.org/wiki/Bookmarklet">Bookmarklets</a> are nothing new but I never created one. There are tons of available bookmarklets to make tons of useful little things but here is my little but nice bookmarklet :) called <strong><em><a href="javascript:(function() {       if (!window.notemarkletDiv) {         window.notemarkletDiv = {};     }       var notemarklet = window.notemarklet;     var notemarkletDiv = null;       function createnotemarkletDiv() {         notemarkletDiv = document.createElement('div');         notemarkletDiv.style.position = 'absolute';         notemarkletDiv.style.display = 'none';         notemarkletDiv.style.border = '1px solid #DEE184';         notemarkletDiv.style.borderRadius = '1px';         notemarkletDiv.style.padding = '0px';         notemarkletDiv.style.margin = '0px';         notemarkletDiv.style.backgroundColor = '#F4F39E';         notemarkletDiv.style.opacity = '0.4';         notemarkletDiv.style.zIndex = 9999;         notemarkletDiv.style.boxShadow = '3px 3px 6px #000';         notemarkletDiv.style.webkitBoxShadow = '3px 3px 6px #000';         notemarkletDiv.style.mozBoxShadow = '3px 3px 6px #000';         notemarkletDiv.style.background = '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#EBEB00), to(#C5C500))';         document.getElementsByTagName('body')[0].appendChild(notemarkletDiv);     };       var previousTarget = null;     function notemarkElement(event) {         if(!notemarkletDiv) {             createnotemarkletDiv();         }         setTimeout(function(){             previousTarget = target;             notemarkletDiv.style.display = 'none';               var target = event.target;             var targetRect = target.getBoundingClientRect();             notemarkletDiv.style.top = (window.pageYOffset+targetRect.top-5)+'px';             notemarkletDiv.style.left = (window.pageXOffset+targetRect.left-5)+'px';             notemarkletDiv.style.width = (targetRect.right-targetRect.left+10)+'px';             notemarkletDiv.style.height = (targetRect.bottom-targetRect.top+10)+'px';         }, 200);         setTimeout(function(){             notemarkletDiv.style.display = 'block';         }, 500);     };       document.addEventListener('mousemove', notemarkElement, false); })();">notemarklet</a></em></strong> that helps reading marking the element under the mouse and changing its looks as a sticky note. Next there are a couple of samples:

<p style="text-align: center;"><img class="aligncenter size-full wp-image-184" title="notemarker1" src="./images/notemarker1.png" alt="" width="782" height="136" /><a href="./images/2011/02/notemarker2.png"></a></p>
<p style="text-align: left;">As you can see notemarker can help you reading text pages. It is a pure JavaScript code without the need of external libraries. So not expect great effects.</p>
<p style="text-align: center;"><a href="./images/2011/02/notemarker2.png"><img class="aligncenter size-full wp-image-185" title="notemarker2" src="./images/notemarker2.png" alt="" width="530" height="231" /></a></p>
<p style="text-align: left;"><a href="./images/2011/02/notemarker2.png"></a>Next is the source code.</p>
<p style="text-align: left;">To use this bookmarlet simply create a new bookmark on your broser and paste the next code as URL. Looking at source code, you can learn how to get the current target element under the mouse, its position, dimensions, etc.</p>
<p style="text-align: left;">
<pre class="brush:js">javascript:(function() {

    if (!window.notemarkletDiv) {
        window.notemarkletDiv = {};
    }

    var notemarklet = window.notemarklet;
	var notemarkletDiv = null;

	function createnotemarkletDiv() {
        notemarkletDiv = document.createElement('div');
        notemarkletDiv.style.position = 'absolute';
        notemarkletDiv.style.display = 'none';
        notemarkletDiv.style.border = '1px solid #DEE184';
        notemarkletDiv.style.borderRadius = '1px';
        notemarkletDiv.style.padding = '0px';
        notemarkletDiv.style.margin = '0px';
        notemarkletDiv.style.backgroundColor = '#F4F39E';
        notemarkletDiv.style.opacity = '0.4';
        notemarkletDiv.style.zIndex = 9999;
		notemarkletDiv.style.boxShadow = '3px 3px 6px #000';
		notemarkletDiv.style.webkitBoxShadow = '3px 3px 6px #000';
		notemarkletDiv.style.mozBoxShadow = '3px 3px 6px #000';
		notemarkletDiv.style.background = '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#EBEB00), to(#C5C500))';
		document.getElementsByTagName('body')[0].appendChild(notemarkletDiv);
    };

	var previousTarget = null;
	function notemarkElement(event) {
		if(!notemarkletDiv) {
	    	createnotemarkletDiv();
		}
		setTimeout(function(){
			previousTarget = target;
			notemarkletDiv.style.display = 'none';

			var target = event.target;
			var targetRect = target.getBoundingClientRect();
	        notemarkletDiv.style.top = (window.pageYOffset+targetRect.top-5)+'px';
	        notemarkletDiv.style.left = (window.pageXOffset+targetRect.left-5)+'px';
	        notemarkletDiv.style.width = (targetRect.right-targetRect.left+10)+'px';
	        notemarkletDiv.style.height = (targetRect.bottom-targetRect.top+10)+'px';
		}, 200);
		setTimeout(function(){
			notemarkletDiv.style.display = 'block';
		}, 500);
	};

	document.addEventListener('mousemove', notemarkElement, false);
})();</pre>
<p style="text-align: left;">I think code is really simple and self explanatory. Only note the use of  <em>getBoundingClientRect</em> function to get target position and dimension. Also, take into account, to avoid modifying the target element we create a new div element that overlaps the target.</p>
<p style="text-align: left;">Simple, easy and useful... anything more?</p>
