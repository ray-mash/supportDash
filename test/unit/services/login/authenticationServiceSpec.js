/*global angular */

'use strict';

describe('Service : AuthenticationService ', function () {
  var authenticationService , $httpBackend, scope, cookieStore, serviceEndPoint, url, rootScope ;
    var credentials = {
        username: 'test',
        password: 'test'
    };
    beforeEach(module('app.services.authenticationService'));
    beforeEach(inject(function (_AuthenticationService_, $rootScope, $cookies, _ServiceEndPoint_, _$httpBackend_, _URL_) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        $httpBackend = _$httpBackend_;
        serviceEndPoint = _ServiceEndPoint_;
        url = _URL_;
        cookieStore = $cookies;
        authenticationService = _AuthenticationService_;
    }));

    describe("login user", function () {
        it('should initialize the rootScope', function () {
            cookieStore.remove('globals');
            expect(rootScope.globals).toBe(undefined);
            expect(cookieStore.getObject('globals')).toBe(undefined);
            expect(serviceEndPoint.userAuthentication).toBeDefined();
        });

        it('should validate user login credentials', function () {
            var requestParamsDefaultStructure = {
                username: 'test',
                password: 'test'
            };
            expect(authenticationService.userAuthentication).toBeDefined();
            authenticationService.userAuthentication(requestParamsDefaultStructure);
            expect(serviceEndPoint.userAuthentication).toBeDefined();
            serviceEndPoint.userAuthentication.makeRequest();
        });
    });
});