'use strict';

var controllersModule = require('./_index_editPaymentLimitModalController.js');

/**
 * @ngInject
 */
controllersModule.controller('EditPaymentLimitModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.replace = function () {
                $modalInstance.close($scope.paymentLimitAmount);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);
