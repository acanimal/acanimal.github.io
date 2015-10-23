---
layout: post
title: Reading very big JSON files in stream mode with GSON
date: 2015-10-23 15:19
tags:
- howto
- java
---

JSON is everywhere, it is the new fashion file format (see you XML). JSON format is mainly used on REST APIs because it is easy to read by JavaScript  (JSON means JavaScript Object Notation) allowing to develop client side application. In Java and, similarly to the old days of XML, we have different ways to read JSON files: object model or streaming way. No one is better than other, they are simply designed for different needs and situations.

The object model way works loading the whole file in memory and translating each JavaScript object to a Java object containing all the properties, array objects, etc. It is similar to the DOM way to read XML files.

On the other hand, the stream way reads the file *byte by byte* and allows to apply actions when an object starts, an array ends, etc. It is similar to SAX way to read XML files.

There is a third way to read a JSON file, similarly to StAX with XML, that combines the streaming way to read with the object model. For example, we can read a file in stream mode and when found an object start then read the whole object into memory.

Which method is better depends on your needs. If your JSON is small the object model is great because you can load all the data and work as a normal Java objects, searching within an array, iterating, etc. When the file is really big you'll probably don't want to load it all into memory, so the streaming model is the best choice.

### The scene

We are working on an API implemented in Java and one of the operations requires to open a big JSON file (about 10Mb) an returns an object identified by a given string. The file in question is formed by an array of objects, tons of object, and it has no sense to read the whole file and create tons of Java objects into memory only to return one.

So, this is a good scenario to read the JSON file in stream mode.

### The code

Before to continue it is worth to mention the code you will see here is available at [java-json-examples](https://github.com/acanimal/java-json-examples) repository.

I have generated a 2.5MB JSON file using the [mockjson](http://experiments.mennovanslooten.nl/2010/mockjson/tryit.html) tool. The data file is formed by an array ob *person* objects. Each *person* has an `id`, `name`, a `married` status and a list of `sons` and `daughters`:

{% highlight json %}
[
  {
    "id" : 0,
    "married" : true,
    "name" : "George Moore",
    "sons" : null,
    "daughters" : [
      {
        "age" : 25,
        "name" : "Elizabeth"
      },
      {
        "age" : 28,
        "name" : "Nancy"
      },
      {
        "age" : 9,
        "name" : "Sandra"
      }
    ]
  },
  ...
]
{% endhighlight %}


### GSON

We are using [GSON](https://en.wikipedia.org/wiki/Gson) to read JSON files in Java. Take a look to the wikipedia link so you can see some of its main features.

> The other one great library to work with JSON data is Jackson. Both have similar features and performance.

### Our `Person` model class

When GSON reads JSON data it allows to unmarshal it to a given Java class. For this purpose we have created the `Person` class which will store all the previous information (for the sample we are only stoting the person `id` and `name`):

{% highlight java %}
public class Person {
    private int id;
    private String name;

    // Getter/Setter methods
    ...

    @Override
    public String toString() {
        return "Person{" + "id=" + id + ", name=" + name + '}';
    }
}
{% endhighlight %}

#### Reading using object model

Next code shows how to read the JSON file using the object model. Remember, we are loading the whole file in memory converting data to `Person` java class.

{% highlight java %}
public static void readDom() {
    BufferedReader reader = null;
    try {
        reader = new BufferedReader(new FileReader(file));
        Gson gson = new GsonBuilder().create();
        Person[] people = gson.fromJson(reader, Person[].class);

        System.out.println("Object mode: " + people[0]);

    } catch (FileNotFoundException ex) {
        ...
    } finally {
        ...
    }
}
{% endhighlight %}

The magic occurs within the line: `Person[] people = gson.fromJson(reader, Person[].class);`. We are telling GSON to read the file and return an array of `Person` objects.

From here, if we want to return a given person we need to find it within the array. Let's take a look how we can do the same using the stream mode.

#### Reading using the stream mode

What we really are going to do here is to use a mixed mode between stream and object model. We are going to read file in stream mode and each time we found the start of a person object we are going to unmarshal it using the object model and we will repeat the process until we found the desired object.

{% highlight java %}
public static void readStream() {
    try {
        JsonReader reader = new JsonReader(new InputStreamReader(stream, "UTF-8"));
        Gson gson = new GsonBuilder().create();

        // Read file in stream mode
        reader.beginArray();
        while (reader.hasNext()) {
            // Read data into object model
            Person person = gson.fromJson(reader, Person.class);
            if (person.getId() == 0 ) {
                System.out.println("Stream mode: " + person);
            }
            break;
        }
        reader.close();
    } catch (UnsupportedEncodingException ex) {
        ...
    } catch (IOException ex) {
        ...
    }
}
{% endhighlight %}

With this approach we are loading all the objects to memory but one by one and not the whole file at once.

### Conclusion

We have seen that JSON files, like XML, can be read with different techniques. Object model, stream mode or a mix of both. It is up to you to chose one depending on your needs.

Object model allows to read a whole file and offers greater abstraction, because you can unmarshal data to your custom Java object model.

Stream mode allows to read big files consuming fewer memory. As a cons, it implies a more *low level* reading but can be improved mixing both models (like in the example).
