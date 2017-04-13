'use strict';
/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $stateProvider
        // .state('Login', {
        //     url: '/login',
        //     controller: 'LoginController as login',
        //     templateUrl: 'login/login.html',
        //     title: 'Login',
        //     ncyBreadcrumb: {
        //         label: 'Login',
        //         skip : true
        //     }
        // })
        .state('dashboard', {
            url: '/frequencies/deploy',
            controller: 'FrequenciesController as freq',
            templateUrl: 'partials/frequencies.html',
            title: 'Frequencies',
            ncyBreadcrumb: {
                label: 'Frequencies'
            }
        });
    $urlRouterProvider.otherwise('/');
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

}

module.exports = OnConfig;