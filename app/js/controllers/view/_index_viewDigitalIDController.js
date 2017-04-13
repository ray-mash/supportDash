'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

module.exports = angular.module('app.controllers.viewDigitalIDController', [
    'app.common.errorMessages.errorMessagesFactory','app.services.manageDigitalId.manageDigitalIdService','app.common.cacheFactory.applicationCacheFactory',
     'ui.bootstrap','ngAnimate']);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);