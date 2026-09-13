---
title: Working with query params in JavaScript with URLSearchParams
pubDatetime: 2019-11-09T09:24:00Z
description: No matter if you work with JavaScript at client or server side, at some point you'll need to work with urls and its query params. As example, I'm currently using [react-router](https://reacttraining.com/react-router/web) in my project, which is an great tool. I can define dynamic routes with path params and easily react-router returns me these params within the `match` variable and the rest of url information in the `location` variable, but how can I easily access to query params?
tags:
  - tips
  - urlsearchparams
---

No matter if you work with JavaScript at client or server side, at some point you'll need to work with urls and its query params.

As example, I'm currently using [react-router](https://reacttraining.com/react-router/web) in my project, which is an great tool. I can define dynamic routes with path params and easily react-router returns me these params within the `match` variable and the rest of url information in the `location` variable, but how can I easily access to query params?

There are great libraries for this purpose -like [query-string](https://www.npmjs.com/package/query-string) or [qs](https://www.npmjs.com/package/qs)- but the question is: **why increase in some more bytes the size of your package when there is a native solution?** 😄 The `URLSearchParams`.

### Detect feature support

As all native implementation remember the support depends on the browser version. See compatibilities [here](https://caniuse.com/#search=URLSearchParams). We can check it with:

```javascript
if (window.'URLSearchParams') {
  // Support :)
}
```

### Construct an instance

The most typical usage is to build an `URLSearchParams` instance from a query string. Note it is also valid to pass a string that start with `?`, the `URLSearchParams` will strip it out:

```javascript
const params = new URLSearchParams("version=1&name=john&lastname=nieve");
// or
const params = new URLSearchParams("?version=1&name=john&lastname=nieve");
```

> 🤓 Be aware to not pass string url! Or it will be interpreted as the parameter name. For example, given:
>
> ```javascript
> const params = new URLSearchParams("https://some_api.com?paramA=valueA");
> ```
>
> You'll get the three parameters named: `https://some_api.com?paramA` with value `valueA`.

### Working with params

Once we have an instance it is easy to get or set the parameters values:

```javascript
params.get("version"); // 1
params.get("name"); // john
params.get("name"); // john

params.set("lastname", "stark");
params.get("lastname"); // stark

params.has("lastname"); // true
params.has("age"); // false
```

We can also add new parameters and work with array parameters:

```javascript
params.set("tags", "bastard");
params.append("tags", "lord");

params.get("tags"); // bastard
params.getAll("tags"); // ['bastard', 'lord']
```

> Note the difference between `get` and `getAll` when working with array parameters.

Or simply delete params:

```javascript
params.delete("lastname");
```

Finally we can convert the `URLSearchParams` back into a string with the:

```javascript
params.toString(); // version=1&name=john&tags=bastard&tags=lord
```

### Working with URLs

If we have an URL string the easy way to get the params is using the `URL` object:

```javascript
const url = new URL("https://got-api.com?version=1&name=john&lastname=nieve");
const params = new URLSearchParams(url.search);

params.toString(); // version=1&name=john&lastname=nieve
```
