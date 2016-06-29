'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var ngAnnotate = require('gulp-ng-annotate');
var protractor = require('gulp-protractor').protractor;
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
var path = require('path');
var karma = require('karma');

gulp.task('build-js', ['codestyle'], function () {
  return gulp.src('client/**/!(*.spec).js')
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/'))
  ;
});

gulp.task('build-lib', function () {
  return gulp.src([
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js'
    ])
    .pipe(gulp.dest('dist/lib/'))
  ;
});

gulp.task('build-static', function () {
  return gulp.src('client/**/!(*.js)')
    .pipe(gulp.dest('dist/'))
  ;
});

gulp.task('build-app', ['build-js', 'build-static']);
gulp.task('build', ['build-lib', 'build-app']);
gulp.task('default', ['codestyle', 'build', 'start']);

gulp.task('start', ['build'], function() {
  gulp.watch('client/**/*', ['codestyle', 'build-app']);
  return nodemon({
    script: 'index.js',
    ext: 'js',
  });
});

gulp.task('test', function() {
  return gulp.src(['tests/**/*.js'], { read: false })
    .pipe(protractor({
      configFile: 'tests/protractor.config.js',
      args: ['--baseUrl', 'http://localhost:9000'],
    }))
  ;
});

gulp.task('unit', ['build'], function (done) {
  var server = new karma.Server({
    configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: true,
    autoWatch: false,
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'dist/**/*.html': ['ng-html2js'],
      'dist/**/*.js': ['coverage'],
    },
  }, function(failCount) {
    done(failCount ? new Error('Failed ' + failCount + ' tests.') : null);
  });
  server.start();
});

gulp.task('webdriverUpdate', webdriverUpdate);
gulp.task('webdriverStandalone', webdriverStandalone);

gulp.task('codestyle', function() {
  return gulp.src(['client/**/*.js'])
    .pipe(jshint())
    .pipe(jscs())
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'))
  ;
});
