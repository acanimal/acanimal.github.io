---
layout: post
title: Specification pattern for NodeJS
date: 2015-09-21 22:14
tags:
- nodejs
- design
- patterns
- tools
- tips
---

Although the [specification pattern](https://en.wikipedia.org/wiki/Specification_pattern) is mainly use in [DDD](https://en.wikipedia.org/wiki/Domain-driven_design) to check business rules, I think the idea of combine rules offers great flexibility in any application architecture, it is suitable for any kind of validations, simplifying and improving reusability and making code clearer. Because of this, some days ago I started working on an implementation of the specification pattern for NodeJS. *The code is freely available at [github](https://github.com/acanimal/node-specification-pattern) repository and also installable via [npmjs](https://www.npmjs.com/package/specification).*

## The specification pattern

> There are tons of good documents and tutorials about the pattern, so I don't want to extent too much here. The best source of information, IMO, is the Eric Evans *big blue book* [Domain-Driven Design](https://domainlanguage.com/ddd/):
>
> [![DDD](https://books.google.es/books/content?id=hHBf4YxMnWMC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70686srrc3RTlROnjENjkfFCkKi1QUib9Afdj0jUdsEG6J_zSvJCf-gKeXJN5k9Ug-IGWhQPtx6R8sVeEw3S4k0dKHkCTm2yxDzNy9da3wMb0DCpoTjsFLu9OZ93r4rhAPD6sOh)](http://www.amazon.com/exec/obidos/ASIN/0321125215/domainlanguag-20)

The specification pattern is powerful enough to be used for: validations, queries and creation of objects that satisfies some criteria. So, take into account this post is only related to the first options: **the validation of objects that satisfies some critaria**.

An specification is a piece of code that checks if a business rules is satisfied or not. For example, given a bug tracking system we can create two specification to check if a software project:

- has *few issues* if the number of issues reported last month is less 10, and
- is *updated project* if the date of the last solved issued it not beyond a week.

The great of specifications is we can easily combine them to create complex rules reusing the code, for example, we can create the specification *quality project* that means a project has *few issues* and is an *updated project*.

Wikipedia has a nice image showing an UMl diagram class about the specification patter:

![UML specification pattern](https://upload.wikimedia.org/wikipedia/commons/8/8b/Specification_UML_v2.png)

We can see a specification is any interface that implements the `isSatisfiedBy()` method and has the `and`, `or` and `not` method to chain specifications.


## How to use the NodeJS implementation ?

I have created two implementations of the pattern: asynchronous and synchronous versions.

The synchronous version is fine for those in-memory validations, for example when you do not require query a database. The asynchronous version, on the other hand, is suitable for those cases in which the validation depends on an asynchronous source, like a file, a query to an API, etc.


The first step to use the implementation is to include the required version (synchronous or asynchronous):

```javascript
// Asynchronous version
var Specification = require("specification").Specification;

// Synchronous version
var SpecificationSync = require("specification").SpecificationSync;
```

For each business rule (or validation) you need to check, a specification must be created. Next code creates a specification that checks if a number is greater than the one indicated at the specification:

```javascript
function GreaterThan(num) {
  this.num = num;
}
// Make it a subclass of SpecificationSync base class.
GreaterThan.prototype = Object.create(SpecificationSync);

// Implement the 'isSatisfiedBy' method.
GreaterThan.prototype.isSatisfiedBy = function(n) {
  return (n > this.num);
};
```

Later, to use the previous specification:

```javascript
var greaterThan6 = new GreaterThan(6);

if (greaterThan6.isSatisfiedBy(9)) {
  console.log("9 is greater than 6");
}
```

The base class `SpecificationSync` offers the `and`, `or` and `not` methods we can use to chain specifications and build complex ones. For example:

```javascript
var greaterThan6 = new GreaterThan(6);
var greaterThan8 = new GreaterThan(8);

var greaterThan6And8 = greaterThan6.and(greaterThan8);

if (greaterThan6And8.isSatisfiedBy(9)) {
  console.log("9 is greater than 6 and 8");
}
```


The asynchronous version is suitable if you need to check agains an asynchronous source, like a database, files, etc. The only difference is the way to implement the `isSatisfiedBy()` method, which must be use a callback, for example:

```javascript
function GreaterThan(num) {
  this.num = num;
}
GreaterThan.prototype = Object.create(Specification);
GreaterThan.prototype.isSatisfiedBy = function(n, cb) {
  return cb(null, n > this.num);
};
```

and to use it you can make via the callback:

```javascript
var greaterThan6 = new GreaterThan(6);

greaterThan6.isSatisfiedBy(9, function(err, satisfies) {
  if (satisfies) {
    console.log("9 is greater than 6");
  }
});
```

Chaining specifications works in the same way as the synchronous version, simply remember the only difference is the way to use the `isSatisfiedBy()` method:

```javascript
new GreaterThan(1)
  .and(new GreaterThan(2))
  .and(new GreaterThan(3))
  .isSatisfiedBy(6, function(err, satisfies) {
    if (satisfies) {
      console.log("6 is greater than 1, 2 and 3");
    }
  });
```

### Conclusions

The post presents a dual implementation for NodeJS, synchronous and asynchronous. There is no reason to use design patterns in a multi-paradigm language like JavaScript. Specification pattern can help when working with validations, simplifying reusability and allowing *validations chaining* through specifications.
