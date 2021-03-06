---
layout: post
title: Things I learned creating a jQuery Plugin (Part II)
date: 2013-02-25 22:22
tags:
- javascript
- jquery
- plugins
---
This post is the continuation of the series <a title="Things I learnt creating a jQuery Plugin (Part I)" href="//2013/01/15/things-i-learned-creating-a-jquery-plugin-part-i">Things I learned creating a jQuery Plugin</a>.

<p>In the first part we have seen how the structure of a jQuery plugin must be, the plugin entry point (so called wrapper function) and how we can control the behavior of a method as a getter or setter.</p>

<h2>Define default options</h2>
<p>Your plugin more probably will accept different set of options to allow some configuration. For these reason it is important to define a set of default options which will be applied in cases where no options are specified by the user. Place it within the jQuery wrapper function is a good practice:</p>
<pre class="prettyprint">//
// Default options
//
$.fn[pluginName].defaults = {
    opt_A: ""
};</pre>
<h2>Encapsulate your plugin code</h2>
<p>A good practice is to encapsulate the logic of our plugin within a function, this way our plugin's entry point function can easily initialize or call the right method.</p>
<p>For example, in a really simple wrapper function, that simply initializes a plugin's instance on each selected element, we could write something like:</p>
<pre class="prettyprint">$.fn[pluginName] = function(options) {
    return this.each(function() {
        new Plugin(this, options);
    });
}</pre>
<h3>The plugin constructor</h3>
<p>The main part of your plugin is the constructor function. Usually this function is responsible to initialize the plugin, store a reference to the selected element or merge the passed options with the default ones:</p>
<pre class="prettyprint">function Plugin(element, options) {
    // Store references to the selected element
    this.el = element;
    this.$el = $(element);

    // Merge passes options with defaults
    this.options = $.extend({}, $.fn[pluginName].defaults, options);

    // ...other code here...

    // Initialize the plugin instance
    this.init();
}</pre>
<h3>Prototype your plugin</h3>
<p>Once the <code>Plugin</code> function is defined we can modify its prototype adding all the desired methods we want for our plugin.</p>
<p>There are a couple of methods are a good practice to implement:</p>
<ul>
<li>A <code>init</code> method, which initializes each plugins instance: creating new DOM elements, registering listeners, etc</li>
<li>A <code>destroy</code> method, responsible to free any resource used by the plugin: extra elements, unregister listeners, etc.</li>
</ul>
<p>Other methods can be created within your plugin's prototype but remember the convention: <em>Use method names starting with underscore for those methods we want to be private</em>.</p>
<blockquote><p>If you remember the first part of this series, what really happens is when you call a plugin's method, the wrapper function of our plugin checks if the method's name starts with underscore and if so then avoids the call.</p></blockquote>
<pre class="prettyprint">//
// Plugin prototype
//
Plugin.prototype = {

    //
    // Initialize the plugin instance
    //
    init: function() {
        ...
    },

    //
    // Free resources
    //
    destroy: function() {
        ...
    },

    //
    // Public method
    //
    publicMethod: function() {
        ...
    },

    //
    // Private method (it starts with an underscore)
    //
    _privateMethod: function() {
        ...
    }

}</pre>
<h3>A note on the <code>destroy</code> method</h3>
<p>As we have commented, the <code>destroy</code> method must free any resource used by the plugin instance, like extra created elements, unregister listeners, etc</p>
<p>If you remember the first article, you will notice that the plugin's instance is stored within the selected DOM element where the plugin is applied:</p>
<pre class="prettyprint">$.fn[pluginName] = function(options) {
    var args = arguments;

    if (options === undefined || typeof options === 'object') {
        // Creates a new plugin instance, for each selected element, and
        // stores a reference withint the element's data
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }

    ...
};</pre>
<p>That occurs in the line:</p>
<pre class="prettyprint">$.data(this, 'plugin_' + pluginName, new Plugin(this, options));</pre>
<p>So, the last action in your <code>destroy</code> method must be always remove the plugin's instance reference from the element's data. This can easily done using the reference to the DOM element stored in the plugin instance:</p>
<pre class="prettyprint">//
// Free resources
//
destroy: function() {

    // Remove elements, unregister listerners, etc

    // Remove data
    this.$el.removeData();
}</pre>
<h2>Allow the use of callbacks in our plugin</h2>
<p>It is common jQuery plugins allows to register callback functions to be called when an event or action is generated by the plugins. For example, in the <a href="http://www.acuriousanimal.com/tagger.js">tagger</a> plugin the user can be notified when a new tag is added, removed, clicked, etc.</p>
<p>Next lines shows the initialization of the tagger plugin setting the parameter <code>fieldSeparator</code> to a value different from the default options value and registering a callback function for the <code>onTagAdded</code> event:</p>
<pre class="prettyprint">$('#inputID').tagger({
  fieldSeparator: '|'
  onTagsAdded: function(tags) {
    console.log('Added new tag: '+tags+'\n');
  }
});</pre>
<p>To achieve this we need to make to main steps:</p>
<ol>
<li><span style="line-height: 13px;">Define a default and empty callback function in the plugins default options.</span></li>
<li>At some place of our plugin's code make a call to the callback function.</li>
</ol>
<p>Continuing with the sample of the <a href="http://www.acuriousanimal.com/tagger.js">tagger</a> plugin, its default options looks like:</p>
<pre class="prettyprint">//
// Default options
//
$.fn[pluginName].defaults = {
    fieldSeparator: ",",
    readOnly: false,
    // Callback invoked when user calls the 'tags' method
    onTagsAdded: function() {
    },
    // Callback invoked when user calls the 'remove' method
    onTagsRemoved: function() {
    },
    // Callback invoked when user calls the 'clear' method.
    // Note: Internally the 'clear' method uses the 'remove'.
    onClear: function() {
    },
    // Callback invoked when the user click a tag label
    onClick: function() {
    }
};</pre>
<p>Later, in the method responsible to add new tags to the tag list, a call is made to the <code>onTagsAdded</code> function:</p>
<pre class="prettyprint">// Adds one or more tags
// ...
//
tags: function(tags) {
      ...
      // Call the callback
      this.options.onTagsAdded.call(this, tags);
      ...
    }
},</pre>
<blockquote><p>Note how we have forced to set the <code>this</code> object and passed the value of the new added tag to the callback function.</p></blockquote>
<h2>Summary</h2>
<p>Ok, this is the end. A short series of two articles to introduce the main concepts to creating jQuery plugins isn't a bad thing when you are looking for help starting with jQuery and custom plugin development.</p>
<p>Let's try to summarize the main points we have seen in this couple of posts:</p>
<ul>
<li>Understand the importance of entry point to your plugin. This is handled in a new function on the <code>$.fn</code> object and is responsible to (or can) control: plugin initialization, call to setter or getter methods, simulate private methods, etc.</li>
<li>Encapsulate your plugin's functionalities in a prototyped function</li>
<li>Store, if needed, a reference to the DOM element where your plugin is applied to.</li>
<li>Remember to implement a <code>destroy</code> method responsible to free all the resources used by your plugin</li>
<li>Create a default options object that serves as a base to extend it with the options specified by the user</li>
<li>Keep calm and remember try and error is a (necessary) way to learn</li>
</ul>
<h2>References</h2>
<p>The web is plenty of great information:</p>
<p><a href="http://docs.jquery.com/Plugins/Authoring">http://docs.jquery.com/Plugins/Authoring </a></p>
<p><a href="http://www.websanova.com/tutorials/jquery/the-ultimate-guide-to-writing-jquery-plugins">http://www.websanova.com/tutorials/jquery/the-ultimate-guide-to-writing-jquery-plugins</a></p>
<p><a href="http://jqueryboilerplate.com/">http://jqueryboilerplate.com/ </a></p>
<p><a href="https://github.com/zenorocha/jquery-plugin-patterns">https://github.com/zenorocha/jquery-plugin-patterns</a></p>
<p><a href="http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/">http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/</a></p>
<p><a href="http://addyosmani.com/resources/essentialjsdesignpatterns/book/#jquerypluginpatterns">http://addyosmani.com/resources/essentialjsdesignpatterns/book/#jquerypluginpatterns</a></p>
<p>&nbsp;</p>
