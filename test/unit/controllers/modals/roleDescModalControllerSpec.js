/*global angular */

'use strict';


describe("Unit : RoleDescModalController", function () {

    var scope, createController, modalInstanceMock;
    beforeEach(function () {

        angular.mock.module('app.controllers.entitlementsModals.roleDescModalController')
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
                return   $controller("RoleDescModalController", {
                    $scope: scope,
                    $modalInstance: modalInstanceMock
                })
            };

        });
    });

    describe("roles ", function () {
        it('should close the modal on pressing cancel', function () {
            createController();
            scope.cancel();
            expect(scope.cancel).toBeDefined();
            expect(modalInstanceMock.dismiss).toHaveBeenCalled();
        });
    });
});