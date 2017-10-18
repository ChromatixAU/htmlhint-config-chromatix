
// Chromatix TM 09/11/2016
// Custom rule to catch inline scripts, but still scripts preloading stylesheets through

// Based on https://raw.githubusercontent.com/yaniswang/HTMLHint/master/src/rules/inline-script-disabled.js

// For help writing rules, browse the default rule database:
// https://github.com/yaniswang/HTMLHint/tree/master/src/rules

module.exports = function( HTMLHint ) {
	HTMLHint.addRule({
		id: 'inline-script-disabled-except-style-preload',
		description: 'Inline script cannot be used (except for style preloads).',
		init: function( parser, reporter ) {
			var self = this;
			parser.addListener( 'tagstart', function( event ) {
				var attrs = event.attrs;
				var attr;
				var col = event.col + event.tagName.length + 1;
				var attrName;
				var reEvent = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i;
				var i, l;

				for ( i = 0, l = attrs.length; i < l; i++ ) {
					attr = attrs[i];
					attrName = attr.name.toLowerCase();
					if ( true === reEvent.test( attrName ) ) {
						if ( ! /this\.rel(\s)?=(\s)?'stylesheet'/.test( attr.value ) ) {
							reporter.warn(
								'Inline script [ ' + attr.raw + ' ] cannot be used.',
								event.line,
								col + attr.index,
								self,
								attr.raw
							);
						}
					} else if ( 'src' === attrName || 'href' === attrName ) {
						if ( /^\s*javascript:/i.test( attr.value ) ) {
							reporter.warn(
								'Inline script [ ' + attr.raw + ' ] cannot be used.',
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
