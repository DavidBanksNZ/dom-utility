# DOM Utility
A custom DOM utility for a browser environment. Provides methods which will be familiar to users of jQuery.

This is the code accompanying my series of blog posts on building your own DOM utility:

[Build your own DOM utility Part 1](http://davidbanks.co.nz/post/build-your-own-dom-utility-part-1)

[Build your own DOM utility Part 2](http://davidbanks.co.nz/post/build-your-own-dom-utility-part-2)

[Build your own DOM utility Part 3](http://davidbanks.co.nz/post/build-your-own-dom-utility-part-3)



<a name="DOM" href="#DOM">#</a> <b>$DOM</b>()

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



<a name="text" href="#text">#</a> <b>el.text</b>([<i>text</i>])

Use the text() method to get or set the text content of an element. 

```js
// Set text
$domEl.text('I love JavaScript!');

// Get text
var text = $domEl.text();
```



<a name="html" href="#html">#</a> <b>el.html</b>([<i>html</i>])

Use the html() method to get or set the html content of an element. 

```js
// Set text
$domEl.html('<h2>I love JavaScript!</h2>');

// Get html
var text = $domEl.html();
```



<a name="attr" href="#attr">#</a> <b>el.attr</b>(<i>attrName</i>[, <i>attrValue</i>])

Use the attr() method to get or set attributes on an element. 

```js
// Set attribute
$input.attr('placeholder', 'Enter email');

// Get an attribute
var lastUpdated = $table.attr('data-updated');
```



<a name="prop" href="#prop">#</a> <b>el.prop</b>(<i>propName</i>[, <i>propValue</i>])

Use the prop() method to get or set properties on an element. 

```js
// Set property
$input.prop('value', 10);

// Get a property
var enteredValue = $input.prop('value');
```



<a name="has-class" href="#has-class">#</a> <b>el.hasClass</b>(</>className</i>)

Use the hasClass() method to check whether a class is set on an element. 

```js
var isAwesome = $domEl.hasClass('awesome-text');
```



<a name="add-class" href="#add-class">#</a> <b>el.addClass</b>(<i>className</i>)

Use the addClass() method to add a class to an element, if it is not already set.

```js
// Make it awesome
$domEl.addClass('awesome-text');
```



<a name="remove-class" href="#remove-class">#</a> <b>el.removeClass</b>(<i>className</i>)

Use the removeClass() method to remove a class on an element. 

```js
// Make it boring
$domEl.removeClass('awesome-text');
```



<a name="toggle-class" href="#toggle-class">#</a> <b>el.toggleClass</b>(<i>className</i>)

Use the toggleClass() method to toggle a class on an element. 

```js
// Add class
$domEl.toggleClass('awesome-text');

//Remove it again
$domEl.toggleClass('awesome-text');
```




<a name="parent" href="#parent">#</a> <b>el.parent</b>()

Use the parent() method to get the parent element (also a $DOM object) of a given element. 

```js
var container = $content.parent();

container.addClass('active');
```




<a name="children" href="#children">#</a> <b>el.children</b>()

Use the children() method to get the child elements of a given element. This will return an array of $DOM objects.

```js
var items = $myList.children();

items.forEach(function($item) {
  // so something with each item...
});
```




<a name="find" href="#find">#</a> <b>el.find</b>(<i>selector</i>)

Use the find() method to get the descendant elements of the given element that match a provided selector. This will return an array of $DOM objects.

```js
var newItems = $items.find('.new-item');

newItems.forEach(function($item) {
  // so something with each item...
});
```




<a name="remove" href="#remove">#</a> <b>el.remove</b>()

Use the remove() method to remove the element from the document.

```js
$domEl.remove();
```




<a name="append" href="#append">#</a> <b>el.append</b>(<i>elem</i>)

Use the append() method to insert an element as the last child of a parent element. This will return the appended element as a $DOM object.

```js
// Append a $DOM element
$myList.append($newItem);

// Append a raw HTML element
$myList.append(li);

// Append an element created on the fly
$myList.append('<li>')
  .addClass('new-item');
```




<a name="prepend" href="#prepend">#</a> <b>el.prepend</b>(<i>elem</i>)

Use the prepend() method to insert an element as the first child of a parent element. This will return the prepended element as a $DOM object. See <a name="append" href="#append">el.append()</a> for all the ways you can use this method.




<a name="css" href="#css">#</a> <b>el.css</b>()

Use the css() method to set inline styles on an element, or to retrieve particular styles on an element as determined by the browser.

```js
// Set single style
$item.css('color', 'red');

// Set multiple styles
$item.css({
  color: 'red',
  'font-weight': 'bold'
});

// Get a computed style by name
var bg = $domEl.css('background-color');

// Get all computed styles
var allStyles = $domEl.css();
```



<a name="data" href="#data">#</a> <b>el.data</b>()

Use the data() method to associate data with an element, or to retrieve data already set on an element using this method.

```js
// Set a data key and value
$item.data('price', 100);

// Set many data pieces at once
$item.data({
  price: 100,
  discountPc: 10,
  stock: 37
});

// Get a piece of data
var price = $item.data('price');

// Get all data associated with this element
var data = $item.data();

// Delete all data associated with this element by passing in null
$item.data(null);
```




<a name="on" href="#on">#</a> <b>el.on</b>(<i>eventType</i>, <i>handlerFunc</i>[, <i>context</i>])

Use the on() method add an event listener to an element. The optional argument context allows a custom value to be set for <b>this</b> inside the hander function. It defaults to the $DOM object that the event listener is being added to.

```js
$closeButton.on('click', function() {
  this.parent().remove();
});
```
