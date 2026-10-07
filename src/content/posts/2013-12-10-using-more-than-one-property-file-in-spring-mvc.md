---
title: Using more than one property file in Spring MVC
pubDatetime: 2013-12-10T22:27:00Z
description: Spring is one of the most important, powerful and also complex frameworks in the actual Java panorama.
tags:
  - java
  - spring
---

Spring is one of the most important, powerful and also complex frameworks in the actual Java panorama.

Unfortunately for me, I'm very forgetful so it is worth to write a post-reminder to increment the possibilities I never forget again something like this.

### Using property files in Spring

Since Spring 3, the use of properties in our code was made really simple thanks to the placeholders.

Supposing a property file `my_config_1.properties` with next content:

```
prop1=Some property with some value
prop2=Some number here
```

It is enough to add the next configuration element in our servlet configuration XML file:

```
<context:property-placeholder location="classpath:my_config_1.properties"/>
```

Later, at any place of our program we can easily get the properties using `@Value` annotation:

```
@Value("${prop1}")
private String myProperty;
```

### And what if you have more than one property files?

Supposing we have a second property file `my_config_2.properties` with the values:

```
second_file_prop=This comes from the second file
```

Spring allows to specify more than one properties file adding a new placeholder:

```
<context:property-placeholder location="classpath:my_config_1.properties"/>
<context:property-placeholder location="classpath:my_config_2.properties"/>
```

The problem comes when you try to use the property from the second file, using `@Value("${second_file_prop}")`, Spring will throw an exception saying it can find the `second_file_prop` value. This is because Spring try to find the property in the first file and if it does not find it throws an error.

To avoid this ugly effect we need to use the `ignore-unresolvable` attribute in the placeholder:

```
<context:property-placeholder location="classpath:my_config_1.properties" ignore-unresolvable="true"/>
<context:property-placeholder location="classpath:my_config_2.properties"/>
```

This way if Spring does not find a property in the first file it will continue looking at the second one.

### The order

In addition, the placeholder element can use the `order` attribute that determines the order in which Spring must look at the files. So a good way to express the previous configuration is:

```
<context:property-placeholder location="classpath:my_config_1.properties" order="1" ignore-unresolvable="true"/>
<context:property-placeholder location="classpath:my_config_2.properties" order="2" ignore-unresolvable="true"/>
```
