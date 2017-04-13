/*global angular */

'use strict';

describe("Unit : DeleteParticipatingBankModalController", function () {
    var scope, createController, modalInstanceMock;
    beforeEach(function () {

        angular.mock.module('app.controllers.modals.deleteParticipatingBankModalController')
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
                return   $controller("DeleteParticipatingBanksModalController", {
                    $scope: scope,
                    $modalInstance: modalInstanceMock
                })
            };
        })
    );

    describe('delete function ', function () {

        it('should delete bank details on the modal screen', function () {
            createController();
            expect(scope.delete).toBeDefined();
            scope.delete();
            expect(modalInstanceMock.close).toHaveBeenCalledWith(scope.bank);
        });

        it('should close the modal on pressing cancel', function () {
            createController();
            scope.cancel();
            expect(scope.cancel).toBeDefined();
            expect(modalInstanceMock.dismiss).toHaveBeenCalled();
        });
    });

});
