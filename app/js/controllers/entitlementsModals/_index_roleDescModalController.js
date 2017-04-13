'use strict';

var angular = require('angular');
var bulk = require('bulk-require');


    module.exports = angular.module('app.controllers.entitlementsModals.roleDescModalController', [ 'ui.bootstrap']);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);