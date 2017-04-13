'use strict';

var controllersModule = require('./_index_createParticipatingBankModalController.js');

/**
 * @ngInject
 */

controllersModule.controller('CreateParticipatingBankModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.add = function () {
                $modalInstance.close($scope.bank);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }
    ]);