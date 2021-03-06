---
layout: post
title: Sending emails with Java
date: 2011-10-08 13:41
tags:
- howto
- java
- javamail
- tricks
---

> *Update*: This article is a bit outdated 😅 You can find a nice read at the blog post **[Guide to Send Emails in Java](https://blog.mailtrap.io/sending-email-using-java)** from the mailtrap.io team.

I start writing this post as a simple "how to send an email" using Java, but later I found I need to briefly explain more things. So, here is this kind of <em>all in one summary about sending emails with Java</em>.

Outside the Java SE platform, but included in JavaEE one, the <a href="http://www.oracle.com/technetwork/java/javamail/index.html">JavaMail</a> package provides a platform to build mail and messaging applications. Lets go with an example.

## Sending a simple text message

```java
// Common variables
String host = "your_smtp_server";
String from = "from_address";
String to = "to_address";

// Set properties
Properties props = new Properties();
props.put("mail.smtp.host", host);
props.put("mail.debug", "true");

// Get session
Session session = Session.getInstance(props);

try {
    // Instantiate a message
    Message msg = new MimeMessage(session);

    // Set the FROM message
    msg.setFrom(new InternetAddress(from));

    // The recipients can be more than one so we use an array but you can
    // use 'new InternetAddress(to)' for only one address.
    InternetAddress[] address = {new InternetAddress(to)};
    msg.setRecipients(Message.RecipientType.TO, address);

    // Set the message subject and date we sent it.
    msg.setSubject("Email from JavaMail test");
    msg.setSentDate(new Date());

    // Set message content
    msg.setText("This is the text for this simple demo using JavaMail.");

    // Send the message
    Transport.send(msg);
}
catch (MessagingException mex) {
    mex.printStackTrace();
}
```

Alternatively, instead using:

```java
msg.setText("This is the text for this simple demo using JavaMail.");
```
you can use next to set the message content:

```java
msg.setContent("This is the text for this simple demo using JavaMail.", "text/plain");
```
<h3>Checking an email address</h3>
Here is a little trick to check, using a regular expression, if an email address is well formed:

```java
Pattern rfc2822 = Pattern.compile("^[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
if(rfc2822.matcher(EMAIL_ADDRESS).matches()) {
    // Well formed email
}
```

## Multipart messages

That's fine, but usually you don't send simple text messages. Instead you send nice HTML body messages with bold or italic text, images, and so on.

> NOTE: See below at <em>references</em> section to see about MIME format which extends the data you can attach to an email to allow multiparts, attachments, etc.

When you write a multipart message the content is composed of different parts, for example one part is the message written as simple text and a second part with the same message written in an enhanced way using HTML. Then the client that reads the message is responsible to render the appropriate part depending on its capabilities.

```java
...
...
// Here create two parts and set as message contect
// Create and fill first part
MimeBodyPart part1 = new MimeBodyPart();
part1.setText("This is part one of this multipart message.");

// Create and fill second part
MimeBodyPart part2 = new MimeBodyPart();
part2.setText("This is part two of this multipart message.");

// Create the Multipart.
Multipart mp = new MimeMultipart();
mp.addBodyPart(part1);
mp.addBodyPart(part2);

// Set the message's content
msg.setContent(mp);
...
...
```
&nbsp;


## Sending attachments

Terrific, we know how to send a plain text email and something more incredible like a multipart message with HTML content. Next step is to send an email attaching too some files.

Create an email with attached file is similar to create a multipart message where one part can be the text of the message and another part is the attached file. The secret is in the next lines:

```java
...
...
// Create a new part for the attached file
MimeBodyPart part3 = new MimeBodyPart();

// Put a file in the second part
FileDataSource fds = new FileDataSource("THE_FILE_NAME");
part3.setDataHandler(new DataHandler(fds));
part3.setFileName(fds.getName());

// 'mp' is the previously created 'MimeMultipart' object
mp.addBodyPart(part3);

// 'msg' is the previously created 'Message' object
msg.setContent(mp);
...
...
```
&nbsp;


## HTML messages

Create a message o multipart message with HTML content is really easy, simply specify the MIME type in the setContent method:

```java
...
...
MimeBodyPart htmlPart = new MimeBodyPart();
htmlPart.setContent("&lt;h1&gt;Sample&lt;/h1&gt;&lt;p&gt;This is a sample HTML part&lt;/p&gt;", "text/html");
...
...
```
<h3>Attaching images within the HTML code</h3>
If you write a rich message using HTML you can, of course, add images using the '<em>img</em>' tag. If the image is referenced from an external server there is no problem, but: how to attach an image to the message and render within the HTML message body?

The idea is as follow:

- first you need to attach the image file and set an identifier and
- second you need to write your HTML code and reference the image identifier in the '<em>img</em>' tag.

```java
...
...
// Create and fill html part
MimeBodyPart htmlPart = new MimeBodyPart();
htmlPart.setContent("&lt;h1&gt;Sample&lt;/h1&gt;&lt;p&gt;This is a sample HTML part with an attached image&lt;/p&gt;" +
	"&lt;img src='cid:some_image_id'&gt;", "text/html");

// Create a new part for the attached image and set the CID image identifier
MimeBodyPart imagePart = new MimeBodyPart();
FileDataSource fds = new FileDataSource("THE_IMAGE_FILE_NAME");
imagePart.setDataHandler(new DataHandler(fds));
imagePart.setHeader("Content-ID", "some_image_id");

mp.addBodyPart(htmlPart);
mp.addBodyPart(imagePart);
...
..
```

## Anything more to say?

Arrived to this point you are almost a master of sending emails. You know how to send simple emails, multipart emails with richest HTML content and attach files and images on your message.

What more can a programmer desire?

Probably, a more easy to use API and that is what <a href="http://commons.apache.org/email/index.html">Apache Commons Email</a> project offer you. See the '<em>user guide</em>' section <a href="http://commons.apache.org/email/userguide.html">http://commons.apache.org/email/userguide.html</a> to understand what I say. It offers a more abstract API more close to humans than to protocols.


## References

- <a href="http://www.oracle.com/technetwork/java/javamail-138606.html">JavaMail</a> - JavaMail project home page.

- <a href="http://commons.apache.org/email/">Apache Commons Email</a> - Apache Commons subproject to simplify the way to work with JavaMail API. See the '<em>user guide</em>' section <a href="http://commons.apache.org/email/userguide.html">http://commons.apache.org/email/userguide.html</a>.

- <a href="http://en.wikipedia.org/wiki/MIME">MIME (Multipurpose Internet Mail Extensions)</a> - Description of MIME format for multipart emails.

