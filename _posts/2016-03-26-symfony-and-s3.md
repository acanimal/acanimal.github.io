---
layout: post
title: Symfony, images and S3
date: 2016-03-25 08:09
tags:
- symfony
- howto
- s3
- gaufrette
-
---

Paraphrasing the movie title *Sex, lies and videotape*, this post is related on how I configured my symfony project to work with images (including thumbnail generation) storing all them on Amazon S3 service. There are are libraries and bundles to work with images and also others to work with S3, but the combination of all them can be a tricky experience with not much documentation out there.



[gaufrette]: https://github.com/KnpLabs/Gaufrette
[uploader]: https://github.com/dustin10/VichUploaderBundle
[imagine]: https://github.com/liip/LiipImagineBundle
