---
layout: post
title: Architexa product review
date: 2012-09-23 15:30
tags:
- java
- tools
---
Architexa product is an Eclipse plugin from <a href="http://www.architexa.com/">Architexa.com</a> company. As their web site say:
<blockquote><p>Architexa helps you understand and document large/complex Java code bases within Eclipse</p></blockquote>
<p>and allowing to create and explore diagrams that make sense.</p>

<a href="http://www.architexa.com/" rel="http://www.architexa.com/">
  <img class="alignleft" src="./images/logo-main2.gif" alt=""
  width="299" height="57" /></a>
  
<p>I have tried it really little but the conclusions are clear: Architexa is a tool with a great potential.</p>
<h2>Installation</h2>
<p>Installing Architexa is really easy because it is prepared as any other Eclipse plugin (see the <a href="http://www.architexa.com/learn-more/install">install</a> section).</p>
<p>I'm using Eclipse 4.2 (Juno) and the steps were:</p>
<ul>
<li>Go to <code>Help &gt; Install new software</code> and add a new place called architexa with the URL: <code>http://update.architexa.com/4.2/client</code>.<br />
<a href="./images/2012/09/architexa_02.png"><img class="aligncenter  wp-image-921" title="architexa_02" src="./images/architexa_02.png" alt="" width="360" height="362" /></a></li>
<li>Select the Architexa plugin and click next button until installation is done.</li>
</ul>
<p>Really easy, don't you?</p>
<p>After Eclipse restarts you will be asked for a valid Architexa user. Go to the <a href="http://www.architexa.com/learn-more/register">registration</a> page and register for a free license. That's all.</p>
<h2>Exploring a project</h2>
<p>To test Architexa I have opened a relatively small <a title="Downloading files from AEMET FTP server with Java and Apache Commons Net" href="//2011/03/06/downloading-files-from-aemet-ftp-server-with-java-and-apache-commons-net">maven project</a>, which allows to download files from an FTP server. It haven't a great domain model neither thousand of classes but has all the necessary to test the basic Architexa capabilities.</p>
<ul>
<li>Layered diagrams</li>
<li>Class diagrams</li>
<li>Sequence diagrams</li>
</ul>
<h2>The bad</h2>
<p>Before to continue, I must say Architexa seems to me a product with a great potential, but on the other hand it leaves me with bad feelings.</p>
<p>I prefer to comment all the bad things first so the good things comes later and the reader was left with a good feeling.</p>
<ul>
<li>The Architexta web site is IMO horrible and much more the personal area of each user (<a href="http://my.architexa.com/">http://my.architexa.com/</a>). In addition it seems not much stable, at least for me the profile and setting sections fails with a 500 server error.</li>
<li>Once Architexa is installed it needs to build an index from your code. Initially I don't built the index (when the tool ask me to do it) and after importing the project and building it by hand, it seems not work properly. For some reason my index was corrupted and I need to remove and import the project a couple of times before it woks.</li>
<li>The layered, class and sequence diagrams are powerful tools but the way to explore and navigate could be a bit more intuitive. In addition the shapes and colors used could be improved.</li>
</ul>
<p>As you can see the bad things are almost all related to design and visual aspects, not to the product functionality. Nothing a good web designer can solve.</p>
<p>My opinion for Architexa guys is: <strong>Architexa is a great product so make it looks like a great product</strong>.</p>
<h2>Working with the diagrams</h2>
<p>Because the project is a small the most useful diagrams has been the class and sequence diagrams.</p>
<p>In the case of class diagram I added some classes related to the task to download and read radar files. Once a class is added to the diagram you can make actions like:</p>
<ul>
<li>select which methods can be visible in the diagram</li>
<li>navigate from a method to other classes (<em>show called method</em>)</li>
<li>show which classes references a method (<em>show calling method</em>)</li>
</ul>
<p>Thanks to this actions you can explore the classes and its dependencies in both directions.<br />
<a href="./images/2012/09/architexa_04.png"><img class="aligncenter size-full wp-image-923" title="architexa_04" src="./images/architexa_04.png" alt="" width="971" height="303" /></a></p>
<p>The sequence diagram works in a similar way, you start adding a class or method and, for example, given a method add all the used methods from the same class or from other classes:</p>
<p><a href="./images/2012/09/architexa_05.png"><img class="aligncenter size-full wp-image-924" title="architexa_05" src="./images/architexa_05.png" alt="" width="946" height="645" /></a></p>
<p>Finally, in the layered diagram I have added some classes to see its dependencies. Easily we can see the classes and the packages they belong to.</p>
<p style="text-align: center;"><a href="./images/2012/09/architexa_03.png"><img class="aligncenter" title="architexa_03" src="./images/architexa_03.png" alt="" width="403" height="244" /></a></p>
<p>In addition, on any diagram you can select a class or method and navigate directly to the source code to see the corresponding lines of code.</p>
<h2>Conclusions</h2>
<p>As I commented previously Architexa is a tool with a great potential. It can help team members to understand better how code works or documenting processes.</p>
<p>As a future features I would like to suggest its integration with the debugger. First the possibility to highlight the current executed method on the class or sequence diagram. Second, the possibility to allow to create a diagram step by step while debugging, that is, selecting which methods or classes we want to add to the sequence diagram while advancing step by step in the code.</p>
<p>Congratulations to the Architexa team for their product !!!</p>
