---
layout: post
title: Migrating from WordPress to Jekyll
date: 2015-08-11 11:02
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

Yes, you write directly in markdown syntax on any text editor, there is no visual editor like in WordPress, but it is exactly what I need: to have as much control as I can over what I write. In fact, the writing process results quickest than using the WYSIWYG mode in WordPress, especially when I require to write code.

## The migration process

To be honest I must admit in my case it was a bit traumatic, in part because I'm a bit *tiquismiquis* with my things.

The steps about the migration were basically:

- Export your WordPress content on Tools > Export menu.

![export](./images/2015-08-11_wordpress_export.png)

- Use [jekyll-import](https://github.com/jekyll/jekyll-import) tool to create a jekyll site from the WordPress export file. The tool creates all the posts and pages but unfortunally attach to much information on the front-matter section I don't like neither want. So I must apply many modification manually on each postand, in most cases to translate from HTML to markdown syntax (using the only [to-markdown](https://domchristie.github.io/to-markdown/) translator tool).

- Migrate all WordPress comments to [Disqus](https://disqus.com/) platform. For this, I need to install the [Disqus Comment System](https://wordpress.org/plugins/disqus-comment-system/) plugin and have a configured account. Once you configure the plugin all the comments are migrated automatically. Here the step was a bit more cumbersome because the new blog is in a different URL. So I need to export all the Disqus discussions, update manually all the URLs and import again in the system.

![export](./images/2015-08-13_wp_disqus_pluguin.png)

- Chose a jekyll theme and adapt a bit for my needs. I chose the [Kasper](https://github.com/rosario/kasper), a Ghost's theme ported to jekyll. I changed the theme to include some more header buttons (one for each page) and add random images, from the [unsplash](https://unsplash.com/) project using the nice [unsplash.it](https://unsplash.it/) service.

The result is I have a blog I feel really comfortable :)
