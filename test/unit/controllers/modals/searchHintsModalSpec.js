/*global angular */

'use strict';


describe("Unit : SearchHintsModalController", function () {

    var scope, createController, modalInstanceMock;
    beforeEach(function () {

        angular.mock.module('app.controllers.modals.searchHintsModalController')
    });

    beforeEach(function () {
        angular.mock.inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            // mock version of anuglar-ui $modal service
            modalInstanceMock = {
                close: function (result) {

                }
            };
            // set up fake methods
            spyOn(modalInstanceMock, "close");

            createController = function () {
                return   $controller("SearchHintsModalController", {
                    $scope: scope,
                    $modalInstance: modalInstanceMock
                })
            };
        });
    });

    describe("confirmation ", function () {

        it('should close the modal on pressing close', function () {
            createController();
            scope.close();
            expect(scope.close).toBeDefined();
            expect(modalInstanceMock.close).toHaveBeenCalled();
        });
    });
});