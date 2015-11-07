module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-browserify');

  // Project configuration.
  grunt.initConfig({

    browserify: {

      options: {
        browserifyOptions: {
          debug: true // Ask for source maps
        },
        // Don't ignore transpilation in node_modules
        ignore: false,
        transform: ['babelify']
      },

      package: {
        files: {
          'dist/basic-web-components.js': 'components/**/*.js'
        }
      },

      watch: {
        files: {
          'dist/basic-web-components.js': 'components/**/*.js'
        },
        options: {
          keepAlive: true,
          watch: true
        }
      }
    }

  });

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['browserify:package']);
  grunt.registerTask('watch', ['browserify:watch']);

};
