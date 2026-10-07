---
title: Greedy and Nongreedy Matching in a Regular Expression
pubDatetime: 2011-11-19T00:11:00Z
description: This questions has come to me many times so it is time to write a post that acts as a reminder.
tags:
  - regular expression
  - tools
  - tricks
---

This questions has come to me many times so it is time to write a post that acts as a reminder.

Currently I have a string like

```perl
ftp://user:password@server/dirA/dirB/file
```

and what i want is parse it to get the user, password, server and path to the file (/dirA/dirB/file). My first try was:

```perl
ftp://(\S+):(\S+)@(\S+)(/\S+)
```

but that returns me _server=server/dirA/dirB_, which isn't what I want. The idea is that the group after the @ would make a non gready match. This is achieved using the ? char. So the final and right regular expression will becomes:

```perl
ftp://(\S+):(\S+)@(\S+?)(/\S+)
```

which returns _server=server_ and _file=/dirA/dirB/file_.
