'use strict';

var controllersModule = require('./_index_viewSystemPrincipalController');
var lodash = require('lodash');


/**
 * @ngInject
 */

controllersModule.controller('ViewSystemPrincipalController',
    ['$scope', '$location', 'ApplicationCacheFactory',
        'ManageDigitalIdService', 'errorMessagesFactory', '$window', '$modal',
        function ($scope, $location, ApplicationCacheFactory, ManageDigitalIdService, errorMessagesFactory, $window,
                  $modal) {

            $scope.init = function () {
                $scope.userAccessRights = ApplicationCacheFactory.get('accessRights');
                $scope.changedAction = undefined;
                $scope.userDetails = ApplicationCacheFactory.get('searchedCardDetails');
                $scope.bankingSystemPrincipals = ApplicationCacheFactory.get('bankingSystemPrincipals');
                $scope.id = ApplicationCacheFactory.get('selectedId');
                $scope.headerTitle = undefined;
            };

            $scope.openModalForRemovePrincipal = function (profileType, principalType, principalId) {
                $scope.profileType = profileType;
                $scope.principalType = principalType;
                $scope.principalId = principalId;
                $scope.headerTitle = 'Remove Principal';
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'removePrincipalModal.html',
                    controller: 'RemoveEntryModalController',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions)
                    .result
                    .then(function () {
                        $scope.removePrincipal($scope.profileType, $scope.principalType, $scope.principalId);
                    });
            };

            $scope.errorHandlingModal = function (header, message) {
                $scope.errorMessageHeader = header;
                $scope.errorMessage = message;
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'errorHandlingModal.html',
                    controller: 'ErrorHandlingModalController'
                };
                $modal
                    .open(modalOptions, $scope.errorMessageHeader, $scope.errorMessage)
                    .result
                    .then(function () {
                    });
            };

            $scope.removePrincipal = function (profileType, principalType, principalId) {
                $scope.activePosition = -1;
                var requestParamsDefaultData = {
                    id: $scope.id,
                    principalId: principalId
                };
                ManageDigitalIdService.deleteSystemPrincipal(requestParamsDefaultData)
                    .then(
                    function (value) {
                        $scope.outcome = value.outcome;
                        $scope.handleRemovePrincipalResponseSuccess();
                    },
                    function (error) {
                        $scope.handleRemovePrincipalResponseError(error);
                    });
            };

            $scope.getSystemPrincipals = function () {
                if ($scope.digitalIDUserName !== undefined) {
                    var requestParameters = {
                        username: $scope.digitalIDUserName
                    };
                    ManageDigitalIdService.listDigitalIds(requestParameters)
                        .then(
                        function (value) {
                            $scope.userDetails = value.content[0];
                            ApplicationCacheFactory.put('bankingSystemPrincipals', value.content[0].systemPrincipals);
                            ApplicationCacheFactory.remove('searchedCardDetails');
                            ApplicationCacheFactory.put('searchedCardDetails', $scope.userDetails);
                            $scope.bankingSystemPrincipals = ApplicationCacheFactory.get('bankingSystemPrincipals');
                            $scope.searchResults = ApplicationCacheFactory.get('searchResults');
                            $scope.findSystemPrincipals();
                        },
                        function (error) {
                            $scope.handleSearchByUserDigitalIdError(error);
                        });
                }
            };

            $scope.findSystemPrincipals = function () {
                lodash.find($scope.searchResults, function (result) {
                    if ($scope.userDetails.id === result.id) {
                        result.systemPrincipals = $scope.bankingSystemPrincipals;
                    }
                });
            };

            $scope.handleRemovePrincipalResponseSuccess = function () {
                $scope.digitalIDUserName = ApplicationCacheFactory.get('digitalIdUserName');
                ApplicationCacheFactory.remove('bankingSystemPrincipals');
                $scope.getSystemPrincipals();

            };

            $scope.handleSearchByUserDigitalIdError = function (error) {
                $scope.responseError = error;
                $scope.errorMessage = errorMessagesFactory.error502;
            };

            $scope.handleRemovePrincipalResponseError = function (error) {
                $scope.responseError = error;
                ApplicationCacheFactory.remove('searchedCardDetails');
                $scope.errorMessage = errorMessagesFactory.error502;
            };

            $scope.viewMoreDetailsForSystemPrincipal = function ($index, systemPrincipalId) {
                $scope.toggleDetail($index);
                $scope.populateCardOrAccessKey(systemPrincipalId);
                ApplicationCacheFactory.put('selectedBankingPrincipals', $scope.results);
                $location.path('/selectedBankingDetailsView');
            };

            $scope.toggleDetail = function ($index) {
                $scope.activePosition = $scope.activePosition === $index ? -1 : $index;
            };

            $scope.populateCardOrAccessKey = function (systemPrincipalId) {
                $scope.results = {};
                lodash.find($scope.bankingSystemPrincipals, function (info) {
                    if (info.id === systemPrincipalId) {
                        $scope.results = info;
                    }
                });
                if ($scope.results.type === 'BANKING') {
                    $scope.callService($scope.results.type, 'CardNo', $scope.results.cardNo);
                }
                else if ($scope.results.type === 'OST') {
                    $scope.callService($scope.results.type, 'displayName', $scope.results.displayName);
                }
                else if ($scope.results.type === 'SED') {
                    $scope.callService($scope.results.type, 'Sed_BusinessId', $scope.results.businessId);
                }
                else if ($scope.results.type === 'LOYALTY') {
                    $scope.callService($scope.results.type, 'userName', $scope.results.userName);
                }
                else if ($scope.results.type === 'INSURANCE') {
                    $scope.callService($scope.results.type, 'userName', $scope.results.userName);
                }
                else if ($scope.results.type === 'STANLIB') {
                    $scope.callService($scope.results.type, 'bpId', $scope.results.bpId);
                }
                else if ($scope.results.type === 'ASI') {
                    $scope.callService($scope.results.type, 'asiBdaAccount', $scope.results.asiBdaAccount);
                }
                else if ($scope.results.type === 'WI') {
                    $scope.callService($scope.results.type, 'clientId', $scope.results.clientId);
                }
            };

            $scope.callService = function (type, principalPropertyKey, principalPropertyValue) {

                var quotedPrincipalPropertyKey =  "\"" + principalPropertyKey + "\"";
                var quotedPrincipalPropertyValue =  "\"" + principalPropertyValue + "\"";

                ManageDigitalIdService.viewDigitalIDsLinkedToCard(type, quotedPrincipalPropertyKey, quotedPrincipalPropertyValue)
                    .then(
                    function (value) {
                        $scope.handleViewDigitalIDsLinkedToCardResponse(value.content);
                    },
                    function (error) {
                        $scope.handleViewDigitalIDsLinkedToCardError(error);
                    });
            };

            $scope.handleViewDigitalIDsLinkedToCardResponse = function (value) {
                $scope.digitalIDs = value;
            };

            $scope.handleViewDigitalIDsLinkedToCardError = function (error) {
                $scope.responseError = error;
                $scope.noResults = true;
                $scope.errorMessage = errorMessagesFactory.error502;
            };

            $scope.viewDigitalIDsLinkedToCard = function ($index, systemPrincipalId, systemPrincipal) {
                $scope.selectedSystemPrincipal = systemPrincipal;
                $scope.selectedSystemPrincipalIndex = $index;
                $scope.selectedSystemPrincipalID = systemPrincipalId;
                $scope.getDigitalIDs = $scope.getDigitalIDs === $index ? -1 : $index;
                $scope.activePosition = -1;
                $scope.populateCardOrAccessKey(systemPrincipalId);
            };

            $scope.hideMainDigitalID = function (otherDigitalID, mainDigitalID) {
                if (otherDigitalID === mainDigitalID) {
                    $scope.hidingMainDigitalID = true;
                    return true;
                } else {
                    $scope.hidingMainDigitalID = false;
                    return false;
                }
            };
        }
    ]);
