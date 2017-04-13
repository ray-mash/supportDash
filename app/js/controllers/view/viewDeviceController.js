'use strict';

var controllersModule = require('./_index_viewDeviceController');

/**
 * @ngInject
 */

controllersModule.controller('ViewDeviceController',
    ['$scope', '$location', 'ApplicationCacheFactory',
        'ManageDigitalIdService', 'errorMessagesFactory', '$window', '$modal',
        function ($scope, $location, ApplicationCacheFactory, ManageDigitalIdService, errorMessagesFactory, $window,
                  $modal) {

            $scope.init = function () {
                $scope.userAccessRights = ApplicationCacheFactory.get('accessRights');
                $scope.userDetails = ApplicationCacheFactory.get('searchedCardDetails');
                $scope.id = $scope.userDetails.id;
                $scope.headerTitle = undefined;
            };

            $scope.openModalForRemoveDevice = function (device) {
                ApplicationCacheFactory.put('device', device);
                $scope.deviceIDUniqueIdentifier = device.uniqueIndentifier;
                $scope.headerTitle = 'Remove Device';
                $scope.deviceID = device.id;
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'removeDeviceModal.html',
                    controller: 'RemoveEntryModalController',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions)
                    .result
                    .then(function () {
                        $scope.removeDevice($scope.id, $scope.deviceID);
                    });
            };

            $scope.removeDevice = function (digitalID, deviceID) {
                var requestParamsDefaultData = {
                    id: digitalID,
                    device: deviceID
                };
                ManageDigitalIdService.removeDeviceLinkedToDigitalID(requestParamsDefaultData)
                    .then(
                    function (value) {
                        $scope.handleRemoveDeviceResponse(value.content);
                    },
                    function (error) {
                        $scope.handleRemoveDeviceError(error);
                    });
            };

            $scope.handleRemoveDeviceResponse = function () {
                ApplicationCacheFactory.remove('device');
                $scope.viewDeviceDetails($scope.id);
            };

            $scope.handleRemoveDeviceError = function (error) {
                $scope.responseError = error;
                ApplicationCacheFactory.remove('device');
                $scope.errorMessage = errorMessagesFactory.error502;
            };

            $scope.viewDeviceDetails = function (id) {
                var requestParamsDefaultData = {
                    id: id
                };

                ManageDigitalIdService.viewDevicesByDigitalID(requestParamsDefaultData)
                    .then(
                    function (value) {
                        $scope.handleViewDevicesResponse(value);
                    },
                    function (error) {
                        $scope.handleViewDevicesError(error);
                    });
            };

            $scope.handleViewDevicesResponse = function (value) {
                $scope.linkedDevices = value.numberOfElements > 0 ? value.content : undefined;
                ApplicationCacheFactory.put('devices', $scope.linkedDevices);
            };

            $scope.handleViewDevicesError = function (error) {
                $scope.responseError = error;
                $scope.noResultsForDevices = true;
                $scope.errorMessage = errorMessagesFactory.error502;
            };
        }

    ]);
