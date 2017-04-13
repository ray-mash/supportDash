/*global angular */

'use strict';

describe("Unit : LinkAccountStyleModalController", function () {
    var scope, createController, modalInstanceMock;
    beforeEach(function () {

        angular.mock.module('app.controllers.modals.linkAccountStyleModalController')
    });

    beforeEach(
        angular.mock.inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            modalInstanceMock = {
                close: function (result) {
                },
                dismiss: function (result) {
                }
            };
            spyOn(modalInstanceMock, "close");
            spyOn(modalInstanceMock, "dismiss");
            createController = function () {
                return   $controller("LinkAccountStyleModalController", {
                    $scope: scope,
                    $modalInstance: modalInstanceMock
                })
            };
        })
    );

    describe('link function ', function () {

        it('should capture new bank details on the modal screen', function () {
            createController();
            expect(scope.linkPaymentInstruction).toBeDefined();
            scope.linkPaymentInstruction();
            expect(modalInstanceMock.close).toHaveBeenCalled();
        });

        it('should close the modal on pressing cancel', function () {
            createController();
            var data = [
                {code: "RDF", type: "866", description: "DESCRIBEIT", "isChecked": true}
            ];
            scope.cancel(data);
            expect(scope.cancel).toBeDefined();
            expect(modalInstanceMock.dismiss).toHaveBeenCalled();
        });
    });

});