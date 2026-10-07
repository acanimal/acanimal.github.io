---
title: Using YouTube API to embed videos dinamically on your web site
pubDatetime: 2011-11-02T22:22:00Z
description: It is easy to embed a given YouTube video on a web site, simply use the wizard to get code required code, but what about to do the some automatically using JavaScript? Yes, suppose you have a…
tags:
  - ajax
  - api
  - javascript
  - tricks
  - youtube
---

It is easy to embed a given YouTube video on a web site, simply use the wizard to get code required code, but what about to do the some automatically using JavaScript? Yes, suppose you have a preferred user you follow all his videos and would like to put his/her latest video in your web site.

Every YouTube video has a unique identifier so the challenge is how to get the id if the latest uploaded (or updated if you prefer) video.

## Searching for videos

YouTube has a very rich API and you have lot of parameters available to use, but, probably most important are the ways to search. Mainly you have two options to search videos for a given user:

- Search video feeds:

```applescript
http://gdata.youtube.com/feeds/api/videos?author=SOME_USER&more_parameters
```

- Search videos uploaded for specific user:

```applescript
https://gdata.youtube.com/feeds/api/users/USERNAME/uploads?more_parameters
```

First way is more flexible than second, because you can use lot of parameters to chose and author, limit results number, order by, etc, while the second is like setting the author parameter in the first one.

> **IMPORTANT !!!** Read careful the YouTube API documentacion, concretely the sentence:
>
> **Requests using other parameters, such as orderby, will return cached results.**
>
> That makes me (on other folks) spent lot of time trying to find way searched doesn't get really updated results.

## The requests

What will be our test request? Yeah !!! We are going to check for the lastest video of the user... _ironmaiden_ !!!

We want to get maximum one videos from ironmaiden user and ordered by date of publication. In addition, we want the response be in JSON format (not in XML) so we use the '_alt_' parameter too:

[http://gdata.youtube.com/feeds/api/videos?author=ironmaiden&max-results=1&orderby=published&v=2&alt=jsonc](http://gdata.youtube.com/feeds/api/videos?author=ironmaiden&max-results=1&orderby=published&v=2&alt=jsonc)

[https://gdata.youtube.com/feeds/api/users/ironmaiden/uploads?max-results=1&orderby=published&v=2&alt=jsonc](https://gdata.youtube.com/feeds/api/users/ironmaiden/uploads?max-results=1&orderby=published&v=2&alt=jsonc)

## The response

By default, the returning data is specified in XML format ([see here](http://code.google.com/apis/youtube/2.0/developers_guide_protocol_understanding_video_feeds.html)) but with the help of _alt=jsonc_ parameter it is returned in JSON notation ([see here](http://code.google.com/apis/youtube/2.0/developers_guide_jsonc.html)). For the previous first request the response is:

```javascript
{
    "apiVersion":"2.1",
    "data":{
        "updated":"2011-10-31T19:24:09.441Z",
        "totalItems":14,
        "startIndex":1,
        "itemsPerPage":1,
        "items":[{
            "id":"O9f1bBeYpqA",
            "uploaded":"2011-10-19T13:07:28.000Z",
            "updated":"2011-10-31T16:57:34.000Z",
            "uploader":"ironmaiden",
            "category":"Music",
            "title":"IMTV London",
            "description":"A quick IMTV from the O2. The full IMTV UK episode will be available to fanclub members soon!",
            "tags":["iron","maiden","imtv","on","board","flight","666","Iron Maiden","United Kingdom","Metal"],
            "thumbnail":{
                "sqDefault":"http://i.ytimg.com/vi/O9f1bBeYpqA/default.jpg",
                "hqDefault":"http://i.ytimg.com/vi/O9f1bBeYpqA/hqdefault.jpg"
            },
            "player":{
                "default":"http://www.youtube.com/watch?v=O9f1bBeYpqA&feature=youtube_gdata_player",
                "mobile":"http://m.youtube.com/details?v=O9f1bBeYpqA"
            },
            "content":{
                "5":"http://www.youtube.com/v/O9f1bBeYpqA?version=3&f=videos&app=youtube_gdata",
                "1":"rtsp://v3.cache5.c.youtube.com/CiILENy73wIaGQmgppgXbPXXOxMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                "6":"rtsp://v2.cache8.c.youtube.com/CiILENy73wIaGQmgppgXbPXXOxMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp"
            },
            "duration":316,
            "aspectRatio":"widescreen",
            "rating":4.9898734,
            "likeCount":"394",
            "ratingCount":395,
            "viewCount":47086,
            "favoriteCount":110,
            "commentCount":105,
            "accessControl":{
                "comment":"allowed",
                "commentVote":"allowed",
                "videoRespond":"moderated",
                "rate":"allowed",
                "embed":"allowed",
                "list":"allowed",
                "autoPlay":"allowed",
                "syndicate":"allowed"
            }
        }]
    }
```

As you can see the ID of the video is at:

```javascript
data.items[0].id;
```

## Embeding a video

Embeding a video by hand is easy, you simply click on "share" button, then on "embed", copy and paste the code and that's all:

![youtube_embed](@/content/posts/images/youtube_embed-251x300.png)~~But hey !!! We are bad boys, worst if it is possible, we are programmers and we live to programming, so we are going to do the same than any other mortal but programming, so _program once run forever_ !!! (mmm... that slogan sounds me like a island name programming language).~~

The intention is to make the code necessary to get the latest video identifier and inject the code to embed video on page, like this:

```xml
<iframe width="420" height="315" src="http://www.youtube.com/embed/PieS0zG228A"
frameborder="0" allowfullscreen></iframe>
```

## Automatically embedding the latest video

Finally arrive to the most interesting section. As you can imagine we can do it in the AJAX way, making an asynchronous request and injecting the code but in addition I will put a more "static" way to do, thanks to the _callback_ parameter in the request.

### The AJAX way

First, create div elements to contain the video frame and a button to start the loading process:

```xml
<div id="ajax_video"></div>
<button id="ajaxbutton">AJAX way</button>
```

In the head section of the document Ihave added the required JavaScript code (I'm using jQuery to do it):

```javascript
<script type="text/javascript">
    $(document).ready(function(){
        $('#ajaxbutton').click(function(event){
            $.get('https://gdata.youtube.com/feeds/api/users/ironmaiden/uploads?max-results=1&orderby=published&v=2&alt=jsonc',
            function(response) {
                if(response.data && response.data.items) {
                    var items = response.data.items;
                    if(items.length>0) {
                        var item = items[0];
                        var videoid = "http://www.youtube.com/embed/"+item.id;
                        console.log("Latest ID: '"+videoid+"'");
                        var video = "<iframe width='420' height='315' src='"+videoid+"' frameborder='0' allowfullscreen></iframe>";
                        $('#ajax_video').html(video);
                    }
                }
            });
        });
    });
</script>
```

As we mention, the request get the latest video from _ironmaiden_ user, creates an iframe element containing it and add it to the previously created div element.

### Using callback parameter

This version differs from previous one because the request is made when page is loaded. What I'm saying? Exactly this, the request is made including JavaScript code:

```xml
<script type="text/javascript" src="https://gdata.youtube.com/feeds/api/users/ironmaiden/uploads?max-results=1&orderby=published&v=2&alt=jsonc&callback=showVideo"></script>
```

The url includes the _callback_ parameter which is responsible to call the specified function once the code is loaded.

Putting it all together, in the same way that previous case you need a div element that contains the video iframe and a JavaScript code to add the iframe from the response:

```xml
<div id="static_video"></div>
<script type="text/javascript">
    function showVideo(response) {
        if(response.data && response.data.items) {
            var items = response.data.items;
            if(items.length>0) {
                var item = items[0];
                var videoid = "http://www.youtube.com/embed/"+item.id;
                console.log("Latest ID: '"+videoid+"'");
                var video = "<iframe width='420' height='315' src='"+videoid+"' frameborder='0' allowfullscreen></iframe>";
                $('#static_video').html(video);
            }
        }
    }
</script>
<script type="text/javascript" src="https://gdata.youtube.com/feeds/api/users/ironmaiden/uploads?max-results=1&orderby=published&v=2&alt=jsonc&callback=showVideo"></script>
```

The browser load the elements in the order it encounters, so it is important to put the code in the right place so browser finds first the 'showVideo' function before loading the YouTube code request.

### Demo

You can see a demo working [here](http://www.acuriousanimal.com/code/youtube_embed/index.html).

## References

[http://code.google.com/apis/youtube/2.0/reference.html#Searching\_for\_videos](http://code.google.com/apis/youtube/2.0/reference.html#Searching_for_videos)

[http://code.google.com/apis/youtube/2.0/developers\_guide\_protocol.html#Retrieving\_and\_searching\_for\_videos](http://code.google.com/apis/youtube/2.0/developers_guide_protocol.html#Retrieving_and_searching_for_videos)

[http://code.google.com/apis/youtube/2.0/developers\_guide\_json.html](http://code.google.com/apis/youtube/2.0/developers_guide_json.html)
