'use strict';

var controllersModule = require('./_index_linkAccountStyleModalController.js');
var lodash = require('lodash');
/**
 * @ngInject
 */

controllersModule.controller('LinkAccountStyleModalController',
    ['$scope', '$modalInstance',
        function ($scope, $modalInstance)
        {
            $scope.linkPaymentInstruction = function (data) {
                $modalInstance.close(data);
            };
            $scope.cancel = function (data) {
                lodash.forEach(data, function (item) {
                    item.isChecked = false;
                });
                $modalInstance.dismiss('cancel');
            };

        }
    ]);