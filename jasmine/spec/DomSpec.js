var qsa = function qsa(selector, root) {
    root || (root = document);
    return Array.prototype.slice.call(root.querySelectorAll(selector));
};



describe('$DOM function', function() {

    // Test the $DOM function for creating new element

    it('should create new element', function() {

        var $el = $DOM('<div>'),
            el = $el.get();
        expect(el instanceof Element).toEqual(true);
        expect(el.tagName).toEqual('DIV');

    });


    // Test the $DOM function for selecting elements by a few selectors

    it('should select elements matching specified selector', function() {
        
        var $div, div

        // Select all divs
        $div = $DOM('div'),
        div = $div.map(function(d) { return d.get(); });
        expect(div).toEqual(qsa('div'));

        // Select all elements with the `test` class
        $div = $DOM('.test'),
        div = $div.map(function(d) { return d.get(); });
        expect(div).toEqual(qsa('.test'));

        // Select element with id `third-test`
        $div = $DOM('#third-test')[0];
        expect($div.get()).toBe(qsa('#third-test')[0]);

    });

});






describe('text() method', function() {

    var $el;

    beforeEach(function() {
        $el = $DOM('#third-test')[0];
    });


    // Get text content of element

    it('should get text content of element', function() {
        expect($el.text()).toEqual('Test div 3');
    });


    // Set text content of element

    it('should change text content of element', function() {
        $el.text('New text');
        expect($el.text()).toEqual('New text');
    }); 

});






describe('html() method', function() {

    var $el;

    beforeEach(function() {
        $el = $DOM('#div-4')[0];
    });


    // Get inner HTML content of element

    it('should get html content of element', function() {
        expect($el.html().trim()).toEqual('<p>Paragraph</p>');
    });


    // Set inner HTML content of element

    it('should change html content of element', function() {
        $el.html('<b>Bold text</b>');
        expect($el.html().trim()).toEqual('<b>Bold text</b>');
    }); 

});






describe('attr() method', function() {

    var $el;

    beforeEach(function() {
        $el = $DOM('#input-1')[0];
    });


    // Get a particular attribute value

    it('should get attribute of element', function() {
        expect($el.attr('placeholder')).toEqual('Enter text');
    });


    // Set a particular attribute to a new value

    it('should change attribute of element', function() {
        $el.attr('placeholder', 'New placeholder');
        expect($el.attr('placeholder')).toEqual('New placeholder');
    }); 

});






describe('prop() method', function() {

    var $el;

    beforeEach(function() {
        $el = $DOM('#input-1')[0];
        $el.get().value = 'Bob';
    });


    // Get a particular property

    it('should get property of element', function() {
        expect($el.prop('value')).toEqual('Bob');
    });


    // Set a particular property to a new value

    it('should change property of element', function() {
        $el.prop('value', 'Sally');
        expect($el.prop('value')).toEqual('Sally');
    }); 

});






describe('hasClass() method', function() {

    var $el;

    beforeEach(function() {
        $el = $DOM('.test')[0];
    });


    // Test on class that is known to be present

    it('should confirm presence of class', function() {
        expect($el.hasClass('test')).toEqual(true);
    });


    // Test on class that is known not to be present

    it('should confirm absence of class', function() {
        expect($el.hasClass('abc')).toEqual(false);
    }); 

});






describe('addClass() method', function() {

    // Check the class is successfully added to the element

    it('should add class to element', function() {
        var $el = $DOM('.test')[0];
        $el.addClass('abc');
        expect($el.hasClass('abc')).toEqual(true);
    });

});






describe('removeClass() method', function() {

    // Check the class is successfully removed from the element

    it('should remove class from element', function() {
        var $el = $DOM('.test')[0];
        $el.removeClass('abc');
        expect($el.hasClass('abc')).toEqual(false);
    });

});






describe('toggleClass() method', function() {

    // Check that the class is toggled on, then off

    it('should toggle class on element', function() {

        var $el = $DOM('.test')[0];

        $el.toggleClass('abc');
        expect($el.hasClass('abc')).toEqual(true);

        $el.toggleClass('abc');
        expect($el.hasClass('abc')).toEqual(false);

    });

});






describe('parent() method', function() {

    // Test that the parent of the current element is returned

    it('should get parent element', function() {

        var $item = $DOM('.item')[0],
            $list = $DOM('#list-1')[0];

        expect($item.parent().get()).toBe($list.get());

    });

});






describe('children() method', function() {

    // Test that all children of the current element are returned

    it('should get all child elements', function() {

        var $list = $DOM('#list-1')[0],
            $items = $list.children(),
            items = $items.map(function(i) { return i.get(); });

        expect(items).toEqual(qsa('li', $list.get()));

    });

});






describe('find() method', function() {

    // Test that all child elements matching a selector are returned

    it('should find all descendants matching selector', function() {

        var $list = $DOM('#list-1')[0],
            $items = $list.find('li.item'),
            items = $items.map(function(i) { return i.get(); });

        expect(items).toEqual(qsa('li', $list.get()));

    });

});






describe('remove() method', function() {

    // Test that the element is removed from the document

    it('should remove element from document', function() {
        var $el = $DOM('#div-4')[0];
        $el.remove();
        expect(qsa('#div-4').length).toEqual(0);
    });

});






describe('append() method', function() {

    // Test appending a new child element to an element

    it('should append a new element to a parent element', function() {

        var $list = $DOM('#list-1')[0],
            $items = $list.children(),
            N = $items.length;

        $list.append('<li>')
            .addClass('item')
            .addClass('appended')
            .text('Appended item');

        $items = $list.children();

        // Check the number of children has increased by 1
        expect($items.length).toEqual(N + 1);

        // Check the added item is now the last child element
        expect($items[$items.length - 1].get()).toBe($list.find('.appended')[0].get());

    });

});






describe('prepend() method', function() {

    // Test prepending a new child element to an element

    it('should prepend a new element to a parent element', function() {

        var $list = $DOM('#list-1')[0],
            $items = $list.children(),
            N = $items.length;

        $list.prepend('<li>')
            .addClass('item')
            .addClass('prepended')
            .text('Prepended item');

        $items = $list.children();

        // Check the number of children has increased by 1 
        expect($items.length).toEqual(N + 1);

        // Check the added item is now the first child element
        expect($items[0].get()).toBe($list.find('.prepended')[0].get());

    });

});






describe('css() method', function() {

    var $el;

    beforeEach(function() {
        $el = $DOM('.test')[0];
    });

    // Test getting all computed styles

    it('should return all computed styles of the element', function() {
       expect($el.css()).toEqual(window.getComputedStyle($el.get()));
    });


    // Test getting a particular computer style property

    it('should return single computed style of the element', function() {
        expect($el.css('display')).toEqual(window.getComputedStyle($el.get()).display);
    });


    // Test setting a single css inline style

    it('should set a single inline style on the element', function() {
        $el.css('color', 'red');
        expect($el.css('color')).toEqual('rgb(255, 0, 0)');        
    });


    // Test setting an object of css inline styles
    // Colors must be matched using rgb format

    it('should set an object of inline styles on the element', function() {

        $el.css({
            color: 'blue',
            'background-color': 'rgb(200, 200, 200)',
            padding: '15px'
        });

        expect($el.css('color')).toEqual('rgb(0, 0, 255)');
        expect($el.css('background-color')).toEqual('rgb(200, 200, 200)');
        expect($el.css('padding')).toEqual('15px');       

    });

});






describe('data() method', function() {

    var $el;

    beforeEach(function() {
        $el = $DOM('#list-1')[0];
    });


    // Test setting a single fragment of data

    it('should set a single data fragment on the element', function() {
        $el.data('x', 1);
        expect($el.data('x')).toEqual(1);
    });


    // Test setting multiple data fragments at once

    it('should set an object of data fragments on the element', function() {
        $el.data({x: 5, y: 8, z: 13});
        expect($el.data('x')).toEqual(5);
        expect($el.data('y')).toEqual(8);
        expect($el.data('z')).toEqual(13);
    });


    // Test getting a single fragment

    it('should get a data fragment by name from the element', function() {
        expect($el.data('z')).toEqual(13);              
    });


    // Test getting all data fragments

    it('should get all data fragments set on the element', function() {
        var o = Object.create(null);
        o.x = 5; o.y = 8; o.z = 13;
        expect($el.data()).toEqual(o);
    });


    // Test removing all data fragments from the element

    it('should remove all data fragments from the element', function() {
        $el.data(null);
        expect($el.data()).toEqual(Object.create(null));
    });

});






describe('on() method', function() {

    // Test event listener added successfully

    it('should add an event listener to the element', function() {

        var $el = $DOM('#input-1')[0],
            clicks = 0;

        $el.on('click', function onClick() {
            clicks += 1;
        });

        $el.get().dispatchEvent(new MouseEvent('click'));
        expect(clicks).toEqual(1);

    });

});
