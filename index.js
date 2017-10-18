
'use strict';

module.exports = {

  'rules': {

    // Built-in HTMLHint rules.
    // @see https://github.com/yaniswang/HTMLHint/wiki/Rules

    // Standard.

    // Set to true, but ignore certain attributes that aren't meant to be all lowercase.
    'attr-lowercase':           [ 'viewBox' ],

    'attr-no-duplication':      true,

    // WARNING: if this rule is disabled, another rule will need to be written to detect use of
    // 'no-quotes', since that can be worse.
    'attr-value-double-quotes': true,

    'attr-value-not-empty':     true,
    'doctype-first':            true, // TODO: Covered by w3cjs, so we may want to disable.
    'id-unique':                true,
    'spec-char-escape':         true,
    'src-not-empty':            true,
    'tag-pair':                 true,
    'tag-self-close':           true,
    'tagname-lowercase':        true,
    'title-require':            true, // TODO: Covered by w3cjs, so we may want to disable.

    // Performance.

    'head-script-disabled':     true,

    // Accessibility.

    'alt-require':              true, // TODO: Covered by w3cjs, so we may want to disable.

    // Specification.

    'doctype-html5':            true,
    'id-class-value':           'dash',

    // TODO: This should be enabled, but it needs a use case allowance for inlining critical CSS.
    'style-disabled':           false,

    // See custom Chromatix rule inline-style-disabled-except-bg-image.
    'inline-style-disabled':    false,

    // See custom Chromatix rule inline-script-disabled-except-style-preload.
    'inline-script-disabled':   false,

    'space-tab-mixed-disabled': 'tab',
    'id-class-ad-disabled':     true,
    'href-abs-or-rel':          false, // See custom Chromatix rule href-abs-or-rel-except-hash.
    'attr-unsafe-chars':        true,

    // Custom Chromatix rules.

    'inline-style-disabled-except-bg-image':       true,
    'inline-script-disabled-except-style-preload': true,
    'href-abs-or-rel-except-hash':                 'abs',
    'self-close-space-precede':                    true,
    'structure-required-tags':                     true

  }

}; // Module.exports.
