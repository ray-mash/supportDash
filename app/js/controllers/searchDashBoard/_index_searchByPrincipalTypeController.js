'use strict';
var angular = require('angular');
var bulk = require('bulk-require');
module.exports = angular.module('app.controllers.searchDashBoard.searchByPrincipalTypeController', ['app.services.manageDigitalId.manageDigitalIdService',
    'app.common.cacheFactory.applicationCacheFactory','app.common.errorMessages.errorMessagesFactory', 'app.common.cardUtility.cardUtilService']);
bulk(__dirname, ['./**/!(*_index|*.spec).js']);