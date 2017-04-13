/*global angular */

'use strict';


describe("Unit : LoginController", function () {
    var scope, createController, $httpBackend, authenticationService, deferred, $rootScope, location, errorMsg, applicationCacheFactory;

    var credentials = {username: 'user',
        password: 'password'};

    beforeEach(function () {

        angular.mock.module('app.controllers.login.loginController')
    });

    beforeEach(
        angular.mock.inject(function ($q, _errorMessagesFactory_, _$rootScope_, $controller, _$httpBackend_,
                                      AuthenticationService, $location, ApplicationCacheFactory) {
            scope = _$rootScope_.$new();
            $rootScope = _$rootScope_;
            errorMsg = _errorMessagesFactory_;
            location = $location;
            $httpBackend = _$httpBackend_;
            authenticationService = AuthenticationService;
            applicationCacheFactory = ApplicationCacheFactory;
            deferred = $q.defer();

            spyOn(authenticationService, 'userAuthentication').and.returnValue(deferred.promise);


            createController = function () {
                return   $controller("LoginController", {
                    _$rootScope_: $rootScope,
                    $scope: scope,
                    _errorMessagesFactory_: errorMsg,
                    $location: location,
                    AuthenticationService: authenticationService
                })
            };
        }));

    describe('user not logged in ', function () {
        it('should redirect to login page', function () {
            createController();
            expect(location.path()).toEqual('/login');
            expect($rootScope.showBreadCrumbs).toBe(false);
        });

        it('should check if the user is logged on', function () {
            createController();
            scope.loginUser(credentials);
            spyOn(authenticationService, 'isLoggedIn').and.returnValue(deferred.promise);
            authenticationService.isLoggedIn();
            scope.$apply();
            expect(authenticationService.isLoggedIn).toBeDefined();
            expect($rootScope.showBreadCrumbs).toBeDefined();
            scope.showBreadCrumbs = true;
            expect($rootScope.showBreadCrumbs).toBe(false);
            expect(location.path()).toBe('/login');
            expect(location.path('/login1')).not.toBe('/login');
        });
    });
    describe('loginUser function ', function () {
        it('should check if the function is defined', function () {
            createController();
            expect(scope).toBeDefined();
            expect(scope).toBeDefined();
            expect(scope.loginUser).toBeDefined();
        });
    });

    describe('Authentication service', function () {
        it('should resolve promise', function () {
            createController();
            deferred.resolve('resolveData');
            expect(scope).toBeDefined();
            scope.loginUser(credentials);
            scope.$apply();
            expect(scope.responseError).toBe(undefined);
            expect(scope.showBreadCrumbs).toBe(true);
        });
    });

    describe('Authentication service', function () {
        it('should reject promise', function () {
            createController();
            deferred.reject('error message');
            expect(scope).toBeDefined();
            credentials.username = 'user1';
            scope.loginUser(credentials);
            scope.$apply();
            expect(scope.responseError).toBe('error message');
            expect(scope.errorMassage).toBe(errorMsg.loginFailed);
            expect(scope.response).toBe(undefined);
            expect(scope.response).toBeUndefined();
        });
    });

    describe('checkAccessRights ', function () {
        it('should check and set your access rights to read write', function () {
            createController();
            var value = ["ROLE_READWRITE_USER", "ROLE_READONLY_USER"];
            scope.loginUser(credentials);
            scope.$apply();
            scope.checkAccessRights(value);
            expect(scope.checkAccessRights).toBeDefined();
            scope.checkAccessRights(value);
            expect(scope.userRights).toEqual('ROLE_READWRITE_USER');
            expect(value.length).toBeGreaterThan(1);
            expect(applicationCacheFactory.info).toBeDefined();
        });

        it('should check and set your access rights to read write', function () {
            createController();
            var accessRW = ["ROLE_READWRITE_USER","ROLE_READONLY_USER"];
            scope.loginUser(credentials);
            scope.$apply();
            expect(accessRW[0]).toBe("ROLE_READWRITE_USER");
            scope.checkAccessRights(accessRW);
            expect(scope.userRights).toBeDefined();
            scope.userRights = '';
            expect(scope.checkAccessRights).toBeDefined();
            scope.checkAccessRights(accessRW);
            expect(accessRW[0]).toBe("ROLE_READWRITE_USER");
            expect(accessRW.length).toBe(2);
            expect(scope.userRights).toEqual('ROLE_READWRITE_USER');
            expect(location.path()).toEqual('/login');
        });
        it('should check and set your access rights to read write', function () {
            createController();
            var accessRW = ["ROLE_READONLY_USER", "ROLE_READWRITE_USER"];
            scope.loginUser(credentials);
            scope.$apply();
            expect(accessRW[1]).toBe("ROLE_READWRITE_USER");
            scope.checkAccessRights(accessRW);
            expect(scope.userRights).toBeDefined();
            scope.userRights = '';
            expect(scope.checkAccessRights).toBeDefined();
            scope.checkAccessRights(accessRW);
            expect(accessRW[1]).toBe("ROLE_READWRITE_USER");
            expect(accessRW.length).toBe(2);
            expect(scope.userRights).toEqual('ROLE_READWRITE_USER');
            expect(location.path()).toEqual('/login');
        });
        it('should check and set your access rights to read write', function () {
            createController();
            var accessRW = ["ROLE_READWRITE_USER"];
            scope.loginUser(credentials);
            scope.$apply();
            expect(accessRW[0]).toBe("ROLE_READWRITE_USER");
            scope.checkAccessRights(accessRW);
            expect(scope.userRights).toBeDefined();
            scope.userRights = '';
            expect(scope.checkAccessRights).toBeDefined();
            scope.checkAccessRights(accessRW);
            expect(accessRW[0]).toBe("ROLE_READWRITE_USER");
            expect(accessRW.length).toBe(1);
            expect(scope.userRights).toEqual('ROLE_READWRITE_USER');
            expect(location.path()).toEqual('/login');
        });
        it('should check and set your access rights to read only', function () {
            createController();
            var access = ["ROLE_READONLY_USER"];
            scope.loginUser(credentials);
            scope.$apply();
            scope.checkAccessRights(access);
            expect(scope.checkAccessRights).toBeDefined();
            scope.checkAccessRights(access);
            expect(access.length).toBe(1);
            expect(scope.userRights).toEqual('ROLE_READONLY_USER');
            expect(location.path()).toEqual('/login');
        });
    });
    describe('Logout ', function () {
        it('should logout and clear the application parameters', function () {
            createController();
            var test = 'I am a test string';
            applicationCacheFactory.put('test', test);
            scope.loginUser(credentials);
            scope.$apply();
            scope.logOut();
            expect(authenticationService.clearCredentials).toBeDefined();
            expect(applicationCacheFactory.info).toBeDefined();
            expect(applicationCacheFactory.get('test')).toBeUndefined();
            expect(location.path()).toEqual('/login');
        });
    });

});