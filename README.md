# dalek-pluginize

[![Build Status](https://travis-ci.org/hadynz/dalek-pluginize.svg)](https://travis-ci.org/hadynz/dalek-pluginize)

Enables the creation of [Dalek][dalekjs] plugins for assertions and actions by wrapping the Dalek test object.

## About

The current version of Dalek (<= 1.0.0) does not support the creation of assertion or action plugins to extend
the functionality that comes with the library. This shortcoming is already [being addressed][proposal] as part of
the DalekJS API proposal for new upcoming version.

The purpose of this library is to temporarily fill in this gap until the new version of Dalek is installed to allow
the writing of cleaner and chainable Dalek test code today.

## Install

With [npm](http://npmjs.org) do:

```bash
npm install dalek-pluginize --save
```

## Usage

### Registering an action/assertion:

```js
var dalekPluginize = require('dalek-pluginize');

dalekPluginize.addAction('showDialog', function(){
  return this.click('.dialog');
});

# Namespace plugins similar to `.assert`
dalekPluginize.addAction('ns', 'open', function(path){
  return this.open('http://localhost:9000/' + path);
});

```

### Consuming custom actions/assertions:

```js
var ex = require('dalek-pluginize').extend;

module.exports = {

  'My Dalek test': function(test) {
    ex(test)
      .ns.open('test/index.html')
      .showDialog()
      .assert.visible('.dialog')
      .done();
  }

}
```

[dalekjs]: http://dalekjs.com
[proposal]: https://github.com/rodneyrehm/dalek-api#registering-an-action
