
/**
 * Custom rule to catch inline scripts, but still scripts preloading stylesheets through.
 *
 * @see https://raw.githubusercontent.com/yaniswang/HTMLHint/master/src/rules/inline-script-disabled.js
 */

// For help writing rules, browse the default rule database:
// https://github.com/yaniswang/HTMLHint/tree/master/src/rules

'use strict';

module.exports = function( HTMLHint ) {

  HTMLHint.addRule({

    id:          'inline-script-disabled-except-style-preload',
    description: 'Inline script cannot be used (except for style preloads).',

    init: function( parser, reporter ) {

      const self = this;

      parser.addListener( 'tagstart', function( event ) {

        const ITERATE_START = 0,
              ITERATE_INCREMENT = 1,
              EXTRA_COLUMN = 1;

        // eslint-disable-next-line max-len
        const INLINE_SCRIPT_ATTRS = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i;

        const attrs = event.attrs,
              column = event.col + event.tagName.length + EXTRA_COLUMN;

        let attrName, attr, iterate;

        for (
          iterate = ITERATE_START; iterate < attrs.length; iterate = iterate + ITERATE_INCREMENT
        ) {

          attr = attrs[iterate];
          attrName = attr.name.toLowerCase();

          if ( true === INLINE_SCRIPT_ATTRS.test( attrName ) ) {

            if ( /this\.rel(\s)?=(\s)?'stylesheet'/.test( attr.value ) ) {
              continue;
            }

            reporter.warn(
              'Inline script [ ' + attr.raw + ' ] cannot be used.',
              event.line,
              column + attr.index,
              self,
              attr.raw
            );

          } else if ( 'src' === attrName || 'href' === attrName ) {

            // Let it through if there's no 'javascript:' in this attribute value.
            if ( ! /^\s*javascript:/i.test( attr.value ) ) {
              continue;
            }

            reporter.warn(
              'Inline script [ ' + attr.raw + ' ] cannot be used.',
              event.line,
              column + attr.index,
              self,
              attr.raw
            );

          } // Inline script attrs / javascript in src/href test.
        } // For each attribute.
      }); // AddListener.
    } // Init.
  }); // AddRule.
}; // Module.exports
