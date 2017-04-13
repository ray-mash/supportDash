/*global angular */

'use strict';

describe("Unit : ErrorHandlingModalController", function () {
    var scope, createController, modalInstanceMock;
    beforeEach(function () {
        angular.mock.module('app.controllers.modals.errorHandlingModalController')
    });

    beforeEach(
        angular.mock.inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            modalInstanceMock = {
                dismiss: function (result) {
                }
            };
    // set up fake methods
            spyOn(modalInstanceMock, "dismiss");


            createController = function () {
                return   $controller("ErrorHandlingModalController", {
                    $scope: scope,
                    $modalInstance: modalInstanceMock
                })
            };
        })
    );

    describe('replace function ', function () {
        it('should close the modal on pressing cancel', function () {
            createController();
            scope.cancel();
            expect(scope.cancel).toBeDefined();
            expect(modalInstanceMock.dismiss).toHaveBeenCalled();
        });
    });

});

//http://coderdiaries.com/2014/04/08/test-for-angular-ui-modal-service-with-jasminejs/