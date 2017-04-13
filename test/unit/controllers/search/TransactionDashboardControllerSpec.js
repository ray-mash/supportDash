/*global angular */
'use strict';
describe("Unit : TransactionDashboardController", function () {
    var scope, location, createController, applicationCacheFactory;
    beforeEach(module('app.controllers.searchDashBoard.transactionDashboardController'));
    beforeEach(inject(function ($rootScope, $controller, $location, ApplicationCacheFactory) {
        scope = $rootScope.$new();
        location = $location;
        applicationCacheFactory = ApplicationCacheFactory;
        createController = function () {
            return   $controller("TransactionDashboardController", {
                $scope: scope,
                ApplicationCacheFactory: applicationCacheFactory
            })
        };
    }));

    describe('dashBoard  ', function () {
        it('should transition to search by digital Id', function () {
            createController();
            expect(scope.digitalId).toBeDefined();
            scope.digitalId(true);
            expect(applicationCacheFactory.get('searchType')).toEqual('DIGITALID');
            expect(location.path()).toBe('/searchByPrincipalType');
            scope.digitalId(false);
            expect(location.path()).toBe('/searchByPrincipalType');
        });
        it('should transition to search by card number', function () {
            createController();
            expect(scope.cardNumber).toBeDefined();
            scope.cardNumber(true);
            expect(applicationCacheFactory.get('searchType')).toEqual('CARDNO');
            expect(location.path()).toBe('/searchByPrincipalType');
            scope.cardNumber(false);
            expect(location.path()).toBe('/searchByPrincipalType');
        });
        it('should transition to search by online share trading page', function () {
            createController();
            expect(scope.onlineShareTrading).toBeDefined();
            scope.onlineShareTrading(true);
            expect(applicationCacheFactory.get('searchType')).toEqual('OST');
            expect(location.path()).toBe('/searchByPrincipalType');
            scope.onlineShareTrading(false);
            expect(location.path()).toBe('/searchByPrincipalType');
        });
        it('should transition to search by online business banking  page', function () {
            createController();
            expect(scope.onlineBusinessBanking).toBeDefined();
            scope.onlineBusinessBanking(true);
            expect(applicationCacheFactory.get('searchType')).toEqual('SED');
            expect(location.path()).toBe('/searchSmallEnterpriseOnline');
            scope.onlineBusinessBanking(false);
            expect(location.path()).toBe('/searchSmallEnterpriseOnline');
        });
//        it('should transition to search by order management  page', function () {
//            createController();
//            expect(scope.orderManagement).toBeDefined();
//            scope.orderManagement(true);
//            expect(applicationCacheFactory.get('searchType')).toEqual('OM');
//            expect(location.path()).toBe('/searchOrderManagement');
//            scope.orderManagement(false);
//            expect(location.path()).toBe('/searchOrderManagement');
//        });
        it('should transition to search by Audit Trail  page', function () {
            createController();
            expect(scope.digitalIdAudit).toBeDefined();
            scope.digitalIdAudit(true);
            expect(applicationCacheFactory.get('searchType')).toEqual('AUDIT');
            expect(location.path()).toBe('/searchAndViewAuditHistory');
            scope.digitalIdAudit(false);
            expect(location.path()).toBe('/searchAndViewAuditHistory');
        });
        it('should transition to RTC dashboard page', function () {
            createController();
            expect(scope.rtcPaymentsManagement).toBeDefined();
            scope.rtcPaymentsManagement(true);
            applicationCacheFactory.put('searchType', 'RTC');
            expect(applicationCacheFactory.get('searchType')).toEqual('RTC');
            expect(location.path()).toBe('/real-time-clearance-dashboard');
        });
        it('should not transition to RTC dashboard page when value is false', function () {
            createController();
            applicationCacheFactory.put('searchType', 'RTC');
            expect(scope.rtcPaymentsManagement).toBeDefined();
            scope.rtcPaymentsManagement();
            expect(applicationCacheFactory.get('searchType')).toEqual('RTC');
            expect(location.path()).toBe('');
        });
    });
});
