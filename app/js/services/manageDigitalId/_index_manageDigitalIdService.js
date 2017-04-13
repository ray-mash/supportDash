'use strict';

var angular = require('angular');
var bulk = require('bulk-require');


module.exports = angular.module('app.services.manageDigitalId.manageDigitalIdService', ['app.common.configuration.ServiceEndPoint']);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);

