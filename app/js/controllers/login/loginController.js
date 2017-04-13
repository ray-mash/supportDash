'use strict';
var controllersModule = require('./_index_login');
/**
 * @ngInject
 */

controllersModule.controller('LoginController',
    ['$scope', '$location',  'AuthenticationService', 'errorMessagesFactory', '$rootScope', 'ApplicationCacheFactory',
        function ($scope, $location,  AuthenticationService, errorMessagesFactory, $rootScope, ApplicationCacheFactory) {
            $rootScope.authenticated = false;
           $scope.userRights = undefined;

            /* istanbul ignore else */
            if (AuthenticationService.isLoggedIn() !== {}) {
                $rootScope.showBreadCrumbs = false;
                $location.path('/login');
            }
            $scope.loginUser = function (credentials) {
                var requestParameters = {
                    username: credentials.username,
                    password: credentials.password
                };
                AuthenticationService.userAuthentication(requestParameters)
                    .then(
                    function (value) {
                        $rootScope.authenticated = true;
                        $scope.response = value.content;
                        $rootScope.showBreadCrumbs = true;
                        $scope.checkAccessRights(value);
                        $scope.userAccessRights = $scope.userRights;
                        ApplicationCacheFactory.put('accessRights', $scope.userRights);
                        $location.path('/dashboard');
                    },
                    function (error) {
                        $rootScope.authenticated = false;
                        $scope.responseError = error;
                        $scope.errorMassage = errorMessagesFactory.loginFailed;
                    });
            };

            $scope.checkAccessRights = function (accessRights) {
                var fullRights = ["ROLE_READWRITE_USER"];
                var readOnlyRights = ["ROLE_READONLY_USER"];
                if(accessRights.length > 1 && accessRights !== readOnlyRights){
                    $scope.userRights = fullRights[0];
                }else if(fullRights[0] === accessRights[0]){
                    $scope.userRights = fullRights[0];
                }else{
                    $scope.userRights = readOnlyRights[0];
                }
            };
            $scope.logOut = function () {
                AuthenticationService.clearCredentials();
                ApplicationCacheFactory.removeAll();
                $location.path('/login');
            };
        }
    ]);
