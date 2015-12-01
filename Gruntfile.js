module.exports = function(grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-browserify');

  // Project configuration.
  grunt.initConfig({

    browserify: {

      ES5: {
        files: {
          'dist/basic-web-components.js': 'components/**/*.js'
        },
        options: {
          transform: [['babelify', {presets: ['es2015']}]],
          ignore: false,
          browserifyOptions: {
            debug: true
          }
        }
      },

      ES6: {
        files: {
          'dist/basic-web-components.es6.js': 'components/**/*.js',
          'dist/demos.js': 'demos/*.js'
        },
        options: {
          transform: [['babelify', {plugins: ['transform-es2015-modules-commonjs']}]],
          ignore: false,
          browserifyOptions: {
            debug: true
          }
        }
      }
    }

  });

  grunt.registerTask('default', function() {
    grunt.log.writeln('grunt commands this project supports:');
    grunt.log.writeln('');
    grunt.log.writeln('  grunt build');
    grunt.log.writeln('  grunt watch-es5');
    grunt.log.writeln('  grunt watch');
  });
  grunt.registerTask('build', ['browserify:ES5', 'browserify:ES6']);
  grunt.registerTask('watch-es5', function() {
    watchHelper(grunt, 'ES5');
  });
  grunt.registerTask('watch', function() {
    watchHelper(grunt, 'ES6');
  });

};

function watchHelper(grunt, version) {
  grunt.config.set('browserify.' + version + '.options.watch', true);
  grunt.config.set('browserify.' + version + '.options.keepAlive', true);
  grunt.task.run('browserify:' + version);
}
