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
require('./controllers/login/_index_login');
require('./controllers/searchDashBoard/_index_transactionDashboardController');
require('./controllers/searchDashBoard/_index_searchByPrincipalTypeController');
require('./controllers/searchDashBoardEntitlements/_index_searchEntitlementsController');
require('./controllers/searchDashBoardEntitlements/_index_listEntitlementsDetailsController');
require('./controllers/view/_index_viewDigitalIDController');
require('./controllers/view/_index_viewAuditHistoryController');
require('./controllers/view/_index_viewSystemPrincipalController');
require('./controllers/view/_index_viewDeviceController');
require('./controllers/orderManagementView/realTimeClearance/_index_realTimeClearanceDashBoardController');
require('./controllers/orderManagementView/realTimeClearance/_index_staticDataController');
require('./controllers/orderManagementView/realTimeClearance/_index_auditLogController');
// require('./controllers/entitlementView/_index_operatorDetailsController');
require('./controllers/updateSelectedPrincipal/selectedPrincipals/_index_viewSelectedPrincipalController');
//Modals
require('./controllers/entitlementsModals/_index_roleDescModalController');
require('./controllers/modals/_index_replaceCardNumberModalController');
require('./controllers/modals/_index_errorHandlingModalController');
require('./controllers/modals/_index_removeEntryModalController');
require('./controllers/modals/_index_confirmationModalController');
require('./controllers/modals/_index_searchHintsModalController');
require('./controllers/modals/_index_editParticipatingBanksModalController');
require('./controllers/modals/_index_createParticipatingBankModalController');
require('./controllers/modals/_index_deleteParticipatingBankModalController');
require('./controllers/modals/_index_updateProductAvailabilityModalController');
require('./controllers/modals/_index_createAccountStyleModalController');
require('./controllers/modals/_index_linkAccountStyleModalController');
require('./controllers/modals/_index_editPaymentLimitModalController');
require('./controllers/modals/_index_editPaymentChargeModalController');
require('./controllers/modals/_index_deleteAccountStyleModalController');
//Services
require('./common/configuration/_index_serviceEndPoint');
//require('./common/filteredListServiceUtil/_index_filteredListService');
require('./services/manageDigitalId/_index_manageDigitalIdService');
require('./services/authentication/_index_authentication');
require('./common/configuration/_index_url');
//Factory
require('./common/errorMessages/_index_errorMessagesFactory');
require('./common/cacheFactory/_index_cacheFactory');
require('./common/cardUtility/_index_cardUtilService');
//Filters
require('./filters/_index_maskedCardNumberFilter');

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
        'app.controllers.login.loginController',
        'app.controllers.searchDashBoard.transactionDashboardController',
        'app.controllers.searchDashBoard.searchByPrincipalTypeController',
        'app.controllers.searchDashBoardEntitlements.searchEntitlementsController',
        'app.controllers.searchDashBoardEntitlements.listEntitlementsDetailsController',
        'app.controllers.viewDigitalIDController',
        'app.controllers.viewSystemPrincipalController',
        'app.controllers.viewDeviceController',
        'app.controllers.viewAuditHistoryController',
        'app.controllers.orderManagementView.realTimeClearance.realTimeClearanceDashBoardController',
        'app.controllers.orderManagementView.realTimeClearance.staticDataController',
        'app.controllers.orderManagementView.realTimeClearance.auditLogController',
        'app.controllers.updateSelectedPrincipal.selectedPrincipals.viewSelectedPrincipalController',
        'app.controllers.operatorDetailsController',
//      Modals
        'app.controllers.entitlementsModals.roleDescModalController',
        'app.controllers.modals.replaceCardNumberModalController',
        'app.controllers.modals.errorHandlingModalController',
        'app.controllers.modals.removeEntryModalController',
        'app.controllers.modals.confirmationModalController',
        'app.controllers.modals.searchHintsModalController',
        'app.controllers.modals.editParticipatingBanksModalController',
        'app.controllers.modals.createParticipatingBankModalController',
        'app.controllers.modals.deleteParticipatingBankModalController',
        'app.controllers.modals.updateProductAvailabilityModalController',
        'app.controllers.modals.createAccountStyleModalController',
        'app.controllers.modals.linkAccountStyleModalController',
        'app.controllers.modals.editPaymentLimitModalController',
        'app.controllers.modals.editPaymentChargeModalController',
        'app.controllers.modals.deleteAccountStyleModalController',
//      Services
        'app.services.authenticationService',
        'app.services.manageDigitalId.manageDigitalIdService',

//      Factory
        'app.common.cacheFactory.applicationCacheFactory',
//        'app.common.filteredListServiceUtil.filteredListService',
        'app.common.configuration.ServiceEndPoint',
        'app.common.errorMessages.errorMessagesFactory',
        'app.common.configuration.Url',
        'app.common.cardUtility.cardUtilService',

//        Components

//       Filters
        'app.filters.maskedCardNumberFilter'

    ];

    // mount on window for testing
    window.app = angular.module('app', requires);

    angular.module('app').config(require('./on_config'));

    angular.module('app').run(require('./on_run'));

    angular.bootstrap(document, ['app']);

});
