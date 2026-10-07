---
title: Stupid PHP snippet to always download a changing file
pubDatetime: 2012-05-06T20:02:00Z
description: It is short, it is easy, it is stupid but... can save you time. If you need to download every few minutes a remote file that changes its contents at regular intervals of time this is for you.
tags:
  - php
  - tricks
---

It is short, it is easy, it is stupid but... can save you time. If you need to download every few minutes a remote file that changes its contents at regular intervals of time this is for you.

Save this on a `stupid.php` file (and change the values):

```
<?php
$url = 'somewhere_in_the_space';
while(true) {
	$locaFile = "some_local_file_name_".time()."_with_extension";
	file_put_contents($locaFile, file_get_contents($url));
	echo "Done... $locaFile \n";
	sleep(60*5);    // Sleep 5 minutes !!!
}
?>
```

and execute with:

```
> php -f stupid.php
```

Remember it will run forever until you kill the process so don't expect to finish.
