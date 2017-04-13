'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, $location) {
    $rootScope.isTimeOut = false;
    $rootScope.lastDigestRun  =  new Date();
    $rootScope.$watch(function detectIdle() {
        $rootScope.now = new Date();
        $rootScope.isTimeOut = $rootScope.now - $rootScope.lastDigestRun > 180000;
        if ($rootScope.isTimeOut) {
            $rootScope.logOff();
        }
        $rootScope.showBreadCrumbs = true;
        $rootScope.lastDigestRun = $rootScope.now;
    });
    $rootScope.logOff = function () {
        $rootScope.showBreadCrumbs = false;
        $rootScope.globals = undefined;
        $rootScope.authenticated = false;
        $location.path('/login');
    };
}
module.exports = OnRun;
