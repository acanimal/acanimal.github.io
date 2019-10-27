---
layout: post
title: Using more than one property file in Spring MVC
date: 2013-12-10 22:27
tags:
- java
- spring
---
Spring is one of the most important, powerful and also complex frameworks in the actual Java panorama.

<p>Unfortunately for me, I'm very forgetful so it is worth to write a post-reminder to increment the possibilities I never forget again something like this.</p>
<h3>Using property files in Spring</h3>
<p>Since Spring 3, the use of properties in our code was made really simple thanks to the placeholders.</p>
<p>Supposing a property file <code>my_config_1.properties</code> with next content:</p>
<pre class="prettyprint">prop1=Some property with some value
prop2=Some number here</pre>
<p>It is enough to add the next configuration element in our servlet configuration XML file:</p>
<pre class="prettyprint">&lt;context:property-placeholder location="classpath:my_config_1.properties"/&gt;</pre>
<p>Later, at any place of our program we can easily get the properties using <code>@Value</code> annotation:</p>
<pre class="prettyprint">@Value("${prop1}")
private String myProperty;</pre>
<h3>And what if you have more than one property files?</h3>
<p>Supposing we have a second property file <code>my_config_2.properties</code> with the values:</p>
<pre class="prettyprint">second_file_prop=This comes from the second file</pre>
<p>Spring allows to specify more than one properties file adding a new placeholder:</p>
<pre class="prettyprint">&lt;context:property-placeholder location="classpath:my_config_1.properties"/&gt;
&lt;context:property-placeholder location="classpath:my_config_2.properties"/&gt;</pre>
<p>The problem comes when you try to use the property from the second file, using <code>@Value("${second_file_prop}")</code>, Spring will throw an exception saying it can find the <code>second_file_prop</code> value. This is because Spring try to find the property in the first file and if it does not find it throws an error.</p>
<p>To avoid this ugly effect we need to use the <code>ignore-unresolvable</code> attribute in the placeholder:</p>
<pre class="prettyprint">&lt;context:property-placeholder location="classpath:my_config_1.properties" ignore-unresolvable="true"/&gt;
&lt;context:property-placeholder location="classpath:my_config_2.properties"/&gt;</pre>
<p>This way if Spring does not find a property in the first file it will continue looking at the second one.</p>
<h3>The order</h3>
<p>In addition, the placeholder element can use the <code>order</code> attribute that determines the order in which Spring must look at the files. So a good way to express the previous configuration is:</p>
<pre class="prettyprint">&lt;context:property-placeholder location="classpath:my_config_1.properties" order="1" ignore-unresolvable="true"/&gt;
&lt;context:property-placeholder location="classpath:my_config_2.properties" order="2" ignore-unresolvable="true"/&gt;</pre>
