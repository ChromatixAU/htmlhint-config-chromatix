
// Chromatix TM 09/11/2016
// Custom rule to catch inline styles, but still allow background-image through

// Based on https://raw.githubusercontent.com/yaniswang/HTMLHint/master/src/rules/inline-style-disabled.js

// For help writing rules, browse the default rule database:
// https://github.com/yaniswang/HTMLHint/tree/master/src/rules

module.exports = function( HTMLHint ) {
	HTMLHint.addRule({
		id: 'inline-style-disabled-except-bg-image',
		description: 'Inline style cannot be used (except for background-image).',
		init: function( parser, reporter ) {
			var self = this;
			parser.addListener( 'tagstart', function( event ) {
				var attrs = event.attrs;
				var attr;
				var col = event.col + event.tagName.length + 1;
				var i, l;
				
				for ( i = 0, l = attrs.length; i < l; i++ ) {
					attr = attrs[i];
					if ( 'style' === attr.name.toLowerCase() ) {
						if ( 'background-image' !== attr.value.substring( 0, 16 ) ) {
							reporter.warn(
								'Inline style [ ' + attr.raw + ' ] cannot be used.',
								event.line,
								col + attr.index,
								self,
								attr.raw
							);
						}
					}
				}
			});
		}
	});
};

// The end!
