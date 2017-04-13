'use strict';

var angular = require('angular');

require('angular-breadcrumb');
require('angular-cookies');
// angular modules
require('angular-ui-router');
require('angular-ui-bootstrap');
require("angularjs-datepicker");
require('ng-idle');
require('angular-resource');
require('angular-spinner');
require('angular-animate');
require('angular-loading-spinner');
require('./templates');
//Controllers
// require('./controllers/login/_index_login');
require('./controllers/frequencies/_index_frequencies');

//Services
require('./common/configuration/_index_serviceEndPoint');
//require('./common/filteredListServiceUtil/_index_filteredListService');
require('./services/manageDigitalId/_index_manageDigitalIdService');
require('./services/authentication/_index_authentication');
require('./common/configuration/_index_url');
//Factory
require('./common/errorMessages/_index_errorMessagesFactory');
require('./common/cacheFactory/_index_cacheFactory');
//Filters

//Components

// create and bootstrap application
angular.element(document).ready(function () {

    var requires = [
        'ngIdle',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngAnimate',
        'ui.bootstrap',
        'angularSpinner',
        'ngLoadingSpinner',
        'templates',
//      Controllers
//         'app.controllers.login.loginController',
        'app.controllers.frequencies.frequenciesController',

//      Services
        'app.services.authenticationService',
        'app.services.manageDigitalId.manageDigitalIdService',

//      Factory
        'app.common.cacheFactory.applicationCacheFactory',
//        'app.common.filteredListServiceUtil.filteredListService',
        'app.common.configuration.ServiceEndPoint',
        'app.common.errorMessages.errorMessagesFactory',
        'app.common.configuration.Url',
//        Components

//       Filters
    ];

    // mount on window for testing
    window.app = angular.module('app', requires);

    angular.module('app').config(require('./on_config'));

    angular.module('app').run(require('./on_run'));

    angular.bootstrap(document, ['app']);

});
