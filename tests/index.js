
'use strict';

const path = require( 'path' );
const FILENAME = path.basename( __filename );

test( FILENAME + ' exports a function', () => {
  const module = require( '../' + FILENAME );
  expect( 'function' === typeof module ).toBe( true );
});
