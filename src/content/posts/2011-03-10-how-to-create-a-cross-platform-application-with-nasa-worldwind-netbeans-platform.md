---
title: How to Create a Cross-Platform Application with NASA WorldWind & NetBeans Platform
pubDatetime: 2011-03-10T22:46:00Z
description: This post is a mini tutorial on how to create an application based on NetBeans Platform that uses the WorldWind Java virtual globe. Before to continue, you need to have some knowledge about NetBeans…
tags:
  - java
  - netbeans rcp
  - wwj
---

This post is a mini tutorial on how to create an application based on NetBeans Platform that uses the WorldWind Java virtual globe. Before to continue, you need to have some knowledge about NetBeans Platform, WWJ and JOGL.

## About NetBeans Platform

[NetBeans Platform](http://platform.netbeans.org/), similar to Eclipse RCP, is a platform which offers a set of basic functions and functionallities that are common in almost all project. The most clear examples of applications developed with these platforms are NetBeans IDE and Eclipse IDE themselves.

In the case of NetBeans Platform some features that likes me are:

- 100% Swing.
- Modular runtime container.
- Plugin support.
- Window system.
- Support handling actions, files and many other things typical in applications.
- Active project, decent documentation and great forum activity.

## About WorldWind Java

[WordlWind Java](http://worldwind.arc.nasa.gov/java/) is a Java API to create and work with a virtual globe, something common on these days and not so easy to implement.

In contrast to WorldWind .NET which is a desktop application, WWJ is only an API, a set of classes you can use to create your own based application.

One impotant thing is WWJ works thanks to [JOGL](http://kenai.com/projects/jogl/pages/Home) (Java binding for OpenGL API), which is a Java API to work with OpenGL and that uses a native library implementation depending on your system.

## ...and what is the problem?

Nice question. Ok, if we can say there is any problem it will be: **how to create a NetBeans module which includes the JOGL JAR files and also the native libraries so my application will be portable?**

Follow the next steps and you will see there is not problem to achieve that.

## Environment and requisites

Here is the list of software and versions I'm using for this example:

- NetBeans IDE 6.7.
- WorldWind Java 0.6 ([build 263.12713](http://builds.worldwind.arc.nasa.gov/releases/worldwind-0.6.263.12713.zip)).
- JOGL ([version 1.1.1a](http://download.java.net/media/jogl/builds/archive/jsr-231-1.1.1a/)). I downloaded versions for Linux and Windows to test the application on two platforms.

Install NetBeans if you don't have installed. Download WWJ and JOGL and uncompress it at some place.

## How to create the application

Ok next is the important part of this article. The basic idea is to create a new NetBeans Platform application with two library modules, containing required JAR files for JOGL and WorldWindJava:

1.  **Step 1**: Create a NetBeans Platform Application: ![sshot01](@/content/posts/images/sshot01.png)
2.  **Step 2**: Create a library wrapper module for WWJ: ![sshot02](@/content/posts/images/sshot02.png)Select the worlwind.jar file from WWJ folder. This will create a module into your NB platform application with the next folder structure:![sshot03](@/content/posts/images/sshot03.png)
3.  **Step 3**: Create a library wrapper module JOGL:Select the jogl.jar and gluegen.jar files from JOGL folder. In addition to the previous step, here we need to include the native libraries JOGL needs to run. To do that you must to create a folder called release/modules/lib and copy the native libraries.![sshot04](@/content/posts/images/sshot04.png)  
    In the above image you can se the \*.so files which corresponds only to the Linux native libraries. To make your application portable to other systems you must need to copy here the required \*.dll or any other files.
4.  **Step 4**: Create a normal module.This module will contain the code to create a TopComponent window which will show the WWJ virtual globe:

    ![sshot05](@/content/posts/images/sshot05.png)

5.  **Step 5**: Set modules dependencies.What you need to do now is to set the dependecies among the modules. WWJ module depends on JOGL one and your previous normal module will depend on WWJ and JOGL, because it will show a window with the virtual globe.
6.  **Step 6**: In the previous module create a new TopComponent Window using the wizard: Right-click on the module name and select New > Window Component. In the next wizard step select for _Position_ the value _editor_. Press next and select a name for your TopComponent class (and an icon if desired). 

    Open the code of your TopComponent and in the _init()_ method add the next lines:

```java
Model model = (Model)WorldWind.createConfigurationComponent(AVKey.MODEL_CLASS_NAME);
WorldWindowGLCanvas wwj = new WorldWindowGLCanvas();
wwj.setModel(model);

setLayout(new BorderLayout());
add(wwj, BorderLayout.CENTER);
```

    You will need to import the required packages from WWJ module, which you must set as a dependency previously.

If you have followed the above steps the result you must get must be something similar to:

![sshot06](@/content/posts/images/sshot06.png)

In addition, the benefit of using this approach is your application, once you build a ZIP distribution, will run on different machines thanks to the native libraries attached in the 'lib' folder.
