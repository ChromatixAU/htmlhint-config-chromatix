
'use strict';

let HTMLHint = require( 'htmlhint' ).HTMLHint,
    sharedConfig = require( './rules' ).rules;

let nativeVerify = HTMLHint.verify;

/**
 * Takes a string of HTML and an optional ruleset. Passes to and returns the result of HTMLHint's
 * verify function, after inserting the bundled shared config. User rules override those provided
 * by the shared config.
 *
 * @param {string} html    A string of HTML to lint.
 * @param {object} ruleset An optional HTMLHint ruleset provided by the user.
 * @return {array} An array of message objects from the HTMLHint linter.
 */
HTMLHint.verify = function( html, ruleset ) {

  let userRuleset = ruleset;

  if ( 'undefined' === typeof ruleset ) {
    userRuleset = {};
  }

  // Override any options in the sharedConfig with options the user has supplied.
  Object.assign( sharedConfig, userRuleset );

  // Run HTMLHint.
  return nativeVerify( html, sharedConfig );

}; // Function verify.

module.exports = {
  HTMLHint:     HTMLHint,
  sharedConfig: sharedConfig
};
