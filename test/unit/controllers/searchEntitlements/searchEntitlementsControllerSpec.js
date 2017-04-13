/*global angular */

'use strict';

describe("Unit : SearchEntitlementsController", function () {

    var scope, manageDigitalIdService, location, $httpBackend, principalTypeDeferred, createController, errorMessageFactory, applicationCacheFactory;
    var value = {
        "numberOfElements" : 1,
        "data": {
            "content": [
                {
                    "id": 479520,
                    "version": null,
                    "userName": "perfsit2ibr583@sb.co.za",
                    "channelIndicator": "IBR",
                    "systemPrincipals": [
                        {
                            "type": "BANKING",
                            "version": null,
                            "id": 320557,
                            "profileStyleType": "PERSONAL",
                            "channelProfileId": 602749,
                            "territory": "SBSA",
                            "revalidate": false,
                            "cardNo": "4890611240433499"
                        },
                        {
                            "type": "SED",
                            "version": null,
                            "id": 332779,
                            "profileStyleType": "PERSONAL",
                            "channelProfileId": 605007,
                            "territory": "SBSA",
                            "revalidate": false,
                            "businessId": "170",
                            "operatorId": "150"
                        }
                    ],
                    "preferredName": null,
                    "disabled": false
                }
            ]
        },
        "status": 200,
        "statusText": "OK"
    };
    var entitlementResults =
    {
        "businessDelegationGroup": [
            {
                "id": 1,
                "version": 0,
                "enabler": "503615929417605011",
                "enablerType": "CARD",
                "delegatedAccounts": [
                    {
                        "id": 1,
                        "version": 0,
                        "accountNo": "282978593"
                    }
                ],
                "operators": [
                    {
                        "id": 64,
                        "person": {
                            "id": 68,
                            "version": 0,
                            "firstName": "Black",
                            "lastName": "White",
                            "identificationType": "RSA_ID",
                            "identification": "8006249393082",
                            "cellphoneNumber": "27728740961",
                            "bpId": "510029330"
                        },
                        "delegationId": 44,
                        "legalEntityId": 6,
                        "version": 0,
                        "active": false
                    }
                ],
                "contextId": 1
            }
        ]
    };

    beforeEach(module('app.controllers.searchDashBoardEntitlements.searchEntitlementsController'));

    beforeEach(inject(function ($q, $rootScope, $controller, ManageDigitalIdService, $location,_errorMessagesFactory_,
                                ApplicationCacheFactory, _$httpBackend_) {
        scope = $rootScope.$new();
        manageDigitalIdService = ManageDigitalIdService;
        $httpBackend = _$httpBackend_;
        location = $location;
        errorMessageFactory = _errorMessagesFactory_;
        applicationCacheFactory = ApplicationCacheFactory;

        principalTypeDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'listDigitalIds').and.returnValue(principalTypeDeferred.promise);
//        spyOn(manageDigitalIdService, 'entitlement_businessId_delegationGroups').and.returnValue(principalTypeDeferred.promise);

        createController = function () {
            return   $controller("SearchEntitlementsController", {
                $scope: scope,
                ManageDigitalIdService: manageDigitalIdService,
                ApplicationCacheFactory: applicationCacheFactory,
                _errorMessagesFactory_: errorMessageFactory
            })
        };
    }));

    describe('initializing function ', function () {
        it('should initialize the scope ', function () {
            createController();
            scope.searchResults = applicationCacheFactory.get('searchResults');
            scope.searching = false;
            scope.currentPage = 1;
            scope.maxSize = scope.numPerPage = 10;
            scope.init();
            expect(applicationCacheFactory.get('searchResults')).toBeUndefined();
            expect(scope.infoMessage).toBeUndefined();
            applicationCacheFactory.put('entitlementResults', entitlementResults);

        });

        it('should initialize the scope with searchResults defined ', function () {
            createController();
            applicationCacheFactory.put('searchResults', value);
            scope.searchResults = applicationCacheFactory.get('searchResults');
            scope.searching = false;
            scope.currentPage = 1;
            scope.maxSize = scope.numPerPage = 10;
            scope.init();
            expect(applicationCacheFactory.get('searchResults')).toBeDefined();
            expect(scope.infoMessage).toBeDefined();
            applicationCacheFactory.put('entitlementResults', entitlementResults);

        });
    });

    describe('list searched digital id with SED', function () {
        it("should list the digital id that has principal type of SED with status of 200", function () {
            createController();
            applicationCacheFactory.put('searchType', 'SED');
            var searchType = applicationCacheFactory.get('searchType');
            scope.searchForEntitlements(searchType);
            principalTypeDeferred.resolve(value);
            scope.$apply();
            expect(value.numberOfElements).toEqual(1);
            expect(scope.searching).toBeTruthy();
            expect(scope.responseError).toBeUndefined();
        });
        it("should try get digital id that has principal type of SED synchronously", function () {
            createController();
            applicationCacheFactory.put('searchType', 'SED');
            var searchType = applicationCacheFactory.get('searchType');
            scope.searchForEntitlements(searchType);
            value.numberOfElements = 0;
            principalTypeDeferred.resolve(value);
            scope.$apply();
            expect(value.numberOfElements).not.toEqual(1);
            expect(scope.infoMessage).toBeDefined();
            expect(scope.infoMessage).toEqual("No results found");
            expect(scope.responseError).toBeUndefined();
        });
        it("should call service and reject the is communication error", function () {
            createController();
            applicationCacheFactory.put('searchType', 'SED');
            var searchType = applicationCacheFactory.get('searchType');
            scope.searchForEntitlements(searchType);
            principalTypeDeferred.reject(value);
            scope.$apply();
            expect(scope.responseError).toBeDefined();
        });
    });

    describe('view selected card details ', function () {
        it('should view details of a selected card ', function (){
            scope.sedResponse = [{userName:'bova'},{userName:'myDog'}];
            createController();
            scope.viewSelectedDigitalIdDetails('bova');
            applicationCacheFactory.put('selectedDigitalId', 'bova');
            expect(scope.sedResponse).toBeDefined();
            expect(scope.viewSelectedDigitalIdDetails).toBeDefined();
            expect(location.path()).toBe('/listEntitlementsDetails');


        });
    });
});


