'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

module.exports = angular.module('app.filters.maskedCardNumberFilter', ['app.common.cacheFactory.applicationCacheFactory']);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);