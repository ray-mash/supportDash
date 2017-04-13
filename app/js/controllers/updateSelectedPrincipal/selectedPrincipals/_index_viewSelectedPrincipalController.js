'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

module.exports = angular.module('app.controllers.updateSelectedPrincipal.selectedPrincipals.viewSelectedPrincipalController', [
    'app.common.errorMessages.errorMessagesFactory','app.services.manageDigitalId.manageDigitalIdService',
    'app.common.cacheFactory.applicationCacheFactory',
    'app.common.cardUtility.cardUtilService','ui.bootstrap','ngAnimate']);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);