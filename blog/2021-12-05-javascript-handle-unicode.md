---
layout: post
title: How to slice or get symbols from a unicode string with emojis in JavaScript? Lets learn how JavaScript represent strings
date: 2021-12-05 09:13
excerpt_separator: <!--more-->
tags:
- tips
- unicode
- javascript
---

Everybody loves JavaScript (or not)! It's easy, powerful and fun (or not) but then one day you found something weird that makes you learn something new and that's fine (or not). 

If you don't know why `"😄".charAt(0)` returns `�` or why `"🌍".length` is equal 2 then this article if for you. Do you really know how to handle strings in JavaScript?

<!--more-->

Take a look to the next code, what would you expect as a result?

```javascript
"😄".charAt(0);
"hello🌍world".slice(0, 6);
```

If you know the result and why is that result, congratulations you can skip this post. Otherwise, if like me you get a surprise then this post can clarify you a bit how JavaScript handles strings and how you must handle string when working with unicode characters.

## Unicode vs UTF

No, unicode isn't the same as UTF.

- [Unicode](https://en.wikipedia.org/wiki/Unicode) is a standard for representing characters from many human languages. It assigns characters to ordinal numbers in decimal form, which are called [**code points**](https://en.wikipedia.org/wiki/List_of_Unicode_characters).
- UTF is a method for encoding the Unicode characters in decimal form to binary representations. Here we can find UTF-8, UTF-16, etc where the *number* represents the number of bits used to encode each unicode character.

For example:

```
à                 -> Unicode character
224               -> Decimal code point
00000000 11100000 -> Binary representation with 16 bits
00E0              -> Hex representation with 4 digits
U+00E0            -> Hex code point
```

The thing you need to remember is a **code point is a number assigned to a single character**.

## Unicode planes

Unicode allows to represent 1,114,112 code points which ranges from U+0000 to U+10FFFF and only 144,697 has an associated character.

> The first plane goes from U+0000 to U+FFFF, that is 16<sup>4</sup> (or 2<sup>16</sup> if you think in binary), which results in 65,536 characters. Now multiply 65,536 by the 17 planes and you get the 1,114,112.

In addition, the unicode space is divided in 17 planes:

- Plane 0, Basic Multilingual Plane (BMP), contains code points from U+0000 to U+FFFF. It contains characters from most of the modern languages (Basic Latin, Cyrillic, Greek, etc) and a big number of symbols.
- Plane 1, Supplementary Multilingual Plane (SMP), contains code points from U+10000 to U+1FFFF
- Plane 2, Supplementary Ideographic Plane (SIP), contains code points from U+20000 to U+2FFFF
- ...
- Plane 16 contains code points from U+100000 to U+10FFFF.

The 16 planes beyond the BMP (from plane 1 to plane 16) are named supplementary or astral planes.

Note, while the code points at BPM plane have all 4 digits the code points in supplementary planes can have 5 o 6 digits, for example:

```
🌍       -> character
127757   -> code point (decimal)
U+1f30d  -> code point (5 hex)
```

## UTF-16, code units and surrogates

Although each character is represented by a code point we need a way to encode that number in a machine friendly way, here is where UTF-16 comes in action.

> Most JavaScript engines use UTF-16 encoding, so no matter if a file is encoded in UTF-8 or any other format, the JS engine will convert it to UTF-16.

UTF-16 is a variable-length encoding, that means, not all code points are encoded using the same number of digits (basically to reduce space):

- Code points from BMP are encoded using a single code unit of 16-bit, i.e. 
- Code points from supplementary planes are encoded using two code units of 16-bit each.

For example here you can see examples of codifications:

```
A            -> character
65           -> code point (decimal)
U+0041       -> code point (4 hex)
\u0041       -> 1 code unit 

🌍            -> character
127757        -> code point (decimal)
U+1f30d       -> code point (5 hex)
\uD83C\uDF0D  -> 2 code units
```

> Note when you write encoded character in HTML you are using the decimal notation, while in JavaScript you usually use the hexadecimal one.

So, what is a **code points**? A **code unit is a bit sequence used to encode each character within a given encoding form**, so we found the unicode character could be represented in JavaScript using 1 or 2 code units. When you need 2 code units to represent a code point they are called a **surrogate pair**, where the first value of the pair is a high-surrogate code unit and the second value is a low-surrogate code unit.

## Ways to write characters in JavaScript

Of course the best way to write characters is writing them directly with the keyboard, but there could be some of them difficult to write (like emojis or math symbols). Fortunately JavaScript has a special syntax to represent characters both using their code point or code unit values:

```
console.log('A')             -> writing the letter
console.log('\x41')         -> writing the 2 digits hex code
console.log('\u{0041}')      -> writing the code point
console.log('\u0041')        -> writing the code unit

console.log('🌍')            -> writing the letter
console.log('\u{1f30d}')     -> writing the code point
console.log('\uD83C\uDF0D')  -> writing the code unit
```

> Note ES5 only accepts the code unit notation while ES6 introduces the brackets notation that allows us to use code points. This is useful when, i.e., representing emojis, the 🐶 symbol can be written as code point `\u{1F436}` or with code units `\uD83D\uDC36`.

## Things to take into account when working with strings

### Normalization

We can find situations where different code units represents the same characters, for example:

```
let string1 = '\u00F1';
let string2 = '\u006E\u0303';

console.log(string1);  //  ñ
console.log(string2);  //  ñ

string1 === string2    // false
```

We can see the strings are different but they represent the same character so we would like the comparison `string1 === string2` returns true instead false. How we can work in this situations? The answer is *normalization*.

👉 The `normalize()` method helps solve this problem by converting a string into a normalized form common for all sequences of code points that represent the same characters.

```
let string1 = '\u00F1';
let string2 = '\u006E\u0303';

console.log(string1);  //  ñ
console.log(string2);  //  ñ

string1.normalize() === string2.normalize()    // false
```

Note how lengths differ from previous normalization:

```
let string1 = '\u00F1';
let string2 = '\u006E\u0303';

string1.length               // 1
string2.length               // 2

string1.normalize().length   // 1
string2.normalize().length   // 1
```

### Working with code points

ES6 introduce two methods to works directly with code points `codePointAt()` and `fromCodePoint()`. You just can imagine what they do looking at the next code:

```
'Aloha'.codePointAt(0)      // 65
String.fromCodePoint(65)    // A


'😅Aloha'.codePointAt(0)      // 128517
String.fromCodePoint(128517)  // 😅
```

### Length of string

See the next code:

```
'A'.length    // 1
'🌍'.length   // 2
```

Shocked? Well, this is more easy to understand if we see the definition of `String` that ES6 does:

> The String type is the set of all ordered sequences of zero or more 16-bit unsigned integer values ("elements") up to a maximum length of 2<sup>53</sup>-1 elements. The String type is generally used to represent textual data in a running ECMAScript program, in which case each element in the String is treated as a **UTF-16 code unit*** value.

In the first case, the letter `A`  is encoded using 1 code unit of 16 bits while the emoji `🌍` requires 2 code units of 16 bits to be represented. The important thing here is know if the methods we are using works with code points or code units.

> The length of a String is the number of elements within it. Where ECMAScript operations interpret String values, each element is interpreted as a single UTF-16 code unit.

## How I get the length (in symbols) of a string?

Ok, nice to know JavaScript count code units but what if I just want to know the number of symbols (or characters) within a string?

```
console.log('A 🌍'.length)   // 4 bit I want to get 3
```

The easiest way is to convert your string into an array: 

```
Array.from('A 🌍').length   // 3
[...'A 🌍'].length          // 3
```

Why this works? Easy, because the [String iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/@@iterator) When you create an iterator over a string you get new iterator object that **iterates over the code points** of a String value, **returning each code point** as a String value.

In addition to the two previous options you can also iterate using a `for..of` loop.

## The answer to the original question: How can I slice ot get a character?

Well, If you have read til this point, now it's easy to answer our original question **how do I get a single symbol from string?**

Given the string `🐶 this is my dog` if we want to get the character `🐶` we can't use the chatAt method because that would return one of the surrogate code unit that represent that character instead the symbol as you expect:

```
'🐶 this is my dog'.charAt(0)        // � Invalid char
[...'🐶 this is my dog'][0]          // 🐶
Array.from('🐶 this is my dog')[0]   // 🐶
```

For the second question **how do I slice a string?** the answer is similar, if you want to slice the string taking into account code points (the symbols) instead the code units you need a way to iterate of them:

```
'👋🌍😊🐶'.slice(0,3)                // 👋�
[...'👋🌍😊🐶'].slice(0,3).join('')  // 👋🌍😊
```

### References

- [JavaScript has a Unicode problem](https://mathiasbynens.be/notes/javascript-unicode)
- [What every JavaScript developer should know about Unicode](https://dmitripavlutin.com/what-every-javascript-developer-should-know-about-unicode/)
- [Unicode in JavaScript](https://flaviocopes.com/javascript-unicode/)
