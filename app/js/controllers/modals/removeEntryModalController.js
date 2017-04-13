'use strict';

var controllersModule = require('./_index_removeEntryModalController.js');

/**
 * @ngInject
 */
controllersModule.controller('RemoveEntryModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.remove = function () {
                $scope.isRemovingEntry = true;
            };

            $scope.confirm = function () {
                $modalInstance.close();
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }
    ]);