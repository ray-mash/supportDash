'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

module.exports = angular.module('app.common.configuration.ServiceEndPoint', ['app.common.configuration.Url', 'ngCookies','ngResource']);
bulk(__dirname, ['./**/!(*_index|*.spec).js']);