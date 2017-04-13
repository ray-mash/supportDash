'use strict';

module.exports = {

    'browserPort': 9000,
    'UIPort': 3001,
    'serverPort': 3002,

    'styles': {
        'src': 'app/styles/**/*.scss',
        'dest': 'build/css'
    },

    'scripts': {
        'src': 'app/js/**/*.js',
        'dest': 'build/js'
    },
    'ddsecribe': {
        'src': 'test/unit/**/*.js'
//    'dest': 'build/js'
    },

    'images': {
        'src': 'app/images/**/*',
        'dest': 'build/images'
    },

    'fonts': {
        'src': ['app/fonts/**.*'],
        'dest': 'build/fonts'
    },

    'views': {
        'watch': [
            'app/index.html',
            'app/views/**/*.html'
        ],
        'src': ['app/views/**/*.html'],
        'dest': 'app/js'
    },

    'gzip': {
        'src': 'build/**/*',
        'dest': 'build/supportui_web',
        'options': {}
    },

    'dist': {
        'root': 'build'
    },

    'browserify': {
        'entries': ['./app/js/main.js'],
        'bundleName': 'main.js',
        'sourcemap': true
    },

    'test': {
        'karma': 'test/karma.conf.js',
        'protractor': 'test/protractor.conf.js'
    },

    'rubyScripts' : {
        'src': 'testData/Scripts/createtestdata.rb'
    }

};
