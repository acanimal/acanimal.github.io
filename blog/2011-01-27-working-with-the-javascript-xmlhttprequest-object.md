---
layout: post
title: Working with the JavaScript XMLHttpRequest object
date: 2011-01-27 23:07
tags:
- ajax
- javascript
- xmlhttprequest
---
In the last years JavaScript has become one of the most important programming languages. Probably one of the most famous words related to JavaScript is <a href="http://en.wikipedia.org/wiki/Ajax_(programming)">AJAX</a> (Asynchronous JavaScript and XML).  Request from JavaScript are made through the XmlHttpRequest JavaScript object which lets you open connections, send the request and handle data returned by the server.  This post is about XMLHttpRequest object, how to use it and how to handle data in a synchronous or asynchronous way.

<h3>Creating a XMLHttpRequest instance</h3>
<p>Usually the way to create a XMLHttpRequest instance is simply using:</p>
<pre class="brush:js">var req = new XMLHttpRequest();</pre>
<p>but unfortunately this can't work in old versions of Internet Explorer. In IE6 and earlier, XMLHTTP was implemented as an ActiveX object provided by Microsoft XML (MSXML). Beginning with IE7 XMLHTTP is also exposed as a native scripting object. As simple code to solve this:</p>
<pre class="brush:js">XMLHttpFactories = [ function() {
	return new XMLHttpRequest();
}, function() {
	return new ActiveXObject("Msxml2.XMLHTTP");
}, function() {
	return new ActiveXObject("Msxml3.XMLHTTP");
}, function() {
	return new ActiveXObject("Microsoft.XMLHTTP");
} ];

function createXHRObject() {
	var xhrobject = null;
	for ( var i = 0; i &lt; XMLHttpFactories.length; i++) {
		try {
			xhrobject = XMLHttpFactories[i]();
		} catch (e) {
			continue;
		}
		break;
	}
	return xhrobject;
};

var req = createXHRObject();</pre>
<h3>The XMLHttpRequest methods</h3>
<p>Now we know how to get a fresh instance we need to know a bit more about it, how to make requests and how to handle responses.</p>
<blockquote><p>Note: Visit the W3C page, referenced below at references section, for a more in depth detail explanation.</p></blockquote>
<h4>Controlling request metadata variables</h4>
<p>When making request we could be interested to control things like: target url, the http method used to make the request, set any http header parameter, set the data to be sent, etc Next is a brief description of the methods that allows us to do that.</p>
<ul>
<li><strong>open(<var>method</var>, <var>url</var>, <var>async</var>, <var>user</var>, <var>password</var>)</strong>: opens a HTTP connection using any available http <em>method</em> (GET, POST, PUT, DELETE, ...) to the specified <em>url</em>. The flag <em>async</em> specifies if the request must be done asynchronously or synchronously.</li>
<li><strong>setRequestHeader(<var>header</var>, <var>value</var>)</strong>: allows us to set any desired HTTP header in the request.</li>
<li><strong>send(<var>data</var>)</strong>: while <em>open</em> sets the connection to a server, the <em>send</em> method is which really initiate the request (<em>read the W3C document patiently, the send method is the key and has lot of thing to be known</em>).</li>
<li><strong>abort()</strong>: allows to cancel the request.</li>
</ul>
<h4>Handling response data</h4>
<p>Once a request is sent we get a response object (don't worry you'll some samples in a while). This object has the next important methods and attributes:</p>
<ul>
<li><strong>status</strong>: if the request is done it returns the HTTP status code (<em>read carefully the documentation at W3C, there is more than I'm talking here</em>).</li>
<li><strong>statusText</strong>: similar to the previous attribute, it returns the status textual representation.</li>
<li><strong>getResponseHeader(header)</strong>: allows to get the specified HTTP response header.</li>
<li><strong>getAllResponseHeaders()</strong>: similarly this get all headers.</li>
<li><strong>responseText/<strong>responseXML</strong></strong>: contains the response.</li>
</ul>
<h3>Examples: lets play</h3>
<p>The most used http methods in AJAX are by far GET and POST, so lets go to take a look on how to use them.</p>
<h4>Synchronous request using GET</h4>
<p>Next code shows a synchronous request to get content via GET method. It is important to note the 'send' method blocks until the request is done. After that you can get the response data.</p>
<pre class="brush:js">// The 'false' flag means it is a synchronous request
req.open('GET', 'some_url', false);
// This is blocked until request is done and a response is ready
req.send(null);
// If things goes fine then get result
if (req.readyState == 4 &amp;&amp; req.status == 200) {
    alert(req.responseText);
}</pre>
<p>To ensure request was done successfully you need to check the <em>readyState </em>and <em>status </em>attributes. In addition, if you need to pass any arguments you can do attaching it to the URL (like a GET request on your browser):</p>
<pre class="brush:js">req.open('GET', 'some_url?param1=value1&amp;m2=value2', false);</pre>
<h4>Asynchronous request using POST</h4>
<p>Now we are going to see the opposite sample. Next is an asynchronous request using POST method:</p>
<pre class="brush:js">// The 'true' flag means it is an asynchronous request
req.open('POST', some_url, true);
// This is called once the request is done
req.onreadystatechange = function() {
  // If things goes fine then get result
  if (req.readyState == 4 &amp;&amp; req.status == 200) {
    alert(req.responseText);
  }
};
// You must set the content type of the request.
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// In a POST request data must go here
req.send('param1=value1&amp;m2=value2');</pre>
<p>The code has some important differences. First, in the '<em>open</em>' method the flag is set to <em>true</em> to make it an asynchronous request. Second, in a POST request the data must be set in the '<em>send</em>' method and you must explicitly specify the <em>Content-Type</em> of the data the request is sent. Finally, and the most important, the '<em>send</em>' method doesn't block the execution. The request is sent and code continues executing so we need to attach an event handler to the '<em>onreadystatechange</em>', this way once the request is done our handler function is executed. Again we need to check the response <em>readyState </em>and <em>status </em>attributes before to getting the results.</p>
<h3>Cross Domain Request</h3>
<p>Maybe you are thinking XMLHttpRequest object is the solution to create a really rich internet application requesting data from any place and merging it all together in your own web page but... there are restrictions and cross site request(XSR) are one of them. These restrictions are based in the <a href="http://en.wikipedia.org/wiki/Same_origin_policy">same origin policy</a>.</p>
<p>Basically, when you load a web page from a domain A and supposing that web page contains your JavaScript code, that code is restricted to make requests on the domain A:</p>
<p><img class="aligncenter" src="./images/proxy1.gif" alt="" width="336" height="189" /></p>
<p>You can't make request from a page loaded on domain A to a domain B (your browser avoids it for security reasons):</p>
<p><img class="aligncenter" src="./images/proxy2.gif" alt="" width="347" height="284" /></p>
<p>One way to solve it is using your web server (from where you load the web page) as a proxy server. You make the AJAX request to some place on your server and this makes the real request out and returns the results:</p>
<p><img class="aligncenter" src="./images/proxy3.gif" alt="" width="525" height="201" /></p>
<p>Next is a possible message you can get when doing cross domain request. Here I load a test page from my local server that tries to load a resource from <em>acuriousanimal </em>domain:</p>
<pre class="brush:plain">XMLHttpRequest cannot load http://www.acuriousanimal.com/. Origin http://localhost:8080 is not allowed by Access-Control-Allow-Origin.
Uncaught Error: NETWORK_ERR: XMLHttpRequest Exception 101</pre>
<h3>Cross Origin Resource Sharing and Access-Control-Allow-* headers</h3>
<p>To allow cross domain request the so called <a href="http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing">Cross Origin Resource Sharing</a> (CORS) specification was developed. To use it you need a compatible browser (at least IE8, Chrome 3, FireFox 3.5, Safari 4), otherwise any request to a different domain will simply throw an exception.</p>
<p>How does CORS work? CORS needs client/server cooperations. Before a request is sent the client (browser) adds the '<em>origin</em>' HTTP header to the request with the url of the client. The server response must contain some <em>Access-Control-Allow-*</em> HTTP headers indicating which urls, methods or headers the client is allowed to user.</p>
<p>In the previous section sample error we have make a request to a server but our url isn't listed in the <em>Access-Control-Allow-Origin</em> header. Take a look to the <a href="https://developer.mozilla.org/En/HTTP_Access_Control#The_HTTP_response_headers">different headers</a> you can use at server side to control which clients are allowed to use your services. Here I would like to point the two most used by me:</p>
<ul>
<li><em>Access-Control-Allow-Origin</em>: can contain a list of client domains allows to make requests on your server.</li>
<li><em>Access-Control-Allow-Methods</em>: here you can specify which HTTP methods can be used (for example only allow GET).</li>
</ul>
<h3>References</h3>
<ul>
<li><a href="https://developer.mozilla.org/en/AJAX/Getting_Started" target="_self">https://developer.mozilla.org/en/AJAX/Getting_Started</a> - Mozilla's "<em>Getting started</em>" tutorial.</li>
<li><a href="http://www.w3.org/TR/XMLHttpRequest" target="_self">http://www.w3.org/TR/XMLHttpRequest</a> - W3C XMLHttpRequest specification.</li>
<li><a href="http://msdn.microsoft.com/en-us/library/cc288060(VS.85).aspx" target="_self">http://msdn.microsoft.com/en-us/library/cc288060(VS.85).aspx</a> - XDomainRequest object available on IE8.</li>
<li><a href="http://msdn.microsoft.com/en-us/library/ms537505(v=vs.85).aspx">http://msdn.microsoft.com/en-us/library/ms537505(v=vs.85).aspx</a> - About native XMLHttp implementation on IE.</li>
<li><a href="https://developer.mozilla.org/En/HTTP_Access_Control">https://developer.mozilla.org/En/HTTP_Access_Control</a> - HTTP access control. Very important for cross-site HTTP request.</li>
<li><a href="http://developer.yahoo.com/javascript/howto-proxy.html">http://developer.yahoo.com/javascript/howto-proxy.html</a> - Cross Domain Request using a proxy.</li>
</ul>
