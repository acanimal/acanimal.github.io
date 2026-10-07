---
title: Crop image on the client side with JCrop and HTML5 canvas element
pubDatetime: 2011-09-26T15:29:00Z
description: Suppose you are working on a nice web application where the user can upload images to, for example, a shop catalogue (mmm... that makes me think on something :p ) but wait... you don't the catalogue…
tags:
  - html5
  - javascript
  - jquery
  - tricks
---

Suppose you are working on a nice web application where the user can upload images to, for example, a shop catalogue (mmm... that makes me think on something :p ) but wait... you don't the catalogue uses the whole image you upload instead a piece of it. So, we need to crop the image.

![jcrop](@/content/posts/images/jcrop.png)

I won't go in depth on how to create the whole process, in summary:

1.  User choose an images and app upload to server.
2.  Wep app shows the images to user and allows him/her to crop the desired piece of image.
3.  Crop parameters (x, y, widht, height) are sent to server which responsible to really crop the image.

Here we talk about the step 2: the web page that allows to crop (or choose some image area) and send the parameters to the serve to make the real crop (for example using GD or ImageMagick).

The real magic comes from [JCrop](http://deepliquid.com/content/Jcrop.html), a jQuery plugin to select areas within an image. As I note in the demo, in the JCrop project page there is a demo that makes a preview of the selection using two <img> elements.

Here the we are going to make something very similar but using the HTML5 canvas element (to practice a bit :p).

The first step is to add one img element pointing to the image and one canvas element which will act as the previous:

```xml
<img src="./sago.jpg" id="target" alt="Flowers" />
<canvas id="preview" style="width:150px;height:150px;overflow:hidden;"></canvas>
```

Now the code that preview the selected cropped image every time the user updates the selected area:

```javascript
$("#target").Jcrop({
  onChange: updatePreview,
  onSelect: updatePreview,
  aspectRatio: 1,
});

function updatePreview(c) {
  if (parseInt(c.w) > 0) {
    // Show image preview
    var imageObj = $("#target")[0];
    var canvas = $("#preview")[0];
    var context = canvas.getContext("2d");
    context.drawImage(
      imageObj,
      c.x,
      c.y,
      c.w,
      c.h,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }
}
```

As you can see the main parameters are the coordinate fields (variable 'c'). One way to send it to server is to store in four hidden input filed in a form, and send them on submit.

Looking again to the post I think there are too much words to simply show an easy HTML5 canvas example :)
