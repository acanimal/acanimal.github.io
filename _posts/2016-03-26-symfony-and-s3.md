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

Currently I'm working on a project where users can upload photos. The application allows users to create collections, drag and drop images, order them and finally upload to the server. In addition, the user can explore his/her collections, browse images and download collections in a single ZIP file. All this having in mind:

- While developing locally we want to store images in the local server folder. In staging or production environment we want to use S3. Original images must remain private, while the thumbnails must be public to be included in the application web pages.
- We need to generate thumbnails with different sizes. When a user access to a collection a list of small thumbnails are shown. When user clicks an image a medium thumbnail is presented. When user downloads a collection the ZIP file must include the original images.

So, in summary, we need to deal with image upload, thumbnail generation and S3 service.

## Uploading images

For image uploading we have used the [VichUploaderBundle](vichuploader). Uploading images isn't a secret but can involve some extra tasks. The [VichUploaderBundle](vichuploader) helps working with file uploads that are attached to ORM entities, that is, it is responsible to move the images to some configured place and attach it to your entity.

In addition, we want to store images in folders classified by user and collection, something like `user_X/collection_Y/some_image`, where `X` and `Y` are identifiers. A nice feature [VichUploaderBundle](vichuploader) offers is the possibility to attach the so called *directory namer* or *file namer* that determines the final name for the upload file. This way when a file is uploaded, given the current user and the selected collection, we determine dynamically the target folder where the bundle must store the image.

Note the ORM entity only has the image file name. The path to the file is computed through the specified directory and/or file namers. For this reason, the bundle also includes the methods require to get the absolute path to a file given the file name stored within the entity.

## Generating thumbnails

For this tasks we have used the [LiipImagineBundle](liipimagine).



## [Abstracting the file system]{#abstracting-file-system}

We want to upload to a local folder when developing and to S3 when deploy to production. To make this transparent we use the [Gaufrette](gaufrette), and abstract filesystem. This means we can read (or write) files without worry about if we are working with the local filesystem, and FTP server or Amazon S3 service.

Arrived here, the main question is how to configure the three bundles to work together, so we can upload images, generate thumbnails and work locally or with S3 depending on the environment.

bla, bla, bla, ...


[gaufrette]: https://github.com/KnpLabs/Gaufrette
[uploader]: https://github.com/dustin10/VichUploaderBundle
[imagine]: https://github.com/liip/LiipImagineBundle
