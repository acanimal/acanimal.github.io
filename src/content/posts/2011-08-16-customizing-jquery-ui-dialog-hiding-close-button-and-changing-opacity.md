---
title: "Customizing jQuery UI Dialog: hiding close button and changing opacity"
pubDatetime: 2011-08-16T14:02:00Z
description: Sometimes when you are programming small things are the hard things, little details becomes difficult to solve and you need to spend lot of time to solve them. This is logically :) because you spent…
tags:
  - jquery
  - tricks
  - ui
---

Sometimes when you are programming small things are the hard things, little details becomes difficult to solve and you need to spend lot of time to solve them. This is logically :) because you spent the major part of your time thinking and designing the big or complex things, leaving in a second plane the small things and because this they became the new "big" things. Ok, stop talking with buggy sentences and talk about this post. Recently I was working in a web page using jQuery UI dialogs that have a couple of special requirements that takes me some time and because this I want to share here with you:

- Some dialogs must not have a close button. There are dialogs that must be always visible floating at some part with some controls.
- Some dialogs must have a degree of opacity allowing view the underlaying content and becomes more opaque when the cursor enters in the dialog.

Next are samples about how customize minimally the dialog to achieve the previous requirements. You can see them in action in [the next sample page](http://acuriousanimal.com/code/jquery_custom_dialog/).

### Creating a default dialog

Create a default jQuery UI dialog is easy, given a '_div_' element identified by _d1_:

```javascript
$("#d1").dialog({
  position: "left",
});
```

### Creating a dialog without close button

To creating a dialog without a close button, the key is the '[open](http://jqueryui.com/demos/dialog/#event-open)' method. We need to reference the '.ui-dialog-titlebar-close' element and hide it:

```javascript
$("#d2").dialog({
  position: "center",
  closeOnEscape: false,
  open: function (event, ui) {
    // Hide close button
    $(this).parent().children().children(".ui-dialog-titlebar-close").hide();
  },
});
```

### Creating a dialog that changes opacity

Finally to create a fashion dialog that changes its opacity with the mouse hover event:

```javascript
$("#d3").dialog({
  position: "right",
  closeOnEscape: false,
  open: function (event, ui) {
    // Set opacity
    $(this).parent().css("opacity", 0.6);
    // Hide close button
    $(this).parent().children().children(".ui-dialog-titlebar-close").hide();
    // Handle opacity
    $(this)
      .parent()
      .hover(
        function () {
          $(this).css("opacity", 0.9);
        },
        function (event) {
          $(this).css("opacity", 0.6);
        }
      );
  },
});
```

Do yo know how to create more stunning dialogs?  
Comments are welcome.
