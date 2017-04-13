'use strict';

var controllersModule = require('./_index_viewSelectedPrincipalController');
var lodash = require('lodash');

/**
 * @ngInject
 */

controllersModule.controller('ViewSelectedPrincipalController',
    ['$scope', '$location', 'ApplicationCacheFactory', 'ManageDigitalIdService', 'errorMessagesFactory', '$window',
        'CardUtilService',
        '$modal',
        function ($scope, $location, ApplicationCacheFactory, ManageDigitalIdService, errorMessagesFactory, $window,
                  CardUtilService, $modal) {
            $scope.init = function () {
                $scope.userAccessRights = ApplicationCacheFactory.get('accessRights');
                $scope.userDetails = ApplicationCacheFactory.get('searchedCardDetails');
                $scope.userName = ApplicationCacheFactory.get('digitalIdUserName');
                $scope.bankingSystemPrincipals = ApplicationCacheFactory.get('bankingSystemPrincipals');
                $scope.selectedBankingPrincipals = ApplicationCacheFactory.get('selectedBankingPrincipals');
                $scope.id = ApplicationCacheFactory.get('selectedId');
                $scope.headerTitle = undefined;
            };

            $scope.openModalForReplaceCardNumber = function (principalCardNumber, principalId) {
                $scope.principalCardNumber = principalCardNumber;
                $scope.principalId = principalId;
                $scope.replacementCard = '';
                $scope.errorMessage = "";
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'cardNumberModal.html',
                    controller: 'ReplaceCardNumberModalController',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, $scope.principalCardNumber)
                    .result
                    .then(function (newCard) {
                        if ((newCard.length === 9 || newCard.length === 18 || newCard.length === 16 ) &&
                            $scope.principalCardNumber !== newCard) {
                            var replacedTrimmedCard = CardUtilService.cardNumberUtil(newCard);
                            $scope.checkDuplicatedCardNumbers(replacedTrimmedCard);
                        } else {
                            $scope.errorHandlingModal('Invalid card number', 'Please enter a valid card number');
                        }
                    });
            };
            $scope.isCardNumberDuplicate = function (replacedCard) {
                return lodash.find($scope.bankingSystemPrincipals, function (item) {
                    return item.cardNo === replacedCard;
                });
            };

            $scope.checkDuplicatedCardNumbers = function (replacedCard) {
                if ($scope.isCardNumberDuplicate(replacedCard) !== undefined) {
                    $scope.errorHandlingModal('Invalid card number', 'This Digital ID already contains this number');
                } else {
                    $scope.replacementCard = replacedCard;
                    $scope.replaceCardNumber($scope.replacementCard);
                }
            };

            $scope.openModalForRemoveLinkedDigitalId = function (linkedDigitalId) {
                $scope.selectedId = linkedDigitalId.id;
                ApplicationCacheFactory.put('linkedDigitalId', linkedDigitalId);
                $scope.selectedDetails = {};
                $scope.digitalId = linkedDigitalId.userName;
                $scope.findSelectedProduct(linkedDigitalId.systemPrincipals);
                $scope.headerTitle = 'Remove Linked Digital ID';
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'removeLinkedDigitalIdModal.html',
                    controller: 'RemoveEntryModalController',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions)
                    .result
                    .then(function () {
                        $scope.removeLinkedDigital($scope.selectedId, $scope.principalId);
                    });
            };

            $scope.findSelectedProduct = function (value) {
                $scope.selectedDetailsType = ApplicationCacheFactory.get('selectedPrincipalType');
                $scope.selectedDetailsValue = ApplicationCacheFactory.get('selectedPrincipalValue');
                lodash.find(value, function (item) {
                    if ($scope.selectedDetailsType === 'BANKING' && $scope.selectedDetailsValue === item.cardNo) {
                        $scope.principalId = item.id;
                        $scope.selectedCardDetails = item;
                    } else if ($scope.selectedDetailsType === 'OST' &&
                        $scope.selectedDetailsValue === item.displayName) {
                        $scope.principalId = item.id;
                        $scope.selectedCardDetails = item;
                    }
                });
            };

            $scope.removeLinkedDigital = function (digitalID, principalId) {
                var requestParamsDefaultData = {
                    id: digitalID,
                    principalId: principalId
                };
                ManageDigitalIdService.removeDigitalIDFromCard(requestParamsDefaultData)
                    .then(
                    function (value) {
                        $scope.handleRemoveDigitalIDFromCardResponse(value.content);
                    },
                    function (error) {
                        $scope.handleRemoveDigitalIDFromCardError(error);
                    });
            };

            $scope.handleRemoveDigitalIDFromCardResponse = function () {
                ApplicationCacheFactory.remove('linkedDigitalId');
                $scope.moreDigitalsIdResults = lodash.remove($scope.moreDigitalsIdResults, function (result) {
                    return $scope.digitalId !== result.userName;
                });
            };

            $scope.handleRemoveDigitalIDFromCardError = function (error) {
                $scope.responseError = error;
                ApplicationCacheFactory.remove('linkedDigitalId');
                $scope.errorMessage = errorMessagesFactory.error502;
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

            $scope.replaceCardNumber = function (replacedTrimmedCard) {
                var requestParamsDefaultData = {
                    id: $scope.id,
                    principalId: $scope.principalId
                };
                ManageDigitalIdService.replaceCardOnDigitalId(replacedTrimmedCard, requestParamsDefaultData)
                    .then(
                    function (value) {
                        if ($scope.principalType !== undefined) {
                            $scope.viewExtraLinkedDigitalId($scope.principalType, $scope.profileStyleType,
                                replacedTrimmedCard);
                        }
                        $scope.handleReplacementCardResponse(value);
                    },
                    function (error) {
                        $scope.handleReplaceCardNumberError(error);
                    });
            };
            $scope.handleReplacementCardResponse = function (value) {
                $scope.selectedBankingPrincipals =
                {
                    "type": value.type,
                    "version": value.version,
                    "id": value.id,
                    "profileStyleType": value.profileStyleType,
                    "channelProfileId": value.channelProfileId,
                    "territory": value.territory,
                    "revalidate": value.revalidate,
                    "cardNo": value.cardNo
                };

                $scope.listSystemPrincipals();
            };

            $scope.listSystemPrincipals = function () {
                $scope.digitalIDUserName = ApplicationCacheFactory.get('digitalIdUserName');
                ApplicationCacheFactory.remove('bankingSystemPrincipals');
                var requestParameters = {
                    username: $scope.digitalIDUserName
                };
                ManageDigitalIdService.listDigitalIds(requestParameters)
                    .then(
                    function (value) {
                        var results = value.content[0];
                        ApplicationCacheFactory.put('bankingSystemPrincipals', results.systemPrincipals);
                        $scope.mapSystemPrincipals(results);
                        $scope.userDetails.systemPrincipals = results.systemPrincipals;
                        $scope.handleSearchByUserDigitalIdResponse();
                    },
                    function (error) {
                        $scope.handleSearchByUserDigitalIdError(error);
                    });
            };

            $scope.mapSystemPrincipals = function (value) {
                $scope.userDetails = {
                    "activated": value.activated,
                    "id": value.id,
                    "userName": value.userName,
                    "preferredName": value.preferredName,
                    "lastLoggedIn": value.lastLoggedIn,
                    "registrationDate": value.registrationDate,
                    "authenticationAttempts": value.authenticationAttempts,
                    "disabled": value.disabled,
                    "systemPrincipals": value.systemPrincipals,
                    "channelIndicator": value.channelIndicator
                };
            };

            $scope.handleSearchByUserDigitalIdResponse = function () {
                ApplicationCacheFactory.put('searchedCardDetails', $scope.userDetails);
                $scope.bankingSystemPrincipals = ApplicationCacheFactory.get('bankingSystemPrincipals');
            };

            $scope.handleSearchByUserDigitalIdError = function (error) {
                $scope.responseError = error;
                $scope.error = errorMessagesFactory.error502;
            };

            $scope.handleReplaceCardNumberError = function (error) {
                $scope.errorContent = error;
                $scope.errorId = $scope.selectedBankingPrincipals.id + ' could not be found';
                $scope.noResultsForDevices = true;
                $scope.errorMessage = errorMessagesFactory.error1102;
            };

            $scope.viewExtraLinkedDigitalId =
                function (type, profileStyleType, uniqueIdentifierValue, uniqueIdentifierKey) {
                    ApplicationCacheFactory.put('selectedPrincipalType', type);
                    ApplicationCacheFactory.put('selectedPrincipalValue', uniqueIdentifierValue);
                    $scope.info = true;
                    $scope.principalType = type;
                    $scope.profileStyleType = profileStyleType;
                    var quotedPrincipalPropertyKey = "\"" + uniqueIdentifierKey + "\"";
                    var quotedPrincipalPropertyValue = "\"" + uniqueIdentifierValue + "\"";
                    ManageDigitalIdService.viewDigitalIDsLinkedToCard(type, quotedPrincipalPropertyKey,
                        quotedPrincipalPropertyValue)
                        .then(
                        function (value) {
                            $scope.moreDigitalsIdResults = undefined;
                            $scope.moreDigitalsIdinfo = "No other linked Digital ID's";
                            if (value.numberOfElements > 1) {
                                $scope.moreDigitalsIdResults = undefined;
                                $scope.moreDigitalsIdinfo = "No linked digital id";
                                $scope.handleViewDigitalIDsLinkedToCardResponse(value.content);
                            }
                        },
                        function (error) {
                            $scope.handleViewDigitalIDsLinkedToCardError(error);
                        });
                };

            $scope.handleViewDigitalIDsLinkedToCardResponse = function (value) {

                $scope.moreDigitalsIdResults = lodash.filter(value, function (result) {
                    if ($scope.userName !== result.userName) {
                        return result;
                    }
                });
                ApplicationCacheFactory.put('moreLinkedDigitalIds', $scope.moreDigitalsIdResults);
            };

            $scope.handleViewDigitalIDsLinkedToCardError = function (error) {
                $scope.responseError = error;
                $scope.noResults = true;
                $scope.errorMessage = errorMessagesFactory.error502;
            };

            $scope.setDigitalIDsLinkedToCardData = function ($index, systemPrincipalId, systemPrincipal) {
                $scope.selectedSystemPrincipal = systemPrincipal;
                $scope.selectedSystemPrincipalIndex = $index;
                $scope.selectedSystemPrincipalID = systemPrincipalId;
                $scope.getDigitalIDs = $scope.getDigitalIDs === $index ? -1 : $index;
                $scope.activePosition = -1;
            };

            $scope.viewDigitalIDDetails = function (username) {
                ApplicationCacheFactory.put('digitalIdUserName', username);
                $scope.searchedCardDetails = lodash.find($scope.moreDigitalsIdResults, function (result) {
                    if (username === result.userName) {
                        ApplicationCacheFactory.remove('bankingSystemPrincipals');
                        ApplicationCacheFactory.put('selectedId', result.id);
                        ApplicationCacheFactory.put('bankingSystemPrincipals', result.systemPrincipals);
                        return result;
                    }
                });
                ApplicationCacheFactory.put('searchedCardDetails', $scope.searchedCardDetails);
                $location.path('/viewDigitalIdDetails');
            };
        }
    ]);
