
/**
 * Custom HTMLHint rule to catch inline styles, but still allow background-image through.
 * This is because we use background-image a lot with dynamic content from WordPress.
 * @see https://raw.githubusercontent.com/yaniswang/HTMLHint/master/src/rules/inline-style-disabled.js
 */

// For help writing rules, browse the default rule database:
// https://github.com/yaniswang/HTMLHint/tree/master/src/rules

'use strict';

module.exports = function( HTMLHint ) {

  HTMLHint.addRule({

    id:          'inline-style-disabled-except-bg-image',
    description: 'Inline style cannot be used (except for background-image).',

    init: function( parser, reporter ) {

      const self = this;

      parser.addListener( 'tagstart', function( event ) {

        const START_OF_STRING = 0,
              ITERATE_START = 0,
              ITERATE_INCREMENT = 1,
              EXTRA_COLUMN = 1;

        const attrs = event.attrs,
              column = event.col + event.tagName.length + EXTRA_COLUMN,
              allowedProp = 'background-image';

        let attr, iterate;

        for (
          iterate = ITERATE_START; iterate < attrs.length; iterate = iterate + ITERATE_INCREMENT
        ) {

          attr = attrs[iterate];

          // Pass on non-style attributes, and background-image starting the attribute value.
          if ( 'style' !== attr.name.toLowerCase() ) {
            continue;
          }

          // Pass on background-image starting the attribute value.
          if ( allowedProp === attr.value.substring( START_OF_STRING, allowedProp.length ) ) {
            continue;
          }

          // If we've got here, there's an inline style we don't want.
          reporter.warn(
            'Inline style [ ' + attr.raw + ' ] cannot be used.',
            event.line,
            column + attr.index,
            self,
            attr.raw
          );

        } // For each attribute.
      }); // AddListener.
    } // Init.
  }); // AddRule.
}; // Module.exports
