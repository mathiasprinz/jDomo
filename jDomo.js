// jDomo 0.1.0

// (c) 2013 Mathias Prinz
// jDomo.js is distributed under the MIT license.
// For more details, see http: http://github.com/mathiasprinz/jDomo


! function ( domo, jQuery ) {
  
  if ( ! domo ) throw new Error( 'No domo provided.' );
  if ( ! jQuery ) throw new Error( 'No jQuery provided.' );
  
  window.ON = ON;
  window.JQUERY = JQUERY;
   
  ///////////////////

  function JQUERY () {
    var setup = filterArgs.apply( null, arguments );

    JQ( setup.callbacks, setup.childNodes, setup.triggerOnce );
    return FRAGMENT.apply( null, setup.childNodes );
  }

  //////////////////

  function JQ ( jQ, bindTo, triggerOnce ) {
    var i = bindTo.length;

    if ( triggerOnce ) {

      bind();
      return;
    }

    while ( i-- ) {

      bind( bindTo[ i ] );
    }

    function bind ( that ) {
      var l = jQ.length;
      var i = 0;

      for ( i; i < l; i = i + 1 ) {
        if ( typeof jQ[ i ] === 'function' ) {
          jQ[ i ].call( that, jQuery( bindTo ), bindTo );
        }
      }
    }
  }

  ///////////////////

  function ON () {
    var setup = filterArgs.apply( null, arguments );
    var frag;
    var cb;

    frag = FRAGMENT.apply( null, setup.childNodes )
    cb = setup.callbacks.shift();
    JQ( setup.callbacks, setup.childNodes, setup.triggerOnce );
    $( frag.childNodes ).on( setup.type, setup.data, function ( e ) { cb.call( this, e, jQuery( setup.childNodes ), setup.childNodes ) } )

    return frag;
  }
  
  ///////////////////

  function filterArgs () {
    var setup = { type: 'click', childNodes: [], callbacks: [], body: [], data: {}, triggerOnce: false };
    var l = arguments.length;
    var childNodes;
    var findEvent;
    var splitted;
    var i = 0;

    for ( i; i < l; i = i + 1 ) {

      // nodes

      if ( arguments[ i ].nodeType ) {

        if (  arguments[ i ].nodeName !== '#document-fragment' ) {

          setup.childNodes.push( arguments[ i ] );
          continue;
        }

        // fragments

        childNodes = arguments[ i ].childNodes;

        for ( child in childNodes ) {

          if ( childNodes.hasOwnProperty( child ) && childNodes[ child ].nodeType ) {

            setup.childNodes.push( childNodes[ child ] );
          }
        }
        continue;
      }

      // childnode that is a string

      if ( typeof arguments[ i ] === 'string' ) {
        
        findEvent = arguments[ i ].match( /(^.*)[ |\.]|(^.*)$/ );
        if (  findEvent[ 2 ] ) findEvent[ 1 ] = findEvent[ 2 ]; // not nice must find the time to get into regEx
      
        if ( findEvent === null || document[ 'on' + findEvent[ 1 ] ] === undefined && jQuery.event.special[ findEvent[ 1 ]  ] === undefined ) {
          setup.childNodes.push( arguments[ i ] );
          continue;
        }
      }

      // calabcks

      if ( typeof arguments[ i ] === 'function'  ) {

        setup.callbacks.push( arguments[ i ] );
        continue;
      }

      // trigger initial callbacks for each single child node or for all at once

      if ( typeof arguments[ i ] === 'boolean' ) {

        setup.triggerOnce = arguments[ i ];
        continue;
      }
      
      // jQuery event data object

      if ( typeof arguments[ i ] === 'object' ) {

        jQuery.extend( true, setup.data, arguments[ i ] );
        continue;
      }
      
      // eventtype
      
      setup.type = arguments[ i ];
    }

    return setup;
  }

}( domo, jQuery );