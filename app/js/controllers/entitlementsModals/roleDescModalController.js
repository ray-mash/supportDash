'use strict';

var controllersModule = require('./_index_roleDescModalController.js');

/**
 * @ngInject
 */
controllersModule.controller('RoleDescModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);