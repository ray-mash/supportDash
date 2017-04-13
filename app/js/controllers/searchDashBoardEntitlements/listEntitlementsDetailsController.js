'use strict';
var controllersModule = require('./_index_listEntitlementsDetailsController');
var lodash = require('lodash');

/**
 * @ngInject
 */
controllersModule.controller('ListEntitlementsDetailsController',
    ['$scope', '$location', 'ManageDigitalIdService', '$window', 'errorMessagesFactory',
        'ApplicationCacheFactory',
        function ($scope, $location, ManageDigitalIdService, $window, errorMessagesFactory, ApplicationCacheFactory) {

            $scope.addBusinessInfo = [];
            $scope.searchValue = $scope.searchValue || '';
            $scope.searching = false;
            $scope.currentPage = 1;
            $scope.maxSize = $scope.itemPerPage = 10;
            $scope.operatorMappings = [];
            $scope.searchResults = undefined;
            $scope.digitalId = ApplicationCacheFactory.get('selectedDigitalId');

            $scope.predicate = 'delegatedAccounts';
            $scope.reverse = true;
            $scope.sortOrder = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

            $scope.init = function () {
                $scope.userAccessRights = ApplicationCacheFactory.get('accessRights');
                $scope.listDelegatedOperators();
                $scope.errorMessage = undefined;
                if (ApplicationCacheFactory.get('searchedCardDetails').length > 0) {
                    $scope.searchTypes = ApplicationCacheFactory.get('searchType');
                    $scope.entitlementResults = ApplicationCacheFactory.get('searchedCardDetails');
                    $scope.infoMessage = "No results found";
                }
            };

            $scope.listDelegatedOperators = function () {
                var responseValue = ApplicationCacheFactory.get('searchedCardDetails');
                $scope.entitlementResults = [];
                $scope.filteredResults = [];
                $scope.businessIdResults = [];
                $scope.businessIdAndOperators = [];
                lodash.forEach(responseValue, function (sedPrincipals) {
                    lodash.forEach(sedPrincipals.systemPrincipals, function (systemPrincipal) {
                        if (systemPrincipal.type === "SED") {
                            var businessAndOperatorIdArray = {
                                "businessId": systemPrincipal.businessId,
                                "operatorId": systemPrincipal.operatorId
                            };
                            $scope.businessIdResults.push(businessAndOperatorIdArray);
                        }
                    });
                    $scope.myBusinessIdSubArray = lodash.uniq($scope.businessIdResults, 'businessId');
                });
                lodash.forEach($scope.myBusinessIdSubArray, function (subArray) {
                    var businessAndOperatorMappings = {
                        "businessId": undefined,
                        "operators": []
                    };
                    lodash.forEach($scope.businessIdResults, function (businessArray) {
                        if (subArray.businessId === businessArray.businessId) {
                            businessAndOperatorMappings.businessId = businessArray.businessId;
                            businessAndOperatorMappings.operators.push({operatorId: businessArray.operatorId});
                        }
                    });
                    $scope.businessIdAndOperators.push(businessAndOperatorMappings);
                });
                ApplicationCacheFactory.put('businessIdAndOperators', $scope.businessIdAndOperators);
                $scope.getBusinessDelegationGroup($scope.businessIdAndOperators);
            };

            $scope.getBusinessDelegationGroup = function (businessIdAndOperators) {
                $scope.delegationGropupResponses = [];
                lodash.forEach(businessIdAndOperators, function (item) {
                    var requestParamsDefaultData = {
                        businessId: item.businessId
                    };
                    ManageDigitalIdService.entitlement_businessId_delegationGroup(requestParamsDefaultData)
                        .then(
                        function (value) {
                            $scope.delegationGropupResponses.push(value);
                            ApplicationCacheFactory.put('businessDelegationGroup', value);
                            $scope.handleBusinessDelegationGroupResponse(value, requestParamsDefaultData);
                        },
                        function (error) {
                            $scope.responseError = error;
                            $scope.errorMessage = errorMessagesFactory.error502;
                        });
                });
            };

            $scope.getBillingAccountNumber = function (businessId) {
                $scope.businessAccInfo = undefined;
                var requestParamsDefaultData = {
                    businessId: businessId
                };
                ManageDigitalIdService.entitlement_business_businessId(requestParamsDefaultData)
                    .then(
                    function (value) {
                        $scope.businessAccInfo = value;
                        ApplicationCacheFactory.put('business', value);
                        $scope.setBusinessInfo($scope.operatorMappings);
                    });
            };


            $scope.setBusinessInfo = function (entitlementValues) {
                var operators = [];
                if (entitlementValues.operators !== undefined) {
                    operators.push(entitlementValues.operators);
                } else {
                    operators = undefined;
                }
                var entitlementMappings = {
                    businessId: entitlementValues.businessId,
                    businessDelegationGroup: entitlementValues.businessDelegationGroup,
                    delegatedAccounts: entitlementValues.delegatedAccounts,
                    enabler: entitlementValues.enabler,
                    enablerType: entitlementValues.enablerType,
                    contextId: entitlementValues.contextId,
                    operators: lodash.flatten(operators)
                };
                $scope.addBusinessInfo.push(entitlementMappings);
                ApplicationCacheFactory.put('entitlementResultss', $scope.addBusinessInfo);
            };

            $scope.handleBusinessDelegationGroupResponse = function (value, requestParams) {
                $scope.delegatedOperators = [];
                lodash.forEach(value.delegationGroups, function (item) {
                    $scope.getOperators(item, requestParams.businessId);
                });
            };

            $scope.getOperators = function (businessValue, businessId) {
                lodash.forEach(businessValue.delegatedAccounts, function (account) {
                    $scope.operatorsArray = [];
                    var requestParamsDefaultData = {
                        businessId: businessId,
                        delegationGroupId: businessValue.id,
                        accountNo: account.accountNo
                    };
                    ManageDigitalIdService.entitlement_getOperatorsHistory_fromAccount(requestParamsDefaultData)
                        .then(
                        function (value) {
                            $scope.operatorsArray = value;
                            ApplicationCacheFactory.put('operators', value);
                            $scope.operatorMappings = {
                                businessId: requestParamsDefaultData.businessId,
                                businessDelegationGroup: requestParamsDefaultData.delegationGroupId,
                                delegatedAccounts: account.accountNo,
                                enabler: businessValue.enabler,
                                enablerType: businessValue.enablerType,
                                contextId: businessValue.contextId,
                                operators: $scope.operatorsArray
                            };
                            $scope.getBillingAccountNumber($scope.operatorMappings.businessId);
                            $scope.entitlementResults =
                                $scope.entitlementDetailResults = $scope.addBusinessInfo;
                            ApplicationCacheFactory.put('entitlementResults', $scope.addBusinessInfo);
                            ApplicationCacheFactory.put('enabler', $scope.addBusinessInfo.enabler);
                            ApplicationCacheFactory.put('operatorMappings', $scope.addBusinessInfo);
                            ApplicationCacheFactory.put('entitlementResults', $scope.addBusinessInfo);
                        },
                        function (error) {
                            $scope.responseError = error;
                            $scope.errorMessage = errorMessagesFactory.error502;
                        });
                    });
            };

            $scope.viewOperatorsDetails = function (accountNumber, cardNumber) {
                ApplicationCacheFactory.put('accountNo', accountNumber);
                ApplicationCacheFactory.put('enabler', cardNumber);
                $scope.setSelectedAccountDetails(accountNumber, cardNumber);
                ApplicationCacheFactory.put('selectedAccountOperators', $scope.selectedAccounts);
                $location.path('/viewOperatorDetails');
            };

            $scope.setSelectedAccountDetails = function (selectedAccount, cardNumber) {
                lodash.forEach($scope.entitlementDetailResults, function (cardDetails) {
                    if (cardNumber === cardDetails.enabler && selectedAccount === cardDetails.delegatedAccounts) {
                        $scope.selectedAccounts = {
                            enabler: cardNumber,
                            contextId: cardDetails.contextId,
                            businessId: cardDetails.businessId,
                            businessDelegationGroup: cardDetails.businessDelegationGroup,
                            accountNo: selectedAccount,
                            operators: cardDetails.operators
                        };
                        return $scope.selectedAccounts;
                    }
                });
            };
        }
    ]);
