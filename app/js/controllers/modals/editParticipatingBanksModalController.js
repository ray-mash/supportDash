'use strict';

var controllersModule = require('./_index_editParticipatingBanksModalController.js');

/**
 * @ngInject
 */
controllersModule.controller('EditParticipatingBanksModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.replace = function () {
                $modalInstance.close($scope.bank);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);