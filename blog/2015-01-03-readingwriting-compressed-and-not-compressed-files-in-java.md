---
layout: post
title: Reading/writing compressed and not compressed files in Java
date: 2015-01-03 07:58
tags:
- java
- tricks
---
Main reason for this post is trying don't repeat yourself ([DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself)) because, often, I fall in the recursive need to read and write compressed and not compressed files (mainly JSON and CSV).

Let's to see first how to read text files. Note I'm working with (relatively small) text files so:

1.  The read methods returns an String with the whole content.
2.  I'm using `BufferedReader` to read line by line.

{% highlight java %}
private String readFile(String fileName) {
    StringBuilder sb = new StringBuilder();
    try {
        BufferedReader input = new BufferedReader(new FileReader(new File(fileName)));
        try {
            String line = null;
            while ((line = input.readLine()) != null) {
                sb.append(line);
            }
        } finally {
            input.close();
        }
    } catch (IOException ex) {
        // Handle exception
        return null;
    }

    return sb.toString();
}
{% endhighlight %}

> Note: there are more than one way to do things. In the entry [Best way to read a text file](http://stackoverflow.com/questions/4716503/best-way-to-read-a-text-file), where you can find many different ways to read a text file depending on your JDK version and the size of the file.

Similarly to write a String to a file:

{% highlight java %}
private void writeFile(String fileName, String value) {
    try {
        FileWriter fw = new FileWriter(fileName);
        BufferedWriter bw = new BufferedWriter(fw);
        bw.write(value);
        bw.close();
    } catch (IOException ex) {
        // Handle exception
    }
}
{% endhighlight %}

To read/write compressed files, that is with binary data, we need to work with streams and buffers. So to read a GZIP compressed file and obtain a String:

{% highlight java %}
private String readCompressedFile(String fileName) {
    try {
        GZIPInputStream gis = new GZIPInputStream(new FileInputStream(fileName));
        ByteArrayOutputStream fos = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len;
        while ((len = gis.read(buffer)) != -1) {
            fos.write(buffer, 0, len);
        }
        fos.close();
        gis.close();
        return new String(fos.toByteArray());
    } catch (IOException ex) {
        // Handle exception
        return null;
    }
}
{% endhighlight %}

and similarly to write a String to a GZip compressed file:

{% highlight java %}
private void writeCompressedFile(String fileName, String value) {
    try {
        InputStream is = new ByteArrayInputStream(value.getBytes());
        GZIPOutputStream gzipOS = new GZIPOutputStream(new FileOutputStream(fileName));
        byte[] buffer = new byte[1024];
        int len;
        while ((len = is.read(buffer)) != -1) {
            gzipOS.write(buffer, 0, len);
        }
        gzipOS.close();
        is.close();
    } catch (IOException ex) {
        // Handle exception
    }
}
{% endhighlight %}

## References

Next you can find a couple of great links with Java code for various JDK versions:

*   [Reading and writing text files](http://www.javapractices.com/topic/TopicAction.do?Id=42)
*   [Reading and writing binary files](http://www.javapractices.com/topic/TopicAction.do?Id=245)
