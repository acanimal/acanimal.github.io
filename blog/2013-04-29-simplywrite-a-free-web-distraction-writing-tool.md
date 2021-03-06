---
layout: post
title: SimplyWrite, a free web distraction writing tool
date: 2013-04-29 21:26
tags:
- backbone
- bootstrap
- codemirror
- grunt
- grunt-bbb
- javascript
---
I like to write and I like programming so the obvious consequence were to write some tool to write. More or less this is the history of <a href="http://www.acuriousanimal.com/SimplyWrite">SimplyWrite</a>.

<p><em><strong><a href="http://www.acuriousanimal.com/SimplyWrite">SimplyWrite</a> is a free web distraction writing tool that recognizes the lightweight markup language <a href="http://en.wikipedia.org/wiki/Markdown">Markdown</a>, an easy-to-read, easy-to-write plain format which allow to enrich the text.</strong></em></p>
<p style="text-align: center;"><img class="aligncenter  wp-image-1358" alt="" src="./images/simplywrtie2.png" width="640" height="258" /></p>
<h2>Features</h2>
<ul>
<li>Auto show/hide of menus to allow a clean working area.</li>
<li>Show <em>working</em> and <em>total</em> timer. <em>Total timer</em> counts the time since you open <a href="http://www.acuriousanimal.com/SimplyWrite">SimplyWrite</a>. <em>Working timer</em> counts the time you have set active the <a href="http://www.acuriousanimal.com/SimplyWrite">SimplyWrite</a> page.</li>
<li>Count lines, words and characters.</li>
<li>Export your writes to a new page, ready to be saved.</li>
<li>Allow to configure font family and size.</li>
<li><a href="http://www.acuriousanimal.com/SimplyWrite">SimplyWrite</a> stores all your writes on the client side. It makes use of the HTML5 <a href="http://www.html5rocks.com/en/features/storage">local storage</a> feature so no server is required.</li>
</ul>
<blockquote><p>Be careful with this feature. You can lost your data if you manually clean the broswer cached data and also browser cleans the local storage area automatically when the space used grown over some value (like 500mb).</p></blockquote>
<p>The source code of <a href="https://github.com/acanimal/SimplyWrite">SimplyWrite is available at GitHub</a> under MIT license. Feel free to contribute.</p>
<h2>The Design</h2>
<p>I would like to specially mention the fact the <a href="http://www.acuriousanimal.com/SimplyWrite">SimplyWrite</a> design was made by my friend <a href="http://guillemsevilla.cat/">Guillem Sevilla</a> (<a href="https://twitter.com/gllmsvll">@gllmsvll</a>) a great minimalism designer !!!</p>
<h2>Technology</h2>
<p><a href="http://www.acuriousanimal.com/SimplyWrite">SimplyWrite</a> has been a nice challenge for me. It gives me the opportunity to work with the next tools:</p>
<ul>
<li><span style="line-height: 13px;"><a href="http://gruntjs.com/">grunt</a>, the awesome JavaScript task runner. It allows, among others, to minimize and concatenate files.</span></li>
<li><a href="https://github.com/backbone-boilerplate/grunt-bbb">grunt-bbb</a>, the grunt Backbone Boilerplate Build extension. Simplifies the work with Backbone framework.</li>
<li><a href="http://backbonejs.org/">backbone</a>, a lightweight MVC framework.</li>
<li><a href="https://github.com/tbranyen/backbone.layoutmanager">backbone.layoutmanager</a>, an extension of backbone to improve the work with views.</li>
<li><a href="http://codemirror.net/">CodeMirror</a>, an awesome code editor component for the browser.</li>
<li><a href="http://twitter.github.io/bootstrap/">Bootstrap</a>, a front-end framework used for the UIX.</li>
</ul>
