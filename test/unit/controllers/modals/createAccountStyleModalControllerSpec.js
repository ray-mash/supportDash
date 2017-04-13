/*global angular */

'use strict';

describe("Unit : CreateAccountStyleModalController", function () {
    var scope, createController, modalInstanceMock;
    beforeEach(function () {

        angular.mock.module('app.controllers.modals.createAccountStyleModalController')
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
                return   $controller("CreateAccountStyleModalController", {
                    $scope: scope,
                    $modalInstance: modalInstanceMock
                })
            };
        })
    );

    describe('add function ', function () {

        it('should capture new account style details on the modal screen', function () {
            createController();
            scope.accountStyle = {
               code: 'RTG',
               type: '564',
               description: 'MYPLAN'
            };

            expect(scope.add).toBeDefined();
            scope.add();
            expect(modalInstanceMock.close).toHaveBeenCalledWith(scope.accountStyle);
        });

        it('should close the modal on pressing cancel', function () {
            createController();
            scope.cancel();
            expect(scope.cancel).toBeDefined();
            expect(modalInstanceMock.dismiss).toHaveBeenCalled();
        });
    });

});