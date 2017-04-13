'use strict';

var controllersModule = require('./_index_replaceCardNumberModalController.js');

/**
 * @ngInject
 */
controllersModule.controller('ReplaceCardNumberModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.replace = function () {
                $modalInstance.close($scope.replacementCard);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel'+ $scope.errorMassage);
            };
        }
    ]);