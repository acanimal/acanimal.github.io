---
layout: post
title: Working with different environments on jekyll
date: 2015-08-04 18:02
tags:
- jekyll
- howto
---

[Jekyll](http://jekyllrb.com/) is an open source static site generator. It allows writing content in markdown (also HTML) using some rules, like adding some front matter on pages or posts. Later jekyll *compiles* all the code and generates an static version for each page and post.

The benefits of having an static site are mainly speed. Contrary to other blog engines like WordPress, where each request requires server works querying data, processing and returning the page, jekyll only does that work once, when the static site is built.

Jekyll is also well known by the fact it is used by GitHub. If you host your jekyll posts on a GitHub repository you don't require to compile them because GitHub does for you each time you make a commit. If you are interested on this topic see [pages](https://pages.github.com/) and take a look at [pages basics](https://help.github.com/categories/github-pages-basics/).

A few days ago I migrate this blog from WordPress to Jekyll. Note its source code, with all the post I wrote and will write al publicly available at [https://github.com/acanimal/acuriousanimal-blog.github.io](https://github.com/acanimal/acuriousanimal-blog.github.io).

The method I follow to write is:

- I write in my local version of jekyll. Once I finish an article...
- I run jekyll locally to see all looks fine. If all is fine...
- I commit the changes to the GitHub repository. This makes GitHub compiles the posts and generates the same content like me.

Something I missed from the beginning was the possibility to have a different configuration depending if on the environment. When working locally I want all links and images point to my local computer, while when I upload content to GitHub I want links to be relative to GitHub hosting.

Hopefully this is really easy to achieve using more than one configuration file.

I have a main `_config.yml` where all variables are set. Next is part of my current configuration file:

```yaml
name: "A Curious Animal"
description: "Born to be curious, born to be animal !!!"
meta_description: "technology, gis, javascript, web, mapping, openlayers, leaflet, jquery, acuriousanimal, acanimal"
url:            "http://blog.acuriousanimal.com"
author:         "acanimal"
author_description: "Computer Science, passionate programmer and an eternal rookie guitar player."

markdown: redcarpet
highlighter: pygments
```

In addition, I have a `_config-dev-yml` file I only use when working locally. This files contains all variables I want to redefine when working locally. For example:

```yaml
url:    'http://localhost:4000'
```

Jekyll commands allow to specify more than one configuration file. We simply must remember a variable existent in a configuration file can be overridden with a value on the second file. Having this in mind, I run jekyll locally with the next command:

```bash
> jekyll serve --config _config.yml,_config-dev.yml
```

This produces the value of `url` specified at `_config.yml` becomes overridden by the value of `url` variable specified at `_config-dev.yml`.
