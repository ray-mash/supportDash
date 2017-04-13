'use strict';

var gulp = require('gulp');
var rsync = require('gulp-rsync');
var config = require('../config');


gulp.task('deploy', ['gzip'], function () {

    // Any deployment logic should go here
//    https://www.npmjs.com/package/gulp-rsync
    gulp.src(config.gzip.dest)
        .pipe(rsync({
            root: 'build/supportui_web',
            destination: 'http://nexus.standardbank.co.za:8090/nexus/content/sites/supportui/'
        }));

});

//var gulp = require('gulp');
//var sftp = require('gulp-sftp');
//var config = require('../config');
//
//gulp.task('deploy', function () {
//    return gulp.src(config.gzip.dest)
//        .pipe(sftp({
//            host: 'http://nexus.standardbank.co.za:8090/nexus/content/sites/supportui/',
////            user: 'johndoe',
////            pass: '1234',
//            remotePath : '/supportui/web'
//
//        }));
//});