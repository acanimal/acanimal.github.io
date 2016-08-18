---
layout: post
title: 'Configuring Atom editor with ESLint and the AirBnB style guide rules'
date: 2016-08-14 19:12
tags:
- ESLint
- atom
- tip
---

*TL;DR* This article demonstrate how to integrate the ESLint tool with Atom editor so our source code be automatically checked, showing linting messages in editor. In addition, ESLint will be configured based on the AirBnB code style rules.

---

## Atom & ESLint

[Atom](https://atom.io) editor is probably one of the most used text editors (along with SublimeText, Visual Studio Code, TextMate, ...). On his side, [ESLint](http://eslint.org) is an open source project, originally created by [Nicholas C. Zakas](https://www.nczonline.net), with the goal to provide a pluggable linting utility for JavaScript.

Usually, the way to use ESLint involves the command line, invoking it to check our project's code at some point (for example, before made a build) or automatizing its execution with a tool like Gulp or Grunt each time a file is modified. ESLint also accepts a configuration files, like `.eslintrc.js`, where we can define the set of rules we want the tool checks. The *issue* is, as you can imagine, the number of rules ESLint accepts is really huge.

## The importance of a style guide

In projects with many developers it can be useful define a set of rules that force all of them to code with the same style, that is, use a *style guide*.

The problem with style guides is they are set of good practices-conventions that everybody assumes the rest are applying. As you can image working with assumptions in a big and shared code is not good.

Without a tool like ESLint there must be people acting as a police, that is, spending time reviewing the code style and not only the code. Thanks to ESLint this time can be reduced forcing each member of the team to ensure the code follows the same convention rules before committing or pushing to the repository. Besides, using CI tools (like GitHub with TravisCI) we can also check the code style and disable the possibility to merge a branch if the code lint fails.

## The AirBnB JavaScript Style Guide

Creating and maintaining a style guide is not an easy tasks. Hopefully, the awesome people at AirBnB have created the [AirBnB JavaScript Style Guide](https://github.com/airbnb/javascript) for us that I have chose because of:

- Works with ES5 and ES6: arrow functions, object destructuring, array spread, ...
- Includes React and JSX style: one component per file, recognizes stateless vs class component, ...
- It is based on ESLint.

**I want to note here the [Standard JS](http://standardjs.com) project**, which defines a set of [rules](http://standardjs.com/rules.html) ready to be used in our JS projects. Related with what I have said in the previous section, I want to highlight two sentences written in the main page of the project:

> This module saves you (and others!) time in two ways:
>
> - No configuration. The easiest way to enforce consistent style in your project. Just drop it in.
> - Catch style errors before they're submitted in PRs. Saves precious code review time by eliminating back-and-forth between maintainer and contributor.

## Integrating ESLint with Atom

Ok, enough talk and lets start working. We need to make two things: first, configure ESLint in our project (for this we also need to install the AirBnB style guide), and second install necessary Atom plugins to show messages while coding.

### Configuring ESLint in your project

The first thing we need to do is configure ESLint in our project. Remember we are going to use the AirBnB style guide so we need no install the required package and make our ESLint configuration extend from the AirBnB ESLint configuration.

1. Install ESLint locally to your project: `> npm install eslint --save-dev`.
2. Install the [AirBnB ESLint configuration](https://www.npmjs.com/package/eslint-config-airbnb). Following package instructions we need to execute next sentences to install the right package versions and dependencies:

  ```
  > export PKG=eslint-config-airbnb;
  > npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG"
)
  ```
3. Create a `.eslintrc` file in the root of our project. We must be sure to include the property `"extends": "airbnb"` as part of the configuration.

Next is a sample configuration file. Note we inherited configuration from AirBnB. In addition, we have added the eslint rules `valid-jsdoc` and `require-jsdoc` to forces us to write some JSDoc for functions, methods and classes.


```json
{
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  },
  "rules": {
    "valid-jsdoc": ["error", {
      "requireReturn": true,
      "requireReturnType": true,
      "requireParamDescription": true,
      "requireReturnDescription": true
    }],
    "require-jsdoc": ["error", {
        "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": true,
            "ClassDeclaration": true
        }
    }]
  }
}
```

Right now our project is configured with ESLint and the base set of rules from AirBnB, but it requires we execute ESLint manually or automatize in some way (in the build process).

### Installing Atom plugins

Lets go to configure Atom to automatically lint files and show us message while coding.

**TODO continue**
