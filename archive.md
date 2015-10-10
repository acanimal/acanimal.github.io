---
layout: page
title: Archive
date: 2015-10-10 11:42
---

<ul>
  {% for post in site.posts %}

    {% unless post.next %}
      <h3>{{ post.date | date: '%Y' }}</h3>
    {% else %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
      {% if year != nyear %}
        <h3>{{ post.date | date: '%Y' }}</h3>
      {% endif %}
    {% endunless %}

    <li><em>{{ post.date | date:"%b %d, %Y" }}</em> - <a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
