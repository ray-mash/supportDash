'use strict';

var angular = require('angular');
var bulk = require('bulk-require');


module.exports = angular.module('app.services.authenticationService', ['app.common.configuration.ServiceEndPoint','ngCookies']);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);