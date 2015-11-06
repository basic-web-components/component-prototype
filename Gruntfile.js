module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({

    browserify: {
      dist: {
        files: {
          'dist/basic-web-components.js': 'components/**/*.js'
        },
        options: {
          browserifyOptions: {
            debug: true // Ask for source maps
          },
          transform: ['babelify'],
          // Don't ignore transpilation in node_modules
          ignore: false
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'components/**/*.js',
          'mixins/*.js'
        ],
        tasks: ['build']
      }
    }

  });

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['browserify']);

};
