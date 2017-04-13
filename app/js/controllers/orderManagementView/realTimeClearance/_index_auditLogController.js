'use strict';
var angular = require('angular');
var bulk = require('bulk-require');
module.exports = angular.module('app.controllers.orderManagementView.realTimeClearance.auditLogController',
 ['app.services.manageDigitalId.manageDigitalIdService',
    'app.common.cacheFactory.applicationCacheFactory','app.common.errorMessages.errorMessagesFactory']);
bulk(__dirname, ['./**/!(*_index|*.spec).js']);
