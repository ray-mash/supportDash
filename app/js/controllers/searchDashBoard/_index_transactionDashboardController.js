'use strict';
var angular = require('angular');
var bulk = require('bulk-require');
module.exports = angular.module('app.controllers.searchDashBoard.transactionDashboardController', ['app.services.manageDigitalId.manageDigitalIdService',
    'app.common.cacheFactory.applicationCacheFactory','app.common.errorMessages.errorMessagesFactory']);
bulk(__dirname, ['./**/!(*_index|*.spec).js']);