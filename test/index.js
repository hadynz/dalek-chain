'use strict';

var assert = require('chai').assert;
var dalekPluginize = require('../src/dalek-pluginize');

describe('dalek-extend', function(){

  afterEach(function(){
    dalekPluginize.clear();
  });

  it('should exist', function(){
    assert.ok(dalekPluginize);
  });

  describe('addAction', function(){

    it('adds a custom plugin to a test object', function(){
      var test = {},
        pluginName = 'pluginName',
        pluginMethod = function() {
          assert.deepEqual(this, test);
        };

      dalekPluginize.addAction(pluginName, pluginMethod);
      dalekPluginize.extend(test);

      assert.property(test, pluginName);
      assert.isFunction(test[pluginName]);

      test.pluginName();
    });

    it('adds a custom plugin to a test object with a namespace', function(){
      var test = {},
        ns = 'namespace',
        pluginName = 'pluginName',
        pluginMethod = function() {
          assert.deepEqual(this, test);
        };

      dalekPluginize.addAction(ns, pluginName, pluginMethod);
      dalekPluginize.extend(test);

      assert.notProperty(test, pluginName);
      assert.property(test.namespace, pluginName);
      assert.isFunction(test.namespace[pluginName]);

      test.namespace.pluginName();
    });

    it('throws an error if duplicate plugin name is used', function(){
      var pluginName = 'pluginName',
        pluginMethod = function() {};

      dalekPluginize.addAction(pluginName, pluginMethod);

      assert.throws(dalekPluginize.addAction.bind(this, pluginName, pluginMethod), Error);
    });

    it('throws an error if duplicate plugin name and namespace are used', function(){
      var pluginName = 'pluginName',
        pluginMethod = function() {};

      dalekPluginize.addAction('ns', pluginName, pluginMethod);

      assert.throws(dalekPluginize.addAction.bind(this, 'ns', pluginName, pluginMethod), Error);
    });

    it('does not throw an error if duplicate plugin names with different namespaces are used', function(){
      var pluginName = 'pluginName',
        pluginMethod = function() {};

      dalekPluginize.addAction('ns1', pluginName, pluginMethod);

      assert.doesNotThrow(dalekPluginize.addAction.bind(this, 'ns2', pluginName, pluginMethod), Error);
    });

  });

  describe('addActions', function(){

    it('adds bulk custom actions', function(){
      var test = {},
        plugins = {
          plugin1: function() {},
          plugin2: function() {}
        };

      dalekPluginize.addActions(plugins);
      dalekPluginize.extend(test);

      assert.property(test, 'plugin1');
      assert.property(test, 'plugin2');
      assert.isFunction(test.plugin1);
      assert.isFunction(test.plugin2);
    });

    it('adds bulk custom actions with a namespace', function(){
      var test = {},
        plugins = {
          plugin1: function() {},
          plugin2: function() {}
        };

      dalekPluginize.addActions('ns', plugins);
      dalekPluginize.extend(test);

      assert.notProperty(test, 'plugin1');
      assert.notProperty(test, 'plugin2');
      assert.property(test.ns, 'plugin1');
      assert.property(test.ns, 'plugin2');
      assert.isFunction(test.ns.plugin1);
      assert.isFunction(test.ns.plugin2);
    });

  });

  describe('addAssertion', function(){

    it('adds a custom plugin to a test object', function(){
      var test = {
          assert: {}
        },
        pluginName = 'pluginName',
        pluginMethod = function() {
          assert.deepEqual(this, test);
        };

      dalekPluginize.addAssertion(pluginName, pluginMethod);
      dalekPluginize.extend(test);

      assert.notProperty(test, pluginName);
      assert.property(test.assert, pluginName);
      assert.isFunction(test.assert[pluginName]);

      test.assert.pluginName();
    });

    it('adds a custom plugin to a test object with a namespace', function(){
      var test = {
          assert: {}
        },
        ns = 'namespace',
        pluginName = 'pluginName',
        pluginMethod = function() {
          assert.deepEqual(this, test);
        };

      dalekPluginize.addAssertion(ns, pluginName, pluginMethod);
      dalekPluginize.extend(test);

      assert.notProperty(test, pluginName);
      assert.notProperty(test.assert, pluginName);
      assert.property(test.assert.namespace, pluginName);
      assert.isFunction(test.assert.namespace[pluginName]);

      test.assert.namespace.pluginName();
    });

    it('throws an error if duplicate plugin name is used', function(){
      var pluginName = 'pluginName',
        pluginMethod = function() {};

      dalekPluginize.addAssertion(pluginName, pluginMethod);

      assert.throws(dalekPluginize.addAssertion.bind(this, pluginName, pluginMethod), Error);
    });

    it('throws an error if duplicate plugin name and namespace are used', function(){
      var pluginName = 'pluginName',
        pluginMethod = function() {};

      dalekPluginize.addAssertion('ns', pluginName, pluginMethod);

      assert.throws(dalekPluginize.addAssertion.bind(this, 'ns', pluginName, pluginMethod), Error);
    });


    it('does not throw an error if duplicate plugin names with different namespaces are used', function(){
      var pluginName = 'pluginName',
        pluginMethod = function() {};

      dalekPluginize.addAssertion('ns1', pluginName, pluginMethod);

      assert.doesNotThrow(dalekPluginize.addAssertion.bind(this, 'ns2', pluginName, pluginMethod), Error);
    });

  });

  describe('addAssertions', function(){

    it('adds bulk custom assertions', function(){
      var test = {
          assert: {}
        },
        plugins = {
          plugin1: function() {},
          plugin2: function() {}
        };

      dalekPluginize.addAssertions(plugins);
      dalekPluginize.extend(test);

      assert.notProperty(test, 'plugin1');
      assert.notProperty(test, 'plugin2');
      assert.property(test.assert, 'plugin1');
      assert.property(test.assert, 'plugin2');
      assert.isFunction(test.assert.plugin1);
      assert.isFunction(test.assert.plugin2);
    });

    it('adds bulk custom assertions with a namespace', function(){
      var test = {
          assert: {}
        },
        plugins = {
          plugin1: function() {},
          plugin2: function() {}
        };

      dalekPluginize.addAssertions('ns', plugins);
      dalekPluginize.extend(test);

      assert.notProperty(test, 'plugin1');
      assert.notProperty(test, 'plugin2');
      assert.notProperty(test.assert, 'plugin1');
      assert.notProperty(test.assert, 'plugin2');
      assert.property(test.assert.ns, 'plugin1');
      assert.property(test.assert.ns, 'plugin2');
      assert.isFunction(test.assert.ns.plugin1);
      assert.isFunction(test.assert.ns.plugin2);
    });

  });

});
