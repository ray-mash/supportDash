'use strict';

var istanbul = require('browserify-istanbul');
var isparta = require('isparta');

module.exports = function (config) {

    config.set({

        basePath: '../',
        frameworks: ['jasmine', 'browserify'],
        preprocessors: {
            'app/js/**/*.js': ['browserify', 'coverage'],
            '!app/js/templates.js': ['!app/js/templates.js'],
            //location of templates
            'app/views/**/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            // strip app from the file path
            stripPrefix: 'app/'
        },
        browsers: ['PhantomJS'],
        reporters: ['progress', 'coverage'],

        autoWatch: true,

        browserify: {
            debug: true,
            extensions: ['.js'],
            transform: [
//                'hbsfy',
                'babelify',
//                'browserify-ngannotate',
                'bulkify',
                istanbul({
                    instrumenter: isparta,
                    ignore: ['**/node_modules/**', '**/test/**']
                })
            ]
        },

        proxies: {
            '/': 'http://localhost:9876/'
        },

        colors: true,
        coverageReporter: {
            sourceStore: require("istanbul").Store.create("fslookup"),
            reporters: [
                {"type": "text"},//to display table with line not tested
//                {"type": "html"},
                {"type": "html", dir: 'coverage'}
            ]
        },

        plugins: [
            'karma-browserify',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-jasmine',
            'karma-babel-preprocessor',
            'karma-junit-reporter'
        ],

        urlRoot: '/__karma__/',

        logLevel: config.LOG_INFO,
//        logLevel: config.DEBUG,

        singleRun: false,

        files: [
            // 3rd-party resources
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',

            'node_modules/phantomjs-polyfill/bind-polyfill.js',
            // app-specific code
            'app/js/main.js',

            // test files
            'test/unit/**/*.js'
        ]

    });

};
