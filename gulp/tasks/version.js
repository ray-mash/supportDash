'use strict';

var gulp   = require('gulp');
var bump  = require('gulp-bump');
var config = require('../version');

gulp.task('version', function() {
  return gulp.src('./version.json')
     .pipe(bump())
     .pipe(gulp.dest('./'));

});