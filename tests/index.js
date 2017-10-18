
'use strict';

const isPlainObj = require( 'is-plain-obj' );

test( 'index.js', () => {

  const module = require( '../index.js' );

  expect( isPlainObj( module ) ).toBe( true );

});
