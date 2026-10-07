---
title: SimplyWrite, a free web distraction writing tool
pubDatetime: 2013-04-29T21:26:00Z
description: I like to write and I like programming so the obvious consequence were to write some tool to write. More or less this is the history of SimplyWrite.
tags:
  - backbone
  - bootstrap
  - codemirror
  - grunt
  - grunt-bbb
  - javascript
---

I like to write and I like programming so the obvious consequence were to write some tool to write. More or less this is the history of [SimplyWrite](http://www.acuriousanimal.com/SimplyWrite).

_**[SimplyWrite](http://www.acuriousanimal.com/SimplyWrite) is a free web distraction writing tool that recognizes the lightweight markup language [Markdown](http://en.wikipedia.org/wiki/Markdown), an easy-to-read, easy-to-write plain format which allow to enrich the text.**_

![simplywrtie2](@/content/posts/images/simplywrtie2.png)

## Features

- Auto show/hide of menus to allow a clean working area.
- Show _working_ and _total_ timer. _Total timer_ counts the time since you open [SimplyWrite](http://www.acuriousanimal.com/SimplyWrite). _Working timer_ counts the time you have set active the [SimplyWrite](http://www.acuriousanimal.com/SimplyWrite) page.
- Count lines, words and characters.
- Export your writes to a new page, ready to be saved.
- Allow to configure font family and size.
- [SimplyWrite](http://www.acuriousanimal.com/SimplyWrite) stores all your writes on the client side. It makes use of the HTML5 [local storage](http://www.html5rocks.com/en/features/storage) feature so no server is required.

> Be careful with this feature. You can lost your data if you manually clean the broswer cached data and also browser cleans the local storage area automatically when the space used grown over some value (like 500mb).

The source code of [SimplyWrite is available at GitHub](https://github.com/acanimal/SimplyWrite) under MIT license. Feel free to contribute.

## The Design

I would like to specially mention the fact the [SimplyWrite](http://www.acuriousanimal.com/SimplyWrite) design was made by my friend [Guillem Sevilla](http://guillemsevilla.cat/) ([@gllmsvll](https://twitter.com/gllmsvll)) a great minimalism designer !!!

## Technology

[SimplyWrite](http://www.acuriousanimal.com/SimplyWrite) has been a nice challenge for me. It gives me the opportunity to work with the next tools:

- [grunt](http://gruntjs.com/), the awesome JavaScript task runner. It allows, among others, to minimize and concatenate files.
- [grunt-bbb](https://github.com/backbone-boilerplate/grunt-bbb), the grunt Backbone Boilerplate Build extension. Simplifies the work with Backbone framework.
- [backbone](http://backbonejs.org/), a lightweight MVC framework.
- [backbone.layoutmanager](https://github.com/tbranyen/backbone.layoutmanager), an extension of backbone to improve the work with views.
- [CodeMirror](http://codemirror.net/), an awesome code editor component for the browser.
- [Bootstrap](http://twitter.github.io/bootstrap/), a front-end framework used for the UIX.
