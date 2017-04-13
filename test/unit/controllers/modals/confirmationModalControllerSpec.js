/*global angular */

'use strict';


describe("Unit : ConfirmationModalController", function () {

    var scope, createController, modalInstanceMock;
    beforeEach(function () {

        angular.mock.module('app.controllers.modals.confirmationModalController')
    });

    beforeEach(function () {
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
                return   $controller("ConfirmationModalController", {
                    $scope: scope,
                    $modalInstance: modalInstanceMock
                })
            };

        });
    });

    describe("confirmation ", function () {

        it("should confirm digital id status change", function () {
            createController();
            scope.confirm();
            expect(modalInstanceMock.close).toHaveBeenCalledWith();
        });

        it('should close the modal on pressing cancel', function () {
            createController();
            scope.cancel();
            expect(scope.cancel).toBeDefined();
            expect(modalInstanceMock.dismiss).toHaveBeenCalled();
        });
    });
});