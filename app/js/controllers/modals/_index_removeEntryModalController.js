'use strict';

var angular = require('angular');
var bulk = require('bulk-require');


module.exports = angular.module('app.controllers.modals.removeEntryModalController', [ 'ui.bootstrap']);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);