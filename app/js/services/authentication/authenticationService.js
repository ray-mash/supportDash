'use strict';

var servicesModule = require('./_index_authentication.js');

/**
 * @ngInject
 */
function AuthenticationService($http, $rootScope, $cookies, ServiceEndPoint) {

    var service = {};

    service.userAuthentication = function (requestParamsDefaultStructure) {

        var storeCredentials = function (username, password) {
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: password
                }
            };
            $cookies.putObject('globals', $rootScope.globals);
        };

        storeCredentials(requestParamsDefaultStructure.username,requestParamsDefaultStructure.password); //have to store credentials before call as ServiceEndpoint retrieves username and password from cookie
        return ServiceEndPoint.userAuthentication.makeRequest();
    };

    service.clearCredentials = function () {
        $rootScope.globals = undefined;
        $cookies.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';
    };

    service.isLoggedIn = function () {
        return  $cookies.getObject('globals') || {};
    };

    return service;

}

servicesModule.service('AuthenticationService', AuthenticationService);