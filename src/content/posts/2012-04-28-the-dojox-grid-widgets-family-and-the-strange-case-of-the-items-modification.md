---
title: The dojox.grid widgets family and the strange case of the items modification
pubDatetime: 2012-04-28T21:52:00Z
description: So, you are building a web application and decided to use the great Dojo framework. Probably, if you need to use grids, you will decide to use some of the available widgets subclass of dojox.grid.…
tags:
  - dojo
  - javascript
---

So, you are building a web application and decided to use the great Dojo framework.  Probably, if you need to use grids, you will decide to use some of the available widgets subclass of [dojox.grid](http://dojotoolkit.org/reference-guide/1.7/dojox/grid/index.html). Well, my friend, be aware with the data you use to fill the grid's store !!!

## The scenario

Start creating a piece of code to execute when the page is ready. It will use the [DataGrid](http://dojotoolkit.org/reference-guide/1.7/dojox/grid/DataGrid.html) widget with an [ItemFileWriteStore](http://dojotoolkit.org/reference-guide/1.7/dojo/data/ItemFileWriteStore.html) store:

```javascript
require(['dojox/grid/DataGrid', 'dojo/data/ItemFileWriteStore', 'dojo/domReady!'],

function(DataGrid, ItemFileWriteStore){
```

Now, create a _data_ object with a set of random items:

```javascript
// Set up data store
var data = {
  identifier: "id",
  items: [],
};
// Initialize with random elements.
var rows = 10;
```

Note we have stores our items in a different array:

```javascript
var items = [];
for (var i = 0; i < rows; i++) {
  items.push({
    id: i + 1,
    col1: "the first column",
    col2: false,
    col3: "A column with a long description",
    col4: Math.random() * 50,
  });
}
data.items = items;
```

Now, create the store and set the grid layout:

```javascript
var store = new ItemFileWriteStore({ data: data });

// Set up layout
var layout = [
  [
    { name: "Column ID", field: "id", width: "100px" },
    { name: "Column 1", field: "col1", width: "100px" },
    { name: "Column 2", field: "col2", width: "100px" },
    { name: "Column 3", field: "col3", width: "auto" },
    { name: "Column 4", field: "col4", width: "150px" },
  ],
];
```

Finally, create the grid (remember to startup it):

```javascript
	// Create a new grid
	var grid = new DataGrid({
		id: 'grid',
		store: store,
		structure: layout,
		rowSelector: '20px'
	});

	// Append the new grid to the div
	grid.placeAt("gridDiv");

	// Call startup() to render the grid
	grid.startup();
});
```

The grid code needs we have an HTML element in our page:

```xml
<div id="gridDiv"></div>
```

Here is the result of the previous code:

![table](@/content/posts/images/table.png)

## The issue

Our idea behind having the items stored in an array is because trying:

- to serve as input data for the grid's store
- to store the original array to make other operations: to be used in other stores, to make a simple iteration, ... whatever we want.

The issue is **the array of items used to initialize the data store are modified once the grid's _startup()_ method is executed**.

Lets go to see it in action. Check the value of the _items_ array before and after the grid's _startup()_ method is executed:

![Before](@/content/posts/images/shot1.png)

![After](@/content/posts/images/shot2.png)

Yes, the objects within the items array are modified for internal pourposes.

## Conclusions

This simple issue can have great implications depending on your way to code.

Suppose you are getting a JSON file with information about employees and for each one the set of companies they have worked. You will store this information in JavaScript object array and may be interested on use to:

- search the boss within employees
- initialize a [TreeGrid](http://dojotoolkit.org/reference-guide/1.7/dojox/grid/TreeGrid.html) to show the whole list of data.

The problem is you can't use the same object array for the two tasks because in the moment the TreeGrid will execute its _startup()_ method the array of items will change its structure.

How to solve this? Create a new array of objects from your original one or store them in a [Memory store](http://dojotoolkit.org/reference-guide/1.7/dojo/store/Memory.html).

## References

[http://dojotoolkit.org/reference-guide/1.7/dojox/grid/index.html](http://dojotoolkit.org/reference-guide/1.7/dojox/grid/index.html)

[http://dojotoolkit.org/reference-guide/1.7/dojox/grid/DataGrid.html](http://dojotoolkit.org/reference-guide/1.7/dojox/grid/DataGrid.html)

[http://dojotoolkit.org/reference-guide/1.7/dojo/data/ItemFileWriteStore.html](http://dojotoolkit.org/reference-guide/1.7/dojo/data/ItemFileWriteStore.html)

Connecting a Store to a DataGrid - [http://dojotoolkit.org/documentation/tutorials/1.7/store\_driven\_grid/](http://dojotoolkit.org/documentation/tutorials/1.7/store_driven_grid/)
