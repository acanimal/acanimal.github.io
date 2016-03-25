---
layout: post
title: Symfony, images and S3
date: 2016-03-25 08:09
tags:
- symfony
- howto
- s3
- gaufrette
- vichuploader
- liipimagine
---

Paraphrasing the movie title *Sex, lies and videotape*, this post is related on how I configured my symfony project to work with images (including thumbnail generation) and store all them on Amazon S3 service. There are are libraries and bundles to work with images and also others to work with S3, but the combination of all them can be a tricky experience with not much documentation out there. In addition, there is also one more challenge to achieve and, that is, while developing I want to store images locally (in a directory) but when deployed I want to use S3 storage.

Currently I'm working on a project where users can upload photos. The application allows users to create collections, drag and drop images, reorder and finally upload to the server. In addition, the user can explore its collections, display his/her images and download collections in a single ZIP file. Next is a list with the requirements:

- We need to generate thumbnails with different sizes. When a user access to a collection a list of small thumbnails are shown. When user clicks an images a medium thumbnail is presented. When user downloads a collection the ZIP file includes the original images.
- There is a big amount of images, so they must be stored in S3. Original images must be private while the thumbnails must be public to be included in the application web pages.
- While developing locally we want to store images in the local server folder. In staging or production environment we want to user S3.



[gaufrette]: https://github.com/KnpLabs/Gaufrette
[uploader]: https://github.com/dustin10/VichUploaderBundle
[imagine]: https://github.com/liip/LiipImagineBundle
