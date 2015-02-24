module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.initConfig({
    mocha: {
      'options': {
        'run': false,
        'logErrors': true,
        'reporter': 'Dot'
      },
      'test': {'src': './test/index.html'}
    },
    jshint: {
      'options': {'jshintrc': true},
      'lint': {'src': ['**/*.js']}
    }
  });

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('lint', ['jshint']);
};