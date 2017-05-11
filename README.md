Auto-Cache
==========

 Fast, Quick, Lite Cache framework for [node](http://nodejs.org).


  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]


## Installation

```bash
$ npm install auto-cache --save
```
## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## Usage

```js
var AutoCache = require('auto-cache2');

var autoCache = new AutoCache();
autoCache.get('hash','key', function (cb) {
  // TODO
},5*60*60);
```


## Features

  * Memory Cache
  * Redis Cache

[npm-image]: https://img.shields.io/npm/v/auto-cache.svg
[npm-url]: https://npmjs.org/package/auto-cache
[downloads-image]: https://img.shields.io/npm/dm/auto-cache.svg
[downloads-url]: https://npmjs.org/package/auto-cache
