var _ = require('lodash');

var plugins = {
  actions: {},
  assertions: {}
};

var inheritActions = function (test) {
  _.keys(plugins.actions).forEach(function (pluginName) {
    test[pluginName] = plugins.actions[pluginName].bind(test);
  });

};

var inheritAssertions = function (test) {
  _.keys(plugins.actions).forEach(function (pluginName) {
    test.assert[pluginName] = plugins.assertions[pluginName].bind(test);
  });
};

module.exports = {

  addAction: function (pluginName, fn) {
    if (plugins.actions[pluginName]) {
      throw Error('Custom action plugin name already exists');
    }

    plugins.actions[pluginName] = fn;
  },

  addAssertion: function (pluginName, fn) {
    if (plugins.assertions[pluginName]) {
      throw Error('Custom assertion plugin name already exists');
    }

    plugins.assertions[pluginName] = fn;
  },

  extend: function (test) {
    inheritActions(test);
    inheritAssertions(test);

    return test;
  }

};
