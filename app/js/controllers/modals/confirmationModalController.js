'use strict';

var controllersModule = require('./_index_confirmationModalController.js');

/**
 * @ngInject
 */
controllersModule.controller('ConfirmationModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.confirm = function () {
                $modalInstance.close( );
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);