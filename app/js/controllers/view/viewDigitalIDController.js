'use strict';

var controllersModule = require('./_index_viewDigitalIDController');
var lodash = require('lodash');

/**
 * @ngInject
 */

controllersModule.controller('ViewDigitalIDController',
    ['$scope', '$location',
        'ManageDigitalIdService', 'errorMessagesFactory', '$window', '$modal',
        'ApplicationCacheFactory',
        function ($scope, $location, ManageDigitalIdService, errorMessagesFactory, $window, $modal,
                  ApplicationCacheFactory) {


            $scope.updateStatusOnCache = function (id) {
                $scope.searchResults = ApplicationCacheFactory.get('searchResults');
                lodash.find($scope.searchResults, function (value) {
                    if (value.id === id) {
                        value.activated = $scope.activatedAction;
                        value.disabled = $scope.disabledAction;
                    }
                });
            };

            $scope.confirmationModal = function (status, action, updatedStatus, message) {
                $scope.status = status;
                $scope.headerMessage = action;
                $scope.updatingActiveOrDisabled = updatedStatus;
                $scope.confirmMessage = message;
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'confirmationModal.html',
                    controller: 'ConfirmationModalController',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, $scope.headerMessage, $scope.confirmMessage)
                    .result
                    .then(function () {
                        $scope.digitalIdStatusUpdate();
                    });
            };

            $scope.digitalIdStatusUpdate = function () {
                $scope.updatedIdStatus = $scope.status;
                var requestParamsDefaultData = {
                    id: $scope.id
                };
                ManageDigitalIdService.updateDigitalIdStatus($scope.updatedIdStatus, $scope.updatingActiveOrDisabled,
                    requestParamsDefaultData)
                    .then(
                    function (value) {
                        $scope.handleStatusUpdateResponse(value);
                    },
                    function (error) {
                        $scope.handleStatusUpdateError(error);
                    });
            };

            $scope.handleStatusUpdateResponse = function (value) {
                ApplicationCacheFactory.remove('searchedCardDetails');
                $scope.activatedAction = value.activated;
                $scope.disabledAction = value.disabled;
                $scope.updateStatusOnCache($scope.id);
                $scope.mapStatusUpdates(value);
                ApplicationCacheFactory.put('searchedCardDetails', $scope.userDetails);
                ApplicationCacheFactory.put('digitalIdStatus', $scope.activatedAction);
                ApplicationCacheFactory.put('digitalIdDisabledStatus', $scope.disabledAction);
                ApplicationCacheFactory.put('searchResults', $scope.searchResults);
                $scope.changedDisabledAction = ApplicationCacheFactory.get('digitalIdDisabledStatus');
                $scope.changedAction = ApplicationCacheFactory.get('digitalIdStatus');
            };

            $scope.handleStatusUpdateError = function (error) {
                $scope.responseError = error;
                ApplicationCacheFactory.remove('searchedCardDetails');
                $scope.errorMessage = errorMessagesFactory.error502;
            };

            $scope.mapStatusUpdates = function (value) {
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

                $scope.updatedSystemPrincipals = $scope.userDetails.systemPrincipals;
            };

            $scope.viewDeviceDetails = function (id) {
                var requestParamsDefaultData = {
                    id: id
                };
                ManageDigitalIdService.viewDevicesByDigitalID(requestParamsDefaultData)
                    .then(
                    function (value) {
                        $scope.handleViewDevicesResponse(value.content);
                    },
                    function (error) {
                        $scope.handleViewDevicesError(error);
                    });
            };

            $scope.handleViewDevicesResponse = function (value) {
                $scope.linkedDevices = value.length > 0 ? value : undefined;
                ApplicationCacheFactory.put('devices', $scope.linkedDevices);
            };

            $scope.handleViewDevicesError = function (error) {
                $scope.responseError = error;
                $scope.noResultsForDevices = true;
                $scope.errorMessage = errorMessagesFactory.error502;
            };

            $scope.init = function () {
                $scope.userAccessRights = ApplicationCacheFactory.get('accessRights');
                $scope.userDetails = ApplicationCacheFactory.get('searchedCardDetails');
                $scope.name = ApplicationCacheFactory.get('digitalIdUserName');
                $scope.cardSearchResults = ApplicationCacheFactory.get('cardSearchResults');
                $scope.changedAction = ApplicationCacheFactory.get('statusAction');
                $scope.changedDisabledAction = ApplicationCacheFactory.get('disabledStatus');
                $scope.editingDeviceDetails = false;
                $scope.id = ApplicationCacheFactory.get('selectedId');
                $scope.activatedAction = $scope.changedAction;
                $scope.disabledAction = $scope.changedDisabledAction;
                $scope.viewDeviceDetails($scope.id);
            };
        }
    ]);
