'use strict';
var controllersModule = require('./_index_searchByPrincipalTypeController');
var lodash = require('lodash');
/**
 * @ngInject
 */
controllersModule.controller('SearchByPrincipalTypeController',
    ['$scope', '$modal', '$location', 'ManageDigitalIdService', '$window', 'errorMessagesFactory',
        'ApplicationCacheFactory', 'CardUtilService',
        function ($scope, $modal, $location, ManageDigitalIdService, $window, errorMessagesFactory,
                  ApplicationCacheFactory, CardUtilService) {
            var requestParameters = {};
            $scope.searchValue = $scope.searchValue || '';
            $scope.searching = false;
            $scope.itemsPerPage = 10;
            $scope.currentPage = 4;
            $scope.maxSize = $scope.numPerPage = 10;

            $scope.predicate = 'userName';
            $scope.reverse = false;
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

            $scope.init = function () {
                $scope.searchTypes = ApplicationCacheFactory.get('searchType');
                $scope.historyResults = ApplicationCacheFactory.get('historyResults');
                if (ApplicationCacheFactory.get('searchResults')) {
                    $scope.searchResults = ApplicationCacheFactory.get('searchResults');
                    $scope.searching = false;
                    $scope.currentPage = 1;
                    $scope.maxSize = $scope.numPerPage = 10;
                    $scope.doPagination();
                    $scope.searching = true;
                }
            };

            $scope.searchByTypePrincipal = function (searchValue) {
                var searchType = ApplicationCacheFactory.get('searchType');
                $scope.searchResults = undefined;
                $scope.filteredResults = undefined;
                $scope.noResults = false;
                $scope.noResultsForDevices = false;
                if (searchType !== 'CARDNO' && searchType !== 'OST') {
                    requestParameters = {
                        username: searchValue
                    };
                } else if (searchType !== 'CARDNO' && searchType !== 'DIGITALID') {
                    requestParameters = {
                        principalType: "OST",
                        principalPropertyKey: "Ost_Display_Name",
                        iPrincipalPropertyValue: searchValue
                    };
                } else if (searchValue.length === 18 || searchValue.length === 16 || searchValue.length === 9) {
                    var searchCardValue = CardUtilService.cardNumberUtil(searchValue);
                    $scope.cardNumberSearchMessage = undefined;
                    requestParameters = {
                        principalType: "BANKING",
                        principalPropertyKey: "CardNo",
                        principalPropertyValue: searchCardValue
                    };
                } else {
                    $scope.cardNumberSearchMessage = "Search by full card number: 9, 16 or 18 digits only";
                }
                ManageDigitalIdService.listDigitalIds(requestParameters)
                    .then(
                    function (value) {
                        $scope.fullResults = value.content;
                        $scope.searching = true;
                        ApplicationCacheFactory.put('searchResults', $scope.searchResults = value.content);
                        if(searchType === 'CARDNO') {
                            $scope.listOfSystemPrincipals($scope.fullResults, searchCardValue);
                        }else if(searchType === 'OST'){
                            $scope.handleOstResponse($scope.fullResults, searchValue);
                        }
                        $scope.errorMessage = "";
                    },
                    function (error) {
                        $scope.responseError = error;
                        $scope.errorMessage = errorMessagesFactory.error502;
                    });
            };

            $scope.handleOstResponse = function (response, searchTypeValue) {
                $scope.filteredCardResults = [];
                var ostValue = searchTypeValue;
                lodash.forEach(response, function (ostDisplayName) {
                    lodash.forEach(ostDisplayName.systemPrincipals, function (systemPrincipal) {
                        var cardStore = systemPrincipal.displayName;
                        if (systemPrincipal.type === "OST" &&  CardUtilService.stringStartsWithUtil(cardStore, ostValue)) {
                            $scope.mapCardSearchResults(ostDisplayName, systemPrincipal);
                        }
                    });
                });
                ApplicationCacheFactory.put('filteredResults', $scope.filteredResults);

            };

            $scope.searchHintsModal = function () {
                $scope.hintsHeader = 'Search Hints';
                $scope.hintsMessage1 = "%@standardbank%";
                $scope.hintsMessage2 =
                    "Using '%' before and after your input will return all the results that contain that specific text somewhere in it.";
                $scope.hintsMessage3 = "%jack@_bank.co.za%";
                $scope.hintsMessage4 =
                    "Using '_' together with '%' fills in missing information for you and will return all information that has that text with anything else in the '_' space.";
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'searchHintsModal.html',
                    controller: 'SearchHintsModalController',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, $scope.hintsHeader, $scope.hintsMessage1, $scope.hintsMessage2,
                    $scope.hintsMessage3, $scope.hintsMessage4)
                    .result
                    .then(function () {
                    });
            };

            $scope.viewSelectedPrincipalDetails = function (username) {
                var searchResponse = $scope.fullResults;
                $scope.selectedSpecificCardDetails(username, searchResponse);
                ApplicationCacheFactory.put('digitalIdUserName', username);
                ApplicationCacheFactory.put('searchedCardDetails', $scope.searchedCardDetails);
                ApplicationCacheFactory.put('selectedId', $scope.searchedCardDetails.id);
                ApplicationCacheFactory.put('statusAction', $scope.searchedCardDetails.activated);
                ApplicationCacheFactory.put('disabledStatus', $scope.searchedCardDetails.disabled);
                ApplicationCacheFactory.put('bankingSystemPrincipals', $scope.searchedCardDetails.systemPrincipals);
                $location.path('/viewDigitalIdDetails');
            };

            $scope.selectedSpecificCardDetails = function (username, responseDetails) {
                $scope.searchedCardDetails = {};
                $window.angular.forEach(responseDetails, function (result) {
                    if (result.userName === username) {
                        $scope.searchedCardDetails = result;
                    }
                });
            };

            $scope.$watch('currentPage + numPerPage + searchResults', function () {
                $scope.doPagination();
            });

            $scope.listOfSystemPrincipals = function (value, cardNumberValue) {
                $scope.filteredCardResults = [];
                var cardValue = cardNumberValue;

                lodash.forEach(value, function (digitalId) {
                    lodash.forEach(digitalId.systemPrincipals, function (systemPrincipal) {
                        var cardStore = systemPrincipal.cardNo;
                        if (systemPrincipal.type === "BANKING" && CardUtilService.cardNumberExactMatchUtil(cardStore, cardValue)) {
                            $scope.mapCardSearchResults(digitalId, systemPrincipal);
                        }
                    });
                });
                ApplicationCacheFactory.put('filteredCardResults', $scope.filteredCardResults);
            };

            $scope.mapCardSearchResults = function (digitalId, systemPrincipal) {
                var cardSearchResults = {};
                cardSearchResults.systemPrincipals = [];
                cardSearchResults.userName = digitalId.userName;
                cardSearchResults.id = digitalId.id;
                cardSearchResults.channelIndicator = digitalId.channelIndicator;
                cardSearchResults.lastLoggedIn = digitalId.lastLoggedIn;
                cardSearchResults.registrationDate = digitalId.registrationDate;
                cardSearchResults.authenticationAttempts = digitalId.authenticationAttempts;
                cardSearchResults.activated = digitalId.activated;
                cardSearchResults.disabled = digitalId.disabled;
                cardSearchResults.systemPrincipals.push(systemPrincipal);
                $scope.filteredCardResults.push(cardSearchResults);
                return;
            };

            $scope.doPagination = function () {
                var searchType = ApplicationCacheFactory.get('searchType');
                if ($scope.searchResults !== undefined && searchType === 'DIGITALID') {
                    $scope.begin = (($scope.currentPage - 1) * $scope.numPerPage);
                    $scope.end = $scope.begin + $scope.numPerPage;
                    $scope.filteredResults = $scope.searchResults.slice($scope.begin, $scope.end);
                }
                if ($scope.filteredCardResults !== undefined) {
                    $scope.paginatedFilteredCardResults = $scope.filteredCardResults.slice($scope.begin, $scope.end);
                }
            };

        }
    ]);

