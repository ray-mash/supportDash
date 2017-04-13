/*global angular */

'use strict';


describe("Unit : ReplaceCardNumberModalController", function () {
    var scope, createController, modalInstanceMock;
    beforeEach(function () {

        angular.mock.module('app.controllers.modals.replaceCardNumberModalController')
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
            return   $controller("ReplaceCardNumberModalController", {
                $scope: scope,
                $modalInstance: modalInstanceMock
            })
        };
    //            scope.replace();
    })
);

    describe('replace function ', function () {

        it('should capture new card number on the modal screen', function () {
            createController();
            scope.replacementCard = 999999;
            expect(scope.replace).toBeDefined();
            scope.replace();
            expect(modalInstanceMock.close).toHaveBeenCalledWith(scope.replacementCard);
        });

        it('should close the modal on pressing cancel', function () {
            createController();
            scope.cancel();
            expect(scope.cancel).toBeDefined();
            expect(modalInstanceMock.dismiss).toHaveBeenCalled();
        });
    });

});

//http://coderdiaries.com/2014/04/08/test-for-angular-ui-modal-service-with-jasminejs/