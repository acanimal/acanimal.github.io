## A Curious Animal

Yet another tech blog by [@acanimal](https://twitter.com/acanimal).

---

Created with [Gatsby](https://www.gatsbyjs.org) from the starter [julia](https://github.com/niklasmtj/gatsby-starter-julia) and made a bunch of modifications:

- Allowed to create pages as markdown: about, project, etc
- Blog section
  - Paginated
  - Follow the jekyll slug `/YYYY/MM/DD/title`
- Autodeploy to github with `> yarn run deploy`

> Note the main branch is `gatsby`. When you deploy the site is built and uploaded to `master` branch, the one configured to work with gh-pages.

Icons made by [Freepik](https://www.flaticon.com/authors/freepik) from [Flaticon](https://www.flaticon.com)


## Digest

I store any link that catch my attention using [raindrop.io](https://raindrop.io) service. Then, anytime I want to create a new digest entry:

- Scrap content from the raindrop.io collection using [webscrapper](https://www.webscraper.io/) extension using the next scraper configuration:
  ```json
  {"_id":"SCRAPER_ID","startUrl":["RAINDROP_COLLECTION_URL_TO_SCRAP"],"selectors":[{"id":"title","type":"SelectorText","parentSelectors":["article"],"selector":"span.title","multiple":false,"regex":"","delay":0},{"id":"description","type":"SelectorText","parentSelectors":["article"],"selector":"p.description","multiple":false,"regex":"","delay":0},{"id":"cover","type":"SelectorImage","parentSelectors":["article"],"selector":"img.cover","multiple":false,"delay":0},{"id":"article","type":"SelectorElement","parentSelectors":["_root"],"selector":"article.element-list","multiple":true,"delay":0},{"id":"url","type":"SelectorLink","parentSelectors":["article"],"selector":"a.permalink","multiple":false,"delay":0}]}
  ```
- Converter CSV to JSON (use any only service like [csv2json](https://www.csvjson.com/csv2json)
- Modify slightly the JSON to have the next structure:
  ```json
  {
  "name": "Some title (optional). Let empty string to infer the name from the date",
  "date": "YYYY-MM-DD",
  "items": [
    {
      "title": "link title",
      "description": "link description",
      "cover-src": "link cover image",
      "url-href": "link source url"
    }
  ]
  ``` 
