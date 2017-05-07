# grunt-textlint

[![Greenkeeper badge](https://badges.greenkeeper.io/textlint/grunt-textlint.svg)](https://greenkeeper.io/)

Grunt plugin for [textlint](https://github.com/textlint/textlint).

* Require [.textlintrc](https://github.com/azu/textlint#textlintrc)
* Require [rules](https://github.com/azu/textlint#rule-list---collection-of-textlint-rule)
  * As you can use [vvakame/prh](https://github.com/vvakame/prh)'s format dictionary.

## Installation

```
npm install grunt-textlint
```

## Usage

```js
var grunt = require('grunt');

module.exports = function() {
  grunt.initConfig({
    textlint: {
      src: ["./*.md"]
    }
  });
  grunt.loadNpmTasks('grunt-textlint');
};
```

See [example](https://github.com/textlint/grunt-textlint/tree/master/example)
