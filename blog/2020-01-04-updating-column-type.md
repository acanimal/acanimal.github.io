---
layout: post
title: 'How to update a column type (in PostgreSQL)'
date: 2020-01-04 16:01
excerpt_separator: <!--more-->
tags:
- tips
- sql
---

So, you have a table and you need to modify a column's type. The problem arise when the column is filled and the type change is incompatible, for example, from string to integer, so **how we can update the type and recompute the filled values to the new type?**

Don't worry, SQL is powerful enough to let you make the change in one sentence with `ALTER TABLE`.

<!--more-->

In the next example, we are supposing:

- we have a table `the_table` 
- has a string column `status` with values: `(happy | sad)`
- we want to change the column's type from string to integer and set values as `happy=1 | sad=2`

> Yes, I know using strings for status instead creating a table with the allowed statuses is a bad decision, but is needed for this example 😄

Easy, just run:

```sql
ALTER TABLE the_table
  ALTER COLUMN status TYPE INT
    USING (CASE WHEN status = 'happy' THEN 1 ELSE 3 END);
```

A note. If the column `status` has a default value, for example `happy` you first need to remove that default constraint, update the type and then set the new default value:

```sql
BEGIN;

ALTER TABLE the_table ALTER COLUMN status DROP DEFAULT;
ALTER TABLE the_table
  ALTER COLUMN status TYPE INT
    USING (CASE WHEN status = 'happy' THEN 1 ELSE 3 END);
ALTER TABLE the_table ALTER COLUMN status SET DEFAULT 1;

COMMIT;
```

In this case, because we are executing three sentences, we are running within a transaction to avoid undesired problems if one of the sentences fails.
