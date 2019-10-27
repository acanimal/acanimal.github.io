---
layout: post
title: Using YouTube API to embed videos dinamically on your web site
date: 2011-11-02 22:22
tags:
- ajax
- api
- javascript
- tricks
- youtube
---
It is easy to embed a given YouTube video on a web site, simply use the wizard to get code required code, but what about to do the some automatically using JavaScript? Yes, suppose you have a preferred user you follow all his videos and would like to put his/her latest video in your web site.

<p>Every YouTube video has a unique identifier so the challenge is how to get the id if the latest uploaded (or updated if you prefer) video.</p>

<h2>Searching for videos</h2>
<p>YouTube has a very rich API and you have lot of parameters available to use, but, probably most important are the ways to search. Mainly you have two options to search videos for a given user:</p>
<ul>
<li>Search video feeds:
<pre class="brush:applescript">http://gdata.youtube.com/feeds/api/videos?author=SOME_USER&amp;more_parameters</pre>
</li>
<li>Search videos uploaded for specific user:
<pre class="brush:applescript">https://gdata.youtube.com/feeds/api/users/USERNAME/uploads?more_parameters</pre>
</li>
</ul>
<p>First way is more flexible than second, because you can use lot of parameters to chose and author, limit results number, order by, etc, while the second is like setting the author parameter in the first one.</p>
<blockquote><p><strong>IMPORTANT !!!</strong> Read careful the YouTube API documentacion, concretely the sentence:</p>
<p><strong>Requests using other parameters, such as orderby, will return cached results.</strong></p>
<p>That makes me (on other folks) spent lot of time trying to find way searched doesn't get really updated results.</p></blockquote>
<h2>The requests</h2>
<p>What will be our test request? Yeah !!! We are going to check for the lastest video of the user... <em>ironmaiden</em> !!!</p>
<p>We want to get maximum one videos from ironmaiden user and ordered by date of publication. In addition, we want the response be in JSON format (not in XML) so we use the '<em>alt</em>' parameter too:</p>
<p><a href="http://gdata.youtube.com/feeds/api/videos?author=ironmaiden&amp;max-results=1&amp;orderby=published&amp;v=2&amp;alt=jsonc">http://gdata.youtube.com/feeds/api/videos?author=ironmaiden&amp;max-results=1&amp;orderby=published&amp;v=2&amp;alt=jsonc</a></p>
<p><a href="https://gdata.youtube.com/feeds/api/users/ironmaiden/uploads?max-results=1&amp;orderby=published&amp;v=2&amp;alt=jsonc">https://gdata.youtube.com/feeds/api/users/ironmaiden/uploads?max-results=1&amp;orderby=published&amp;v=2&amp;alt=jsonc</a></p>
<h2>The response</h2>
<p>By default, the returning data is specified in XML format (<a href="http://code.google.com/apis/youtube/2.0/developers_guide_protocol_understanding_video_feeds.html">see here</a>) but with the help of <em>alt=jsonc</em> parameter it is returned in JSON notation (<a href="http://code.google.com/apis/youtube/2.0/developers_guide_jsonc.html">see here</a>). For the previous first request the response is:</p>
<pre class="brush:js">{
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
                "default":"http://www.youtube.com/watch?v=O9f1bBeYpqA&amp;feature=youtube_gdata_player",
                "mobile":"http://m.youtube.com/details?v=O9f1bBeYpqA"
            },
            "content":{
                "5":"http://www.youtube.com/v/O9f1bBeYpqA?version=3&amp;f=videos&amp;app=youtube_gdata",
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
    }</pre>
<p>As you can see the ID of the video is at:</p>
<pre class="brush:js">data.items[0].id</pre>
<h2>Embeding a video</h2>
<p>Embeding a video by hand is easy, you simply click on "share" button, then on "embed", copy and paste the code and that's all:</p>
<p><a href="./images/2011/10/youtube_embed.png"><img class="aligncenter size-medium wp-image-451" title="youtube_embed" src="./images/youtube_embed-251x300.png" alt="" width="251" height="300" /></a><del>But hey !!! We are bad boys, worst if it is possible, we are programmers and we live to programming, so we are going to do the same than any other mortal but programming, so <em>program once run forever</em> !!! (mmm... that slogan sounds me like a island name programming language).</del></p>
<p>The intention is to make the code necessary to get the latest video identifier and inject the code to embed video on page, like this:</p>
<pre class="brush:xml">&lt;iframe width="420" height="315" src="http://www.youtube.com/embed/PieS0zG228A"
frameborder="0" allowfullscreen&gt;&lt;/iframe&gt;</pre>
<h2>Automatically embedding the latest video</h2>
<p>Finally arrive to the most interesting section. As you can imagine we can do it in the AJAX way, making an asynchronous request and injecting the code but in addition I will put a more "static" way to do, thanks to the <em>callback</em> parameter in the request.</p>
<h3>The AJAX way</h3>
<p>First, create div elements to contain the video frame and a button to start the loading process:</p>
<pre class="brush:xml">&lt;div id="ajax_video"&gt;&lt;/div&gt;
&lt;button id="ajaxbutton"&gt;AJAX way&lt;/button&gt;</pre>
<p>In the head section of the document Ihave added the required JavaScript code (I'm using jQuery to do it):</p>
<pre class="brush:js">&lt;script type="text/javascript"&gt;
    $(document).ready(function(){
        $('#ajaxbutton').click(function(event){
            $.get('https://gdata.youtube.com/feeds/api/users/ironmaiden/uploads?max-results=1&amp;orderby=published&amp;v=2&amp;alt=jsonc',
            function(response) {
                if(response.data &amp;&amp; response.data.items) {
                    var items = response.data.items;
                    if(items.length&gt;0) {
                        var item = items[0];
                        var videoid = "http://www.youtube.com/embed/"+item.id;
                        console.log("Latest ID: '"+videoid+"'");
                        var video = "&lt;iframe width='420' height='315' src='"+videoid+"' frameborder='0' allowfullscreen&gt;&lt;/iframe&gt;";
                        $('#ajax_video').html(video);
                    }
                }
            });
        });
    });
&lt;/script&gt;</pre>
<p>As we mention, the request get the latest video from <em>ironmaiden</em> user, creates an iframe element containing it and add it to the previously created div element.</p>
<h3>Using callback parameter</h3>
<p>This version differs from previous one because the request is made when page is loaded. What I'm saying? Exactly this, the request is made including JavaScript code:</p>
<pre class="brush:xml">&lt;script type="text/javascript" src="https://gdata.youtube.com/feeds/api/users/ironmaiden/uploads?max-results=1&amp;orderby=published&amp;v=2&amp;alt=jsonc&amp;callback=showVideo"&gt;&lt;/script&gt;</pre>
<p>The url includes the <em>callback</em> parameter which is responsible to call the specified function once the code is loaded.</p>
<p>Putting it all together, in the same way that previous case you need a div element that contains the video iframe and a JavaScript code to add the iframe from the response:</p>
<pre class="brush:xml">&lt;div id="static_video"&gt;&lt;/div&gt;
&lt;script type="text/javascript"&gt;
    function showVideo(response) {
        if(response.data &amp;&amp; response.data.items) {
            var items = response.data.items;
            if(items.length&gt;0) {
                var item = items[0];
                var videoid = "http://www.youtube.com/embed/"+item.id;
                console.log("Latest ID: '"+videoid+"'");
                var video = "&lt;iframe width='420' height='315' src='"+videoid+"' frameborder='0' allowfullscreen&gt;&lt;/iframe&gt;";
                $('#static_video').html(video);
            }
        }
    }
&lt;/script&gt;
&lt;script type="text/javascript" src="https://gdata.youtube.com/feeds/api/users/ironmaiden/uploads?max-results=1&amp;orderby=published&amp;v=2&amp;alt=jsonc&amp;callback=showVideo"&gt;&lt;/script&gt;</pre>
<p>The browser load the elements in the order it encounters, so it is important to put the code in the right place so browser finds first the 'showVideo' function before loading the YouTube code request.</p>
<h3>Demo</h3>
<p>You can see a demo working <a href="http://www.acuriousanimal.com/code/youtube_embed/index.html">here</a>.</p>
<h2>References</h2>
<p><a href="http://code.google.com/apis/youtube/2.0/reference.html#Searching_for_videos">http://code.google.com/apis/youtube/2.0/reference.html#Searching_for_videos</a></p>
<p><a href="http://code.google.com/apis/youtube/2.0/developers_guide_protocol.html#Retrieving_and_searching_for_videos">http://code.google.com/apis/youtube/2.0/developers_guide_protocol.html#Retrieving_and_searching_for_videos</a></p>
<p><a href="http://code.google.com/apis/youtube/2.0/developers_guide_json.html">http://code.google.com/apis/youtube/2.0/developers_guide_json.html</a></p>
