# A Curious Animal Blog repository

Source code repository for the *A Curious Animal* blog, owned by Antonio Santiago ([@acanimal](https://twitter.com/acanimal)).

This blog is made using:

- [Jekyll](http://jekyllrb.com/), as static web site generated,
- based on the [Kasper](https://github.com/rosario/kasper) theme, with custom modifications,
- showing images courtesy of [unsplash](https://unsplash.com/) project, loaded via [unsplash.it](https://unsplash.it/) service.

**Knowledge is not a property**. Feel free to clone and/or contribute.

## Jekyll plugins

I try to make site as independent as possible but there are some tasks we don't need to reinvent the wheel:

- [jekyll-sitemap](https://help.github.com/articles/sitemaps-for-github-pages/): Plugin to generate the `sitemap.xml` file.
- [jekyll-paginate](https://github.com/jekyll/jekyll-paginate): Pagination generator


## Run locally

This website makes use of docker to avoid installing ruby and jekyll locally. Install docker engine and run:

`$ docker-compose up`
