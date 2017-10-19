
'use strict';

const path = require( 'path' ),
      isPlainObj = require( 'is-plain-obj' );

const FILENAME = path.basename( __filename );

test( FILENAME + ' exports an object', () => {
  const module = require( '../' + FILENAME );
  expect( isPlainObj( module ) ).toBe( true );
});

test( 'HTMLHint loads', () => {
  const module = require( '../' + FILENAME );
  expect( isPlainObj( module.HTMLHint ) ).toBe( true );
});

test( 'A sample HTMLHint native function (addRule) is correctly available', () => {
  const module = require( '../' + FILENAME );
  expect( 'function' === typeof module.HTMLHint.addRule ).toBe( true );
});

test( 'The HTMLHint verify function returns an expected array of message objects', () => {

  const module = require( '../' + FILENAME );
  const result = module.HTMLHint.verify( '<ul><li></li>', { 'tag-pair': true });
  const FIRST_ARRAY_INDEX = 0;

  expect( Array.isArray( result ) ).toBe( true );
  expect( isPlainObj( result[ FIRST_ARRAY_INDEX ]) ).toBe( true );
  expect( 'string' === typeof result[ FIRST_ARRAY_INDEX ].message ).toBe( true );

});

test( 'HTMLHint.verify() correctly uses bundled shared config', () => {
  const module = require( '../' + FILENAME );
});

test( 'HTMLHint.verify() allows overriding of bundled shared config', () => {
  const module = require( '../' + FILENAME );
});

test( 'HTMLHint.verify() accepts bundled custom rules', () => {
  const module = require( '../' + FILENAME );
});
