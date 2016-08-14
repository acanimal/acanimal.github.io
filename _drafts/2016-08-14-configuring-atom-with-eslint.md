---
layout: post
title: 'Configuring Atom editor with ESLint'
date: 2016-08-14 19:12
tags:
- ESLint
- atom
- tip
---

*TL;DR* This article demonstrate how to configure Atom editor to lint source code automatically with ESLint tool, showing linting messages in editor.

---

[Atom](https://atom.io) editor is probably one of the most used text editors (along with SublimeText, Textmate, Visual Studio Code, ...). On his side, [ESLint](http://eslint.org) is an open source project, originally created by [Nicholas C. Zakas](https://www.nczonline.net), with the goal to provide a pluggable linting utility for JavaScript.

Usually, the way to use ESLint involves the command line, invoking it to check our project's code at some point (for example, before made a build) or automatizing its execution with a tool like Gulp or Grunt each time a file is modified.

Here we want to show how we can configure Atom editor so we can automatically lint files and show the alert messages.
