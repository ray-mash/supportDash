'use strict';
var controllersModule = require('./_index_transactionDashboardController');

/**
 * @ngInject
 */
controllersModule.controller('TransactionDashboardController',
    ['$scope', '$location', 'ApplicationCacheFactory',
        function ($scope, $location, ApplicationCacheFactory) {
            $scope.userAccessRights = ApplicationCacheFactory.get('accessRights');

            $scope.digitalId = function (value) {
                if (value) {
                    ApplicationCacheFactory.removeAll();
                    ApplicationCacheFactory.put('searchType', 'DIGITALID');
                    ApplicationCacheFactory.put('accessRights', $scope.userAccessRights);
                    $location.path('/searchByPrincipalType');
                }
            };
            $scope.digitalIdAudit = function (value) {
                if (value) {
                    ApplicationCacheFactory.removeAll();
                    ApplicationCacheFactory.put('searchType', 'AUDIT');
                    ApplicationCacheFactory.put('accessRights', $scope.userAccessRights);
                    $location.path('/searchAndViewAuditHistory');
                }
            };
            $scope.cardNumber = function (value) {
                if (value) {
                    ApplicationCacheFactory.removeAll();
                    ApplicationCacheFactory.put('searchType', 'CARDNO');
                    ApplicationCacheFactory.put('accessRights', $scope.userAccessRights);
                    $location.path('/searchByPrincipalType');
                }
            };
            $scope.onlineShareTrading = function (value) {
                if (value) {
                    ApplicationCacheFactory.removeAll();
                    ApplicationCacheFactory.put('searchType', 'OST');
                    ApplicationCacheFactory.put('accessRights', $scope.userAccessRights);
                    $location.path('/searchByPrincipalType');
                }
            };
            $scope.rtcPaymentsManagement = function (value) {
                if (value) {
                    ApplicationCacheFactory.removeAll();
                    ApplicationCacheFactory.put('searchType', 'RTC');
                    ApplicationCacheFactory.put('accessRights', $scope.userAccessRights);
                    $location.path('/real-time-clearance-dashboard');
                }
            };
            $scope.onlineBusinessBanking = function (value) {
                if (value) {
                    ApplicationCacheFactory.removeAll();
                    ApplicationCacheFactory.put('searchType', 'SED');
                    ApplicationCacheFactory.put('accessRights', $scope.userAccessRights);
                    $location.path('/searchSmallEnterpriseOnline');
                }
            };
        }
    ]);

