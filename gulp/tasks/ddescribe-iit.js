'use strict';

var config        = require('../config');
var gulp          = require('gulp');
var ddescribeIit = require('gulp-acorn-ddescribe-iit');

// I mean, that's basically it --- there isn't much to it.
gulp.task('ddescribe-iit', function(done) {
    return gulp.src([config.ddsecribe.src, '!app/js/templates.js']).
        pipe(ddescribeIit({ allowDisabledTests: false }));
});