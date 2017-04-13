'use strict';

var servicesModule = require('./_index_serviceEndPoint.js');

/**
 * @ngInject
 */
function ServiceEndPoint(URL, $http, $rootScope,$cookies,$resource) {
    var endpoints = {};

    function defineEndpoint(name, url, method, isArray) {
        endpoints[name] = {
            name: name,
            url: url,
            method: method,
            isArray: isArray,
            makeRequest: function (payload,requestParamsDefaultData, requestParamDefaultsStructure) {
                payload = payload || {};

                $rootScope.globals = $cookies.getObject('globals') || {};
                if ($rootScope.globals !== undefined && $rootScope.globals.currentUser) {
                    $http.defaults.headers.common.Authorization = 'Basic ' +
                        btoa($rootScope.globals.currentUser.username + ':' + $rootScope.globals.currentUser.authdata);
                }

                var data = $resource(url,requestParamDefaultsStructure,{ 'execute': {method:method, isArray:isArray}});
                if (requestParamsDefaultData === undefined){
                    return data.execute(payload).$promise;
                }
                else{
                    return data.execute(requestParamsDefaultData,payload).$promise;
                }

            }

        };
    }
//  Digital Id
    defineEndpoint('listDigitalIds', URL.listDigitalIds, 'GET');
    defineEndpoint('userAuthentication', URL.userAuthentication, 'GET', true);
    defineEndpoint('viewDevicesByDigitalID', URL.viewDevicesByDigitalID, 'GET');
    defineEndpoint('removeDeviceLinkedToDigitalID', URL.removeDeviceLinkedToDigitalID, 'DELETE');
    defineEndpoint('updateDigitalIdStatus', URL.updateDigitalIdStatus, 'PUT');
    defineEndpoint('replaceCardOnDigitalId',URL.replaceCardOnDigitalId,'PUT');
    defineEndpoint('deleteSystemPrincipal',URL.deleteSystemPrincipal,'DELETE');
    defineEndpoint('removeDigitalIDFromCard',URL.removeDigitalIDFromCard,'DELETE');
    defineEndpoint('history',URL.history,'GET',true);

//    statement
    defineEndpoint('viewIt3bCertificateDetails',URL.viewIt3bCertificateDetails, 'GET');
//    OBB
    defineEndpoint('entitlement_business', URL.entitlement_business, 'GET');
    defineEndpoint('entitlement_business', URL.entitlement_business, 'GET');
    defineEndpoint('entitlement_business_businessId', URL.entitlement_business_businessId, 'GET');
    defineEndpoint('entitlement_businessId_delegationGroup', URL.entitlement_businessId_delegationGroup, 'GET');
    defineEndpoint('entitlement_roles_perContext', URL.entitlement_roles_perContext, 'GET');
    defineEndpoint('entitlement_getDelegation', URL.entitlement_getDelegation, 'GET');
    defineEndpoint('entitlement_getOperatorDetails', URL.entitlement_getOperatorDetails, 'GET');
    defineEndpoint('entitlement_getContextIdPermissions', URL.entitlement_getContextIdPermissions, 'GET');
    defineEndpoint('entitlement_getOperatorForDelegationGroup', URL.entitlement_getOperatorForDelegationGroup, 'GET', true);
    defineEndpoint('entitlement_getRoleIdForSpecifiedOperators', URL.entitlement_getRoleIdForSpecifiedOperators, 'GET');
    defineEndpoint('entitlement_getOperatorRoleDesc', URL.entitlement_getOperatorRoleDesc, 'GET');
    defineEndpoint('entitlement_getOperatorsHistory_fromAccount', URL.entitlement_getOperatorsHistory_fromAccount, 'GET', true);

//    Order Management
//    defineEndpoint('getOrderManagementReportData', URL.getOrderManagementReportData, 'GET');

//    RTC Payments
    defineEndpoint('getParticipatingBanks', URL.getParticipatingBanks, 'GET', true);
    defineEndpoint('editParticipatingBank', URL.editParticipatingBank, 'PUT');
    defineEndpoint('deleteParticipatingBank', URL.deleteParticipatingBank, 'DELETE');
    defineEndpoint('createParticipatingBank', URL.createParticipatingBank, 'POST');
    defineEndpoint('getAccountStyles', URL.getAccountStyles, 'GET', true);
    defineEndpoint('getAllAccountStyles', URL.getAllAccountStyles, 'GET', true);
    defineEndpoint('deleteAccountStyle', URL.deleteAccountStyle, 'DELETE');
    defineEndpoint('createAccountStyle', URL.createAccountStyle, 'POST');
    defineEndpoint('getPaymentInstructions', URL.getPaymentInstructions, 'GET', true);
    defineEndpoint('linkAccountStyle', URL.linkAccountStyle, 'POST');
    defineEndpoint('getPaymentCharges', URL.getPaymentCharges, 'GET');
    defineEndpoint('editPaymentCharges', URL.editPaymentCharges, 'PUT');
    defineEndpoint('getPaymentLimit', URL.getPaymentLimit, 'GET');
    defineEndpoint('editPaymentLimit', URL.editPaymentLimit, 'PUT');
    defineEndpoint('getProductAvailability', URL.getProductAvailability, 'GET');
    defineEndpoint('updateProductAvailability', URL.updateProductAvailability, 'PUT');
    defineEndpoint('findByReferenceNumber', URL.findByReferenceNumber, 'GET');
    defineEndpoint('findByCardNumber', URL.findByCardNumber, 'GET');
    defineEndpoint('findByAccountNumber', URL.findByAccountNumber, 'GET');
    defineEndpoint('findPaymentDetails', URL.findPaymentDetails, 'GET');
    defineEndpoint('searchPendingPayments', URL.searchPendingPayments, 'GET');
    defineEndpoint('getBolpesStatus', URL.getBolpesStatus, 'GET');
    defineEndpoint('getRTCEntities', URL.getRTCEntities, 'GET', true);
    defineEndpoint('searchRTCAuditLog', URL.searchRTCAuditLog, 'POST', true);


    return endpoints;
}

servicesModule.service('ServiceEndPoint', ServiceEndPoint);
