
'use strict';

const path = require( 'path' ),
      isPlainObj = require( 'is-plain-obj' );

const FILENAME = '../' + path.basename( __filename ),
      FIRST_ARRAY_INDEX = 0;

// Set a rule that is true in the default config, and a string that will fail this rule.
// @see https://github.com/yaniswang/HTMLHint/wiki/Usage#about-rules
const TESTABLE_RULE = 'tag-pair',
      TESTABLE_STRING = '<ul><li></li>';

const getResultRuleId = function( result ) {
  return result.rule.id;
};

let SAMPLE_TRUE_RULESET = {},
    SAMPLE_FALSE_RULESET = {};

SAMPLE_TRUE_RULESET[ TESTABLE_RULE ] = true;
SAMPLE_FALSE_RULESET[ TESTABLE_RULE ] = false;

// Because we modify the default HTMLHint object, we need to make sure each test starts fresh.
afterEach( function() {
  jest.resetModules();
});

test( 'An object is exported', () => {
  expect( isPlainObj( require( '../index' ) ) ).toBe( true );
});

test( 'HTMLHint loads in the wrapped copy', () => {
  const HTMLHintWrapped = require( FILENAME ).HTMLHint;
  expect( isPlainObj( HTMLHintWrapped ) ).toBe( true );
});

test( 'A sample HTMLHint native function is available in the wrapped copy', () => {
  const HTMLHintWrapped = require( FILENAME ).HTMLHint;
  expect( 'function' === typeof HTMLHintWrapped.addRule ).toBe( true );
});

test( 'Native verify() returns an array of message objects when passed a config', () => {

  const HTMLHintNative = require( 'htmlhint' ).HTMLHint;
  const result = HTMLHintNative.verify( TESTABLE_STRING, SAMPLE_TRUE_RULESET );

  expect( Array.isArray( result ) ).toBe( true );
  expect( isPlainObj( result[ FIRST_ARRAY_INDEX ]) ).toBe( true );
  expect( 'string' === typeof result[ FIRST_ARRAY_INDEX ].message ).toBe( true );

});

test( 'Native verify() fails test string with default config', () => {

  // Run without an explicit config to ensure default ruleset is used.
  const HTMLHintNative = require( 'htmlhint' ).HTMLHint;
  const results = HTMLHintNative.verify( TESTABLE_STRING );

  expect( results.map( getResultRuleId ) ).toContain( TESTABLE_RULE );

});

test( 'Native verify() passes test string with overridden config', () => {

  // Run without an explicit config to ensure default ruleset is used.
  const HTMLHintNative = require( 'htmlhint' ).HTMLHint;
  const results = HTMLHintNative.verify( TESTABLE_STRING, SAMPLE_FALSE_RULESET );

  expect( results.map( getResultRuleId ) ).not.toContain( TESTABLE_RULE );

});

test( 'Wrapped verify() passes test string when bundled test rule is set false', () => {

  const moduleInTesting = require( FILENAME );

  const HTMLHintWrapped = moduleInTesting.HTMLHint,
        sharedConfig = moduleInTesting.sharedConfig;

  let results;

  // Set bundled config test rule to false to ensure it is different to the default config.
  sharedConfig[ TESTABLE_RULE ] = false;

  // Run without an explicit config to ensure the bundled one is used.
  results = HTMLHintWrapped.verify( TESTABLE_STRING );

  expect( results.map( getResultRuleId ) ).not.toContain( TESTABLE_RULE );

});

test( 'Wrapped verify() fails test string when overriding bundled shared config', () => {

  const moduleInTesting = require( FILENAME );

  const HTMLHintWrapped = moduleInTesting.HTMLHint,
        sharedConfig = moduleInTesting.sharedConfig;

  let results;

  // Set bundled config test rule to false to ensure it is different to the default config.
  sharedConfig[ TESTABLE_RULE ] = false;

  // Override the shared config to ensure the rule is true.
  results = HTMLHintWrapped.verify( TESTABLE_STRING, SAMPLE_TRUE_RULESET );

  expect( results.map( getResultRuleId ) ).toContain( TESTABLE_RULE );

});

test.skip( 'Wrapped verify() accepts bundled custom rules', () => {

  //const HTMLHintWrapped = require( FILENAME ).HTMLHint;

  // TODO.

});
