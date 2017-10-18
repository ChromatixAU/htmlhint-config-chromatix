
'use strict';

const path = require( 'path' );
const FILENAME = path.basename( __filename );

test( FILENAME + ' exports a rule', () => {
  const module = require( '../../rules/' + FILENAME );
  expect( 'function' === typeof module ).toBe( true );
});
