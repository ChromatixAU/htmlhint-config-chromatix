
/**
 * Custom HTMLHint rule.
 * Some tags are required in an HTML document no matter what.
 */

// For help writing rules, browse the default rule database:
// @see https://github.com/yaniswang/HTMLHint/tree/master/src/rules

'use strict';

const INDEX_OF_NOT_FOUND = -1;

module.exports = function( HTMLHint ) {

  HTMLHint.addRule({

    id:          'structure-required-tags',
    description: 'Some tags are required in an HTML document no matter what',

    init: function( parser, reporter ) {

      const self = this;

      let tagsFound = [];
      let tagsNeeded = [];

      const tagsRequired = [
        'html',
        'head',
        'body'
      ];

      // Create a map of tags present in the document each time one is opened.
      parser.addListener( 'tagstart', function( event ) {
        tagsFound.push( event.tagName.toLowerCase() );
      });

      // At the end of the document, check whether any of our required tags were missing.
      parser.addListener( 'end', function( event ) {
        tagsNeeded = tagsRequired.filter( function( tag ) {

          if ( INDEX_OF_NOT_FOUND === tagsFound.indexOf( tag ) ) {
            return true;
          }

          return false;

        });

        if ( ! tagsNeeded.length ) {
          return;
        }

        reporter.warn(
          'One or more required tags are missing: ' + tagsNeeded.join( ', ' ),
          event.line, event.col, self, event.raw
        );

      }); // AddListener.
    } // Init.
  }); // AddRule.
}; // Module.exports
