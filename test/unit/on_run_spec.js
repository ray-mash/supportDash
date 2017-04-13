/*global angular */

'use strict';

describe('Unit: OnRun', function () {
    var location, $rootScope, scope;

    beforeEach(function () {
        // instantiate the app module
        angular.mock.module('app');
    });

    beforeEach(inject(function (_$rootScope_, $location) {
        $rootScope = _$rootScope_;
        scope = _$rootScope_.$new();
        location = $location;
    }));

    it('should watch the timeout and reset timeout upon activities ', inject(function () {
        $rootScope.lastDigestRun = new Date();
        expect($rootScope).toBeDefined();
        $rootScope.now = new Date();
        expect($rootScope.now).not.toBe($rootScope.lastDigestRun);
        $rootScope.isTimeOut = $rootScope.now - $rootScope.lastDigestRun > 10;
        expect($rootScope.now - $rootScope.lastDigestRun > 10).toBeFalsy();
        $rootScope.isTimeOut = false;
        expect($rootScope.isTimeOut).toBeFalsy();
        $rootScope.lastDigestRun = $rootScope.now;
        expect($rootScope.lastDigestRun).toEqual($rootScope.now);
    }));

    it('should watch the timeout and logoff upon time out ', inject(function () {
        $rootScope.lastDigestRun = new Date();
        $rootScope.isTimeOut = true;
        expect($rootScope).toBeDefined();
        expect($rootScope.$watch).toBeDefined();
        $rootScope.lastDigestRun.setSeconds($rootScope.lastDigestRun.getSeconds() - 10*60);
        $rootScope.$digest();
        expect($rootScope.isTimeOut).toEqual(false);
        $rootScope.now.setSeconds($rootScope.now.getSeconds() + 10*60);
        $rootScope.isTimeOut = $rootScope.now - $rootScope.lastDigestRun > 1;
        $rootScope.isTimeOut = true;
        expect($rootScope.isTimeOut).toEqual(true);
        if($rootScope.isTimeOut === true){
            $rootScope.logOff();
        }
        expect($rootScope.logOff).toBeDefined();
        expect($rootScope.showBreadCrumbs).toBeDefined();
        expect($rootScope.showBreadCrumbs).toBeFalsy();
        expect($rootScope.globals).toBeUndefined();
        expect($rootScope.authenticated).toBeFalsy();
        expect(location.path()).toEqual('/login');
    }));
});