# dom-utility
A custom DOM utility for a browser environment. Provides methods which will be familiar to users of jQuery.

This is the code accompanying my series of blog posts on building your own DOM utility:

[Build your own DOM utility Part 1](http://davidbanks.co.nz/post/build-your-own-dom-utility-part-1)

[Build your own DOM utility Part 2](http://davidbanks.co.nz/post/build-your-own-dom-utility-part-2)

[Build your own DOM utility Part 3](http://davidbanks.co.nz/post/build-your-own-dom-utility-part-3)

Provides these methods:

- text()
- html()
- attr()
- prop()
- hasClass()
- addClass()
- removeClass()
- toggleClass()
- parent()
- children()
- find()
- remove()
- append()
- prepend()
- css()
- data()
- on()



<a name="DOM" href="#DOM">#</a> <b>$DOM()</b>

Use the $DOM() function to create new elements, wrap raw HTML elements and also as a selector function to select elements. A $DOM object is returned with a number of convenience methods described below.

<b>NOTE:</b> The selector form returns an array of $DOM objects which you'll have to iterate through yourself.

```js
// Create a new element by adding the HTML angle brackets around the tag name
var newDiv = $DOM('<div>');

// Wrap a raw HTML element
var body = $DOM(document.body);

// Otherwise provide any valid CSS selector to select elements
var allDivs = $DOM('div');
var boxes = $DOM('.boxes');
```



<a name="text" href="#text">#</a> <b>el.text()</b>

Use the text() method to get or set the text content of an element. 

```js
// Set text
$domEl.text('I love JavaScript!');

// Get text
var text = $domEl.text();
```



<a name="html" href="#html">#</a> <b>el.html()</b>

Use the html() method to get or set the html content of an element. 

```js
// Set text
$domEl.html('<h2>I love JavaScript!</h2>');

// Get html
var text = $domEl.html();
```



<a name="attr" href="#attr">#</a> <b>el.attr()</b>

Use the attr() method to get or set attributes on an element. 

```js
// Set attribute
$input.attr('placeholder', 'Enter email');

// Get an attribute
var lastUpdated = $table.attr('data-updated');
```



<a name="prop" href="#prop">#</a> <b>el.prop()</b>

Use the prop() method to get or set properties on an element. 

```js
// Set property
$input.prop('value', 10);

// Get a property
var enteredValue = $input.prop('value');
```



<a name="has-class" href="#has-class">#</a> <b>el.hasClass()</b>

Use the hasClass() method to check whether a class is set on an element. 

```js
var isAwesome = $domEl.hasClass('awesome-text');
```



<a name="add-class" href="#add-class">#</a> <b>el.addClass()</b>

Use the addClass() method to add a class to an element, if it is not already set.

```js
// Make it awesome
$domEl.addClass('awesome-text');
```



<a name="remove-class" href="#remove-class">#</a> <b>el.removeClass()</b>

Use the removeClass() method to remove a class on an element. 

```js
// Make it boring
$domEl.removeClass('awesome-text');
```



<a name="toggle-class" href="#toggle-class">#</a> <b>el.toggleClass()</b>

Use the toggleClass() method to toggle a class on an element. 

```js
// Add class
$domEl.toggleClass('awesome-text');

//Remove it again
$domEl.toggleClass('awesome-text');
```




<a name="parent" href="#parent">#</a> <b>el.parent()</b>

Use the parent() method to get the parent element (also a $DOM object) of a given element. 

```js
var container = $content.parent();

container.addClass('active');
```




<a name="children" href="#children">#</a> <b>el.children()</b>

Use the children() method to get the child elements of a given element. This will return an array of $DOM objects.

```js
var items = $myList.children();

items.forEach(function($item) {
  // so something with each item...
});
```



I hope to add better documentation here soon - in the meantime you can check out my blog posts which discuss each method.
