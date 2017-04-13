/*global angular */

'use strict';

describe("Unit : EditPaymentLimitModalController", function () {
    var scope, createController, modalInstanceMock;
    beforeEach(function () {

        angular.mock.module('app.controllers.modals.editPaymentLimitModalController')
    });

    beforeEach(
        angular.mock.inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();

            // mock version of anuglar-ui $modal service
            modalInstanceMock = {
                close: function (result) {

                },
                dismiss: function (result) {
                }
            };

            // set up fake methods
            spyOn(modalInstanceMock, "close");
            spyOn(modalInstanceMock, "dismiss");

            createController = function () {
                return   $controller("EditPaymentLimitModalController", {
                    $scope: scope,
                    $modalInstance: modalInstanceMock
                })
            };
        })
    );

    describe('replace function ', function () {

        it('should capture new payment limit amount on the modal screen', function () {
            createController();
            scope.paymentLimitAmount= '4000';
            expect(scope.replace).toBeDefined();
            scope.replace();
            expect(modalInstanceMock.close).toHaveBeenCalledWith(scope.paymentLimitAmount);
        });

        it('should close the modal on pressing cancel', function () {
            createController();
            scope.cancel();
            expect(scope.cancel).toBeDefined();
            expect(modalInstanceMock.dismiss).toHaveBeenCalled();
        });
    });

});
