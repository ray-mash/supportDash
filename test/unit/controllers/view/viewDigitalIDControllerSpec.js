/*global angular */

'use strict';

describe("Unit : ViewDigitalIDController", function () {

    var scope, modalServiceMock, ViewDigitalIDController, manageDigitalIdService, viewDigitalIdsForCardDeferred, createViewDigitalIDController, viewDevicesDeferred,
        errorMessageFactory, applicationCacheFactory, filter, viewSystemPrincipalDeferred, url,location,
        $httpBackend, updateDigitalIdDeferred;

    var userDetails =
    {
        "id": 3214,
        "version": null,
        "userName": "cardlinking3@sit1.com",
        "credential": {
            "type": "PASSWORD",
            "password": "8A6DBEC10D43726EECDDF1C3B4AD16B7E63D532D",
            "salt": "AD583A6DBF710B85"
        },
        "channelIndicator": null,
        "authenticationAttempts": 0,
        "activated": true,
        "lastLoggedIn": "2015-04-21T09:11:40.955+0000",
        "registrationDate": "2015-04-01T09:06:05.200+0000",
        "$$hashKey": "object:44",
        "disabled": true,
        "systemPrincipals": [
            {
                "type": "BANKING",
                "version": null,
                "id": 2106,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 3735,
                "cardNo": "5221266361171019"
            }
        ]
    };

    var digitalIDDetailsArray = [
        {
            id: 229,
            version: null,
            userName: 'cardtest1@sit1.com',
            credential: {
                type: 'PASSWORD',
                password: 'C42369960882FB036AF664F69A7303CFE701B4E3',
                salt: 'C58637197C907166'
            },
            channelIndicator: null,
            authenticationAttempts: 0,
            activated: true,
            lastLoggedIn: '2015-03-03T15:13:15.386+0000',
            registrationDate: '2015-03-03T15:13:14.837+0000',
            disabled: true,
            systemPrincipals: []
        }
    ];

    var value = {
        "content": [
            {
                "id": 5025,
                "version": null,
                "deviceRegistrationStatus": "REGISTERED",
                "deviceType": "PHONE",
                "name": "iPhone Simulator",
                "operatingSystem": "IOS",
                "osVersion": "IOS",
                "uniqueIndentifier": "F5BAA737-8E82-48DE-BA5B-277792C425F7",
                "lastLoggedIn": "2015-04-09T14:28:26.178+0000",
                "rooted": false
            },
            {
                "id": 4078,
                "version": null,
                "deviceRegistrationStatus": "REGISTERED",
                "deviceType": "PHONE",
                "name": "iPhone Simulator",
                "operatingSystem": "IOS",
                "osVersion": "IOS",
                "uniqueIndentifier": "91BB6F5E-AF29-4FA1-BBF9-D3633E0C6278",
                "lastLoggedIn": "2015-04-07T16:02:19.667+0000",
                "rooted": false
            }
        ]
    };
    var devicesDetails = {

                "id": 4078,
                "version": null,
                "deviceRegistrationStatus": "REGISTERED",
                "deviceType": "PHONE",
                "name": "iPhone Simulator",
                "operatingSystem": "IOS",
                "osVersion": "IOS",
                "uniqueIndentifier": "91BB6F5E-AF29-4FA1-BBF9-D3633E0C6278",
                "lastLoggedIn": "2015-04-07T16:02:19.667+0000",
                "rooted": false
    };

    var digitalIDid = 229;

    var createFilter;

    beforeEach(module('app.controllers.viewDigitalIDController'));

    beforeEach(function () {

        inject(function ($q, $window,$rootScope, $controller, ManageDigitalIdService, _errorMessagesFactory_,
                         ApplicationCacheFactory, $filter, _$httpBackend_, _URL_, $location) {
            scope = $rootScope.$new();

            manageDigitalIdService = ManageDigitalIdService;
            location = $location;
            url = _URL_;
            $httpBackend = _$httpBackend_;
            errorMessageFactory = _errorMessagesFactory_;
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

            viewSystemPrincipalDeferred = $q.defer();
            spyOn(manageDigitalIdService, 'listDigitalIds').and.returnValue(viewSystemPrincipalDeferred.promise);

            viewDevicesDeferred = $q.defer();
            spyOn(manageDigitalIdService, 'viewDevicesByDigitalID').and.returnValue(viewDevicesDeferred.promise);

            viewDigitalIdsForCardDeferred = $q.defer();
            spyOn(manageDigitalIdService,
                'viewDigitalIDsLinkedToCard').and.returnValue(viewDigitalIdsForCardDeferred.promise);

            updateDigitalIdDeferred = $q.defer();
            spyOn(manageDigitalIdService,
                'updateDigitalIdStatus').and.returnValue(updateDigitalIdDeferred.promise);

            createViewDigitalIDController = function () {
                ViewDigitalIDController = $controller('ViewDigitalIDController', {
                    $scope: scope,
                    ManageDigitalIdService: manageDigitalIdService,
                    _errorMessagesFactory_: errorMessageFactory,
                    _$httpBackend_: $httpBackend,
                    _URL_: url,
                    $modal: modalServiceMock
                });
            };
        })
    });

    describe('initialize scope', function () {
        it('session data should exist', function () {
            createViewDigitalIDController();
            scope.init();
            expect(scope.editingDeviceDetails).toBeFalsy();
            applicationCacheFactory.put('digitalIdNumber', scope.userDetails);
            applicationCacheFactory.put('searchedCardDetails', userDetails.userName);
            applicationCacheFactory.put('digitalIdStatus', userDetails.activated);
        });
    });

    describe('Update digital status', function () {
        modalServiceMock = {
            open: function (options) {
            }
        };
        var id = 229;

        it('should call the confirmation modal for status update with a deactivate status', function () {
            createViewDigitalIDController();
            scope.confirmationModal(false);
            expect(modalServiceMock.open).toHaveBeenCalled();
        });

        it('should call the confirmation modal for status update with an Active status', function () {
            createViewDigitalIDController();
            scope.confirmationModal(true);
            expect(modalServiceMock.open).toHaveBeenCalled();
        });

        it('should update the digital id active status to true or false', function () {
            createViewDigitalIDController();
            applicationCacheFactory.put('searchResults',digitalIDDetailsArray);
            scope.digitalIdStatusUpdate();
            updateDigitalIdDeferred.resolve(userDetails);
            scope.activatedAction = true;
            scope.$apply();
            expect(scope.digitalIdStatusUpdate).toBeDefined();
            expect(manageDigitalIdService.updateDigitalIdStatus).toHaveBeenCalled();
            expect(scope.handleStatusUpdateResponse).toBeDefined();
            scope.handleStatusUpdateResponse(digitalIDDetailsArray);
            expect(scope.updateStatusOnCache).toBeDefined();
            scope.updateStatusOnCache(id);
            scope.searchResults = applicationCacheFactory.get('searchResults');
            expect(scope.searchResults).toBeDefined();
            angular.forEach(scope.searchResults, function (result) {
                expect(id).toEqual(result.id);
                expect(result.activated).toEqual(scope.activatedAction);
            });
        });

        it('should update the digital id disable status to true or false', function () {
            createViewDigitalIDController();
            applicationCacheFactory.put('searchResults',digitalIDDetailsArray);
            scope.digitalIdStatusUpdate();
            updateDigitalIdDeferred.resolve(userDetails);
            scope.disabledAction = true;
            scope.$apply();
            expect(scope.digitalIdStatusUpdate).toBeDefined();
            expect(manageDigitalIdService.updateDigitalIdStatus).toHaveBeenCalled();
            expect(scope.handleStatusUpdateResponse).toBeDefined();
            scope.handleStatusUpdateResponse(digitalIDDetailsArray);
            expect(scope.updateStatusOnCache).toBeDefined();
            scope.updateStatusOnCache(id);
            scope.searchResults = applicationCacheFactory.get('searchResults');
            expect(scope.searchResults).toBeDefined();
            angular.forEach(scope.searchResults, function (result) {
                expect(id).toEqual(result.id);
                expect(result.disabled).toEqual(scope.disabledAction);
            });
        });

        it('should reject the call to update the digital id status', function () {
            createViewDigitalIDController();
            scope.digitalIdStatusUpdate();
            updateDigitalIdDeferred.reject('error');
            scope.$apply();
            expect(scope.handleStatusUpdateError).toBeDefined();
            scope.handleStatusUpdateError('error');
            expect(scope.responseError).toBeDefined();
            expect(scope.responseError).toBe('error');

        });
    });

    describe("view system principals", function () {
        it("should retrieve digital id linked to a card resolve a promise", function () {
            createViewDigitalIDController();
            var populateDigitalIDsLinkedToCard = true;
            scope.$apply();
            viewSystemPrincipalDeferred.resolve(userDetails);
            expect(scope.responseError).toBe(undefined);
            expect(populateDigitalIDsLinkedToCard).toBeTruthy();

        });

        // it("should reject the call to list system principals", function () {
        //     createViewDigitalIDController();
        //     viewSystemPrincipalDeferred.reject('error message');
        //     scope.$apply();
        //     expect(scope.responseError).toBeUndefined();
        //     expect(scope.response).toBeUndefined();
        //
        // });

        it('should store systemPrincipals details as undefined if no systemPrincipals exist', function () {
            createViewDigitalIDController();
            userDetails = [];
            expect(scope.userSystemPrincipals).toBeUndefined();
        });
    });

    describe('view devices', function () {
        it('should list the device details linked to digital id', function () {
            createViewDigitalIDController();
            scope.viewDeviceDetails(digitalIDid);
            expect(scope.viewDeviceDetails).toBeDefined();
            viewDevicesDeferred.resolve(value);
            scope.$apply();
            expect(scope.handleViewDevicesResponse).toBeDefined();
            scope.handleViewDevicesResponse(value.content);
            expect(scope.responseError).toBe(undefined);
        });

        it("should reject the call to list linked digital devices", function () {
            createViewDigitalIDController();
            scope.viewDeviceDetails(1993646);
            viewDevicesDeferred.reject('error message');
            scope.$apply();
            expect(scope.responseError).toBe('error message');
            expect(scope.errorMessage).toBe(errorMessageFactory.error502);
            expect(scope.response).toBeUndefined();
        });

        it('should store device details', function () {
            createViewDigitalIDController();
            scope.handleViewDevicesResponse(devicesDetails);
            applicationCacheFactory.put('devices',devicesDetails);
            scope.linkedDevices = devicesDetails;
            expect(scope.linkedDevices).toBeDefined();
            expect(scope.linkedDevices).toEqual(devicesDetails);
            expect(applicationCacheFactory.get('devices')).toEqual(devicesDetails);
        });

        it('should store device details as undefined if no devices exist', function () {
            createViewDigitalIDController();
            devicesDetails = [];
            scope.handleViewDevicesResponse(devicesDetails);
            expect(scope.linkedDevices).toBeUndefined();
        });
    });
});
