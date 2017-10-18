
'use strict';

const isPlainObj = require( 'is-plain-obj' ),
      path = require( 'path' );

const FILENAME = path.basename( __filename );

test( FILENAME + ' exports a rules object', () => {
  const module = require( '../' + FILENAME );
  expect( isPlainObj( module.rules ) ).toBe( true );
});
