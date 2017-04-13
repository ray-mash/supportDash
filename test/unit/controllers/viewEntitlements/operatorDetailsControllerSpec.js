/*global angular */

'use strict';

describe("Unit : OperatorDetailsController", function () {

    var scope, manageDigitalIdService, modalServiceMock, roleDeferred, $httpBackend, createController, errorMessageFactory, applicationCacheFactory, operatorDeferred, operatorDigitalIdDeferred;
    var operatorId = 475;
    var createFilter;

    var roleDesc = {
        "id": 1,
        "version": 0,
        "name": "view",
        "description": "View Only - can view all transactions on the entity. This role would typically be assigned to the accountant or the auditor.",
        "contextId": 1,
        "permissions": [
            {
                "contextId": 1,
                "id": 8,
                "action": "View",
                "activity": "Transact-tab",
                "version": 0
            }
        ]
    };

    var selectedOperator =
    {
        "id": 1,
        "enabler": "503615929417605011",
        "operators": [
            {
                "operatorCurrentDetail": {
                    "id": 475,
                    "person": {
                        "id": 487,
                        "version": 0,
                        "firstName": "Louise",
                        "lastName": "Existing",
                        "identificationType": "RSA_ID",
                        "identification": "5804010044089",
                        "cellphoneNumber": "0742249794",
                        "bpId": "530647769"
                    },
                    "delegationId": 459,
                    "legalEntityId": 462,
                    "version": 2,
                    "active": true
                },
                "operatorHistory": [
                    {
                        "action": "ADD",
                        "dateTimeStamp": "2016-07-09T12:15:37.721+0000",
                        "operator": {
                            "id": 475,
                            "person": {
                                "id": 487,
                                "version": null,
                                "firstName": "Louise",
                                "lastName": "Existing",
                                "identificationType": "RSA_ID",
                                "identification": "5804010044089",
                                "cellphoneNumber": "0742249794",
                                "bpId": "530647769"
                            },
                            "delegationId": 459,
                            "legalEntityId": 462,
                            "version": 0,
                            "active": true
                        }
                    },
                    {
                        "action": "MOD",
                        "dateTimeStamp": "2016-07-11T09:18:36.048+0000",
                        "operator": {
                            "id": null,
                            "person": null,
                            "delegationId": null,
                            "legalEntityId": null,
                            "version": 1,
                            "active": false
                        }
                    },
                    {
                        "action": "MOD",
                        "dateTimeStamp": "2016-07-11T09:22:37.307+0000",
                        "operator": {
                            "id": null,
                            "person": null,
                            "delegationId": null,
                            "legalEntityId": null,
                            "version": 2,
                            "active": true
                        }
                    }
                ]
            }
        ]
    };

    var role = {
        "id": 65,
        "version": 0,
        "cardHolder": false,
        "roleAssignments": [
            {
                "id": 61,
                "version": 0,
                "delegatedAccounts": [
                    {
                        "id": 1,
                        "version": 0,
                        "accountNo": "282978593"
                    }
                ],
                "roleId": 1,
                "active": true
            }
        ]
    };

    var operatorDetails =
        {
            "content":
 [
            {
                "id": 498111,
                "version": null,
                "userName": "testoperator20@sb.co.za",
                "diType": "EMAIL",
                "credential": {
                    "type": "PASSWORD"
                },
                "channelIndicator": "IBR",
                "authenticationAttempts": 0,
                "activated": true,
                "lastLoggedIn": "2016-05-09T07:51:25.797+0000",
                "registrationDate": "2016-05-09T07:23:50.023+0000",
                "systemPrincipals": [
                    {
                        "type": "SED",
                        "version": null,
                        "id": 337430,
                        "profileStyleType": "PERSONAL",
                        "channelProfileId": 625447,
                        "territory": "SBSA",
                        "revalidate": true,
                        "businessId": "241",
                        "operatorId": "150"
                    }
                ],
                "preferredName": null,
                "disabled": false
            }
        ]};
    beforeEach(module('app.controllers.operatorDetailsController'));

    beforeEach(inject(function ($q, $rootScope, $controller, _$httpBackend_, ManageDigitalIdService,
                                _errorMessagesFactory_, ApplicationCacheFactory, $filter) {
        scope = $rootScope.$new();
        manageDigitalIdService = ManageDigitalIdService;
        errorMessageFactory = _errorMessagesFactory_;
        $httpBackend = _$httpBackend_;
        applicationCacheFactory = ApplicationCacheFactory;

        createFilter = function () {
            return $filter('maskedCardNumber');
        };

        // fake promise
        var modalResult = {
            then: function (callback) {
                callback("spiderman"); // passing fake value as result
            }
        };

        // set up fake methods
        spyOn(modalServiceMock, "open")
            .and
            .returnValue({ result: modalResult });

        operatorDeferred = $q.defer();
        spyOn(manageDigitalIdService,
            'entitlement_getRoleIdForSpecifiedOperators').and.returnValue(operatorDeferred.promise);

        roleDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'entitlement_getOperatorRoleDesc').and.returnValue(roleDeferred.promise);

        operatorDigitalIdDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'listDigitalIds').and.returnValue(operatorDigitalIdDeferred.promise);

        createController = function () {
            return   $controller("OperatorDetailsController", {
                $scope: scope,
                ManageDigitalIdService: manageDigitalIdService,
                ApplicationCacheFactory: applicationCacheFactory,
                $modal: modalServiceMock,
                _errorMessagesFactory_: errorMessageFactory
            })
        };

    }));
    describe('initializing function ', function () {
        it('should find scope ', function () {
            applicationCacheFactory.put('selectedDigitalId', 'ray@entitlements.com');
            scope.digitalId = applicationCacheFactory.get('selectedDigitalId');
            expect(scope).toBeDefined();
            expect(scope.digitalId).toBeDefined();
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
    describe("open roles Details modal", function () {
        modalServiceMock = {
            open: function (options) {
            }
        };

        it("should open modal to role details", function () {
            createController();
            scope.openModalForOperator(150);
            expect(modalServiceMock.open).toHaveBeenCalled();
        });
    });
    describe('list operator in an account', function () {
        it('should not process when the service return error', function () {
            createController();
            applicationCacheFactory.put('selectedAccountOperators', selectedOperator);
            scope.selectedAccountOperators = applicationCacheFactory.get('selectedAccountOperators');

            var role = undefined;
            scope.selectedOperator = scope.selectedAccountOperators.operators[0];
            scope.viewOperatorsRoles(operatorId);
            expect(scope.selectedAccountOperators).toBeDefined();
            expect(scope.selectedAccountOperators.operators).toBeDefined();
            expect(scope.selectedOperator.operatorCurrentDetail.delegationId).toBe(459);
            expect(scope.retrieveRoleIdForOperator).toBeDefined();
            scope.retrieveRoleIdForOperator();
            operatorDeferred.resolve(role);
            scope.$apply();

        });

        it('should list operator details for a selected account', function () {
            createController();
            applicationCacheFactory.put('selectedAccountOperators', selectedOperator);
            scope.selectedAccountOperators = applicationCacheFactory.get('selectedAccountOperators');
            scope.selectedOperator = scope.selectedAccountOperators.operators[0];
            scope.viewOperatorsRoles(operatorId);
            expect(scope.selectedAccountOperators).toBeDefined();
            expect(scope.selectedAccountOperators.operators).toBeDefined();
            expect(scope.selectedOperator.operatorCurrentDetail.delegationId).toBe(459);
            expect(scope.retrieveRoleIdForOperator).toBeDefined();
            scope.retrieveRoleIdForOperator();
            operatorDeferred.resolve(role);
            scope.$apply();
            scope.handleRoleIdResponse(role);
            roleDeferred.resolve(roleDesc);
            scope.$apply();

        });

        it('should list operator details for a selected account', function () {
            createController();
            applicationCacheFactory.put('selectedAccountOperators', selectedOperator);
            scope.selectedAccountOperators = applicationCacheFactory.get('selectedAccountOperators');
            var value = undefined;
            scope.selectedOperator = scope.selectedAccountOperators.operators[0];
            scope.viewOperatorsRoles(operatorId);
            expect(scope.selectedAccountOperators).toBeDefined();
            expect(scope.selectedAccountOperators.operators[0].operatorCurrentDetail.id).toBe(475);
            expect(scope.selectedOperator.operatorCurrentDetail.delegationId).toBe(459);
            expect(scope.selectedOperator).toBeDefined();
            expect(scope.retrieveRoleIdForOperator).toBeDefined();
            scope.retrieveRoleIdForOperator();
            operatorDeferred.resolve(role);
            scope.$apply();
            scope.handleRoleIdResponse(role);
            roleDeferred.resolve(undefined);
            expect(value).toBeUndefined();
        });
        it('should not list operator details for a selected account if operator id not found', function () {
            createController();
            applicationCacheFactory.put('selectedAccountOperators', selectedOperator);
            scope.selectedAccountOperators = applicationCacheFactory.get('selectedAccountOperators');
            var value = undefined;
            var localOperatorId = 56;
            scope.selectedOperator = scope.selectedAccountOperators.operators[0];
            scope.viewOperatorsRoles(localOperatorId);
            expect(scope.selectedAccountOperators).toBeDefined();
            expect(scope.selectedAccountOperators.operators[0].operatorCurrentDetail.id).not.toBe(localOperatorId);
            scope.viewOperatorsRoles(operatorId);
            expect(scope.selectedAccountOperators.operators[0].operatorCurrentDetail.id).toBe(operatorId);
            expect(scope.selectedOperator.operatorCurrentDetail.delegationId).toBe(459);
            expect(scope.selectedOperator).toBeDefined();
            expect(scope.retrieveRoleIdForOperator).toBeDefined();
            scope.retrieveRoleIdForOperator();
            operatorDeferred.resolve(role);
            scope.$apply();
            scope.handleRoleIdResponse(role);
            roleDeferred.resolve(undefined);
            expect(value).toBeUndefined();
        });


        it('should get operator digital Id', function (){
            createController();
            applicationCacheFactory.put('selectedAccountOperators', selectedOperator);
            scope.selectedAccountOperators = applicationCacheFactory.get('selectedAccountOperators');
            scope.selectedOperator = scope.selectedAccountOperators.operators[0];
            scope.viewOperatorsRoles(operatorId);
            expect(scope.selectedAccountOperators).toBeDefined();
            expect(scope.selectedAccountOperators.operators).toBeDefined();
            expect(scope.selectedOperator.operatorCurrentDetail.delegationId).toBe(459);
            expect(scope.retrieveRoleIdForOperator).toBeDefined();
            scope.retrieveDigitalIdForOperator();
            operatorDigitalIdDeferred.resolve(operatorDetails);
            scope.$apply();
        });

        it('should reject call to get operator digitalId', function () {
            createController();
            applicationCacheFactory.put('selectedAccountOperators', selectedOperator);
            scope.selectedAccountOperators = applicationCacheFactory.get('selectedAccountOperators');
            scope.selectedOperator = scope.selectedAccountOperators.operators[0];
            scope.viewOperatorsRoles(operatorId);
            expect(scope.selectedAccountOperators).toBeDefined();
            expect(scope.selectedAccountOperators.operators).toBeDefined();
            expect(scope.selectedOperator.operatorCurrentDetail.delegationId).toBe(459);
            expect(scope.retrieveRoleIdForOperator).toBeDefined();
            scope.retrieveDigitalIdForOperator();
            operatorDigitalIdDeferred.reject(operatorDetails);
            scope.$apply();
        });
        it('should reject a call to list role description and name', function () {
            createController();
            applicationCacheFactory.put('selectedAccountOperators', selectedOperator);
            scope.selectedAccountOperators = applicationCacheFactory.get('selectedAccountOperators');
            scope.selectedOperator = scope.selectedAccountOperators.operators[0];
            scope.viewOperatorsRoles(operatorId);
            expect(scope.selectedAccountOperators).toBeDefined();
            expect(scope.selectedAccountOperators.operators).toBeDefined();
            expect(scope.selectedOperator.operatorCurrentDetail.delegationId).toBe(459);
            expect(scope.retrieveRoleIdForOperator).toBeDefined();
            scope.retrieveRoleIdForOperator();
            operatorDeferred.resolve(role);
            scope.$apply();
            scope.handleRoleIdResponse(role);
            roleDeferred.reject(roleDesc);
            scope.$apply();
            expect(scope.responseError).toBeDefined();
        });


        it('should reject a call to list operator details for a selected account', function () {
            createController();
            applicationCacheFactory.put('selectedAccountOperators', selectedOperator);
            scope.selectedAccountOperators = applicationCacheFactory.get('selectedAccountOperators');
            scope.selectedOperator = scope.selectedAccountOperators.operators[0];
            expect(scope.selectedAccountOperators).toBeDefined();
            scope.viewOperatorsRoles(operatorId);
            expect(scope.selectedAccountOperators.operators).toBeDefined();
            expect(scope.selectedOperator.operatorCurrentDetail.delegationId).toBe(459);
            expect(scope.retrieveRoleIdForOperator).toBeDefined();
            scope.retrieveRoleIdForOperator();
            operatorDeferred.reject('error');
            scope.$apply();
            expect(scope.responseError).toBeDefined();
        });
    });

    describe('initializing function ', function () {
        it('should find scope ', function () {
            expect(scope).toBeDefined();
            expect(scope.selectedAccountOperators).toBeUndefined();
        });

        it('init Method should check for previous search results', function () {
            createController();
            applicationCacheFactory.put('selectedAccountOperators', selectedOperator);
            scope.selectedAccountOperators = applicationCacheFactory.get('selectedAccountOperators');
            scope.currentPage = 1;
            scope.maxSize = scope.numPerPage = 10;
            scope.begin = 0;
            scope.init();
            expect(applicationCacheFactory.get('selectedAccountOperators')).toBeDefined();
            expect(scope.maxSize).toBeDefined();
            expect(scope.selectedAccountOperators).toEqual(selectedOperator);
        });
    });

});




