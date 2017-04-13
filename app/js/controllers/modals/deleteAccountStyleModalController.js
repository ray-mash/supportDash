'use strict';

var controllersModule = require('./_index_deleteAccountStyleModalController.js');

/**
 * @ngInject
 */
controllersModule.controller('DeleteAccountStyleModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.delete = function () {
                $modalInstance.close($scope.accountStyle);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);
