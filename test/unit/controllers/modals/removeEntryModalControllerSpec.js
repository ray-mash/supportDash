/*global angular */

'use strict';


describe("Unit : Remove Entry Modal Controller", function () {
    var scope, createController, modalInstanceMock;
    beforeEach(function () {
        angular.mock.module('app.controllers.modals.removeEntryModalController')
    });

    beforeEach(function () {
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
                return   $controller("RemoveEntryModalController", {
                    $scope: scope,
                    $modalInstance: modalInstanceMock
                })
            };

        });
    });

    describe("remove device", function () {

        it("should remove device", function () {
            createController();
            expect(scope.remove).toBeDefined();
            scope.remove();
            expect(scope.isRemovingEntry).toBeTruthy();
        });
        
        it("should confirm device removal", function () {
            createController();
            expect(scope.remove).toBeDefined();
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