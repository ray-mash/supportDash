//this is to run gulp acceptance
'use strict';

var gulp            = require('gulp');
var protractor      = require('gulp-protractor').protractor;
var webdriver       = require('gulp-protractor').webdriver;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
var config          = require('../config');

gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver', webdriver);

gulp.task('e2e', ['create-e2e-testData','webdriver-update', 'webdriver', 'server'], function() {

  return gulp.src('test/acceptance/**/*.js')
//  return gulp.src('test/e2e/**/*.js')
    .pipe(protractor({
        configFile: config.test.protractor
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });

});