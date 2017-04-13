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
        .state('Login', {
            url: '/login',
            controller: 'LoginController as login',
            templateUrl: 'login/login.html',
            title: 'Login',
            ncyBreadcrumb: {
                label: 'Login',
                skip : true
            }
        })
        .state('SearchDashBoard', {
            url: '/dashboard',
            controller: 'TransactionDashboardController as dashBoard',
            templateUrl: 'dashBoard/searchTypeSelectionView.html',
            title: 'Search Dashboard',
            ncyBreadcrumb: {
                label: 'Search Selection'
            }
        })
        .state('SearchByPrincipalType', {
            url: '/searchByPrincipalType',
            controller: 'SearchByPrincipalTypeController as searchByPrincipalType',
            templateUrl: 'dashBoard/searchByPrincipalType.html',
            title: 'Search by Principal Type',
            ncyBreadcrumb: {
                label: 'Search by Principal Type'
            }
        }).state('SearchEntitlementsController', {
            url: '/searchSmallEnterpriseOnline',
            controller: 'SearchEntitlementsController as searchEntitlements',
            templateUrl: 'dashboardEntitlements/searchEntitlementOperatorDetails.html',
            title: 'Online Business Banking',
            ncyBreadcrumb: {
                label: 'Online Business Banking'
            }
        }).state('NewPagesController', {
            url: '/newPages',
            controller: 'NewPagesController as newPage',
            templateUrl: 'dashboardEntitlements/newPages.html',
            title: 'New By Ray',
            ncyBreadcrumb: {
                label: 'New By Ray'
            }
//        }).state('searchOrderManagementController', {
//            url: '/searchOrderManagement',
//            controller: 'SearchOrderManagementController as orderManage',
//            templateUrl: 'dashboardOrderManagement/searchOrderManagement.html',
//            title: 'Order Management',
//            ncyBreadcrumb: {
//                label: 'Order Management'
//            }
        }).state('ListEntitlementsDetailsController', {
            url: '/listEntitlementsDetails',
            controller: 'ListEntitlementsDetailsController as listEntitlementsDetails',
            templateUrl: 'entitlementViewSystemPrincipal/listEntitlementsDetails.html',
            title: 'Online Business Banking Details',
            ncyBreadcrumb: {
                label: 'Online Business Banking'
            }
        })
        .state('View', {
            url: '/viewDigitalIdDetails',
            controller: 'ViewDigitalIDController as viewDigitalID',
            templateUrl: 'digitalIdView/viewDigitalID.html',
            title: 'View',
            ncyBreadcrumb: {
                label: 'View Digital ID details'
            }
        })
        .state('SearchAndViewAuditHistory', {
            url: '/searchAndViewAuditHistory',
            controller: 'ViewAuditHistoryController as viewAuditHistory',
            templateUrl: 'dashBoard/searchAndViewAuditHistory.html',
            title: 'View',
            ncyBreadcrumb: {
                label: 'Search and View Audit History'
            }
        })
        .state('EntitlementView', {
            url: '/viewEntitlementDetails',
            controller: 'ViewEntitlementDetailsController as viewEntitlementDetails',
            templateUrl: 'entitlementViewSystemPrincipal/entitlementViewSystemPrincipals.html',
            title: 'View',
            ncyBreadcrumb: {
                label: 'View OBB details'
            }
        })
        .state('ViewEntitlementDetailsController', {
            url: '/viewOperatorDetails',
            controller: 'OperatorDetailsController as operatorDetails',
            templateUrl: 'entitlementViewSystemPrincipal/entitlementOperatorDetailsView.html',
            title: 'View',
            ncyBreadcrumb: {
                label: 'View Operator details'
            }
        })
        .state('RealTimeClearanceDashBoardController', {
            url: '/real-time-clearance-dashboard',
            controller: 'RealTimeClearanceDashBoardController as rtcController',
            templateUrl: 'dashboardRealTimeClearance/real-time-clearance-menu.html',
            title: 'realTimeClearanceDashBoard',
            ncyBreadcrumb: {
                label: 'realTimeClearanceDashBoard'
            }
        })
        .state('StaticDataController', {
            url: '/real-time-clearance-static-data',
            controller: 'StaticDataController as staticController',
            templateUrl: 'dashboardRealTimeClearance/rtc-static-data-menu.html',
            title: 'StaticDataController',
            ncyBreadcrumb: {
                label: 'StaticDataController'
            }
        })
        .state('SearchRTCByReferenceController', {
            url: '/real-time-clearance-search-by-reference-number',
            controller: 'StaticDataController as staticController',
            templateUrl: 'dashboardRealTimeClearance/rtc-reference-number.html',
            title: 'SearchRTCByReferenceController',
            ncyBreadcrumb: {
                label: 'SearchRTCByReferenceController'
            }
        })
        .state('SelectedPrincipalDetails', {
            url: '/selectedBankingDetailsView',
            controller: 'ViewSelectedPrincipalController as selectedPrincipals',
            templateUrl: 'systemPrincipalsView/viewSelectedPrincipals.html',
            title: 'View selected Principal details',
            ncyBreadcrumb: {
                label: 'View selected Principal details'
            }
        });
    $urlRouterProvider.otherwise('/login');
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

}

module.exports = OnConfig;