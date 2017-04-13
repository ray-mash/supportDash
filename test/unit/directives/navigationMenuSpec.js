///*global angular */
//
//'use strict';
//
//
//describe("Unit : NavigationMenu", function () {
//    var scope, authenticationService, element, $compile, ctrl;
//    beforeEach(function () {
//
//        angular.mock.module('app.directives.navigationMenu')
//    });
//
//    beforeEach(
//        angular.mock.inject(function (_$rootScope_, $controller, _AuthenticationService_, _$compile_) {
//            scope = _$rootScope_.$new();
//            authenticationService = _AuthenticationService_;
//            $compile = _$compile_;
//            element = $compile('<navigation-menu></navigation-menu>')(scope);
//            ctrl = element.controller("navigationMenu");
////            scope.$digest();
//
//
//        }));
//
//    describe('Login ', function () {
//
//        it('should show the logout on login screen', function () {
////            expect(scope.navigationmenu).toBeDefined();
////            expect(scope.navigationmenu).toEqual('digital ID');
//
//        });
//
//    });
//
//});