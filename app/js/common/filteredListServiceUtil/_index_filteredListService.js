'use strict';

var angular = require('angular');
var bulk = require('bulk-require');


module.exports = angular.module('app.common.filteredListServiceUtil.filteredListService', []);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);