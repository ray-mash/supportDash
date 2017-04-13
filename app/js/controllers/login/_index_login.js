'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

module.exports = angular.module('app.controllers.login.loginController', ['app.services.authenticationService','ngCookies', 'app.common.errorMessages.errorMessagesFactory',
    'app.common.cacheFactory.applicationCacheFactory']);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);