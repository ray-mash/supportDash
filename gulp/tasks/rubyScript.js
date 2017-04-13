'use strict';

var gulp = require('gulp');
var config = require('../config');
var exec = require('child_process').exec;

gulp.task('create-e2e-testData', function (cb) {
    exec('pwd && cd testData/Scripts && ruby updateTestData.rb ', function (err, stdout, stderr) {
//    exec('pwd && cd testData/Scripts && ruby createTestData.rb ', function (err, stdout, stderr) {
    console.log(stdout);
        console.log(stderr);
});
    exec('echo successful....', function (err, stdout, stderr) {
        console.log(stdout);
        cb(err);
    });
});