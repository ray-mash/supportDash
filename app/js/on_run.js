'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope) {
    $rootScope.isTimeOut = false;
    $rootScope.lastDigestRun  =  new Date();
}
module.exports = OnRun;
