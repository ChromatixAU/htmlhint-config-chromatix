
/**
 * Custom HTMLHint rule to catch absolute or relative URLs (depending on setting), but ignore when
 * a URL starts with a #.
 *
 * @see https://raw.githubusercontent.com/yaniswang/HTMLHint/master/src/rules/href-abs-or-rel.js
 */

// For help writing rules, browse the default rule database:
// https://github.com/yaniswang/HTMLHint/tree/master/src/rules

'use strict';

module.exports = function( HTMLHint ) {

  HTMLHint.addRule({

    id:          'href-abs-or-rel-except-hash',
    description: 'An href attribute must be either absolute or relative.',

    init: function( parser, reporter, options ) {

      const self = this;
      const hrefMode = ( 'abs' === options ? 'absolute' : 'relative' );

      parser.addListener( 'tagstart', function( event ) {

        const START_OF_STRING = 0,
              ITERATE_START = 0,
              ITERATE_INCREMENT = 1,
              EXTRA_COLUMN = 1,
              ANCHOR_CHAR = '#';

        const column = event.col + event.tagName.length + EXTRA_COLUMN,
              attrs = event.attrs;

        let iterate, attr;

        for (
          iterate = ITERATE_START; iterate < attrs.length; iterate = iterate + ITERATE_INCREMENT
        ) {

          attr = attrs[iterate];

          // Pass on if this isn't the href attribute.
          if ( 'href' !== attr.name ) {
            continue;
          }

          // If the attribute starts with an anchor link, bow out now.
          if ( ANCHOR_CHAR === attr.value.substring( START_OF_STRING, ANCHOR_CHAR.length ) ) {
            break;
          }

          // In absolute mode, allow absolute links.
          if ( 'absolute' === hrefMode && true === /^\w+?:/.test( attr.value ) ) {
            break;
          }

          // In relative mode, break out now as long as it's not an absolute link.
          if ( 'relative' === hrefMode && false === /^https?:\/\//.test( attr.value ) ) {
            break;
          }

          reporter.warn(
            'The value of the href attribute [ ' + attr.value + ' ] must be ' + hrefMode + '.',
            event.line,
            column + attr.index,
            self,
            attr.raw
          );

          // There'll only be one href attribute, so no need to do anything else.
          break;

        } // For each attribute.
      }); // AddListener.
    } // Init.
  }); // AddRule.
}; // Module.exports
