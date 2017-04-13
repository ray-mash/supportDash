'use strict';

var controllersModule = require('./_index_editPaymentChargeModalController.js');

/**
 * @ngInject
 */
controllersModule.controller('EditPaymentChargeModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.replace = function () {
                $modalInstance.close($scope.paymentChargeAmount);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);
