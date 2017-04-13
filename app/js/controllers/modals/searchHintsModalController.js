'use strict';

var controllersModule = require('./_index_searchHintsModalController.js');

/**
 * @ngInject
 */
controllersModule.controller('SearchHintsModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.close = function () {
                 $modalInstance.close( );
            };
        }
    ]);