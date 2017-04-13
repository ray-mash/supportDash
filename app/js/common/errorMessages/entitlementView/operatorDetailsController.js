'use strict';

var controllersModule = require('./_index_operatorDetailsController');
var lodash = require('lodash');

/**
 * @ngInject
 */

controllersModule.controller('OperatorDetailsController',
    ['$scope', '$location',
        'ManageDigitalIdService', 'errorMessagesFactory', '$window', '$modal',
        'ApplicationCacheFactory',
        function ($scope, $location, ManageDigitalIdService, errorMessagesFactory, $window, $modal,
                  ApplicationCacheFactory) {

            $scope.digitalId = ApplicationCacheFactory.get('selectedDigitalId');
            $scope.accountNumber = ApplicationCacheFactory.get('accountNo');
            $scope.cardNumber = ApplicationCacheFactory.get('enabler');

            $scope.itemsPerPage = 10;
            $scope.currentPage = 1;
            $scope.maxSize = $scope.numPerPage = 10;

            $scope.predicate = 'id';
            $scope.reverse = false;
            $scope.sortOrder = function (predicate) {
                $scope.reverse =  !$scope.reverse;
                $scope.predicate = predicate;
            };

            $scope.init = function () {
                $scope.predicate = 'id';
                $scope.currentPage = 1;
                $scope.maxSize = $scope.numPerPage = 10;
            };

            $scope.selectedAccountOperators = ApplicationCacheFactory.get('selectedAccountOperators');

            $scope.viewOperatorsRoles = function (operatorId) {
                lodash.forEach($scope.selectedAccountOperators.operators, function (operatorIndex) {
                    if (operatorId === operatorIndex.operatorCurrentDetail.id) {
                        $scope.selectedOperator = operatorIndex;
                    }
                });
                $scope.retrieveRoleIdForOperator();
            };

            $scope.openModalForOperator = function (operatorsId, digitalIdForOperator) {

                $scope.operatorIdModal = operatorsId;
                $scope.digitalIdModal = digitalIdForOperator;
                $scope.nameDesc = $scope.roleDescForSpecifiedOperators;
                $scope.permissions = $scope.operatorPermissions;
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'entitlementsModals/roleDescModal.html',
                    controller: 'RoleDescModalController',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions)
                    .result
                    .then(function () {
                    });
            };

            $scope.retrieveDigitalIdForOperator = function () {
                var searchType = ApplicationCacheFactory.get('searchType');
                var requestParamsDefaultData = {
                    principalType: searchType,
                    principalPropertyKey: "Sed_OperatorId",
                    principalPropertyValue: $scope.selectedOperator.id
                };
                ManageDigitalIdService.listDigitalIds(requestParamsDefaultData)
                    .then(
                    function (value) {
                        $scope.digitalIdForOperator = value.content[0].userName;
                        $scope.openModalForOperator($scope.selectedOperator.id, $scope.digitalIdForOperator);
                    },
                    function (error) {
                        $scope.responseError = error;
                        $scope.errorMessage = errorMessagesFactory.error502;
                    });

            };

            $scope.retrieveRoleIdForOperator = function () {
                var requestParamsDefaultData = {
                    businessId: $scope.selectedAccountOperators.businessId,
                    delegationGroupId: $scope.selectedAccountOperators.businessDelegationGroup,
                    delegationId: $scope.selectedOperator.operatorCurrentDetail.delegationId
                };
                ManageDigitalIdService.entitlement_getRoleIdForSpecifiedOperators(requestParamsDefaultData)
                    .then(
                    function (value) {
                        if (value !== undefined) {
                            ApplicationCacheFactory.put('roleIdForSpecifiedOperators', value);
                            $scope.handleRoleIdResponse(value);
                        } else {
                            $scope.infoMessage = "No  roles data found";
                        }
                    },
                    function (error) {
                        $scope.responseError = error;
                        $scope.errorMessage = errorMessagesFactory.error502;
                    });
            };

            $scope.handleRoleIdResponse = function (response) {
                var roleId = response.roleAssignments[0].roleId;
                var requestParamsDefaultData = {
                    contextId: $scope.selectedAccountOperators.contextId,
                    roleId: roleId
                };
                ManageDigitalIdService.entitlement_getOperatorRoleDesc(requestParamsDefaultData)
                    .then(
                    function (value) {
                        $scope.infoMessage = undefined;
                        ApplicationCacheFactory.put('roleDescForSpecifiedOperators', value);
                        $scope.roleDescForSpecifiedOperators = {
                            name: value.name,
                            description: value.description
                        };
                        $scope.operatorPermissions = value.permissions;
                        $scope.retrieveDigitalIdForOperator();
                    },
                    function (error) {
                        $scope.responseError = error;
                        $scope.errorMessage = errorMessagesFactory.error502;
                    });
            };
        }
    ]);