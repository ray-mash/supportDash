/*global angular */

'use strict';

describe('Service : ManageDigitalIdService ', function () {
    var manageDigitalIdService, scope, cookieStore, serviceEndPoint, $httpBackend, url;

    beforeEach(module('app.services.manageDigitalId.manageDigitalIdService'));

    beforeEach(inject(function (_ManageDigitalIdService_, $rootScope, $cookies, _ServiceEndPoint_, _$httpBackend_,
                                _URL_) {
        scope = $rootScope.$new();
        cookieStore = $cookies;
        $httpBackend = _$httpBackend_;
        manageDigitalIdService = _ManageDigitalIdService_;
        serviceEndPoint = _ServiceEndPoint_;
        url = _URL_;

    }));

    describe("list digital id : list all digital id within search criteria", function () {

        it('should list the digital within search criteria', function (done) {
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            var requestParameters = {
                username: 'suit'
            };

            $httpBackend.expectGET(url.listDigitalIds).respond(expectedResponse);
            manageDigitalIdService.listDigitalIds()
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();

        });
    });
    describe("UpdateDigitalIdStatus : update digital id status", function () {

        it('should invoke the digital status update and set the activated status and return success', function (done) {
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectPUT(url.updateDigitalIdStatus).respond(expectedResponse);
            var changedActions = true;
            var payload = {
                "version": 0,
                "patches": [
                    {
                        "path": "",
                        "op": "replace",
                        "value": changedActions
                    }
                ]
            };
            var updatingStatuses = 'Activated';
            payload.patches[0].path = 'activated';
            manageDigitalIdService.updateDigitalIdStatus(changedActions, updatingStatuses, {id: ':id'})
                .then(function (value) {
                    expect(updatingStatuses).toEqual('Activated');
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    expect(payload.patches[0].path).toBe('activated');
                    done();
                });
            $httpBackend.flush();

        });

        it('should invoke the digital status and set the disabled status update and return success', function (done) {
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectPUT(url.updateDigitalIdStatus).respond(expectedResponse);
            var changedActions = true;
            var payload = {
                "version": 0,
                "patches": [
                    {
                        "path": "",
                        "op": "replace",
                        "value": changedActions
                    }
                ]
            };
            var updatingStatuses = 'Disabled';
            payload.patches[0].path = 'disabled';
            manageDigitalIdService.updateDigitalIdStatus(changedActions, updatingStatuses, {id: ':id'})
                .then(function (value) {
                    expect(updatingStatuses).toEqual('Disabled');
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    expect(payload.patches[0].path).toBe('disabled');
                    done();
                });
            $httpBackend.flush();

        });
    });

    describe("ReplaceCardOnDigitalId : replace card number", function () {

        it('should replace old card with new card number', function (done) {

            var requestParamsDefaultStructure = {
                id: ':id',
                principalId: ":principalId"
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectPUT(url.replaceCardOnDigitalId).respond(expectedResponse);
            manageDigitalIdService.replaceCardOnDigitalId('999999', requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();

        });
    });

    describe("RemoveDigitalIDFromCard : remove digital id from card", function () {
        it('should de-link digital id from card number', function (done) {
            var requestParamsDefaultData = {};
            var requestParamsDefaultStructure = {
                id: ':id',
                principalId: ":principalId"
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectDELETE(url.removeDigitalIDFromCard).respond(expectedResponse);
            manageDigitalIdService.removeDigitalIDFromCard(requestParamsDefaultStructure, requestParamsDefaultData)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();

        });
    });

    describe("DeleteSystemPrincipal : delete system principal", function () {
        it('should remove system principal from a digital id profile', function (done) {

            var requestParamsDefaultStructure = {
                id: ':id',
                principalId: ":principalId"
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectDELETE(url.deleteSystemPrincipal).respond(expectedResponse);
            manageDigitalIdService.deleteSystemPrincipal(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
    });

    describe("searchByDigitalIdAndCardNumber : view digital Id linked to a card", function () {
        it('should return  digital id matching the search criteria', function (done) {

            var principalPropertyKey = "CardNo";
            var principalPropertyValue = "123456789";

            var quotedPrincipalPropertyKey = "\"" + principalPropertyKey + "\"";
            var quotedPrincipalPropertyValue = "\"" + principalPropertyValue + "\"";

            var requestParam = {
                principalType: 'principalType',
                principalPropertyKey: quotedPrincipalPropertyKey,
                principalPropertyValue: quotedPrincipalPropertyValue
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.listDigitalIds).respond(expectedResponse);
            manageDigitalIdService.viewDigitalIDsLinkedToCard()
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });

    });

    describe("ViewDevicesByDigitalID : view digital Id", function () {
        it('should return all linked digital id ', function (done) {

            var requestParamsDefaultStructure = {
                id: ':id'
            };

            var payload = {
                "page": 0,
                "size": 1000
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.viewDevicesByDigitalID).respond(expectedResponse);
            manageDigitalIdService.viewDevicesByDigitalID(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
    });

    describe("RemoveDeviceLinkedToDigitalID : view Digital IDs Linked To Card", function () {
        it('should return all linked digital id linked to a card ', function (done) {

            var requestParamsDefaultStructure = {
                id: ':id',
                device: ':device'
            };
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectDELETE(url.removeDeviceLinkedToDigitalID).respond(expectedResponse);
            manageDigitalIdService.removeDeviceLinkedToDigitalID(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();

        });

    });

    describe("History : view audit history", function () {
        it("should return audit history", function (done) {
            var requestParamsDefaultStructure = {
                id: ':id'
            };
            var payload = {
                "page": 0,
                "size": 1000
            };
            var expectedResponse = [
                {code: 200, responseType: "SUCCESS"}
            ];
            $httpBackend.expectGET(url.history).respond(expectedResponse);
            manageDigitalIdService.history(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();

        });
    });

    describe("list entitlements : list all entitlements id ", function () {
        it('should list the entitlements within search criteria', function (done) {
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            var requestParameters = {
                bpId: "tiko"
            };

            $httpBackend.expectGET(url.entitlement_business).respond(expectedResponse);
            manageDigitalIdService.entitlement_business()
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();

        });
    });

    describe("Entitlements : view business using businessId", function () {
        it('should return business info for businessId ', function (done) {

            var requestParamsDefaultStructure = {
                businessId: ':businessId'
            };
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.entitlement_business_businessId).respond(expectedResponse);
            manageDigitalIdService.entitlement_business_businessId(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
    });

    describe("Entitlements : view business and delegation group", function () {
        it('should return all business and delegated operators ', function (done) {

            var requestParamsDefaultStructure = {
                businessId: ':businessId'
            };
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.entitlement_businessId_delegationGroup).respond(expectedResponse);
            manageDigitalIdService.entitlement_businessId_delegationGroup(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
    });

    describe("Entitlements : view delegated operator on an account number", function () {
        it('should return operator delegated to an account', function (done) {

            var requestParamsDefaultStructure = {
                businessId: ':businessId',
                delegationGroupId: ':delegationGroupId',
                accountNo: ':accountNo'
            };
            var expectedResponse = [
                { code: 200, responseType: "SUCCESS"}
            ];
            $httpBackend.expectGET(url.entitlement_getOperatorsHistory_fromAccount).respond(expectedResponse);
            manageDigitalIdService.entitlement_getOperatorsHistory_fromAccount(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
    });

    describe("Entitlements : view roles assigned to operator", function () {
        it('should return all roles and permissions for an operator ', function (done) {

            var requestParamsDefaultStructure = {
                businessId: ':businessId',
                delegationGroupId: ':delegationGroupId',
                delegationId: ':delegationId'
            };
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.entitlement_getRoleIdForSpecifiedOperators).respond(expectedResponse);
            manageDigitalIdService.entitlement_getRoleIdForSpecifiedOperators(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
    });

    describe("Entitlements : view roles name and desc for an operator", function () {
        it('should return role name and desc for an operator ', function (done) {

            var requestParamsDefaultStructure = {
                contextId: ':contextId',
                roleId: ':roleId'
            };
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.entitlement_getOperatorRoleDesc).respond(expectedResponse);
            manageDigitalIdService.entitlement_getOperatorRoleDesc(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
    });

    describe("RTC Payments : get the static data from database", function () {
        it('should return all static transactions RTC database ', function (done) {
            var expectedResponse = [
                { code: 200, responseType: "SUCCESS"}
            ];
            $httpBackend.expectGET(url.getParticipatingBanks).respond(expectedResponse);
            manageDigitalIdService.getParticipatingBanks()
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });

        it('should return all static transactions RTC database ', function (done) {
          var requestParamsDefaultStructure = {
            paymentInstructionCode: ':paymentInstructionCode'
          };
            var expectedResponse = [
                { code: 200, responseType: "SUCCESS"}
            ];
            $httpBackend.expectGET(url.getAccountStyles).respond(expectedResponse);
            manageDigitalIdService.getAccountStyles(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
        it('should return all static transactions RTC database ', function (done) {
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.getPaymentLimit).respond(expectedResponse);
            manageDigitalIdService.getPaymentLimit()
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
        it('should return all static transactions RTC database ', function (done) {
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.getProductAvailability).respond(expectedResponse);
            manageDigitalIdService.getProductAvailability()
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
        it('should return all static transactions RTC database ', function (done) {
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.getPaymentCharges).respond(expectedResponse);
            manageDigitalIdService.getPaymentCharges()
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
    });

    describe("RTC Payments : Participating Bank", function () {
        it("it should edit participating bank", function (done) {
            var requestParamsDefaultStructure = {
                id: ':id'
            };

            var payload = {
                "bic": 'GTFD',
                "code": '1234',
                "name": 'ibanka'
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectPUT(url.editParticipatingBank).respond(expectedResponse);
            manageDigitalIdService.editParticipatingBank(payload, requestParamsDefaultStructure)
                .then(function (value) {
                expect(value.code).toEqual(expectedResponse.code);
                expect(value.responseType).toEqual(expectedResponse.responseType);
                done();
            });
            $httpBackend.flush();
        });

        it("it should create participating bank", function (done) {

            var payload = {
                "bic": 'RDDER',
                "code": '7642',
                "name": 'myNewBank'
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectPOST(url.createParticipatingBank).respond(expectedResponse);
            manageDigitalIdService.createParticipatingBank(payload)
                .then(function (value) {
                expect(value.code).toEqual(expectedResponse.code);
                expect(value.responseType).toEqual(expectedResponse.responseType);
                done();
            });
            $httpBackend.flush();
        });

        it("it should delete participating bank", function (done) {
            var requestParamsDefaultStructure = {
                id: ':id'
            };


            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectDELETE(url.deleteParticipatingBank).respond(expectedResponse);
            manageDigitalIdService.deleteParticipatingBank(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
    });

    describe("RTC Payments : Account Styles", function () {

      it('should delete account style', function (done) {
        var requestParamsDefaultStructure = {
          accountStyleId: ':accountStyleId',
          paymentInstructionTypeId: ':paymentInstructionTypeId'
        };

        var expectedResponse = { code: 200, responseType: "SUCCESS"};
        $httpBackend.expectDELETE(url.deleteAccountStyle).respond(expectedResponse);
        manageDigitalIdService.deleteAccountStyle(requestParamsDefaultStructure)
            .then(function (value) {
                expect(value.code).toEqual(expectedResponse.code);
                expect(value.responseType).toEqual(expectedResponse.responseType);
                done();
            });
        $httpBackend.flush();

      });

        it("should create an account style", function (done) {
            var payload = {
                "code": 'RYU',
                "type": '451',
                "description": 'MYPLAN'
            };

            var expectedResponse = {code: 200, responseType: "SUCCESS"};
            $httpBackend.expectPOST(url.createAccountStyle).respond(expectedResponse);
            manageDigitalIdService.createAccountStyle(payload)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });

        it("should link account style to payment instruction", function (done) {
            var requestParamsDefaultStructure = {
                accountStyleId: ':accountStyleId',
                paymentInstructionTypeId: ':paymentInstructionTypeId'
            };
            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectPOST(url.linkAccountStyle).respond(expectedResponse);
            manageDigitalIdService.linkAccountStyle(requestParamsDefaultStructure)
                .then(function (value) {
                expect(value.code).toEqual(expectedResponse.code);
                expect(value.responseType).toEqual(expectedResponse.responseType);
                done();
            });
            $httpBackend.flush();
        });

    });

    describe("RTC Payments : get all Account Styles", function () {

        it('should list the all account styles ', function (done) {
            var expectedResponse = [{ code: 200, responseType: "SUCCESS"}];
            var requestParameters = {
                username: 'suit'
            };

            $httpBackend.expectGET(url.getAllAccountStyles).respond(expectedResponse);
            manageDigitalIdService.getAllAccountStyles()
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();

        });
    });
    describe("RTC Payments : Payment Limit", function (){
      it("it should edit payment limit", function (done) {

        var payload = {
            "amount": "5000",
            "type": "RTC"
        };

          var expectedResponse = { code: 200, responseType: "SUCCESS"};
          $httpBackend.expectPUT(url.editPaymentLimit).respond(expectedResponse);
          manageDigitalIdService.editPaymentLimit(payload)
              .then (function(value){
              expect(value.code).toEqual(expectedResponse.code);
              expect(value.responseType).toEqual(expectedResponse.responseType);
              done();
          });
          $httpBackend.flush();
      });
    });

    describe("RTC Payments : Payment Charge", function (){
      it("it should edit payment charge", function (done) {

        var requestParamsDefaultStructure = {
            product: ':product'
        };

        var payload = {
            "value": "45",
            "description": "RTC",
             "id": "RTC"
        };

          var expectedResponse = { code: 200, responseType: "SUCCESS"};
          $httpBackend.expectPUT(url.editPaymentCharges).respond(expectedResponse);
          manageDigitalIdService.editPaymentCharge(payload, requestParamsDefaultStructure)
              .then (function(value){
              expect(value.code).toEqual(expectedResponse.code);
              expect(value.responseType).toEqual(expectedResponse.responseType);
              done();
          });
          $httpBackend.flush();
      });
    });

    describe("RTC Payments : Payment Instructions", function () {
            it("should get payment instructions", function (done) {
                var expectedResponse = [
                    { code: 200, responseType: "SUCCESS"}
                ];
                $httpBackend.expectGET(url.getPaymentInstructions).respond(expectedResponse);
                manageDigitalIdService.getPaymentInstructions()
                    .then(function (value) {
                        expect(value.code).toEqual(expectedResponse.code);
                        expect(value.responseType).toEqual(expectedResponse.responseType);
                        done();
                    });
                $httpBackend.flush();

        });
    });

    describe("RTC Payments : Product Availability", function () {
        it("should update product availability", function (done) {
            var requestParamsDefaultStructure = {
                product: ':product'
            };

            var payload = {
                "startTime": '8:00',
                "endTime": '16:00'
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectPUT(url.updateProductAvailability).respond(expectedResponse);
            manageDigitalIdService.updateProductAvailability(payload.startTime, payload.endTime,
                requestParamsDefaultStructure)
                .then(function (value) {
                expect(value.code).toEqual(expectedResponse.code);
                expect(value.responseType).toEqual(expectedResponse.responseType);
                done();
            });
            $httpBackend.flush();

        });
    });

    describe("RTC Payments : search by reference number", function () {

        it('should return  payment details matching the search criteria', function (done) {
            var referenceNumber = 'sddsfsdff45656';

            var requestParamsDefaultStructure = {
                referenceNumber: ':referenceNumber'
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.findByReferenceNumber).respond(expectedResponse);
            manageDigitalIdService.findByReferenceNumber(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });

    });

    describe("RTC Payments : search by card number", function () {

        it('should return  payment details matching the search criteria', function (done) {
            var cardNumber = '2928100912319009';

            var requestParamsDefaultStructure = {
                cardNumber: ':cardNumber'
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.findByCardNumber).respond(expectedResponse);
            manageDigitalIdService.findByCardNumber(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
    });

    describe("RTC Payments : search by account number", function () {

        it('should return  payment details matching the search criteria', function (done) {
            var accountFrom = '070424845';

            var requestParamsDefaultStructure = {
                accountFrom: ':accountFrom'
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.findByAccountNumber).respond(expectedResponse);
            manageDigitalIdService.findByAccountNumber(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
    });
    describe("RTC Pending Payments : search by pending payments", function () {

        it('should return  pending payment details matching the search criteria', function (done) {
//            var dateFrom = "2016-10-10";
//            var dateTo = "2016-10-10";
            var requestParamsDefaultStructure = {
                startDate: ':startDate',
                endDate: ':endDate'
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.searchPendingPayments).respond(expectedResponse);
            manageDigitalIdService.searchPendingPayments(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });
    });

    describe("RTC Payments : get payment state for selected reference number", function () {
        it('should return  payment state for reference number', function (done) {
            var referenceNumber = 'sddsfsdff45656';

            var requestParamsDefaultStructure = {
                referenceNumber: ':referenceNumber'
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.findPaymentDetails).respond(expectedResponse);
            manageDigitalIdService.findPaymentDetails(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });

    });

    describe("RTC Payments : get payment state from BOLPES on selected reference number", function () {
        it('should return  payment state from BOLPES on reference number', function (done) {
            var referenceNumber = 'sddsfsdff45656';

            var requestParamsDefaultStructure = {
                referenceNumber: ':referenceNumber'
            };

            var expectedResponse = { code: 200, responseType: "SUCCESS"};
            $httpBackend.expectGET(url.getBolpesStatus).respond(expectedResponse);
            manageDigitalIdService.getBolpesStatus(requestParamsDefaultStructure)
                .then(function (value) {
                    expect(value.code).toEqual(expectedResponse.code);
                    expect(value.responseType).toEqual(expectedResponse.responseType);
                    done();
                });
            $httpBackend.flush();
        });

    });

    describe("RTC Payments : get entities", function () {
      it('should get RTC entities', function (done) {
        var expectedResponse = [{code:200, responseType: "SUCCESS"}];
        $httpBackend.expectGET(url.getRTCEntities).respond(expectedResponse);
        manageDigitalIdService.getRTCEntities()
          .then(function (value) {
            expect(value.code).toEqual(expectedResponse.code);
            expect(value.responseType).toEqual(expectedResponse.responseType);
            done();
          });
          $httpBackend.flush();
      });
    });

    describe("RTC Payments : search audit log", function () {

      it('should return audit log matching search criteria', function (done) {
        var payload = {dateFrom: "2016-10-11", dateTo: "2016-10-11", userName: "", entityName: ""};

        var expectedResponse = [{ code: 200, responseType: "SUCCESS"}];
        $httpBackend.expectPOST(url.searchRTCAuditLog).respond(expectedResponse);
        manageDigitalIdService.searchRTCAuditLog(payload.startFrom, payload.dateTo, payload.userName, payload.entityName)
            .then(function (value) {
                expect(value.code).toEqual(expectedResponse.code);
                expect(value.responseType).toEqual(expectedResponse.responseType);
                done();
            });
        $httpBackend.flush();
      });
    });
});
