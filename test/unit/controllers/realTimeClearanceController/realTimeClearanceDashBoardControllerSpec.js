/*global angular */

'use strict';

describe("Unit : RealTimeClearanceDashBoardController", function () {

    var scope, event, manageDigitalIdService, location, $httpBackend, createController, errorMessageFactory, applicationCacheFactory;

    var referenceNumberDeferred, pendingDeferred, accountNumberDeferred, cardNumberDeferred, paymentStateDeferred, bolpesDeferred;

    var referenceNumberResults = {"accountFrom": "1234567890", "accountName": "RTC", "amount": 2500.00, "customerRef": "OM-20160311115645TEST", "beneficiaryRef": "OM-20160311115645TEST",
        "customerBPID": 78965423, "cardNumber": "2928100912319009", "cellNumber": "27846655520", "accountTo": "123412342", "beneficiaryName": "John Brown", "bicAddress": "SBZAZAJJ",
        "branchCode": "456321", "beneficiaryId": null, "firstName": "John", "lastName": "Brown", "beneficiaryEmail": "test@standardbank.co.za", "beneficiaryCellNumber": null,
        "notificationRequired": "Y", "interchangeId": "OM20160308121445", "traceId": "a732c0d7-5a29-47f3-b673-f0af9e9934b3", "reqTimestamp": 1460536277942, "accountFromBranchCode": "12345"};

    var cardNumberResults = {
        "numberOfElements": 19,
        "content": [
            {
                "accountFrom": "1234567890",
                "accountName": "RTC",
                "amount": 2500,
                "customerRef": "OM-20160311115645TEST",
                "beneficiaryRef": "OM-20160311115645TEST",
                "customerBPID": 78965423,
                "cardNumber": "2928100912319009",
                "cellNumber": "27846655520",
                "accountTo": "123412342",
                "beneficiaryName": "John Brown",
                "bicAddress": "SBZAZAJJ",
                "branchCode": "456321",
                "beneficiaryId": null,
                "firstName": "John",
                "lastName": "Brown",
                "beneficiaryEmail": "test@standardbank.co.za",
                "beneficiaryCellNumber": null,
                "notificationRequired": "Y",
                "interchangeId": "OM20160308121445",
                "traceId": "a732c0d7-5a29-47f3-b673-f0af9e9934b3",
                "reqTimestamp": 1460536277942,
                "accountFromBranchCode": "12345"
            },
            {
                "accountFrom": "1234567890",
                "accountName": "RTC",
                "amount": 2500,
                "customerRef": "OM-20160311115645TEST",
                "beneficiaryRef": "OM-20160311115645TEST",
                "customerBPID": 78965423,
                "cardNumber": "2928100912319009",
                "cellNumber": "27846655520",
                "accountTo": "123412342",
                "beneficiaryName": "John Brown",
                "bicAddress": "SBZAZAJJ",
                "branchCode": "456321",
                "beneficiaryId": null,
                "firstName": null,
                "lastName": null,
                "beneficiaryEmail": null,
                "beneficiaryCellNumber": null,
                "notificationRequired": "N",
                "interchangeId": "RTC161740001000",
                "traceId": "73594341-b5c7-4c19-a1c8-fa3f78fa7f06",
                "reqTimestamp": 1466592629221,
                "accountFromBranchCode": "12345"
            },
            {
                "accountFrom": "21491208",
                "accountName": "RTC",
                "amount": 2500,
                "customerRef": "OM-20160311115645TEST",
                "beneficiaryRef": "OM-20160311115645TEST",
                "customerBPID": 78965423,
                "cardNumber": "2928100912319009",
                "cellNumber": "27846655520",
                "accountTo": "9068732731",
                "beneficiaryName": "John Brown",
                "bicAddress": "SBZAZAJJ",
                "branchCode": "456321",
                "beneficiaryId": "",
                "firstName": "Muhammed",
                "lastName": "Ali",
                "beneficiaryEmail": "MuhammedAli@gmail.com",
                "beneficiaryCellNumber": "0845480972",
                "notificationRequired": "N",
                "interchangeId": "RTC161950001189",
                "traceId": "43582394952734958273454",
                "reqTimestamp": 1468383792981,
                "accountFromBranchCode": "12345"
            },
            {
                "accountFrom": "21491208",
                "accountName": "RTC",
                "amount": 2500,
                "customerRef": "OM-20160311115645TEST",
                "beneficiaryRef": "OM-20160311115645TEST",
                "customerBPID": 78965423,
                "cardNumber": "2928100912319009",
                "cellNumber": "27846655520",
                "accountTo": "9068732731",
                "beneficiaryName": "John Brown",
                "bicAddress": "SBZAZAJJ",
                "branchCode": "456321",
                "beneficiaryId": "",
                "firstName": "Muhammed",
                "lastName": "Ali",
                "beneficiaryEmail": "MuhammedAli@gmail.com",
                "beneficiaryCellNumber": "0845480972",
                "notificationRequired": "N",
                "interchangeId": "RTC161860001056",
                "traceId": "43582394952734958273454",
                "reqTimestamp": 1468383794249,
                "accountFromBranchCode": "12345"
            }
        ]
    };

    var accountNumberResults = {
        "numberOfElements": 7,
        "content": [
            {
                "accountFrom": "070424845",
                "accountName": "Mike Tyson",
                "amount": 10,
                "customerRef": "string",
                "beneficiaryRef": "MAli",
                "customerBPID": 0,
                "cardNumber": "5221266361198418",
                "cellNumber": "27845480972",
                "accountTo": "9068732731",
                "beneficiaryName": "Muhammed Ali",
                "bicAddress": "BIDBZAJJ",
                "branchCode": "632005",
                "beneficiaryId": "",
                "firstName": "Muhammed",
                "lastName": "Ali",
                "beneficiaryEmail": "MuhammedAli@gmail.com",
                "beneficiaryCellNumber": "0845480972",
                "notificationRequired": "N",
                "interchangeId": "RTC161900001096",
                "traceId": "string",
                "reqTimestamp": 1467973563744,
                "accountFromBranchCode": "10923"
            },
            {
                "accountFrom": "070424845",
                "accountName": "Mike Tyson",
                "amount": 10,
                "customerRef": "string",
                "beneficiaryRef": "MAli",
                "customerBPID": 0,
                "cardNumber": "5221266361198418",
                "cellNumber": "27845480972",
                "accountTo": "9068732731",
                "beneficiaryName": "Muhammed Ali",
                "bicAddress": "BIDBZAJJ",
                "branchCode": "632005",
                "beneficiaryId": "",
                "firstName": "Muhammed",
                "lastName": "Ali",
                "beneficiaryEmail": "MuhammedAli@gmail.com",
                "beneficiaryCellNumber": "0845480972",
                "notificationRequired": "N",
                "interchangeId": "RTC161900001097",
                "traceId": "string",
                "reqTimestamp": 1467974076057,
                "accountFromBranchCode": "10923"
            },
            {
                "accountFrom": "070424845",
                "accountName": "Mike Tyson",
                "amount": 10,
                "customerRef": "string",
                "beneficiaryRef": "MAli",
                "customerBPID": 0,
                "cardNumber": "5221266361198418",
                "cellNumber": "27845480972",
                "accountTo": "9068732731",
                "beneficiaryName": "Muhammed Ali",
                "bicAddress": "BIDBZAJJ",
                "branchCode": "632005",
                "beneficiaryId": "",
                "firstName": "Muhammed",
                "lastName": "Ali",
                "beneficiaryEmail": "MuhammedAli@gmail.com",
                "beneficiaryCellNumber": "0845480972",
                "notificationRequired": "N",
                "interchangeId": "RTC161900001098",
                "traceId": "string",
                "reqTimestamp": 1467974111324,
                "accountFromBranchCode": "10923"
            },
            {
                "accountFrom": "070424845",
                "accountName": "Mike Tyson",
                "amount": 10,
                "customerRef": "string",
                "beneficiaryRef": "MAli",
                "customerBPID": 0,
                "cardNumber": "5221266361198418",
                "cellNumber": "27845480972",
                "accountTo": "9068732731",
                "beneficiaryName": "Muhammed Ali",
                "bicAddress": "BIDBZAJJ",
                "branchCode": "632005",
                "beneficiaryId": "",
                "firstName": "Muhammed",
                "lastName": "Ali",
                "beneficiaryEmail": "MuhammedAli@gmail.com",
                "beneficiaryCellNumber": "0845480972",
                "notificationRequired": "N",
                "interchangeId": "RTC161900001099",
                "traceId": "string",
                "reqTimestamp": 1467974563247,
                "accountFromBranchCode": "10923"
            },
            {
                "accountFrom": "070424845",
                "accountName": "Mike Tyson",
                "amount": 10,
                "customerRef": "string",
                "beneficiaryRef": "MAli",
                "customerBPID": 0,
                "cardNumber": "5221266361198418",
                "cellNumber": "27845480972",
                "accountTo": "9068732731",
                "beneficiaryName": "Muhammed Ali",
                "bicAddress": "BIDBZAJJ",
                "branchCode": "632005",
                "beneficiaryId": "",
                "firstName": "Muhammed",
                "lastName": "Ali",
                "beneficiaryEmail": "MuhammedAli@gmail.com",
                "beneficiaryCellNumber": "0845480972",
                "notificationRequired": "N",
                "interchangeId": "RTC161900001100",
                "traceId": "string",
                "reqTimestamp": 1467974595101,
                "accountFromBranchCode": "10923"
            },
            {
                "accountFrom": "070424845",
                "accountName": "Mike Tyson",
                "amount": 10,
                "customerRef": "string",
                "beneficiaryRef": "MAli",
                "customerBPID": 0,
                "cardNumber": "4890612290000071",
                "cellNumber": "27845480972",
                "accountTo": "9068732731",
                "beneficiaryName": "Muhammed Ali",
                "bicAddress": "BIDBZAJJ",
                "branchCode": "632005",
                "beneficiaryId": "",
                "firstName": "Muhammed",
                "lastName": "Ali",
                "beneficiaryEmail": "MuhammedAli@gmail.com",
                "beneficiaryCellNumber": "0845480972",
                "notificationRequired": "N",
                "interchangeId": "RTC161940001134",
                "traceId": "string",
                "reqTimestamp": 1468317134844,
                "accountFromBranchCode": "10923"
            },
            {
                "accountFrom": "070424845",
                "accountName": "Mike Tyson",
                "amount": 100000,
                "customerRef": "string",
                "beneficiaryRef": "MAli",
                "customerBPID": 0,
                "cardNumber": "4890612290000071",
                "cellNumber": "27845480972",
                "accountTo": "9068732731",
                "beneficiaryName": "Muhammed Ali",
                "bicAddress": "BIDBZAJJ",
                "branchCode": "632005",
                "beneficiaryId": "",
                "firstName": "Muhammed",
                "lastName": "Ali",
                "beneficiaryEmail": "MuhammedAli@gmail.com",
                "beneficiaryCellNumber": "0845480972",
                "notificationRequired": "N",
                "interchangeId": "RTC161940001135",
                "traceId": "string",
                "reqTimestamp": 1468317147620,
                "accountFromBranchCode": "10923"
            }
        ]
    };

    var controller;
    beforeEach(module('app.controllers.orderManagementView.realTimeClearance.realTimeClearanceDashBoardController'));

    beforeEach(inject(function ($q, $rootScope, $controller, ManageDigitalIdService, $location, _errorMessagesFactory_,
                                ApplicationCacheFactory, _$httpBackend_) {
        scope = $rootScope.$new();
        controller = $controller;
        manageDigitalIdService = ManageDigitalIdService;
        $httpBackend = _$httpBackend_;
        location = $location;
        errorMessageFactory = _errorMessagesFactory_;
        applicationCacheFactory = ApplicationCacheFactory;


        referenceNumberDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'findByReferenceNumber').and.returnValue(referenceNumberDeferred.promise);

        accountNumberDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'findByAccountNumber').and.returnValue(accountNumberDeferred.promise);

        cardNumberDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'findByCardNumber').and.returnValue(cardNumberDeferred.promise);

        paymentStateDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'findPaymentDetails').and.returnValue(paymentStateDeferred.promise);

        bolpesDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'getBolpesStatus').and.returnValue(bolpesDeferred.promise);

        pendingDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'searchPendingPayments').and.returnValue(pendingDeferred.promise);

        createController = function () {
            return   controller("RealTimeClearanceDashBoardController as rtcController", {
                $scope: scope,
                ManageDigitalIdService: manageDigitalIdService,
                ApplicationCacheFactory: applicationCacheFactory,
                _errorMessagesFactory_: errorMessageFactory
            })
        };
    }));

    describe('initializing function ', function () {
        it('should initialize the scope ', function () {
            createController();
            scope.rtcController.searching = false;
            var searchType = 'STATICDATA';
            scope.rtcController.currentPage = 1;
            scope.rtcController.maxSize = scope.rtcController.numPerPage = 10;
            scope.rtcController.init();
            expect(scope.rtcController.showSelectedSearchMode).toBeDefined();
            scope.rtcController.showSelectedSearchMode(searchType);
            applicationCacheFactory.put('searchType', searchType);
            expect(scope.rtcController.searchType).toBe('STATICDATA');
        });

        it('should initialize the scope ', function () {
            createController();
            expect(scope.rtcController.goBackToResults).toBeDefined();
            scope.rtcController.goBackToResults();
            expect(scope.rtcController.searchResults).toBeDefined();
            expect(scope.rtcController.searchResults).toBeTruthy();
        });

        it('should set tcController.isOpenCalendar to true', function(){
            createController();
            event = scope.$emit("click");
            expect(event).toBeDefined();
            scope.rtcController.isOpenCalendar(event, 'endDt');
            expect(event.defaultPrevented).toBeTruthy();
        });
    });

    describe("show payment details by reference number", function () {
        it("should search by reference number", function () {
            var searchType = 'SEARCHBYREFERENCE';
            var searchNumber = 'OM20160308121445';
            createController();
            scope.rtcController.showSelectedSearchMode(searchType);
            applicationCacheFactory.put('searchType', searchType);
            expect(scope.rtcController.searchType).toBe('SEARCHBYREFERENCE');
            scope.rtcController.searchByReferenceNumber(searchNumber);
            var searchType = applicationCacheFactory.get('searchType');
            referenceNumberDeferred.resolve(referenceNumberResults);
            scope.$apply();
            expect(scope.rtcController.paymentSearchResults.customerRef).toBeDefined();
            expect(scope.rtcController.responseError).toBeUndefined();
        });

        it("should search by reference number and return error when domestic payments is down", function () {
            var searchType = 'SEARCHBYREFERENCE';
            var searchNumber = 'OM20160308121445';
            var value = "Load balancer does not have available server for client: om-domestic-payments-service";
            createController();
            scope.rtcController.showSelectedSearchMode(searchType);
            applicationCacheFactory.put('searchType', searchType);
            expect(scope.rtcController.searchType).toBe('SEARCHBYREFERENCE');
            scope.rtcController.searchByReferenceNumber(searchNumber);
            var searchType = applicationCacheFactory.get('searchType');
            referenceNumberDeferred.resolve(value);
            scope.$apply();
            expect(scope.rtcController.responseError).toBeUndefined();
            expect(value).toEqual("Load balancer does not have available server for client: om-domestic-payments-service");
        });

        it("should reject call to search by reference number", function () {
            var error = {
                "data": {
                    "responseMessage": [
                        {
                            "message": "The payment request order with reference responseMessage could not be found",
                            "errorCode": "paymentrequest.not.found"
                        }
                    ]
                },
                "status": 404
            };
            var responseMessage = [
                {"message": "The payment request order with reference 0M20160308121445 could not be found", "errorCode": "paymentrequest.not.found"}
            ];
            createController();
            scope.rtcController.searchByReferenceNumber();
            referenceNumberDeferred.reject(error);
            scope.$apply();
            expect(error.status).toBe(404);
            expect(scope.rtcController.errorRefMessage).toBe(error.data.responseMessage[0].message);
            expect(scope.rtcController.response).toBeUndefined();
        });

        it("should reject call when searching by incorrect reference number", function () {
            var error = {
                "data": {
                    "responseMessage": [
                        {
                            "message": "The payment request order with reference responseMessage could not be found",
                            "errorCode": "paymentrequest.not.found"
                        }
                    ]
                },
                "status": 404
            };
            var responseMessage = [
                {"message": "The payment request order with reference 0M20160308121445 could not be found", "errorCode": "paymentrequest.not.found"}
            ];
            createController();
            scope.rtcController.searchByReferenceNumber();
            referenceNumberDeferred.reject(error);
            scope.$apply();
            expect(error.status).toBe(404);
            expect(scope.rtcController.errorRefMessage).toBe(error.data.responseMessage[0].message);
        });

        it("should reject call to search by reference number when system not available", function () {
            var error = {
                "data": {
                    "responseMessage": [
                        {
                            "message": "The payment request order with reference responseMessage could not be found",
                            "errorCode": "paymentrequest.not.found"
                        }
                    ]
                },
                "status": undefined
            };

            createController();
            scope.rtcController.searchByReferenceNumber();
            referenceNumberDeferred.reject(error);
            scope.$apply();
            expect(error.status).not.toBe(404);
            expect(scope.rtcController.errorRefMessage).toBe('A communication error has occurred');
            expect(scope.rtcController.response).toBeUndefined();
        });
    });

    describe("show payment details by card number", function () {
        it("should search by card number", function () {
            createController();
            var searchType = 'SEARCHBYCARDNUMBER';
            scope.rtcController.showSelectedSearchMode(searchType);
            applicationCacheFactory.put('searchType', searchType);
            expect(scope.rtcController.searchType).toBe('SEARCHBYCARDNUMBER');
            scope.rtcController.searchByCardNumber('2928100912319009');
            var searchType = applicationCacheFactory.get('searchType');
            cardNumberDeferred.resolve(cardNumberResults);
            scope.$apply();
            expect(scope.rtcController.responseError).toBeUndefined();
        });
        it("should search by card number and return error when domestic payments is down", function () {
            createController();
            var value = "Load balancer does not have available server for client: om-domestic-payments-service";

            var searchType = 'SEARCHBYCARDNUMBER';
            scope.rtcController.showSelectedSearchMode(searchType);
            applicationCacheFactory.put('searchType', searchType);
            expect(scope.rtcController.searchType).toBe('SEARCHBYCARDNUMBER');
            scope.rtcController.searchByCardNumber('2928100912319009');
            cardNumberDeferred.resolve(value);
            scope.$apply();
            expect(scope.rtcController.responseError).toBeUndefined();
        });

        it("should reject call when searching with incorrect card number", function () {
            var error = {
                "data": {
                    "responseMessage": [
                        {
                            "message": "The payment request order with reference responseMessage could not be found",
                            "errorCode": "paymentrequest.not.found"
                        }
                    ]
                },
                "status": 404
            };
            createController();
            var searchType = 'SEARCHBYCARDNUMBER';
            scope.rtcController.searchByCardNumber(searchType);
            cardNumberDeferred.reject(error);
            scope.$apply();
            expect(error.status).toBe(404);
            expect(scope.rtcController.errorRefMessage).toBe(error.data.responseMessage[0].message);
            expect(scope.rtcController.response).toBeUndefined();
        });
        it("should reject call when searching with incorrect card number", function () {
            var error = {
                "data": {
                    "responseMessage": [
                        {
                            "message": "The payment request order with reference responseMessage could not be found",
                            "errorCode": "paymentrequest.not.found"
                        }
                    ]
                },
                "status": undefined
            };
            createController();
            var searchType = 'SEARCHBYCARDNUMBER';
            scope.rtcController.searchByCardNumber(searchType);
            cardNumberDeferred.reject(error);
            scope.$apply();
            expect(error.status).not.toBe(404);
            expect(scope.rtcController.errorRefMessage).toBe(errorMessageFactory.error502);
        });
    });

    describe("show payment details by account number", function () {
        it("should search by account number", function () {
            var searchType = 'SEARCHBYACCOUNTNUMBER';
            createController();
            scope.rtcController.showSelectedSearchMode(searchType);
            applicationCacheFactory.put('searchType', searchType);
            expect(scope.rtcController.searchType).toBe('SEARCHBYACCOUNTNUMBER');
            scope.rtcController.searchByAccountNumber('1234567890');
            var searchType = applicationCacheFactory.get('searchType');
            accountNumberDeferred.resolve(accountNumberResults);
            scope.$apply();
            expect(scope.rtcController.responseError).toBeUndefined();
        });

        it("should search by account number and return error when domestic payments is down", function () {
            var searchType = 'SEARCHBYACCOUNTNUMBER';
            var value = "Load balancer does not have available server for client: om-domestic-payments-service";
            createController();
            scope.rtcController.showSelectedSearchMode(searchType);
            applicationCacheFactory.put('searchType', searchType);
            expect(scope.rtcController.searchType).toBe('SEARCHBYACCOUNTNUMBER');
            scope.rtcController.searchByAccountNumber('1234567890');
            var searchType = applicationCacheFactory.get('searchType');
            accountNumberDeferred.resolve(value);
            scope.$apply();
            expect(scope.rtcController.responseError).toBeUndefined();
            expect(value).toEqual("Load balancer does not have available server for client: om-domestic-payments-service");

        });

        it("should reject call when searching with incorrect account number", function () {
            var error = {
                "data": {
                    "responseMessage": [
                        {
                            "message": "The payment request order with reference responseMessage could not be found",
                            "errorCode": "paymentrequest.not.found"
                        }
                    ]
                },
                "status": 404
            };
            createController();
            scope.rtcController.searchByAccountNumber();
            accountNumberDeferred.reject(error);
            scope.$apply();
            expect(error.status).toBe(404);
            expect(scope.rtcController.errorRefMessage).toBe(error.data.responseMessage[0].message);
        });
        it("should reject call to search by account number when system is unavailable", function () {
            var error = {
                "data": {
                    "responseMessage": [
                        {
                            "message": "The payment request order with reference responseMessage could not be found",
                            "errorCode": "paymentrequest.not.found"
                        }
                    ]
                },
                "status": undefined
            };
            createController();
            scope.rtcController.searchByAccountNumber();
            accountNumberDeferred.reject('error message');
            scope.$apply();
            expect(error.status).not.toBe(404);
            expect(scope.rtcController.errorRefMessage).toBe(errorMessageFactory.error502);
            expect(scope.rtcController.response).toBeUndefined();
        });

    });

    describe("show payment state for selected reference number", function () {

        it("should show selected reference number details", function () {
            var paymentStateResults = {
                "numberOfElements": 3,
                "content": [
                    {
                        "id": 1253,
                        "creationDate": 1467628328086,
                        "rtcPaymentRequestId": "RTC161860001056",
                        "fromState": "INITIAL", "toState": "RECEIVED",
                        "trigger": "REQUEST_PAYMENT",
                        "eventRejected": false
                    }
                ]};
            createController();
            scope.rtcController.viewSelectedReferenceNumberDetails('RTC161860001056');
            paymentStateDeferred.resolve(paymentStateResults);
            scope.$apply();
            expect(scope.rtcController.paymentDetailsResults[0].id).toBe(paymentStateResults.content[0].id);
            expect(scope.rtcController.paymentDetailsResults[0].creationDate).toBe(paymentStateResults.content[0].creationDate);
        });

        it("should show selected reference number details", function () {
            var paymentStateResults = {
                "numberOfElements": 0,
                "content": []
            };

            var bolpes = {"numberOfElements": 2, "contet": [
                {"transactionId": "0000001", "status": "EFUND"},
                {"transactionId": "0000002", "status": "COFFU"}
            ]};
            createController();
            applicationCacheFactory.put('paymentSearchResults', cardNumberResults.content);
            applicationCacheFactory.put('searchType', "SEARCHBYREFERENCE");
            scope.rtcController.viewSelectedReferenceNumberDetails('RTC161860001056');
            expect(scope.rtcController.findBySelectedReference).toBeDefined();
            expect(scope.rtcController.getBolpesStatus).toBeDefined();
            paymentStateDeferred.resolve(paymentStateResults);
            scope.$apply();
            scope.rtcController.getBolpesStatus('RTC161860001056');
            bolpesDeferred.resolve(bolpes);
            scope.$apply();
            expect(scope.rtcController.bolpesResults).toBeUndefined();
            scope.rtcController.findBySelectedReference('RTC161860001056');
            expect(scope.rtcController.paymentDetailsResults).toBeUndefined();
        });

        it("should find selected reference number details from the response", function () {
            var paymentStateResults = {
                "numberOfElements": 0,
                "content": []
            };
            createController();
            applicationCacheFactory.put('paymentSearchResults', cardNumberResults.content);
            scope.rtcController.viewSelectedReferenceNumberDetails('RTC161860001056');
            expect(scope.rtcController.findBySelectedReference).toBeDefined();
            scope.rtcController.findBySelectedReference('RTC161860001056');
            paymentStateDeferred.resolve(paymentStateResults);
            scope.$apply();
            expect(scope.rtcController.paymentDetailsResults).toBeUndefined();
        });

        it("should return no results when selected reference number details not found", function () {
            var paymentStateResult = {"numberOfElements": 0};
            createController();
            scope.rtcController.viewSelectedReferenceNumberDetails('RTC161860001056');
            paymentStateDeferred.resolve(paymentStateResult);
            scope.$apply();
            expect(scope.rtcController.paymentDetailsResults).toBeUndefined();

        });

        it("should return no results when selected reference number details on BOLPES not found", function () {
            var paymentStateResult = {"numberOfElements": 0};
            var bolpes = {"numberOfElements": 0, "contet": []};
            createController();
            scope.rtcController.viewSelectedReferenceNumberDetails('RTC161860001056');
            expect(scope.rtcController.findBySelectedReference).toBeDefined();
            scope.rtcController.findBySelectedReference('RTC161860001056');
            scope.rtcController.getBolpesStatus('RTr161860001056');
            bolpesDeferred.resolve(bolpes);
            scope.$apply();
            expect(scope.rtcController.bolpesResults).toBeUndefined();
            paymentStateDeferred.resolve(paymentStateResult);
            scope.$apply();
        });

        it("should return no results when selected reference number details on BOLPES not found", function () {
            var paymentStateResult = {"numberOfElements": 0};
            var bolpes = {"numberOfElements": -1, "contet": []};
            createController();
            scope.rtcController.viewSelectedReferenceNumberDetails('RTC161860001056');
            expect(scope.rtcController.findBySelectedReference).toBeDefined();
            scope.rtcController.findBySelectedReference('RTC161860001056');
            scope.rtcController.getBolpesStatus('RTr161860001056');
            bolpesDeferred.reject("error");
            scope.$apply();
            expect(scope.rtcController.bolpesResults).toBeUndefined();
            paymentStateDeferred.resolve(paymentStateResult);
            scope.$apply();
        });

        it("should reject call to show selected reference number details", function () {
            createController();
            scope.rtcController.viewSelectedReferenceNumberDetails();
            paymentStateDeferred.reject('error message');
            scope.$apply();
            expect(scope.rtcController.errorRefMessage).toBe(errorMessageFactory.error502);
            expect(scope.rtcController.response).toBeUndefined();
        });

    });

    describe("should search pending payments", function () {
        it("should call the service to return pending payments", function () {
            createController();
            var value = {
                "numberOfElements":1,
                "content":[{
                    "id":152365,
                    "rtcPaymentRequestId":"RTC162850152145",
                    "state":"EXECUTED",
                    "creationDate":1476171802081
                }]};
            var dateTimeRanges = {
                "startDate": new Date(),
                "endDate": new Date()
            };

            expect(scope.rtcController.pendingPaymentResults).toBeUndefined();
            expect(scope.rtcController.searchPendingPayments).toBeDefined();
            scope.rtcController.searchPendingPayments(dateTimeRanges);
            expect(scope.rtcController.dateTimeRanges).toBeDefined();
            applicationCacheFactory.put('searchType', 'SEARCHPENDINGPAYMENTS');
            pendingDeferred.resolve(value);
            scope.$apply();
            expect(scope.rtcController.pendingPaymentResults).toBeDefined();
            expect(scope.rtcController.pendingPaymentResults[0].rtcPaymentRequestId).toBe('RTC162850152145');

        });

        it("should call the service and find no entries for pending payments", function () {
            createController();
            var value = {
                "numberOfElements": 0,
                "content":[{
                    "id":152365,
                    "rtcPaymentRequestId":"RTC162850152145",
                    "state":"EXECUTED",
                    "creationDate":1476171802081
                }]};
            var dateTimeRanges = {
                "startDate": new Date(),
                "endDate": new Date()
            };

            expect(scope.rtcController.pendingPaymentResults).toBeUndefined();
            expect(scope.rtcController.searchPendingPayments).toBeDefined();
            scope.rtcController.searchPendingPayments(dateTimeRanges);
            expect(scope.rtcController.dateTimeRanges).toBeDefined();
            applicationCacheFactory.put('searchType', 'SEARCHPENDINGPAYMENTS');
            pendingDeferred.resolve(value);
            scope.$apply();
            expect(value.numberOfElements).toEqual(0);
            expect(scope.rtcController.errorRefMessage).toBeDefined();
            expect(scope.rtcController.errorRefMessage).toBe(' No pending payments for specified dates');

        });

        it("should call the service and return error for pending payments", function () {
            createController();
            var error = {
                "data": {
                    "responseMessage": [
                        {
                            "message": "communication error",
                            "errorCode": "paymentrequest.not.found"
                        }
                    ]
                },
                "status": 404
            };
            var dateTimeRanges = {
                "startDate": new Date(),
                "endDate": new Date()
            };

            expect(scope.rtcController.pendingPaymentResults).toBeUndefined();
            expect(scope.rtcController.searchPendingPayments).toBeDefined();
            scope.rtcController.searchPendingPayments(dateTimeRanges);
            expect(scope.rtcController.dateTimeRanges).toBeDefined();
            applicationCacheFactory.put('searchType', 'SEARCHPENDINGPAYMENTS');
            pendingDeferred.reject(error);
            scope.$apply();
            expect(scope.rtcController.errorRefMessage).toBeDefined();
            expect(scope.rtcController.errorRefMessage).toBe('communication error');

        });

        it("should return error when dates failed validations", function () {
            createController();
            var endDate = new Date();
            var endDateMinusOneDay = endDate.getTime() + 1000 * 60 * 60 * 24;
            var endDateMinusOneDayFormat = new Date(endDateMinusOneDay);
            var dateTimeRanges = {
                "startDate": new Date(),
                "endDate": endDateMinusOneDayFormat
            };
            scope.rtcController.searchPendingPayments(dateTimeRanges);
            expect(scope.rtcController.dateTimeRanges).toBeDefined();
        });
    });

    describe("validate the date entered ", function () {

        it("should validate the end date is greater than the current date", function () {
            createController();
            var startDate = new Date();
            var endDate = new Date();
            var endDateMinusOneDay = endDate.getTime() - 1000 * 60 * 60 * 24;
            var endDateMinusOneDayFormat = new Date(endDateMinusOneDay);
            expect(scope.rtcController.dateValidations).toBeDefined();
            scope.rtcController.dateValidations(startDate, endDateMinusOneDayFormat);
            expect(scope.rtcController.dateErrorMessage).toBeDefined();
            expect(scope.rtcController.dateErrorMessage).toBe('The end date should not be less than a start date');
        });

        it("should validate the end date is less than current date", function () {
            createController();
            var startDate = new Date();
            var endDate = new Date();
            var endDateMinusOneDay = endDate.getTime() + 1000 * 60 * 60 * 24 * 3;
            var endDateMinusOneDayFormat = new Date(endDateMinusOneDay);
            expect(scope.rtcController.dateValidations).toBeDefined();
            scope.rtcController.dateValidations(startDate, endDateMinusOneDayFormat);
            expect(scope.rtcController.dateErrorMessage).toBeDefined();
            expect(scope.rtcController.dateErrorMessage).toBe('The end date should not be greater than current date');
        });

        it("should validate the start date is not greater than a week", function () {
            createController();
            var startDate = new Date();
            var startDates = startDate.getTime() + 1000 * 60 * 60 * 24 * 7;
            var dateFrom = new Date(startDates);
            var endDate = new Date();
            expect(scope.rtcController.dateValidations).toBeDefined();
            scope.rtcController.dateValidations(dateFrom, endDate);
            expect(scope.rtcController.dateErrorMessage).toBe('The end date should not be less than a start date');
        });

        it("should validate the start date is not greater than a week", function () {
            createController();
            var startDate = new Date();
            var startDates = startDate.getTime() - 1000 * 60 * 60 * 24 * 7;
            var dateFrom = new Date(startDates);
            var endDate = new Date();
            expect(scope.rtcController.dateValidations).toBeDefined();
            scope.rtcController.dateValidations(dateFrom, endDate);
        });

        it("should validate the start date is greater than 7 days", function () {
            createController();
            var startDate = new Date();
            var startDates = startDate.getTime() - 1000 * 60 * 60 * 24 * 8;
            var dateFrom = new Date(startDates);
            var endDate = new Date();
            expect(scope.rtcController.dateValidations).toBeDefined();
            scope.rtcController.dateValidations(dateFrom, endDate);
            expect(scope.rtcController.dateErrorMessage).toBe('The start date should not be less than a week (7 Days)');
        });
    });
});


