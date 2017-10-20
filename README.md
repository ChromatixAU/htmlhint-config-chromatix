# htmlhint-config-chromatix

Configuration and additional rules for [HTMLHint](https://yarnpkg.com/en/package/htmlhint) for custom standards at [Chromatix Digital Agency](https://www.chromatix.com.au).

**This config is still in development.** If you have suggestions for improvement or if you disagree with anything this config makes you do, feel free to file an issue.

## Installation

**Remember this config is still in development, and may not work as expected yet.**

Install globally to use on any project:

    yarn global add @chromatix/htmlhint-config-chromatix

Install locally to one project:

    yarn add --dev @chromatix/htmlhint-config-chromatix

## Usage

**Coming soon.**

## Contributing

* Use `npm` instead of `yarn`, due to CI testing dependency on `test-all-versions`, which will not work with Yarn.
* Lint (`npm run lint`) and test (`npm test`) your work before pushing.

CI will attempt to run tests on every supported version of HTMLHint. This package will not work with HTMLHint 0.9.5, but every version so far from 0.9.6 onwards should be fine.

## License

[MIT](LICENSE).
