---
layout: post
title: 'PhoneGap on iOS: an stupid advertisement using the "create" command line tool'
date: 2012-09-11 16:20
tags:
- ios
- jquerymobile
- phonegap
- tricks
---
Some days ago I start my first mobile application. Nothing awesome, it is a simply excuse to test <a href="http://jquerymobile.com/">jQuery Mobile </a>and <a href="http://phonegap.com/">PhoneGap</a> frameworks.

This post is not oriented to describe my impressions, that would be another day, but describe an stupid headache I have when trying to install the PhoneGap framework in my MacOSX.

<p>Lets go. I have coded my application like a normal web application, then I have follow the steps described <a href="http://docs.phonegap.com/en/2.0.0/guide_getting-started_ios_index.md.html#Getting%20Started%20with%20iOS">here</a> to install the PhoneGap with XCode. All right, now is the moment to set up my project with the <code>create</code> command line tool and... wait !!!</p>
<pre class="prettyprint lang-bsh">./create ~/Documents/Personal\ Projects/Viendo com.acanimal.Viendo Viendo</pre>
<p>and the result is:</p>
<pre class="prettyprint lang-bsh">usage: cp [-R [-H | -L | -P]] [-fi | -n] [-apvX] source_file target_file
cp [-R [-H | -L | -P]] [-fi | -n] [-apvX] source_file ... target_directory</pre>
<p>The <code>create</code> tool is a simple bash script that copies the content from <code>template/project</code> to the specified destination, see:</p>
<pre class="prettyprint lang-bsh">
...
# copy the files in; then modify them
cp -R $BINDIR/templates/project $PROJECT_PATH
...
</pre>
<p>where <code>$PROJECT_PATH</code> points to the destination folder we have specified previously.</p>
<p>I tried to escape the command, add double quotes, etc without much success and finally my I'm-not-a-hacker-solution has been to change the name of the destination folder to <code>PersonalProjects</code> (without whitespaces) (Really I don't remember why I put a whitespace in the name I never use whitespaces in the names).</p>
<p>If any good command line user arrives here, please send me some alternative. </p>
