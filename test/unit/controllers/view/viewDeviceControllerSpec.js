/*global angular */

'use strict';

describe("Unit : ViewDeviceController", function () {

    var scope, manageDigitalIdService, createViewDeviceController, ViewDeviceController, viewDevicesDeferred, errorMessageFactory, applicationCacheFactory, modalServiceMock, removeDeviceDeferred;

    var digitalIDid = 229;

    var userDetails = {
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

    var device = {
        "id": 253,
        "version": null,
        "deviceRegistrationStatus": "REGISTERED",
        "deviceType": "TABLET",
        "name": "Lenovo",
        "operatingSystem": "ANDROID",
        "osVersion": "ANDROID",
        "uniqueIndentifier": "Gourish1",
        "lastLoggedIn": "2015-03-03T15:13:15.230+0000",
        "rooted": true
    };

    var deviceId = 8380;


    beforeEach(module('app.controllers.viewDeviceController'));

    beforeEach(function () {
        inject(function ($q, $rootScope, $controller, ManageDigitalIdService, _errorMessagesFactory_, ApplicationCacheFactory) {

            scope = $rootScope.$new();
            manageDigitalIdService = ManageDigitalIdService;
            errorMessageFactory = _errorMessagesFactory_;
            applicationCacheFactory = ApplicationCacheFactory;

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

            viewDevicesDeferred = $q.defer();
            spyOn(manageDigitalIdService, 'viewDevicesByDigitalID').and.returnValue(viewDevicesDeferred.promise);

            removeDeviceDeferred = $q.defer();
            spyOn(manageDigitalIdService,
                'removeDeviceLinkedToDigitalID').and.returnValue(removeDeviceDeferred.promise);

            createViewDeviceController = function () {
                ViewDeviceController = $controller('ViewDeviceController', {
                    $scope: scope,
                    ManageDigitalIdService: manageDigitalIdService,
                    $modal: modalServiceMock
                });
            };
        });
    });

    describe('init function', function () {
        it("should have data in session", function () {
            createViewDeviceController();
            //set up session data
            applicationCacheFactory.put('digitalIdNumber', userDetails.id);
            applicationCacheFactory.put('searchedCardDetails', userDetails.userName);
            applicationCacheFactory.put('digitalIdStatus', userDetails.activated);
            scope.init();
        });

    });

    describe("remove device Details", function () {
        modalServiceMock = {
            open: function (options) {
            }
        };

        it("should open modal to remove device", function () {
            createViewDeviceController();
            scope.openModalForRemoveDevice(device);
            expect(modalServiceMock.open).toHaveBeenCalled();
        });

        it('should call service to remove device from digital id', function () {
            createViewDeviceController();
            scope.removeDevice(digitalIDid, deviceId);
            removeDeviceDeferred.resolve(userDetails);
            scope.$apply();
            expect(scope.handleRemoveDeviceResponse).toBeDefined();
            scope.handleRemoveDeviceResponse(userDetails);
            expect(applicationCacheFactory.get('device')).toBeUndefined();
            expect(scope.responseError).toBe(undefined);

        });

        it("should reject the call to remove device from digital id", function () {
            createViewDeviceController();
            removeDeviceDeferred.reject('error message');
            scope.removeDevice('1', '');
            scope.$apply();
            expect(scope.responseError).toBe('error message');
            expect(scope.errorMessage).toBe(errorMessageFactory.error502);
            expect(scope.response).toBeUndefined();
            expect(applicationCacheFactory.get('device')).toBeUndefined();
        });
    });

    describe('view devices on digital id', function () {
        it('should retrieve all devices linked to digital id', function () {
            var id = 123;
            createViewDeviceController();
            scope.viewDeviceDetails(id);
            viewDevicesDeferred.resolve(userDetails);
            scope.$apply();
            expect(scope.handleViewDevicesResponse).toBeDefined();
        });

        it('should set the linkedDevices to the content of the array if the number of elements are > 0', function () {
            var id = 123;
            createViewDeviceController();
            scope.viewDeviceDetails(id);
            viewDevicesDeferred.resolve(userDetails);
            userDetails.numberOfElements = 1;
            scope.handleViewDevicesResponse(userDetails);
            expect(scope.linkedDevices).toEqual(userDetails.content);
        });

        it('should display an error when not having retrieved all devices linked to digital id', function () {
            var id = 123;
            createViewDeviceController();
            scope.viewDeviceDetails(id);
            viewDevicesDeferred.reject('error');
            scope.$apply();
            expect(scope.handleViewDevicesError).toBeDefined();
        });
    });

});