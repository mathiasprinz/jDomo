# jDomo

jDomo is a short script written in JavaScript to select nodes or bind events to an DOM-Element with JQuery at the moment they where parsed by [dōmo](http://domo-js.com/).

### Setup

    <script src="domo.js"></script>
    <script src="jQuery-1.9.1.js"></script>
    <script src="jDomo.js"></script>

Notice that this jDomo.js only works in an Browser invirorement.

    BODY(
      ON(
       'click'
       ,
       function ( e, $all) {
         var $this = $(this);
         $all.not( this ).css( 'color', 'black');
         $this.css('color', 'green' );
         alert( $this.text() );
         
       },
       
       function ( $all ) {
         console.log( arguments)
         $all.filter(':first-child').css('color', 'green' );
       }
       ,
       A( 'Foo' )
       ,
       A( 'Baa' )
      )
    )
    
This example shows how to add an jQuery event inside of the dōmo markup. As you can imagine the first string 
defines the type of the event. As in jQuery you can bind more than one event by letting space between the event
names. For example: `mouseenter mouseleave`. Also you can use namespaces as known from jQuery `mouseenter.name`. 
The first following function will be fired when the defined event is been triggered. Every other following function 
– that is not a part of dōmo – will be triggered for each child node that is created and passed as argument to the
ON method by dōmo. It is also possible to pass an data object to jQuery that can be used by the event:

    ON( 'click', { foo: 'baa'}, function ( e ) { alert( 'I am ' + e.data.foo ) }, A('Say Hello') ); // will alert 'I am baa'

# Methods
This script provides two methods. ON to bind events to childNodes and JQUERY to initialize any kind of jQuery code for childNodes inside of them.
In fact these two do mostly the same. The mayor difference is that JQUERY ignores settings for events.

# true/false and this
If you pass an boolean as argument to ON/JQUERY you can control if the initial callbacks where triggered in the context of 
each single childNode passed to the methods ( this is than the current childNode ) or if it will be only triggered once for 
all childNodes ( this will be the global object):
  

    JQUERY( function ( $all ) { $all.css('color', 'pink') }, true, A('Foo'), A('Baa') ); 
    
    JQUERY( function () { $( this ).css('color', 'pink') }, A('Foo'), A('Baa') ); 

This result is the same both links will be pink. But the second example will trigger the callback twice.
Default is false.

# Callback arguments
There are maximal three arguments passed to the callbacks. If it is the ON method you use, the first argument will 
be the jQuery event-object followed by all childNodes inside of a jQuery-selector and the pure childNodes as an array 
( event, $childNodes, childNodes ). In the JQUERY method the arguments will be start with selected childNodes.

# Licence
jDomo is released under the [MIT License](http://www.opensource.org/licenses/MIT).

# Thanks allot
Comments or ideas are welcome at mathias_prinz@me.com!