'use strict';

var controllersModule = require('./_index_viewAuditHistoryController');

/**
 * @ngInject
 */

controllersModule.controller('ViewAuditHistoryController',
    ['$scope', 'errorMessagesFactory', 'ApplicationCacheFactory', 'ManageDigitalIdService',
        function ($scope, errorMessagesFactory, ApplicationCacheFactory, ManageDigitalIdService) {

            $scope.currentPage = 1;
            $scope.itemsPerPages = 10;
            $scope.maxSize = $scope.numPerPage = 5;
            $scope.historyResults = ApplicationCacheFactory.get('historyResults');
            $scope.init = function () {
                $scope.historyResults = ApplicationCacheFactory.get('historyResults');
                if(ApplicationCacheFactory.get('auditLogs') !== undefined){
                    $scope.auditLogs = ApplicationCacheFactory.get('auditLogs');
                }
            };


            $scope.searchIdForHistory = function (searchValue) {
                $scope.historyResults = undefined;
                $scope.auditLogs = undefined;
                var requestParameters = {
                    username: searchValue
                };
                ManageDigitalIdService.listDigitalIds(requestParameters)
                    .then(
                    function (value) {
                        ApplicationCacheFactory.put('historyResults', $scope.historyResults = value.content);
                        $scope.errorMessage = "";
                    },
                    function (error) {
                        $scope.responseError = error;
                        $scope.errorMessage = errorMessagesFactory.error502;
                    });
            };

            $scope.searchAuditLog = function (id) {
                var requestParamsDefaultData = {
                    id: id
                };
                ManageDigitalIdService.history(requestParamsDefaultData)
                    .then(
                    function (value) {
                        $scope.showHistory = true;
                        $scope.auditLogs = value;
                        ApplicationCacheFactory.put('auditLogs', value);
                    },
                    function (error) {
                        $scope.responseError = error;
                        $scope.errorMessage = errorMessagesFactory.error502;
                    });
            };

        }
    ]);
