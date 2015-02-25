'use strict';

var plugins = {
  actions: [],
  assertions: []
};

var inheritActions = function (test) {
  plugins.actions.forEach(function (plugin) {
    var parent = test;

    if (plugin.ns) {
      parent = parent[plugin.ns] = {};
    }

    parent[plugin.name] = plugin.fn.bind(test);
  });
};

var inheritAssertions = function (test) {
  plugins.assertions.forEach(function (plugin) {
    var parent = test.assert;

    if (plugin.ns) {
      parent = parent[plugin.ns] = {};
    }

    parent[plugin.name] = plugin.fn.bind(test);
  });
};

var hasPlugin = function (pluginName, plugin) {
  return plugin.name === pluginName;
};

var addPlugin = function (pluginArray, ns, pluginName, fn) {
  if (fn === null || fn === undefined) {
    fn = pluginName;
    pluginName = ns;
    ns = null;
  }

  if (pluginArray.some(hasPlugin.bind(this, pluginName))) {
    throw Error('Plugin name already exists');
  }

  pluginArray.push({
    name: pluginName,
    fn: fn,
    ns: ns
  });
};

module.exports = {

  addAction: function (ns, pluginName, fn) {
    addPlugin(plugins.actions, ns, pluginName, fn);
  },

  addAssertion: function (ns, pluginName, fn) {
    addPlugin(plugins.assertions, ns, pluginName, fn);
  },

  clear: function () {
    plugins.actions.length = 0;
    plugins.assertions.length = 0;
  },

  extend: function (test) {
    inheritActions(test);
    inheritAssertions(test);

    return test;
  }

};
