---
layout: post
title: Migrating from WordPress to Jekyll
date: 2015-08-06 11:02
tags:
- jekyll
- howto
---

I recently migrate this blog from WordPress to Jekyll. WordPress is awesome, an incredible projects with thousands of plugins that does not need any presentation. The problem for me is I need something simpler and lighter so I changed to Jekyll.

Jekyll is an static site generated. Opposite to WordPress, written in PHP, where each request implies a query to get data, some processing and finally return the resultant page, Jekyll has a completely philosophy.

With Jekyll you write content in markdown syntax and applying some *rules*, mainly a front matter section on pages and posts. Once you agree with your content Jekyll *compiles* them and builds an static version of all your content ready to be hosted.

For those with a GitHub account, remember if you put all the content on a repository there is no need to *compile* because GitHub does it for you each time you push commit.