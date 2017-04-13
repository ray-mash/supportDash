'use strict';

var controllersModule = require('./_index_createAccountStyleModalController.js');

/**
 * @ngInject
 */

controllersModule.controller('CreateAccountStyleModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.add = function () {
                $modalInstance.close($scope.accountStyle);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }
    ]);