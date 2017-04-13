'use strict';

var controllersModule = require('./_index_errorHandlingModalController.js');

/**
 * @ngInject
 */
controllersModule.controller('ErrorHandlingModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel', 500);
            };

        }
    ]);