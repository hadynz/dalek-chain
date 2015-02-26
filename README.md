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

// Namespace plugins similar to `.assert`
dalekPluginize.addAction('ns', 'open', function(path){
  return this.open('http://localhost:9000/' + path);
});

// Bulk register custom actions
dalekPluginize.addActions({
  showDialog: function() { },
  ...
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

## API

### .addAction([namespace], pluginName, fn)

Adds a new custom action plugin

* `namespace` (optional) namespace for custom action plugin to reside inside
* `pluginName` name of the new custom action plugin
* `fn` the function to execute. Uses current Dalek test object as its scope

### .addActions([namespace], config)

Bulk adds new action plugins

* `namespace` (optional) namespace for custom plugin to reside inside
* `config` an object with key value pairs mapping to plugin name and function callback

### .addAssertion([namespace], pluginName, fn)

Adds a new custom assertion plugin

* `namespace` (optional) namespace for custom assertion plugin to reside inside
* `pluginName` name of the new custom assertion plugin
* `fn` the function to execute. Uses current Dalek test object as its scope

### .addAssertions([namespace], config)

Bulk adds new assertion plugins

* `namespace` (optional) namespace for custom plugin to reside inside
* `config` an object with key value pairs mapping to plugin name and function callback

### .extend(test)

Extends a Dalek test object with all registered custom action and assertion plugins

* `test` Dalek test object to wrap with registered custom plugins

## License

Copyright (c) 2014 Hady Osman   
Licensed under the [MIT][license] license.

[dalekjs]: http://dalekjs.com
[proposal]: https://github.com/rodneyrehm/dalek-api#registering-an-action
[license]: https://github.com/hadynz/dalek-pluginize/blob/master/README.md
