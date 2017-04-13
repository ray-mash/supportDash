/*global angular */

'use strict';

describe("Unit : ListEntitlementsDetailsController", function () {

    var scope, manageDigitalIdService, billingAccountNumberDeferred, location, operatorsDeferred, entitlementsDeferred, createController, errorMessageFactory, applicationCacheFactory;
    var sedResponses = [
        {
            "id": 479520,
            "version": null,
            "userName": "perfsit2ibr583@sb.co.za",
            "channelIndicator": "IBR",
            "activated": true,
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 320558,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 602750,
                    "territory": "SBSA",
                    "revalidate": false,
                    "cardNo": "4890611240433507"
                },
                {
                    "type": "SED",
                    "version": null,
                    "id": 336336,
                    "profileStyleType": "BUSINESS",
                    "channelProfileId": 0,
                    "territory": "SBSA",
                    "revalidate": true,
                    "businessId": "146",
                    "operatorId": "176"
                },
                {
                    "type": "SED",
                    "version": null,
                    "id": 336337,
                    "profileStyleType": "BUSINESS",
                    "channelProfileId": 0,
                    "territory": "SBSA",
                    "revalidate": true,
                    "businessId": "147",
                    "operatorId": "170"
                }
            ]
        }
    ];
    var values = {
        "delegationGroups": [
            {
                "id": 60,
                "version": 2,
                "enabler": "5359502261135231",
                "enablerType": "CARD",
                "delegatedAccounts": [
                    {
                        "id": 64,
                        "version": 0,
                        "accountNo": "32662017"
                    }
                ],
                "delegatedBeneficiaries": [],
                "operators": [
                    {
                        "id": 129,
                        "person": {
                            "id": 149,
                            "version": 0,
                            "firstName": "Superman",
                            "lastName": "Doe",
                            "identificationType": "RSA_ID",
                            "identification": "8106012254188",
                            "cellphoneNumber": "0820000003",
                            "bpId": "bpId3"
                        },
                        "delegationId": 126,
                        "legalEntityId": 146,
                        "version": 0,
                        "active": true
                    }
                ]
            }
        ]
    };
    var entitlement = {
        "businessId": "146",
        "businessDelegationGroup": 60,
        "delegatedAccounts": [
            {
                "id": 64,
                "version": 0,
                "accountNo": "32662017"
            }
        ],
        "enabler": "5359502261135231",
        "enablerType": "CARD",
        "contextId": 1,
        "operators": [
            {
                "id": 176,
                "person": {
                    "id": 198,
                    "version": 0,
                    "firstName": "Jain",
                    "lastName": "Test",
                    "identificationType": "RSA_ID",
                    "identification": "8506278701196",
                    "cellphoneNumber": "27742249794",
                    "bpId": "531423117"
                },
                "delegationId": 164,
                "legalEntityId": 146,
                "version": 0,
                "active": true
            }
        ]
    };
    var response =
        [
            {
                "businessId": "70",
                "businessDelegationGroup": 44,
                "delegatedAccounts": "23423515125",
                "enabler": "4890611240433499",
                "enablerType": "CARD",
                "contextId": 1,
                "operators": [],
                "$$hashKey": "object:74"
            },
            {
                "businessId": "70",
                "businessDelegationGroup": 44,
                "delegatedAccounts": "2315125",
                "enabler": "4890611240433499",
                "enablerType": "CARD",
                "contextId": 1,
                "operators": [],
                "$$hashKey": "object:81"
            }
        ];
    var operators =
                 [
                    {
                        "id": 176,
                        "person": {
                            "id": 198,
                            "version": 0,
                            "firstName": "Jain",
                            "lastName": "Test",
                            "identificationType": "RSA_ID",
                            "identification": "8506278701196",
                            "cellphoneNumber": "27742249794",
                            "bpId": "531423117"
                        },
                        "delegationId": 164,
                        "legalEntityId": 146,
                        "version": 0,
                        "active": true
                    }
                ];

    var businessValue =
    {
        "id": 60,
        "version": 2,
        "enabler": "5359502261135231",
        "enablerType": "CARD",
        "delegatedAccounts": [
            {
                "id": 64,
                "version": 0,
                "accountNo": "32662017"
            }
        ],
        "delegatedBeneficiaries": [],
        "operators": [
            {
                "id": 129,
                "person": {
                    "id": 149,
                    "version": 0,
                    "firstName": "Superman",
                    "lastName": "Doe",
                    "identificationType": "RSA_ID",
                    "identification": "8106012254188",
                    "cellphoneNumber": "0820000003",
                    "bpId": "bpId3"
                },
                "delegationId": 126,
                "legalEntityId": 146,
                "version": 0,
                "active": true
            },
            {
                "id": 197,
                "person": {
                    "id": 223,
                    "version": 0,
                    "firstName": "Shaun",
                    "lastName": "Testing",
                    "identificationType": "RSA_ID",
                    "identification": "7801055920080",
                    "cellphoneNumber": "0721234567",
                    "bpId": "531423495"
                },
                "delegationId": 176,
                "legalEntityId": 146,
                "version": 0,
                "active": true
            }
        ],
        "contextId": 1
    };

    var createFilter;

    beforeEach(module('app.controllers.searchDashBoardEntitlements.listEntitlementsDetailsController'));

    beforeEach(inject(function ($q, $rootScope, $controller, $location, ManageDigitalIdService, _errorMessagesFactory_,
                                ApplicationCacheFactory, $filter) {
        scope = $rootScope.$new();
        manageDigitalIdService = ManageDigitalIdService;
        location = $location;
        errorMessageFactory = _errorMessagesFactory_;
        applicationCacheFactory = ApplicationCacheFactory;

        createFilter = function () {
            return $filter('maskedCardNumber');
        };

        billingAccountNumberDeferred = $q.defer();
        spyOn(manageDigitalIdService,
            'entitlement_business_businessId').and.returnValue(billingAccountNumberDeferred.promise);
        entitlementsDeferred = $q.defer();
        spyOn(manageDigitalIdService,
            'entitlement_businessId_delegationGroup').and.returnValue(entitlementsDeferred.promise);
        operatorsDeferred = $q.defer();
        spyOn(manageDigitalIdService,
            'entitlement_getOperatorsHistory_fromAccount').and.returnValue(operatorsDeferred.promise);

        createController = function () {
            return   $controller("ListEntitlementsDetailsController", {
                $scope: scope,
                ManageDigitalIdService: manageDigitalIdService,
                ApplicationCacheFactory: applicationCacheFactory,
                _errorMessagesFactory_: errorMessageFactory
            })
        };

    }));

    describe('initializing function ', function () {
        it('should find scope ', function () {
            expect(scope).toBeDefined();
            expect(scope.searching).toBeFalsy();
            expect(scope.searchResults).toBeUndefined();
        });
        it('should initialize scope data', function () {
            createController();
            applicationCacheFactory.put('searchedCardDetails', []);
            scope.init();
            expect(applicationCacheFactory.get('searchedCardDetails').length).toBeLessThan(1);
            expect(applicationCacheFactory.get('sedResponses')).toBeUndefined();
            expect(scope.searchTypes).toBeUndefined();
        });
        it('should initialize scope data', function () {
            createController();
            applicationCacheFactory.put('searchTypes', 'SED');
            applicationCacheFactory.put('searchedCardDetails', sedResponses);
            scope.init();
            expect(applicationCacheFactory.get('searchedCardDetails')).toBeDefined();
            expect(applicationCacheFactory.get('searchedCardDetails').length).toBeGreaterThan(0);
            scope.searchTypes = applicationCacheFactory.get('searchTypes');
            expect(scope.searchTypes).toBeDefined();
        });
        it('should call the view operator method', function () {
            createController();
            applicationCacheFactory.put('searchedCardDetails', sedResponses);
            var responseValue = applicationCacheFactory.get('searchedCardDetails');
            expect(responseValue).toBe(sedResponses);
            expect(responseValue.systemPrincipals).toBe(sedResponses.systemPrincipals);
        });
    });
    describe('Sort order ', function () {
        it('should sort the order according to the field specified', function () {
            createController();
            scope.predicate = 'userName';
            scope.reverse = false;
            expect(scope.sortOrder).toBeDefined();
            scope.sortOrder('userName');
            expect(scope.reverse).toBeTruthy();
            expect(scope.predicate).toEqual('userName');
        });

        it('should not sort fields not  specified', function () {
            createController();
            expect(scope.sortOrder).toBeDefined();
            scope.predicate = 'disabled';
            scope.reverse = true;
            scope.sortOrder('userName');
            expect(scope.reverse).toBe(false);
        });
    });

    describe('list delegated operators', function () {

        it('should reject call to list  delegated operators ', function () {
            createController();
            applicationCacheFactory.put('searchedCardDetails', sedResponses);
            applicationCacheFactory.put('searchedCardDetails', sedResponses);
            var responseValue = applicationCacheFactory.get('searchedCardDetails');
            scope.init();
            scope.listDelegatedOperators();
            expect(applicationCacheFactory.get('searchedCardDetails').length).toBeGreaterThan(0);
            expect(responseValue).toBeDefined();
            expect(scope.businessIdAndOperators).toBeDefined();
            expect(scope.myBusinessIdSubArray).toBeDefined();
            expect(scope.businessIdResults).toBeDefined();
            expect(scope.myBusinessIdSubArray).not.toEqual([{ businessId: '146', operatorId: '176' }]);
            expect(scope.getBusinessDelegationGroup).toBeDefined();
            scope.getBusinessDelegationGroup(scope.businessIdAndOperators);
            entitlementsDeferred.reject('error');
            scope.$apply();
            expect(scope.responseError).toBeDefined();
        });

        it('should reject call to list  delegated operators ', function () {
            createController();
            applicationCacheFactory.put('searchedCardDetails', sedResponses);
            applicationCacheFactory.put('searchedCardDetails', sedResponses);
            var responseValue = applicationCacheFactory.get('searchedCardDetails');
            scope.init();
            scope.listDelegatedOperators();
            scope.myBusinessIdSubArray = [{ businessId: '16', operatorId: '176' },
                {
                    "businessId": "148",
                    "operatorId": "170"
                }];
            scope.$apply();
            expect(applicationCacheFactory.get('searchedCardDetails').length).toBeGreaterThan(0);
            expect(responseValue).toBeDefined();
            expect(scope.entitlementResults).toBeDefined();
            expect(scope.businessIdAndOperators).toBeDefined();
            expect(scope.myBusinessIdSubArray).toBeDefined();
            expect(scope.businessIdResults).toBeDefined();
            expect(scope.myBusinessIdSubArray).toEqual(scope.myBusinessIdSubArray);
            scope.businessIdResults = [{ businessId: '16', operatorId: '176' }];
            expect(scope.businessIdResults).toEqual([{ businessId: '16', operatorId: '176' }]);
            expect(scope.businessIdResults[0].businessId).toEqual(scope.myBusinessIdSubArray[0].businessId);
        });

        it('should unpack the list of delegated operators ', function () {
            createController();
            applicationCacheFactory.put('searchedCardDetails', sedResponses);
            applicationCacheFactory.put('searchedCardDetails', sedResponses);
            var responseValue = applicationCacheFactory.get('searchedCardDetails');
            scope.init();
            scope.listDelegatedOperators();
            expect(applicationCacheFactory.get('searchedCardDetails').length).toBeGreaterThan(0);
            expect(responseValue).toBeDefined();
            expect(scope.entitlementResults).toBeDefined();
            expect(scope.businessIdAndOperators).toBeDefined();
            var value = sedResponses;
            expect(scope.getBusinessDelegationGroup).toBeDefined();
            scope.getBusinessDelegationGroup(scope.businessIdAndOperators);
            entitlementsDeferred.resolve(value);
            scope.$apply();
            expect(value).toBeDefined();
            expect(scope.responseError).toBeUndefined();
            expect(scope.handleBusinessDelegationGroupResponse).toBeDefined();
            scope.handleBusinessDelegationGroupResponse(values, 146);
            expect(scope.delegatedOperators).toBeDefined();
            expect(scope.getOperators).toBeDefined();
            scope.getOperators(businessValue, "129");
            operatorsDeferred.resolve(operators);
            expect(scope.getBillingAccountNumber).toBeDefined();
            expect(scope.setBusinessInfo).toBeDefined();
            scope.getBillingAccountNumber('123');
            expect(scope.businessAccInfo).toBeUndefined();
            billingAccountNumberDeferred.resolve(value);
            scope.$apply();
            expect(value).toBeDefined();
            expect(scope.responseError).toBeUndefined();
            entitlement.operators = undefined;
            scope.setBusinessInfo(entitlement);
            value = undefined;
            scope.$apply();
            expect(value).toBeUndefined();
            expect(scope.infoMessage).toBeDefined();
        });
        it('should reject the list of delegated operators ', function () {
            createController();
            applicationCacheFactory.put('searchedCardDetails', sedResponses);
            applicationCacheFactory.put('entitlementResults', sedResponses);
            var responseValue = applicationCacheFactory.get('searchedCardDetails');
            scope.init();
            scope.listDelegatedOperators();
            expect(applicationCacheFactory.get('entitlementResults').length).toBeGreaterThan(0);
            expect(responseValue).toBeDefined();
            expect(scope.entitlementResults).toBeDefined();
            expect(scope.businessIdAndOperators).toBeDefined();
            var value = sedResponses;
            expect(scope.getBusinessDelegationGroup).toBeDefined();
            scope.getBusinessDelegationGroup(scope.businessIdAndOperators);
            entitlementsDeferred.resolve(value);
            scope.$apply();
            expect(value).toBeDefined();
            expect(scope.responseError).toBeUndefined();
            expect(scope.handleBusinessDelegationGroupResponse).toBeDefined();
            scope.handleBusinessDelegationGroupResponse(values, 146);
            expect(scope.delegatedOperators).toBeDefined();
            expect(scope.getOperators).toBeDefined();
            scope.getOperators(businessValue, "129");
            operatorsDeferred.reject("errorMessage");
            scope.$apply();
            expect(scope.responseError).toBeDefined();
        });
    });

    describe('view operators full details', function () {
        it('should list the delegated operators details ', function () {
            createController();
            var account = '23423515125';
            var card = '4890611240433499';
            scope.viewOperatorsDetails(account, card);
            expect(scope.viewOperatorsDetails).toBeDefined();
            expect(scope.setSelectedAccountDetails).toBeDefined();
            expect(scope.entitlementDetailResults).toBeUndefined();
            scope.entitlementDetailResults = response;
            expect(scope.entitlementDetailResults).toBeDefined();
            scope.setSelectedAccountDetails(account, card);
            expect(scope.entitlementDetailResults[0].enabler).toBe(card);
        });
        it('should not list the delegated operators details when no match found ', function () {
            createController();
            var selectedAccount = '3266a201714';
            var cardNumber = '5359502261135231';
            scope.viewOperatorsDetails(selectedAccount, cardNumber);
            expect(scope.viewOperatorsDetails).toBeDefined();
            expect(scope.setSelectedAccountDetails).toBeDefined();
            scope.entitlementDetailResults = response;
            expect(scope.entitlementDetailResults).toBeDefined();
            scope.setSelectedAccountDetails(selectedAccount, cardNumber);
            selectedAccount = '32662017';
            cardNumber = '5359502q261135231';
            scope.viewOperatorsDetails(selectedAccount, cardNumber);
            expect(scope.viewOperatorsDetails).toBeDefined();
            expect(scope.setSelectedAccountDetails).toBeDefined();
            scope.entitlementDetailResults = response;
            expect(scope.entitlementDetailResults).toBeDefined();
            scope.setSelectedAccountDetails(selectedAccount, cardNumber);

        });
    });

});




