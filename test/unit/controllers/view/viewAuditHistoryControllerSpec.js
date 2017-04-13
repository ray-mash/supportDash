/*global angular */

'use strict';

describe("Unit : ViewAuditHistoryController", function () {
    var scope, manageDigitalIdService, auditHistoryDeferred, location, createController, errorMessageFactory, applicationCacheFactory,
        modalServiceMock, auditTrailDeferred;

    var digitalIDDetails = [
        {
            id: 11163,
            version: null,
            userName: 'bob@thebuilder.com',
            channelIndicator: 'CHANNEL',
            authenticationAttempts: 3,
            activated: true,
            lastLoggedIn: null,
            registrationDate: "2014-09-04T11:52:54.800+0000",
            systemPrincipals: [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 8455,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988774455667788"
                }
            ]
        }
    ];

    var auditHistory = [
        {
            "id": 4330,
            "userName": "tiko@sowumdal.edu",
            "credential": {
                "type": "PASSWORD"
            },
            "channelIndicator": null,
            "passwordTryCount": 0,
            "activated": true,
            "lastLoggedIn": null,
            "registrationDate": "2014-09-04T11:52:54.800+0000",
            "preferredName": null,
            "disabled": false,
            "revision": {
                "revisionNo": 4330,
                "revisionDate": "2016-06-09T12:43:13.853+0000",
                "revisionType": "MOD",
                "userId": "sbicza01\\a181660",
                "session": null,
                "sourceAddr": "10.145.25.24",
                "sourceHost": "10.145.25.24"
            }
        }
    ];

    beforeEach(module('app.controllers.viewAuditHistoryController'));

    beforeEach(inject(function ($q, $rootScope, $controller, $location, ManageDigitalIdService, _errorMessagesFactory_,
                                ApplicationCacheFactory) {
        scope = $rootScope.$new();
        manageDigitalIdService = ManageDigitalIdService;
        errorMessageFactory = _errorMessagesFactory_;
        location = $location;
        applicationCacheFactory = ApplicationCacheFactory;

        auditHistoryDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'history').and.returnValue(auditHistoryDeferred.promise);

        auditTrailDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'listDigitalIds').and.returnValue(auditTrailDeferred.promise);

        createController = function () {
            return   $controller("ViewAuditHistoryController", {
                $scope: scope,
                ManageDigitalIdService: manageDigitalIdService,
                ApplicationCacheFactory: applicationCacheFactory,
                _errorMessagesFactory_: errorMessageFactory,
                $modal: modalServiceMock
            })
        };

    }));

    describe('initializing function ', function () {
        it('should find scope ', function () {
            createController();
            var auditLogs = 'auditLogs';
            expect(scope).toBeDefined();
            applicationCacheFactory.put('auditLogs', auditLogs);
            expect(scope.init).toBeDefined();
            scope.init();
            scope.auditLogs = applicationCacheFactory.get('auditLogs');
            expect(scope.auditLogs).toBeDefined();
            var audit = undefined;
            applicationCacheFactory.removeAll();
            applicationCacheFactory.put('auditLog', audit);
            expect(scope.init).toBeDefined();
            scope.init();
            scope.auditLogs = applicationCacheFactory.get('auditLog');
            expect(scope.auditLogs).toBeUndefined();

        });

        it('init Method should check for previous search results', function () {
            createController();
            applicationCacheFactory.put('historyResults', digitalIDDetails);
            scope.historyResults = applicationCacheFactory.get('historyResults');
            applicationCacheFactory.put('auditLogs', auditHistory);
            scope.auditLogs = applicationCacheFactory.get('auditLogs');
            scope.searching = false;
            scope.currentPage = 1;
            scope.itemsPerPage = 10;
            scope.maxSize = scope.numPerPage = 10;
            scope.init();
            expect(applicationCacheFactory.get('historyResults')).toBeDefined();
            expect(scope.maxSize).toBeDefined();
            expect(scope.historyResults).toEqual(digitalIDDetails);
            applicationCacheFactory.put('historyResults', digitalIDDetails);
        });
    });

    describe("should get audit history", function () {
        it("should call history service", function () {
            createController();
            scope.searchAuditLog();
            auditHistoryDeferred.resolve(auditHistory);
            scope.$apply();
            expect(scope.responseError).toBeUndefined();
        });

        it("should reject call to get audit history", function () {
            createController();
            scope.searchAuditLog();
            auditHistoryDeferred.reject('error message');
            scope.$apply();
            expect(scope.responseError).toBe('error message');
            expect(scope.errorMessage).toBe(errorMessageFactory.error502);
            expect(scope.response).toBeUndefined();
        });
    });

    describe("view audit history", function () {
        it("should set searching history to true", function () {
            createController();
            scope.searchIdForHistory();
            scope.$apply();
            expect(location.path()).toBe('');
        });
        it("should get id number for digitalId", function () {
            createController();
            scope.searchIdForHistory();
            auditTrailDeferred.resolve(digitalIDDetails);
            scope.$apply();
            expect(location.path()).toBe('');
            expect(scope.responseError).toBeUndefined();
        });
        it("should reject call to list searched digital id", function () {
            createController();
            scope.searchIdForHistory();
            auditTrailDeferred.reject('error message');
            scope.$apply();
            expect(scope.responseError).toBe('error message');
            expect(scope.errorMessage).toBe(errorMessageFactory.error502);
            expect(scope.response).toBeUndefined();
        });

    });


});