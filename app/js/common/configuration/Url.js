'use strict';

var servicesModule = require('./_index_url.js');

/**
 * @ngInject
 */
function URL() {
    return {
//        Digital Id
        listDigitalIds: '/di/services/v1/digital-id',
        userAuthentication: 'di/services/v1/health/roles',
        searchByUser: '/di/services/v1/digital-id',
        updateDigitalIdStatus: '/di/services/v1/digital-id/:id/patch',
        deleteSystemPrincipal: '/di/services/v1/digital-id/:id/principal/:principalId',
        removeDigitalIDFromCard: '/di/services/v1/digital-id/:id/principal/:principalId',
        viewDevicesByDigitalID: '/di/services/v1/digital-id/:id/device',
        removeDeviceLinkedToDigitalID: '/di/services/v1/digital-id/:id/device/:device',
        replaceCardOnDigitalId: '/di/services/v1/digital-id/:id/principal/:principalId/patch',
        history: '/di/services/v1/digital-id/:id/history',

//       Online Business Banking
        viewIt3bCertificateDetails: '/sbg-ib/rest/StatementService/ViewIt3bCertificateDetails',

        entitlement_business: '/entitlements/services/v1/entitlements/business',
        entitlement_business_businessId: '/entitlements/services/v1/entitlements/business/:businessId',
        entitlement_roles_perContext: '/entitlements/services/v1/entitlements/context/:contextId/role',
        entitlement_businessId_delegationGroup: '/entitlements/services/v1/entitlements/business/:businessId/delegation-group',
//        entitlement_getOperators_fromAccount: '/entitlements/services/v1/permission/business/:businessId/delegation-group/:delegationGroupId/account-reference/:accountNo/operators',
        entitlement_getOperatorsHistory_fromAccount: '/entitlements/services/v1/history/business/:businessId/delegation-group/:delegationGroupId/account-reference/:accountNo/operators',
        entitlement_getDelegation: '/entitlements/services/v1/entitlements/business/:businessId/delegation-group/:delegationGroupId/delegation/:delegationId',
        entitlement_getOperatorDetails: '/v1/permission/operator/:operatorId/delegation-group',
        entitlement_getOperatorForDelegationGroup: '/entitlements/services/v1/permission/delegation-group/:delegationGroupId/operators',
        entitlement_getContextIdPermissions: '/entitlements/services/v1/entitlements/context/:contextId/permission',
        entitlement_getRoleIdForSpecifiedOperators: '/entitlements/services/v1/entitlements/business/:businessId/delegation-group/:delegationGroupId/delegation/:delegationId',
        entitlement_getOperatorRoleDesc: '/entitlements/services/v1/entitlements/context/:contextId/role/:roleId',
//        Order Management
//        getOrderManagementReportData: 'om/api/resources/v1/support/report/data?startDate=:startDate&endDate=:endDate',

//        RTC Payments
        getParticipatingBanks: '/om-rtc/bank/rtc',
        editParticipatingBank: '/om-rtc/bank/rtc/:id',
        deleteParticipatingBank: '/om-rtc/bank/rtc/:id',
        createParticipatingBank: '/om-rtc/bank/rtc',
        getAccountStyles: '/om-rtc/accountstyles/paymentinstruction/:paymentInstructionCode',
        getAllAccountStyles: '/om-rtc/accountstyles',
        deleteAccountStyle: '/om-rtc/accountstyles/paymentinstructions/:accountStyleId/:paymentInstructionTypeId',
        createAccountStyle: '/om-rtc/accountstyles',
        getPaymentInstructions: '/om-rtc/accountstyles/paymentinstructions',
        linkAccountStyle: '/om-rtc/accountstyles/paymentinstructions/:paymentInstructionTypeId',
        getPaymentLimit: '/om-rtc/paymentlimit/RTC',
        editPaymentLimit: '/om-rtc/paymentlimit/RTC',
        getValidateCurrentTime: '/om-rtc/validatecurrenttime',
        getProductAvailability: '/om-rtc/productavailability',
        updateProductAvailability: '/om-rtc/product/:product/update',
        getPaymentCharges: '/om-rtc/charges',
        editPaymentCharges: '/om-rtc/charges/:product',
        findByReferenceNumber: '/om-rtc/support/payments/findByReferenceNumber/:referenceNumber',
        findByCardNumber: '/om-rtc/support/payments/findByCardNumber/:cardNumber',
        findByAccountNumber: '/om-rtc/support/payments/findByAccountNumber/:accountFrom',
        searchPendingPayments: 'om-rtc/support/pendingPayments/startDate/:startDate/endDate/:endDate',
        getBolpesStatus: '/om-rtc/support/payments/:referenceNumber/bolpesRespMsgTxns',
        findPaymentDetails: '/om-rtc/support/paymentDetail/findByReferenceNumber/:referenceNumber',
        getRTCEntities: '/om-rtc/support/audit/trail/entities',
        searchRTCAuditLog: '/om-rtc/support/audit/trail'
    };
}

servicesModule.service('URL', URL);
