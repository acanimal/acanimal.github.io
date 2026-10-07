---
title: Filling Flexigrid with JSON/XML data
pubDatetime: 2011-12-09T22:14:00Z
description: Flexigrid is one of the most useful and powerful grid plugins for jQuery. Unfortunately, as the author explains in the project page, there is no much documentation so you must learn how to use it…
tags:
  - javascript
  - jquery
  - plugins
  - tricks
---

[Flexigrid](http://flexigrid.info/) is one of the most useful and powerful grid plugins for [jQuery](http://jquery.com/). Unfortunately, as the author explains in the project page, there is no much documentation so you must learn how to use it looking at existing code.

If anytime you need to fill a Flexigrid with JSON or XML content and you are a little buggy to look at example code, here is the great summary:

> Remember XML/JSON data must follow the next rules: _total_, _page_, _rows_. And for every row specify and id and a cell structure.

Next steps show you how to make it run step by step.

- Sample data for both types are:

```javascript
{
	page: 1,
	total: 2,
	rows: [
		{id: 'reg1',    cell: ['reg1-cell1','reg1-cell2']},
		{id: 'reg2',    cell: ['reg2-cell1','reg2-cell2']}
	]
}
```

```xml
<rows>
	<page>1</page>
	<total>2</total>
	<row id="reg1">
		<cell>reg1-cell1</cell>
		<cell>reg1-cell2</cell>
	</row>
	<row id="reg2">
		<cell>reg2-cell1</cell>
		<cell>reg2-cell2</cell>
	</row>
</rows>
```

- Put some element on your HTML document:

```xml
<p id="yourId"></p>
```

- Convert that element into a flexigrid with:

```javascript
$("#yourId").flexigrid({
	url: 'your_file_name.json_or_xml',
	dataType: 'json',
	...
}
```

Now you know how to build a gorgeous grid from XML or JSON data.
