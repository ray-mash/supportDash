/*global angular */

'use strict';

describe("Unit : CreateParticipatingBankModalController", function () {
    var scope, createController, modalInstanceMock;
    beforeEach(function () {

        angular.mock.module('app.controllers.modals.createParticipatingBankModalController')
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
                return   $controller("CreateParticipatingBankModalController", {
                    $scope: scope,
                    $modalInstance: modalInstanceMock
                })
            };
        })
    );

    describe('replace function ', function () {

        it('should capture new bank details on the modal screen', function () {
            createController();
            scope.bank = {
               editedBankName: 'myNewBank',
            editedBankBic: 'WSDERT',
            editedBankCode: '123'
            };

            expect(scope.add).toBeDefined();
            scope.add();
//            scope.checkDuplicateBic(scope.bank);
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