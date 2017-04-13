'use strict';

var controllersModule = require('./_index_deleteParticipatingBankModalController.js');

/**
 * @ngInject
 */
controllersModule.controller('DeleteParticipatingBanksModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.delete = function () {
                $modalInstance.close($scope.bank);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);