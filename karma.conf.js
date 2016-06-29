'use strict';

var path = require('path');
var _ = require('lodash');

function listFiles() {
  var patterns = [
    'dist/lib/angular.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'dist/lib/angular-ui-router.js',
    'dist/**/*.js',
    'client/**/*.spec.js',
    'dist/**/*.html',
  ];

  var files = patterns.map(function(pattern) {
    return {
      pattern: pattern
    };
  });
  files.push({
    pattern: 'client/style/**/*',
    included: false,
    served: true,
    watched: false
  });
  return files;
}

module.exports = function(config) {
  config.set({
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    ngHtml2JsPreprocessor: {
      stripPrefix: 'dist/',
      moduleName: 'myHandsOn',
    },

    logLevel: 'WARN',

    frameworks: ['phantomjs-shim', 'mocha', 'chai'],

    browsers : ['PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-phantomjs-shim',
      'karma-coverage',
      'karma-mocha',
      'karma-chai',
      'karma-ng-html2js-preprocessor'
    ],

    /*coverageReporter: {
      type : 'html',
      dir : 'coverage/',
    },*/

    reporters: ['progress'],

    proxies: {
      '/assets/': path.join('/base/client/assets/'),
    },

    preprocessors: {
      'dist/**/*.html': ['ng-html2js'],
    },
  });
};
