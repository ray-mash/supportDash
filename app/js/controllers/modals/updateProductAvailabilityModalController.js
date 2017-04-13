'use strict';

var controllersModule = require('./_index_updateProductAvailabilityModalController.js');

/**
 * @ngInject
 */
controllersModule.controller('UpdateProductAvailabilityModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.save = function () {
                $modalInstance.close($scope.startTime, $scope.endTime, $scope.time);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);