;(function() {


// Function for creating a deep clone of an object
// See http://stackoverflow.com/a/728694
function clone(obj) {

    // Handle the 3 simple types, and null or undefined
    if (obj === null || 'object' !== typeof obj)
        return obj;

    var copy;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++)
            copy[i] = clone(obj[i]);
        return copy;
    }

    // Handle Object
    if (typeof obj === 'object') {
        copy = Object.create(null);
        for (var attr in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, attr))
                copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error('Unable to clone object');

};


// Prototype of our DOM objects
var $DOM_proto = {};



/* Method get - return raw DOM element */

$DOM_proto.get = function get() {
    return this._element;
};



/* Method text - get or set text content of element */

$DOM_proto.text = function text() {

    // Get text
    if (arguments.length === 0)
        return this._element.textContent;

    // Set text, return this to make method chainable
    this._element.textContent = '' + arguments[0];
    return this;

};



/* Method get - return raw DOM element */

$DOM_proto.html = function html() {

    // Get inner HTML
    if (arguments.length === 0)
        return this._element.innerHTML;

    // Set innerHTML, return this to make method chainable
    this._element.innerHTML = arguments[0];
    return this;

};



/* Method attr - get or set an attribute on the current element */

$DOM_proto.attr = function attr() {

    // Throw error when no argument provided
    if (arguments.length === 0)
        throw new Error('No attribute provided');

    // Throw error when invalid argument provided
    if (!arguments[0])
        throw new Error('Invalid attribute provided');

    // Get attribute
    if (arguments.length === 1)
        return this._element.getAttribute('' + arguments[0]);

    // 2 arguments - set attribute. Return this (chainable)
    this._element.setAttribute(arguments[0], arguments[1]);
    return this;

};



/* Method prop - get or set a property on the current element */

$DOM_proto.prop = function prop() {

    // Throw error if no argument provided
    if (arguments.length === 0)
        throw new Error('No property specified');

    // Throw error if invalid property name provided
    if (!arguments[0] || typeof arguments[0] !== 'string')
        throw new Error('Invalid property specified')

    // Get property value
    if (arguments.length === 1)
        return this._element[arguments[0]];

    // 2 arguments - set property. Return this (chainable)
    this._element[arguments[0]] = arguments[1];
    return this;

};



/* Method hasClass - checks whether the element has a given class */

$DOM_proto.hasClass = function hasClass(className) {

    // Error if class name not specified
    if (!className)
        throw new Error('No class name specified');

    var currentClasses = this._element.className.split(' ');

    return currentClasses.indexOf(className) > -1;

};



/* Method removeClass - remove a CSS class from the current element */

$DOM_proto.removeClass = function removeClass(className) {

    // Error if no class name specified
    if (!className)
        throw new Error('No class name specified')

    var classList = this._element.className;

    if (this.hasClass(className))
        classList = classList.replace(className, '');

    // Update className property, removing excess white space
    this._element.className = classList.replace(/\s+/g, ' ').trim();
    return this;

};



/* Method addClass - add a CSS class to the current element */

$DOM_proto.addClass = function addClass(className) {

    // Error if no class name specified
    if (!className)
        throw new Error('No class name specified')

    var currentClasses = this._element.className.split(' ');

    if (!this.hasClass(className))
        currentClasses.push(className);

    this._element.className = currentClasses.join(' ').trim();
    return this;

};



/* Method toggleClass - toggle a css class on and off */

$DOM_proto.toggleClass = function toggleClass(className) {

    // Error if class name not specified
    if (!className)
        throw new Error('No class name specified')

    if (this.hasClass(className)) {
        this.removeClass(className);
    } else {
        this.addClass(className);
    }

    return this;

};



/* Method parent - get the parent element if it exists */

$DOM_proto.parent = function parent() {

    return (this._element.parentNode ?
        $DOM(this._element.parentNode) :
        null);

};



/* Method children - get all direct child elements */

$DOM_proto.children = function children() {

    var c = this._element.children,
        $doms = [],
        i, n = c.length;

    // Convert to $DOM objects
    for (i = 0; i < n; i++)
        $doms[i] = $DOM(c[i]);

    return $doms;;

};



/* Method find - find all descendants matching a selector */

$DOM_proto.find = function find(selector) {

    var elems;

    try {
        elems = this._element.querySelectorAll(selector);
    } catch (exception) {
        throw new Error('Invalid selector provided');
    }

    var i, n = elems.length,
        $doms = [];

    // Convert to $DOM objects
    for (i = 0; i < n; i++)
        $doms.push($DOM(elems[i]));

    return $doms;

};





/* Method append - append an element as the last child */

$DOM_proto.remove = function remove() {

    var parent = this.parent();

    // Throw error if element is document root
    if (!parent)
        throw new Error('Cannot remove root element!');

    parent._element.removeChild(this._element);

    return this;

}




/* Method append - append an element as the last child */

$DOM_proto.append = function append(child) {

    // Error for no argument
    if (!child)
        throw new Error('No argument provided');

    // Raw DOM element
    if (child instanceof Element) {
        this._element.appendChild(child);
        return $DOM(child);
    }

    // Custom $DOM object
    if (child._element instanceof Element) {
        this._element.appendChild(child._element);
        return child;
    }

    var newTagPattern = /^<([^\/]+)\/?>$/,
        elem;

    // Create a new element on the fly
    if (newTagPattern.test(child)) {

        elem = document.createElement(child.match(newTagPattern)[1]);
        this._element.appendChild(elem);
        return $DOM(elem);

    }

    // Otherwise throw error
    throw new Error('Invalid argument provided');

};



/* Method prepend - prepend an element as the first child */

$DOM_proto.prepend = function prepend(child) {

    // Helper function to avoid code repetition
    var self = this;
    var _insertBefore = function(elem) {
        self._element.insertBefore(elem, self._element.childNodes[0]);
    };

    // Error for no argument
    if (!child)
        throw new Error('No argument provided');

    // Raw DOM element
    if (child instanceof Element) {
        _insertBefore(child);
        return $DOM(child);
    }

    // Custom $DOM object
    if (child._element instanceof Element) {
        _insertBefore(child._element);
        return child;
    }

    var newTagPattern = /^<([^\/]+)\/?>$/,
        elem;

    // Create a new element on the fly
    if (newTagPattern.test(child)) {

        elem = document.createElement(child.match(newTagPattern)[1]);
        _insertBefore(elem)
        return $DOM(elem);

    }

    // Otherwise throw error
    throw new Error('Invalid argument provided');

};



/* Method css - get or set CSS styles */

$DOM_proto.css = function css() {

    // Helper function for converting dashed property names to camel case
    // e.g. background-color => backgroundColor
    function _toCamelCase (string) {

        return string.replace(/-([a-z]{1})/g, function (match, letter) {
            return letter.toUpperCase();
        });

    };

    // Helper function for applying an object of CSS styles to an element
    // Use `Object.prototype.hasOwnProperty.call()` instead of
    // `styles.hasOwnProperty()` as a safe check, in case someone decides to
    // set a custom property called `hasOwnProperty`!
    function _applyCss(elem, styles) {

        for (s in styles) {
            if (Object.prototype.hasOwnProperty.call(styles, s))
                elem.style[_toCamelCase(s)] = styles[s];
        }

    };

    var a = arguments,
        styles,
        returnVal = this;

    // Return all computed styles if no arguments provided
    if (a.length === 0)
        return window.getComputedStyle(this._element, null);

    if (a.length === 1)  {

        // Single argument of type string - retrieve the
        // computed value of that style property
        if (typeof a[0] === 'string')
            return window.getComputedStyle(this._element, null)[a[0]];

        // Single object argument - assume keys are css property names
        // and values are css property values.
        if (typeof a[0] === 'object') {
            _applyCss(this._element, a[0]);
            return this;
        }

        // Bad argument provided - throw error
        throw new Error('Invalid argument provided');

    }

    // 2 arguments (or more) were provided
    // If first is not a string, throw error
    if (typeof a[0] !== 'string')
        throw new Error('Invalid CSS property specified');

    // Argument 1 is property name, argument 2 is the value to set
    var property = _toCamelCase(a[0]),
        value = a[1];

    this._element.style[property] = value;

    return this;

};



/* Method data - bind data to the current element */

$DOM_proto.data = function data() {

    var dataProp = '_$DATA_', // where to store data on the element
        a = arguments;

    // Retrieve the data storage on the current element
    var currentData = this.prop(dataProp);

    // If it does not exist, create a new empty object
    if (!currentData) {
        currentData = Object.create(null);
        this.prop(dataProp, currentData);
    }

    // Return all data bound to the current element
    if (a.length === 0)
        return clone(currentData);

    // Remove all data bound to the current element
    if (a[0] === null) {
        this.prop(dataProp, null);
        return this;
    }

    // Set several data keys at once. Use safe method of  calling
    // `hasOwnProperty` in case the user decides for some reason
    // to set a data value using `hasOwnProperty` as the key.
    if (typeof a[0] === 'object') {

        for (key in a[0]) {
            if (Object.prototype.hasOwnProperty.call(a[0], key))
                currentData[key] = clone(a[0][key]);
        }

        return this;

    }

    // If first argument specified and not null or object, must be string
    if (typeof a[0] !== 'string')
        throw new Error('Data keys must be string values');

    // Retrieve a data value by key
    if (a.length === 1)
        return currentData ? clone(currentData[a[0]]) : undefined;

    // We want to set a single data key - only primitive types
   currentData[a[0]] = clone(a[1]);

    return this;

};



/* Method on - add event listeners to the current element */

$DOM_proto.on = function on(eventName, handler, context) {

    if (typeof context === 'undefined')
        context = this;

    this._element.addEventListener(eventName, handler.bind(context), false);

    return this;

};












/*****  Main $DOM function to be exposed on window  *****/

window.$DOM = function $DOM(arg) {

    // Throw error for invalid argument
    if (!arg || !(typeof arg === 'string' || arg instanceof Element))
        throw new Error('Invalid argument provided');

    var newTagPattern = /^<([^\/]+)\/?>$/;

    // Create new $DOM object
    var $DOMobj = Object.create($DOM_proto);

    if (arg instanceof Element) {

        // Just wrap the element in with our $DOM methods
        $DOMobj._element = arg;
        return $DOMobj;

    }

    // Convert arg to string, trim off white space
    arg = ('' + arg).trim();

    // Arguments like '<tag>' should create a new empty element

    if (newTagPattern.test(arg)) {

        // Create a new element
        $DOMobj._element = document.createElement(arg.match(newTagPattern)[1]);
        return $DOMobj;

    }

    // Assume a selector was provided. Try to select all elements
    // matching the selector. Throw error if selector is invalid.

    var elem, $doms = [], i, n;

    try {

        elem = document.querySelectorAll(arg);
        n = elem.length;
        $doms = [];

        for (i = 0; i < n; i++)
            $doms.push($DOM(elem[i]));

        return $doms;

    } catch (exception) {

        throw new Error('Invalid selector: ' + arg);

    }

    return null;

};




})();
