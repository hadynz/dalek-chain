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

  /**
   * Adds a custom action plugin to all wrapped Dalek Test objects
   *
   * @param {String} ns (optional) Namespace for custom action plugin to reside inside
   * @param {String} pluginName Name of the new custom action plugin
   * @param {Function} fn The function to execute. Uses current Dalek test object as its scope
   * @return {DalekTest} Returns the current Dalek Test object to allow for chainable syntax
   */
  addAction: function (ns, pluginName, fn) {
    addPlugin(plugins.actions, ns, pluginName, fn);
  },

  /**
   * Adds bulk custom actions to all wrapped Dalek Test objects
   *
   * @param {String} ns (optional) Namespace for custom action plugin to reside inside
   * @param {Object} config Object with key value pairs mapping to plugin name and function callback
   */
  addActions: function(ns, config) {
    if (config === null || config === undefined) {
      config = ns;
      ns = null;
    }

    _.keys(config).forEach(function (pluginName) {
      this.addAction(ns, pluginName, config[pluginName]);
    }, this);
  },

  /**
   * Adds a custom assertion plugin to all wrapped Dalek Test objects
   *
   * @param {String} ns (optional) Namespace for custom assertion plugin to reside inside
   * @param {String} pluginName Name of the new custom assertion plugin
   * @param {Function} fn The function to execute. Uses current Dalek test object as its scope
   * @return {DalekTest} Returns the current Dalek Test object to allow for chainable syntax
   */
  addAssertion: function (ns, pluginName, fn) {
    addPlugin(plugins.assertions, ns, pluginName, fn);
  },

  /**
   * Adds bulk custom assertions to all wrapped Dalek Test objects
   *
   * @param {String} ns (optional) Namespace for custom assertion plugin to reside inside
   * @param {Object} config Object with key value pairs mapping to plugin name and function callback
   */
  addAssertions: function(ns, config) {
    if (config === null || config === undefined) {
      config = ns;
      ns = null;
    }

    _.keys(config).forEach(function (pluginName) {
      this.addAssertion(ns, pluginName, config[pluginName]);
    }, this);
  },

  /**
   * Clear all custom action and assertion plugins
   */
  clear: function () {
    plugins.actions.length = 0;
    plugins.assertions.length = 0;
  },

  /**
   * Extends a Dalek Test object with custom action and assertion plugins
   * @param {DalekTest} test Dalek Test object to wrap with custom plugins
   * @returns {DalekTest} Returns Dalek Test object to allow for chainable syntax
   */
  extend: function (test) {
    inheritActions(test);
    inheritAssertions(test);

    return test;
  }

};
