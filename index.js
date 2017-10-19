
'use strict';

/**
 * Takes a string of HTML and an optional ruleset. Passes to and returns the result of HTMLHint's
 * verify function, after inserting the bundled shared config. User rules override those provided
 * by the shared config.
 *
 * @param {string} html    A string of HTML to lint.
 * @param {object} ruleset An optional HTMLHint ruleset provided by the user.
 * @return {array} An array of message objects from the HTMLHint linter.
 */
function verify( html, ruleset ) {

  const HTMLHint = require( 'htmlhint' ).HTMLHint;

  let userRuleset = ruleset;
  let sharedConfig = require( './rules' ).rules;

  if ( 'undefined' === typeof ruleset ) {
    userRuleset = {};
  }

  // Override any options in the sharedConfig with options the user has supplied.
  Object.assign( sharedConfig, userRuleset );

  // Run HTMLHint.
  return HTMLHint.verify( html, sharedConfig );

} // Function verify.

module.exports = {};

module.exports.HTMLHint = require( 'htmlhint' ).HTMLHint;
module.exports.HTMLHint.verify = verify;
