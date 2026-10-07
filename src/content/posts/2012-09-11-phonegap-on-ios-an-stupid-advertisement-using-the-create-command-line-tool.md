---
title: 'PhoneGap on iOS: an stupid advertisement using the "create" command line tool'
pubDatetime: 2012-09-11T16:20:00Z
description: Some days ago I start my first mobile application. Nothing awesome, it is a simply excuse to test jQuery Mobile and PhoneGap frameworks.
tags:
  - ios
  - jquerymobile
  - phonegap
  - tricks
---

Some days ago I start my first mobile application. Nothing awesome, it is a simply excuse to test [jQuery Mobile](http://jquerymobile.com/) and [PhoneGap](http://phonegap.com/) frameworks.

This post is not oriented to describe my impressions, that would be another day, but describe an stupid headache I have when trying to install the PhoneGap framework in my MacOSX.

Lets go. I have coded my application like a normal web application, then I have follow the steps described [here](http://docs.phonegap.com/en/2.0.0/guide_getting-started_ios_index.md.html#Getting%20Started%20with%20iOS) to install the PhoneGap with XCode. All right, now is the moment to set up my project with the `create` command line tool and... wait !!!

```bash
./create ~/Documents/Personal\ Projects/Viendo com.acanimal.Viendo Viendo
```

and the result is:

```bash
usage: cp [-R [-H | -L | -P]] [-fi | -n] [-apvX] source_file target_file
cp [-R [-H | -L | -P]] [-fi | -n] [-apvX] source_file ... target_directory
```

The `create` tool is a simple bash script that copies the content from `template/project` to the specified destination, see:

```bash
...
# copy the files in; then modify them
cp -R $BINDIR/templates/project $PROJECT_PATH
...
```

where `$PROJECT_PATH` points to the destination folder we have specified previously.

I tried to escape the command, add double quotes, etc without much success and finally my I'm-not-a-hacker-solution has been to change the name of the destination folder to `PersonalProjects` (without whitespaces) (Really I don't remember why I put a whitespace in the name I never use whitespaces in the names).

If any good command line user arrives here, please send me some alternative.
