'use strict';

var servicesModule = require('./_index_cacheFactory.js');

/**
 * @ngInject
 */
function ApplicationCacheFactory($cacheFactory) {

    return $cacheFactory('applicationCache');

}

servicesModule.factory('ApplicationCacheFactory', ApplicationCacheFactory);

