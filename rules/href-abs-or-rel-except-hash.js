
// Chromatix TM 09/11/2016
// Custom rule to catch absolute or relative URLs (depending on setting), but ignore when a URL starts with a #

// Based on https://raw.githubusercontent.com/yaniswang/HTMLHint/master/src/rules/href-abs-or-rel.js

// For help writing rules, browse the default rule database:
// https://github.com/yaniswang/HTMLHint/tree/master/src/rules

module.exports = function( HTMLHint ) {
	HTMLHint.addRule({
		id: 'href-abs-or-rel-except-hash',
		description: 'An href attribute must be either absolute or relative.',
		init: function( parser, reporter, options ) {
			var self = this;
			var hrefMode = ( 'abs' === options ? 'absolute' : 'relative' );

			parser.addListener( 'tagstart', function( event ) {
				var attrs = event.attrs;
				var attr;
				var col = event.col + event.tagName.length + 1;
				var i, l;

				for ( i = 0, l = attrs.length; i < l; i++ ) {
					attr = attrs[i];
					if ( 'href' === attr.name && '#' !== attr.value.substring( 0, 1 ) ) {
						if ( ( 'absolute' === hrefMode && false === /^\w+?:/.test( attr.value ) ) ||
							( 'relative' === hrefMode && true === /^https?:\/\//.test( attr.value ) ) ) {
							reporter.warn(
								'The value of the href attribute [ ' + attr.value + ' ] must be ' + hrefMode + '.',
								event.line,
								col + attr.index,
								self,
								attr.raw
							);
						}
						break;
					}
				}
			});
		}
	});
};

// The end!
