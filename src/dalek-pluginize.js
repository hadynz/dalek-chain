'use strict';

var _ = require('lodash');

var plugins = {
  actions: [],
  assertions: []
};

var inheritActions = function (test) {
  plugins.actions.forEach(function (plugin) {
    var parent = test;

    if (plugin.ns) {
      parent = parent[plugin.ns] = parent[plugin.ns] || {};

    }

    parent[plugin.name] = plugin.fn.bind(test);
  });
};

var inheritAssertions = function (test) {
  plugins.assertions.forEach(function (plugin) {
    var parent = test.assert;

    if (plugin.ns) {
      parent = parent[plugin.ns] = parent[plugin.ns] || {};
    }

    parent[plugin.name] = plugin.fn.bind(test);
  });
};

var hasPlugin = function (pluginName, ns, plugin) {
  return plugin.name === pluginName && plugin.ns === ns;
};

var addPlugin = function (pluginArray, ns, pluginName, fn) {
  if (fn === null || fn === undefined) {
    fn = pluginName;
    pluginName = ns;
    ns = null;
  }

  if (pluginArray.some(hasPlugin.bind(this, pluginName, ns))) {
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

  addActions: function(ns, config) {
    if (config === null || config === undefined) {
      config = ns;
      ns = null;
    }

    _.keys(config).forEach(function (pluginName) {
      this.addAction(ns, pluginName, config[pluginName]);
    }, this);
  },

  addAssertion: function (ns, pluginName, fn) {
    addPlugin(plugins.assertions, ns, pluginName, fn);
  },

  addAssertions: function(ns, config) {
    if (config === null || config === undefined) {
      config = ns;
      ns = null;
    }

    _.keys(config).forEach(function (pluginName) {
      this.addAssertion(ns, pluginName, config[pluginName]);
    }, this);
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
