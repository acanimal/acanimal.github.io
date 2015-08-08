---
layout: post
title: Migrating from WordPress to Jekyll
date: 2015-08-06 11:02
tags:
- jekyll
- howto
---

WordPress is awesome, an incredible project with thousands of plugins that does not need any presentation. What start as a blogging platform has become a powerful framework to build almost anything.

All that is fine, but... recently I migrated this blog from WordPress to Jekyll.

The problem for me is WordPress starts as a quick solution to have a blog but has increasingly become a two big resource to administer. I have installed plugins to manage spam, to limit access login (for security reasons), to share content on social networks, to highlight source code, to add Google Analytics code, etc.

I have a tech blog. I write about programming, libraries and how to do things, accompanied by sample code. WordPress WYSIWYG editor is great but not agile to write code. On the other side the *test* view of the content is poor and becomes affected by the *visual* view each time you change between tabs.

Jekyll is much simpler than WordPress. It is much more less powerful than WordPress in many aspects but if offers me what I need in a more simpler way.

Jekyll is an static site generator. Opposite to WordPress, written in PHP, where each request implies a query to get data, apply some process and finally return the resultant page, Jekyll has a completely different philosophy. With Jekyll you write content in markdown syntax and applying some *rules*, mainly a front matter section on pages and posts. Once you agree with your content Jekyll *compiles* them and builds an static version of all your content ready to be hosted.

> For those with a GitHub account, remember if you put all the content on a repository there is no need to *compile* because GitHub does it for you each time you push commit.

Yes you write directly in markdown syntax on any text editor, there is no visual editor like in WordPress, but it is exactly what I need: to have as much control as I can over what I write.

## The migration process
