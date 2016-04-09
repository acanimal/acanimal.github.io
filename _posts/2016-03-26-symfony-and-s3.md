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

To generate thumbnails we have used the [LiipImagineBundle](liipimagine) bundle. With it, when you reference an image within your templates you don't get the original image but a new one obtained applying some filters. Next line shows how to include an image in your twig template obtained after applying a `my_thumbnail` configuration:

```html
<img src="{{ '/relative/path/to/image.jpg' | imagine_filter('my_thumbnail') }}" />
```

The good thing is [LiipImagineBundle](liipimagine) generates the thumbnails when images are first time accessed and stores them in a *cache* folder for next calls.

## Abstracting the file system

The issue is we want to upload images and generate thumbnails into a local folder at development time and to S3 when running in staging or production.

Hopefully for us there is the [Gaufrette](gaufrette) bundle, which is an abstract filesystem. It offers a common interface to read/write to different filesystem and a bunch of implementations to work against the local filesystem, an FTP server, Amazon S3 service, ... and many more.

## Putting it all together

Arrived here, the main question is how to configure the three bundles to work together, in summary:

- We want to abstract the filesystem to work locally while developing and with S3 in production.
- We need to upload images.
- We need to generate thumbnails for uploaded images and store them in a cache folder to be later server.

We have divided the configuration between the `config.yml` file and the `config_prod.yml`. The first contains the configuration for the previous three bundles ready to work locally. The second overrides some propertires to work in production, using S3.

The first point is to configure the [Gaufrette](gaufrette) bundle to abstract our filesystem. Next is the configuration in the `config.yml`:

{% highlight yaml %}
# config.yml
knp_gaufrette:
    stream_wrapper: ~

    adapters:
        # Local adapter
        local:
            local:
                directory: %kernel.root_dir%/../web/uploads

    filesystems:
        custom_uploads_fs:
            adapter:    local
{% endhighlight %}

Compare with parameters we override in the `config_prod.yml`. *Note for production you need to define an AWS-S3 service which I do not include here.*

{% highlight yaml %}
# config_prod.yml
knp_gaufrette:
    adapters:
        # S3 adapter
        s3:
            aws_s3:
                service_id: 'komik.aws_s3.client'
                bucket_name: 'komik-staging'

    filesystems:
        custom_uploads_fs:
            adapter:    s3
{% endhighlight %}

We define a `custom_uploads_fs` filesystem which by default uses a `local` adapter and in production uses an `aws_s3` one.

Next step is to configure the [VichUploaderBundle](vichuploader) bundle. Hopefully it is designed to integrate with Gaufrette so it is easy to specify how to upload files through gaufrette. Next is the configuration:

{% highlight yaml %}
# config.yml
vich_uploader:
    db_driver: orm
    storage:   gaufrette

    mappings:
        my_images:
            uri_prefix:         ~
            upload_destination: custom_uploads_fs
            directory_namer:    app.vich_uploader.custom.directory.namer
            namer:              vich_uploader.namer_uniqid
            inject_on_load:     false
            delete_on_update:   true
            delete_on_remove:   true
{% endhighlight %}

As you can see we are specifying we want to use gaufrette with `storage: gaufrette` and the upload destination is the previous defined gaufrette filesystem `custom_uploads_fs`. This means all images will be uploaded through the Gaufrette filesystem to that destination. Note, within the target filesystem, the final folder and file name are determined by a custom directory namer we have implemented (`app.vich_uploader.custom.directory.namer` which adds the user ID to the path) and the file namer `vich_uploader.namer_uniqid` offered by Gaufrette, which assigns a unique name to each file.

Finally, we need to configure the [LiipImagineBundle](liipimagine) bundle. Next is the configuration used for local development. We need to specify the cache folder where to generate the thumbnails in adition to our filter, that will generate with size `350x450` and half quality:

{% highlight yaml %}
# config.yml
liip_imagine:
    resolvers:
        # Cache generated files locally
        local_fs:
            web_path:
                web_root: %kernel.root_dir%/../web
                cache_prefix: uploads/_cache

    loaders:
        stream_uploads:
            stream:
                wrapper: gaufrette://custom_uploads_fs/

    cache: local_fs

    data_loader: stream_uploads

    filter_sets:
        my_thumb:
            quality: 50
            filters:
                thumbnail: { size: [350, 450], mode: inset }
                strip: ~
{% endhighlight %}

Main properties to configure are the `data_loader`and the `cache`. The first one uses the stream `stream_uploads` that uses gaufrette filesystem. The second uses the resolver `local_fs` that we have configured to use the local folder `uploads/_cache`.

For production, configuration changes slightly. Here we override the resolver to generate cache files through the resolver `s3_fs` which points to S3 bucket:

{% highlight yaml %}
# config_prod.yml
liip_imagine:
    resolvers:
        # Cache generated files on S3
        s3_fs:
            aws_s3:
                client_config:
                    key: %your_amazon_s3.key%
                    secret: %your_amazon_s3.secret%
                    region: %your_amazon_s3.region%
                bucket: %your_bucket_name%

    cache: s3_fs

{% endhighlight %}

# Conclusions

[VichUploaderBundle](vichuploader), [LiipImagineBundle](liipimagine) and [Gaufrette](gaufrette) are three great Symfony2 bundles. The configuration to make work all them can by tricky so hope this post can help others.

While [VichUploaderBundle](vichuploader) is designed to work with [Gaufrette](gaufrette), and its configuration is almost trivial, [LiipImagineBundle](liipimagine) is not and requires some extra tasks. For [LiipImagineBundle](liipimagine) we need to configure its main components, which are the *cache* and the `data_loader`.


[gaufrette]: https://github.com/KnpLabs/Gaufrette
[uploader]: https://github.com/dustin10/VichUploaderBundle
[imagine]: https://github.com/liip/LiipImagineBundle
