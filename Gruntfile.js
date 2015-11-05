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
          transform: ['babelify'],
          // Don't ignore transpilation in node_modules
          ignore: false
        }
      }
    },

    watch: {
      scripts: {
        files: [
          // 'demos/*.js',
          // 'demos/**/*.js',
          // 'extensible/*.js',
          'components/**/*.js',
          'mixins/*.js'
          // 'test/*.js'
        ],
        tasks: ['build']
      }
    }

  });

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['browserify']);

};
