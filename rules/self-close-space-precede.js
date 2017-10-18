
// Chromatix TM 03/10/2016
// Custom rule to match WordPress coding standards

// "The W3C specifies that a single space should precede the self-closing slash."
// https://make.wordpress.org/core/handbook/best-practices/coding-standards/html/#self-closing-elements

// For help writing rules, browse the default rule database:
// https://github.com/yaniswang/HTMLHint/tree/master/src/rules

module.exports = function( HTMLHint ) {
	HTMLHint.addRule({
		id: 'self-close-space-precede',
		description: 'Custom rule to match WordPress coding standards',
		init: function( parser, reporter ) {
			var self = this;
			parser.addListener( 'tagstart', function( event ) {
				if ( '/' === event.close && ' />' !== event.raw.substring( event.raw.length - 3 ) ) {
					reporter.warn(
						'Self-closing tags should have a space before closing.',
						event.line,
						event.col,
						self,
						event.raw
					);
				}
			});
		}
	});
};

// The end!
