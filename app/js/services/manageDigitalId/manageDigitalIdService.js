'use strict';

var servicesModule = require('./_index_manageDigitalIdService.js');

/**
 * @ngInject
 */
function ManageDigitalIdService(ServiceEndPoint) {
    var service = {};

    service.listDigitalIds = function (requestParameters) {
        return ServiceEndPoint.listDigitalIds.makeRequest(requestParameters);
    };

    service.viewIt3bCertificateDetails = function (viewIt3bRequest) {
        return ServiceEndPoint.viewIt3bCertificateDetails.makeRequest(viewIt3bRequest).then(function (response) {
            if (response.headers('x-sbg-response-type') === "SUCCESS" && response.headers('x-sbg-response-code') === "0000") {
                return response.data;
            }

            return $q.reject();

        }).catch(function () {
            return $q.reject('We are experiencing technical problems. Please try again later');
        });
    };
    service.updateDigitalIdStatus = function (changedAction, updatingStatus, requestParamsDefaultData) {

        var requestParamsDefaultStructure = {
            id: '@id'
        };

        var payload = {
            "version": 0,
            "patches": [
                {
                    "path": "",
                    "op": "replace",
                    "value": changedAction
                }
            ]
        };

        payload.patches[0].path = updatingStatus === 'Activated' ? "activated" : "disabled";

        return ServiceEndPoint.updateDigitalIdStatus.makeRequest(payload, requestParamsDefaultData,
            requestParamsDefaultStructure);
    };
    service.replaceCardOnDigitalId = function (replacementCardNumber, requestParamsDefaultData) {

        var requestParamsDefaultStructure = {
            id: '@id',
            principalId: "@principalId"
        };
        var payload = {
            "version": 0,
            "patches": [
                {
                    "path": "cardNo",
                    "op": "replace",
                    "value": replacementCardNumber
                }
            ]
        };

        return ServiceEndPoint.replaceCardOnDigitalId.makeRequest(payload, requestParamsDefaultData,
            requestParamsDefaultStructure);
    };
    service.deleteSystemPrincipal = function (requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            id: '@id',
            principalId: "@principalId"
        };

        return ServiceEndPoint.deleteSystemPrincipal.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);

    };
    service.removeDigitalIDFromCard = function (requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            id: '@id',
            principalId: "@principalId"
        };

        return ServiceEndPoint.removeDigitalIDFromCard.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);

    };
    service.viewDigitalIDsLinkedToCard = function (principalType, principalPropertyKey, principalPropertyValue) {

        var requestParam = {
            principalType: principalType,
            principalPropertyKey: principalPropertyKey,
            principalPropertyValue: principalPropertyValue
        };

        return ServiceEndPoint.listDigitalIds.makeRequest(requestParam);

    };
    service.viewDevicesByDigitalID = function (requestParamsDefaultData) {

        var requestParamsDefaultStructure = {
            id: '@id'
        };

        var payload = {
            "page": 0,
            "size": 1000
        };

        return ServiceEndPoint.viewDevicesByDigitalID.makeRequest(payload, requestParamsDefaultData,
            requestParamsDefaultStructure);

    };
    service.removeDeviceLinkedToDigitalID = function (requestParamsDefaultData) {

        var requestParamsDefaultStructure = {
            id: '@id',
            device: "@device"
        };

        return ServiceEndPoint.removeDeviceLinkedToDigitalID.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);

    };
    service.history = function (requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            id: '@id'
        };

        var payload = {
            "page": 0,
            "size": 1000
        };

        return ServiceEndPoint.history.makeRequest(payload, requestParamsDefaultData, requestParamsDefaultStructure);

    };
//    Entitlements
    service.entitlement_business = function (requestParameters) {
        return ServiceEndPoint.entitlement_business.makeRequest(requestParameters);
    };
    service.entitlement_business_businessId = function (requestParamsDefaultData) {

        var requestParamsDefaultStructure = {
            Sed_BusinessId: "@businessId"
        };

        return ServiceEndPoint.entitlement_business_businessId.makeRequest('',requestParamsDefaultData, requestParamsDefaultStructure);
    };
    service.entitlement_getOperatorsHistory_fromAccount = function (requestParamsDefaultData) {

        var requestParamsDefaultStructure = {
            businessId: "@businessId",
            delegationGroupId: "@delegationGroupId",
            accountNo: "@accountNo"
        };

        return ServiceEndPoint.entitlement_getOperatorsHistory_fromAccount.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);

    };
    service.entitlement_businessId_delegationGroup = function (requestParamsDefaultData) {

        var requestParamsDefaultStructure = {
            Sed_BusinessId: "@businessId"
        };

        return ServiceEndPoint.entitlement_businessId_delegationGroup.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);

    };
    service.entitlement_getRoleIdForSpecifiedOperators = function (requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            businessId: "@businessId",
            delegationGroupId: "@delegationGroupId",
            delegationId: "@delegationId"
        };
        return ServiceEndPoint.entitlement_getRoleIdForSpecifiedOperators.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);
    };
    service.entitlement_getOperatorRoleDesc = function (requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            contextId: "@contextId",
            roleId: "@roleId"
        };

        return ServiceEndPoint.entitlement_getOperatorRoleDesc.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);

    };
    service.getParticipatingBanks = function () {
        return ServiceEndPoint.getParticipatingBanks.makeRequest();

    };

    service.editParticipatingBank = function (bank, requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            id: '@id'
        };

        var payload = {
            "id": bank.id,
            "name": bank.name,
            "bic": bank.bic,
            "code": bank.code
        };
      return ServiceEndPoint.editParticipatingBank.makeRequest(payload, requestParamsDefaultData, requestParamsDefaultStructure);
    };

    service.createParticipatingBank = function (bank) {
      var payload = {
              "name": bank.name,
              "bic": bank.bic,
              "code": bank.code
          };
        return ServiceEndPoint.createParticipatingBank.makeRequest(payload);
    };

    service.deleteParticipatingBank = function (requestParamsDefaultData) {
      var requestParamsDefaultStructure = {
        id: '@id'
      };

        return ServiceEndPoint.deleteParticipatingBank.makeRequest('', requestParamsDefaultData, requestParamsDefaultStructure);
    };

    service.getAccountStyles = function (requestParamsDefaultData) {
      var requestParamsDefaultStructure = {
        paymentInstructionCode: '@paymentInstructionCode'
      };

        return ServiceEndPoint.getAccountStyles.makeRequest('', requestParamsDefaultData, requestParamsDefaultStructure);
    };

    service.deleteAccountStyle = function (requestParamsDefaultData) {
      var requestParamsDefaultStructure = {
        accountStyleId: '@accountStyleId',
        paymentInstructionTypeId: '@paymentInstructionTypeId'
      };

      return ServiceEndPoint.deleteAccountStyle.makeRequest('', requestParamsDefaultData, requestParamsDefaultStructure);
    };

    service.createAccountStyle = function (accountStyle) {
        var payload = {
            "code": accountStyle.code,
            "type": accountStyle.type,
            "description": accountStyle.description
        };
        return ServiceEndPoint.createAccountStyle.makeRequest(payload);

    };

    service.getPaymentInstructions = function () {
        return ServiceEndPoint.getPaymentInstructions.makeRequest();
    };

    service.linkAccountStyle = function (accountWithPaymentInstruction, requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            paymentInstructionTypeId: '@paymentInstructionTypeId'
        };


        var payload = accountWithPaymentInstruction;

        return ServiceEndPoint.linkAccountStyle.makeRequest(payload, requestParamsDefaultData, requestParamsDefaultStructure);
    };
    service.getAllAccountStyles = function () {

        return ServiceEndPoint.getAllAccountStyles.makeRequest();
    };

    service.getPaymentCharges = function () {
        return ServiceEndPoint.getPaymentCharges.makeRequest();

    };

    service.editPaymentCharge = function (paymentChargeAmount, requestParamsDefaultData) {
      var requestParamsDefaultStructure = {
          product: '@product'
      };

      var payload = {
          "value": paymentChargeAmount,
          "description": "RTC",
           "id": "RTC"
      };
    return ServiceEndPoint.editPaymentCharges.makeRequest(payload, requestParamsDefaultData, requestParamsDefaultStructure);
  };

    service.getPaymentLimit = function () {
        return ServiceEndPoint.getPaymentLimit.makeRequest();

    };

    service.editPaymentLimit = function (paymentLimitAmount) {
      var payload = {
          "amount": paymentLimitAmount,
          "type": "RTC"
      };
    return ServiceEndPoint.editPaymentLimit.makeRequest(payload);
  };

    service.getProductAvailability = function () {
        return ServiceEndPoint.getProductAvailability.makeRequest();

    };

    service.updateProductAvailability = function (startTime, endTime, requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            product: '@product'
        };

        var payload = {
            "startTime": startTime,
            "endTime": endTime
        };
        return ServiceEndPoint.updateProductAvailability.makeRequest(payload, requestParamsDefaultData, requestParamsDefaultStructure);
    };

    service.findByReferenceNumber = function (requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            referenceNumber: "@referenceNumber"
        };
        return ServiceEndPoint.findByReferenceNumber.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);
    };
    service.findByCardNumber = function (requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            cardNumber: "@cardNumber"
        };
        return ServiceEndPoint.findByCardNumber.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);
    };

    service.findByAccountNumber = function (requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            accountFrom: "@accountFrom"
        };
        return ServiceEndPoint.findByAccountNumber.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);
    };
    service.searchPendingPayments = function (requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            startDate: '@dateFrom',
            endDate: '@dateTo'
        };
        return ServiceEndPoint.searchPendingPayments.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);
    };

    service.getBolpesStatus = function (requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            referenceNumber: "@referenceNumber"
        };
        return ServiceEndPoint.getBolpesStatus.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);
    };
    service.findPaymentDetails = function (requestParamsDefaultData) {
        var requestParamsDefaultStructure = {
            referenceNumber: "@referenceNumber"
        };
        return ServiceEndPoint.findPaymentDetails.makeRequest('', requestParamsDefaultData,
            requestParamsDefaultStructure);
    };

    service.getRTCEntities = function () {
      return ServiceEndPoint.getRTCEntities.makeRequest();
    };

    service.searchRTCAuditLog = function (startDate, endDate, user, entity) {
      var payload = {
          "dateFrom": startDate,
          "dateTo": endDate,
          "userName": user,
          "entityName": entity
      };
    return ServiceEndPoint.searchRTCAuditLog.makeRequest(payload);
  };
    return service;
}

servicesModule.service('ManageDigitalIdService', ManageDigitalIdService);
