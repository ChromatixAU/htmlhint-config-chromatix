
/**
 * Custom HTMLHint rule to meet WordPress Coding Standards:
 * "The W3C specifies that a single space should precede the self-closing slash."
 *
 * @see https://make.wordpress.org/core/handbook/best-practices/coding-standards/html/#self-closing-elements
 */

// For help writing rules, browse the default rule database:
// https://github.com/yaniswang/HTMLHint/tree/master/src/rules

'use strict';

module.exports = function( HTMLHint ) {
  HTMLHint.addRule({

    id:          'self-close-space-precede',
    description: 'Custom rule to match WordPress coding standards',

    init: function( parser, reporter ) {

      const self = this;

      parser.addListener( 'tagstart', function( event ) {

        const rawTag = event.raw,
              expectedSelfClose = ' />';

        // Not a self-closing tag?
        if ( '/' !== event.close ) {
          return;
        }

        // Self closing tag meets expectations?
        if ( expectedSelfClose === rawTag.substring( rawTag.length - expectedSelfClose.length ) ) {
          return;
        }

        reporter.warn(
          'Self-closing tags should have a space before closing.',
          event.line,
          event.col,
          self,
          event.raw
        );

      }); // AddListener.
    } // Init.
  }); // AddRule.
}; // Module.exports
