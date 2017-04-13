'use strict';
var controllersModule = require('./_index_searchEntitlementsController');
var lodash = require('lodash');

/**
 * @ngInject
 */
controllersModule.controller('SearchEntitlementsController',
    ['$scope', '$location', 'ManageDigitalIdService', '$window', 'errorMessagesFactory',
        'ApplicationCacheFactory',
        function ($scope, $location, ManageDigitalIdService, $window, errorMessagesFactory, ApplicationCacheFactory) {
            $scope.searchValue = $scope.searchValue || '';
            $scope.searching = false;
            $scope.currentPage = 1;
            $scope.userAccessRights = ApplicationCacheFactory.get('accessRights');
            $scope.maxSize = $scope.itemPerPage = 10;
            $scope.operatorMappings = [];
            $scope.init = function () {
                $scope.errorMessage = undefined;
                if (ApplicationCacheFactory.get('searchResults')) {
                    $scope.userAccessRights = ApplicationCacheFactory.get('accessRights');
                    $scope.sedResponse = $scope.searchResults = ApplicationCacheFactory.get('searchResults');
                    $scope.searchTypes = ApplicationCacheFactory.get('searchType');
                    $scope.infoMessage = "No results found";
                }
            };

            $scope.searchForEntitlements = function (searchValue) {
                $scope.sedResponse = undefined;
                var searchType = ApplicationCacheFactory.get('searchType');
                $scope.searchResults = undefined;
                $scope.operatorResults = undefined;
                var requestParameters = {
                    username: searchValue,
                    principalType: searchType
                };
                ManageDigitalIdService.listDigitalIds(requestParameters)
                    .then(
                    function (value) {
                        if ( value.numberOfElements > 0) {
                            $scope.infoMessage = undefined;
                            $scope.fullResults = value.content;
                            $scope.searching = true;
                            ApplicationCacheFactory.put('searchResults', $scope.searchResults = value.content);
                            $scope.sedResponse = value.content;
                            $scope.searchedDigitalId = ApplicationCacheFactory.get('digitalId');
                            $scope.entitlementDetailResults = ApplicationCacheFactory.get('searchResults');
                        } else {
                            $scope.infoMessage = "No results found";
                            $scope.userAccessRights = ApplicationCacheFactory.get('accessRights');
                            ApplicationCacheFactory.removeAll();
                            ApplicationCacheFactory.put('searchType', 'SED');
                            ApplicationCacheFactory.put('accessRights', $scope.userAccessRights);
                        }
                    },
                    function (error) {
                        $scope.responseError = error;
                        $scope.errorMessage = errorMessagesFactory.error502;
                    });
            };
            $scope.viewSelectedDigitalIdDetails = function (digitalId) {
                $scope.selectedSedResponse = [];
                lodash.find($scope.sedResponse, function (item) {
                    if(item.userName === digitalId){
                        $scope.selectedSedResponse.push(item);
                    }
                });
                ApplicationCacheFactory.put('selectedDigitalId', digitalId);
                ApplicationCacheFactory.put('searchedCardDetails', $scope.selectedSedResponse);
                ApplicationCacheFactory.put('searchedObbDetails', $scope.sedResponse);
                $location.path('/listEntitlementsDetails');
            };
        }
    ]);

