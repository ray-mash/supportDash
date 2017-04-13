/*global angular */

'use strict';

describe("Unit : StaticDataController", function () {

    var scope, manageDigitalIdService, location, $httpBackend, bankDeferred, accountDeferred, createController,
        errorMessageFactory, applicationCacheFactory, modal;

    var availabilityDeferred, chargeDeferred, limitDeferred, paymentInstructionDeferred, editParticipatingBankDeferred,
        createParticipatingBankDeferred, deleteParticipatingBankDeferred, updateProductAvailabilityDeferred,
        createAccountStyleDeferred, linkAccountStyleDeferred, deleteAccountStyleDeferred, editPaymentLimitDeferred,
        editPaymentChargeDeferred;

    var bankList = [
        {"id": 1, "version": 1, "name": "Absa", "bic": "ABSAZAJJ", "code": "301"},
        {"id": 2, "version": 1, "name": "African Bank", "bic": "AFRCZAJJ", "code": "430"}
    ];

    var accountStyle = {idcode: "RDF", type: "866", description: "DESCRIBEIT"};

    var linkedAccountStyle = {id: 2, code: "RDF", type: "866", description: "DESCRIBEIT"};

    var accountStyles = [
        {id: 1, version: 0, code: "ACH", type: "000", description: "ELITE"},
        {id: 14, version: 0, code: "A60", type: "000", description: "CONSOLIDATOR LINKED"}
    ];

    var paymentLimit = {"type": "RTC", "amount": 500000.0};

    var productValue = {
        "startTime": 7,
        "endTime": "19:00"
    };

    var productValue24Hours = {
        "startTime": null,
        "endTime": null
    };

    var participatingBanks = [
        {
            bic: "GTFREDR",
            code: "656",
            id: 12,
            name: "iBanki",
            version: 0
        },
        {
            bic: "WSEDTTGH",
            code: "325",
            id: 15,
            name: "UBanking",
            version: 0
        }
    ];

    var participatingBanksWithDuplicates = [
        {
            bic: "GTFREDR",
            code: "656",
            id: 12,
            name: "iBank",
            version: 0
        },
        {
            bic: "GTFCZDR",
            code: "609",
            id: 1,
            name: "iBank",
            version: 0
        },
        {
            bic: "WSEDTTGH",
            code: "325",
            id: 15,
            name: "aBank",
            version: 0
        }
    ];

    var duplicateBank = {
        bic: "WSEDTTGH",
        code: "325",
        id: 51,
        name: "aBank",
        version: 0
    };

    var noDuplicateBank = {
        bic: "WSEDTTrr",
        code: "115",
        id: 190,
        name: "VBSBank",
        version: 0
    };

    var bank = {
        bic: "GTFREDR",
        code: "656",
        id: 12,
        name: "iBanki",
        version: 0
    };

    var editedBank = {
        bic: "GTFREDR",
        code: "656",
        id: 1,
        name: "ziBank",
        version: 0
    };

    var duplicateCode = {
        bic: "REDYTI",
        code: "325",
        id: 123,
        name: "aweMa",
        version: 0
    };

    var paymentInstruction = {"id": 2, "version": 0, "code": "RTC", "name": "Real Time Clearance Name", "description": "Real Time Clearance payment instruction type"};

    var paymentCharge = {
        "id": "RTC",
        "description": "PAYMENT CHARGE FOR RTC",
        "value": 50,
        "whenCreated": "2016-07-15T08:08:08.000+0000",
        "whenModified": "2016-07-15T08:08:08.000+0000",
        "version": 1
    };

    var controller;
    beforeEach(module('app.controllers.orderManagementView.realTimeClearance.staticDataController'));

    beforeEach(inject(function ($q, $rootScope, $controller, ManageDigitalIdService, $location, _errorMessagesFactory_,
                                ApplicationCacheFactory, _$httpBackend_) {
        scope = $rootScope.$new();
        controller = $controller;
        manageDigitalIdService = ManageDigitalIdService;
        $httpBackend = _$httpBackend_;
        location = $location;
        errorMessageFactory = _errorMessagesFactory_;
        applicationCacheFactory = ApplicationCacheFactory;

        var modalResult = {
            then: function (callback) {
                callback("1234567890123453");
            }
        };
        spyOn(modal, "open")
            .and
            .returnValue({ result: modalResult });


        bankDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'getParticipatingBanks').and.returnValue(bankDeferred.promise);

        editParticipatingBankDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'editParticipatingBank').and.returnValue(editParticipatingBankDeferred.promise);

        createParticipatingBankDeferred = $q.defer();
        spyOn(manageDigitalIdService,
            'createParticipatingBank').and.returnValue(createParticipatingBankDeferred.promise);

        deleteParticipatingBankDeferred = $q.defer();
        spyOn(manageDigitalIdService,
            'deleteParticipatingBank').and.returnValue(deleteParticipatingBankDeferred.promise);

        accountDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'getAccountStyles').and.returnValue(accountDeferred.promise);

        createAccountStyleDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'createAccountStyle').and.returnValue(createAccountStyleDeferred.promise);

        linkAccountStyleDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'linkAccountStyle').and.returnValue(linkAccountStyleDeferred.promise);

        deleteAccountStyleDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'deleteAccountStyle').and.returnValue(deleteAccountStyleDeferred.promise);

        limitDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'getPaymentLimit').and.returnValue(limitDeferred.promise);

        editPaymentLimitDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'editPaymentLimit').and.returnValue(editPaymentLimitDeferred.promise);

        chargeDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'getPaymentCharges').and.returnValue(chargeDeferred.promise);

        editPaymentChargeDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'editPaymentCharge').and.returnValue(editPaymentChargeDeferred.promise);


        availabilityDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'getProductAvailability').and.returnValue(availabilityDeferred.promise);

        updateProductAvailabilityDeferred = $q.defer();
        spyOn(manageDigitalIdService,
            'updateProductAvailability').and.returnValue(updateProductAvailabilityDeferred.promise);

        paymentInstructionDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'getAllAccountStyles').and.returnValue(paymentInstructionDeferred.promise);

        createController = function () {
            return   controller("StaticDataController as staticController", {
                $scope: scope,
                ManageDigitalIdService: manageDigitalIdService,
                ApplicationCacheFactory: applicationCacheFactory,
                _errorMessagesFactory_: errorMessageFactory,
                $modal: modal
            })
        };
    }));

    describe('initializing function ', function () {
        it('should initialize the scope and call show selected search mode STATICDATA', function () {
            createController();
            scope.staticController.searching = false;
            var searchType = 'STATICDATA';
            scope.staticController.currentPage = 1;
            scope.staticController.maxSize = scope.staticController.numPerPage = 10;
            scope.staticController.init();
            expect(scope.staticController.showSelectedSearchMode).toBeDefined();
            scope.staticController.showSelectedSearchMode(searchType);
            applicationCacheFactory.put('searchType', searchType);
            expect(scope.staticController.searchType).toBe('STATICDATA');

        });
        it('should initialize the scope and not call show selected search mode STATICDATA', function () {
            createController();
            scope.staticController.searching = false;
            var searchType = 'Example';
            scope.staticController.currentPage = 1;
            scope.staticController.maxSize = scope.staticController.numPerPage = 10;
            scope.staticController.init();
            expect(scope.staticController.showSelectedSearchMode).toBeDefined();
            scope.staticController.showSelectedSearchMode(searchType);
            applicationCacheFactory.put('searchType', searchType);
            expect(scope.staticController.searchType).toBe('Example');
            expect(location.path()).toBe('/real-time-clearance-dashboard');

        });

        it('should initialize items in a page and call filtering service ', function () {
            createController();
            scope.staticController.accountStyles = accountStyles;
            scope.staticController.isVisible = true;
            expect(scope.staticController.accountStylesFilterChange).toBeDefined();
            scope.staticController.accountStylesFilterChange();
            expect(scope.staticController.availabilityToggle).toBeDefined();
            scope.staticController.availabilityToggle(true);
            expect(scope.staticController.isVisible).toBeTruthy();
        });

        it('should initialize items in a page and call filtering service ', function () {
            createController();
            scope.staticController.accountStyles = accountStyles;
            scope.staticController.isVisible = false;
            expect(scope.staticController.accountStylesFilterChange).toBeDefined();
            scope.staticController.accountStylesFilterChange();
            expect(scope.staticController.availabilityToggle).toBeDefined();
            scope.staticController.availabilityToggle();
            expect(scope.staticController.isVisible).toBeFalsy();
        });
    });

    describe('modal to create participating bank', function () {
        modal = {
            open: function (options) {
            }
        };

        it("should call modal for create participating bank ", function () {
            createController();
            scope.staticController.openModalForCreateParticipatingBank(bank);
            expect(modal.open).toHaveBeenCalled();
            applicationCacheFactory.put('Banks', participatingBanksWithDuplicates);
            scope.staticController.checkDuplication(duplicateBank);
            expect(scope.staticController.errorHandlingModal).toBeDefined();
        });

        it("should call modal for create participating bank ", function () {
            createController();
            scope.staticController.openModalForCreateParticipatingBank(bank);
            expect(modal.open).toHaveBeenCalled();
        });


        it("should call modal for create participating bank and fail when duplicates exist", function () {
            createController();
            scope.staticController.openModalForCreateParticipatingBank(bank);
            expect(modal.open).toHaveBeenCalled();
            applicationCacheFactory.put('Banks', participatingBanksWithDuplicates);
            scope.staticController.checkDuplication(noDuplicateBank);
        });

        it('should be false if BIC is not duplicated', function () {
            createController();
            scope.staticController.openModalForCreateParticipatingBank(bank);
            applicationCacheFactory.put('Banks', participatingBanksWithDuplicates);
            scope.staticController.checkDuplication(noDuplicateBank);
        });

        it('should be true if BIC is duplicated', function () {
            createController();
            scope.staticController.openModalForCreateParticipatingBank(bank);
            applicationCacheFactory.put('Banks', participatingBanksWithDuplicates);
            scope.staticController.checkDuplication(duplicateBank);
        });

        it('should be false if bank code is not duplicated', function () {
            createController();
            scope.staticController.openModalForCreateParticipatingBank(bank);
            applicationCacheFactory.put('Banks', participatingBanks);
            scope.staticController.checkDuplication(noDuplicateBank);
        });

        it('should be true if bank code is duplicated', function () {
            createController();
            scope.staticController.openModalForCreateParticipatingBank(bank);
            applicationCacheFactory.put('Banks', participatingBanks);
            scope.staticController.checkDuplication(duplicateCode);
        });

        it('should call service to create participating bank', function () {
            createController();
            scope.staticController.bank = editedBank;
            scope.staticController.participatingBanks = bankList;
            scope.staticController.createParticipatingBank(editedBank);
            createParticipatingBankDeferred.resolve(bankList);
            scope.$apply();
            expect(scope.staticController.handleCreateParticipatingBankResponse).toBeDefined();
            expect(scope.responseError).toBeUndefined();
        });

        it("should reject the call to edit participating bank", function () {
            createController();
            createParticipatingBankDeferred.reject('error message');
            scope.staticController.createParticipatingBank('');
            scope.$apply();
            expect(scope.staticController.responseError).toBe('error message');
            expect(scope.staticController.response).toBeUndefined();
        });

    });

    describe('modal to edit participating bank ', function () {
        modal = {
            open: function (options) {
            }
        };

        it("should call modal for edit participating bank ", function () {
            createController();
            scope.staticController.openModalForEditParticipatingBanks(bank);
            expect(modal.open).toHaveBeenCalled();
            expect(scope.staticController.checkDuplication).toBeDefined();
            applicationCacheFactory.put('Banks', participatingBanks);
            scope.staticController.checkDuplication(noDuplicateBank);
        });

        it('should be false if BIC is not duplicated', function () {
            createController();
            scope.staticController.openModalForEditParticipatingBanks(bank);
            applicationCacheFactory.put('Banks', participatingBanks);
            scope.staticController.checkDuplication(noDuplicateBank);
        });

        it('should be true if BIC is duplicated', function () {
            createController();
            scope.staticController.openModalForEditParticipatingBanks(bank);
            applicationCacheFactory.put('Banks', participatingBanksWithDuplicates);
            scope.staticController.checkDuplication(duplicateBank);
        });

        it('should be false if bank code is not duplicated', function () {
            createController();
            scope.staticController.openModalForEditParticipatingBanks(bank);
            applicationCacheFactory.put('Banks', participatingBanks);
            scope.staticController.checkDuplication(editedBank);
        });

        it('should be true if bank code is duplicated', function () {
            createController();
            scope.staticController.openModalForEditParticipatingBanks(bank);
            applicationCacheFactory.put('Banks', participatingBanks);
            scope.staticController.checkDuplication(duplicateCode);
        });

        it('should call service to edit participating bank', function () {
            createController();
            scope.staticController.bank = editedBank;
            applicationCacheFactory.put('Banks', participatingBanksWithDuplicates);
            scope.staticController.editParticipatingBank(editedBank);
            editParticipatingBankDeferred.resolve(bankList);
            scope.$apply();
            expect(scope.staticController.handleEditParticipatingBankResponse).toBeDefined();
            scope.staticController.handleEditParticipatingBankResponse(editedBank);

            expect(scope.staticController.responseError).toBeUndefined();
        });
        it('should call service to edit participating bank with duplicate code or bic', function () {
            createController();
            applicationCacheFactory.put('Banks', participatingBanksWithDuplicates);
            scope.staticController.editParticipatingBank(duplicateCode);
            editParticipatingBankDeferred.resolve(bankList);
            scope.$apply();
            expect(scope.staticController.handleEditParticipatingBankResponse).toBeDefined();
            expect(scope.staticController.responseError).toBeUndefined();
        });

        it('should open confirmation modal', function () {
            createController();
            scope.staticController.bank = editedBank;
            scope.staticController.editParticipatingBank(editedBank);
            editParticipatingBankDeferred.resolve(bankList);
            scope.$apply();
            expect(scope.staticController.handleEditParticipatingBankResponse).toBeDefined();
            expect(scope.staticController.responseError).toBeUndefined();
        });

        it("should reject the call to edit participating bank", function () {
            createController();
            editParticipatingBankDeferred.reject('error message');
            scope.staticController.editParticipatingBank('');
            scope.$apply();
            expect(scope.staticController.responseError).toBe('error message');
            expect(scope.staticController.response).toBeUndefined();
        });
    });

    describe('modal for delete participating bank', function () {
        modal = {
            open: function (options) {

            }
        };

        it('should call modal for delete participating bank', function () {
            createController();
            scope.staticController.participatingBanks = bankList;
            scope.staticController.openModalForDeleteParticipatingBank(bank);
            expect(modal.open).toHaveBeenCalled();
        });

        it('should call service to delete participating bank', function () {
            createController();
            scope.staticController.bank = bank;
            scope.staticController.participatingBanks = bankList;
            scope.staticController.currentIndex = 1;
            scope.staticController.deleteParticipatingBank(bank);
            deleteParticipatingBankDeferred.resolve(bankList);
            scope.$apply();
            expect(scope.staticController.currentIndex).toBeDefined();
            expect(scope.staticController.responseError).toBe(undefined);
        });

        it('should call service to delete participating bank and the currentIndex should not greater than -1',
            function () {
                createController();
                scope.staticController.bank = bank;
                scope.staticController.participatingBanks = bankList;
                scope.staticController.currentIndex = -1;
                scope.staticController.deleteParticipatingBank(bank);
                deleteParticipatingBankDeferred.resolve();
                scope.$apply();
                expect(scope.staticController.currentIndex).toBeDefined();
                expect(scope.staticController.responseError).toBe(undefined);
            });

        it("should reject the call to delete participating bank", function () {
            createController();
            deleteParticipatingBankDeferred.reject('error message');
            scope.staticController.deleteParticipatingBank('');
            scope.$apply();
            expect(scope.staticController.responseError).toBe('error message');
            expect(scope.staticController.response).toBeUndefined();
        });
    });

    describe(' list participating bank from static data', function () {
        it('should get a list of participating banks from the db when list not cached', function () {
            applicationCacheFactory.removeAll();
            applicationCacheFactory.put('Banks', '');
            createController();
            expect(scope.staticController.getParticipatingBanks).toBeDefined();
            scope.staticController.getParticipatingBanks();
            expect(scope.staticController.accountStyles).toBeUndefined();
            bankDeferred.resolve(bankList);
            scope.$apply();
            expect(scope.staticController.responseError).toBe(undefined);
        });

        it('should try get a list of participating banks and handle errors when returned', function () {
            applicationCacheFactory.removeAll();
            applicationCacheFactory.put('Banks', '');
            createController();
            expect(scope.staticController.getParticipatingBanks).toBeDefined();
            scope.staticController.getParticipatingBanks();
            expect(scope.staticController.accountStyles).toBeUndefined();
            bankDeferred.reject('error');
            scope.$apply();
        });

        it('should get a list of participating banks from the cache factory ', function () {
            applicationCacheFactory.put('Banks', bankList);
            createController();
            expect(scope.staticController.getParticipatingBanks).toBeDefined();
            scope.staticController.getParticipatingBanks();
            expect(scope.staticController.participatingBanks).toBeDefined();
        });
    });

    describe("updating participating banks", function () {
        it("should prepare for update", function () {
            applicationCacheFactory.removeAll();
            createController();
            scope.staticController.updateParticipatingBanks();
            expect(scope.staticController.updatingParticipatingBanks).toBeTruthy();
        });

        it("should cancel updating participating banks", function () {
            applicationCacheFactory.removeAll();
            createController();
            scope.staticController.cancelUpdateParticipatingBanks();
            expect(scope.staticController.updatingParticipatingBanks).toBeFalsy();
        });
    });

    describe(' list account styles from static data', function () {
        it('should get a list of account styles from the db when list not cached', function () {
            applicationCacheFactory.removeAll();
            applicationCacheFactory.put('accountStyles', '');
            createController();
            expect(scope.staticController.getAccountStyles).toBeDefined();
            scope.staticController.getAccountStyles();
            expect(scope.staticController.participatingBanks).toBeUndefined();
            accountDeferred.resolve(accountStyles);
            scope.$apply();
            expect(scope.staticController.responseError).toBe(undefined);
        });

        it('should try get a list of account styles and handle errors when returned', function () {
            applicationCacheFactory.removeAll();
            applicationCacheFactory.put('accountStyles', '');
            createController();
            expect(scope.staticController.getAccountStyles).toBeDefined();
            scope.staticController.getAccountStyles();
            expect(scope.staticController.participatingBanks).toBeUndefined();
            accountDeferred.reject('error');
            scope.$apply();
        });

        it('should get a list of account styles from the cache factory ', function () {
            applicationCacheFactory.put('accountStyles', accountStyles);
            createController();
            expect(scope.staticController.getAccountStyles).toBeDefined();
            scope.staticController.getAccountStyles();
            expect(scope.staticController.accountStyles).toBeDefined();
        });
    });

    describe("updating account style", function () {
        it("should prepare for update", function () {
            applicationCacheFactory.removeAll();
            createController();
            scope.staticController.updateAccountStyles();
            expect(scope.staticController.updatingAccountStyles).toBeTruthy();
        });

        it("should cancel updating participating banks", function () {
            applicationCacheFactory.removeAll();
            createController();
            scope.staticController.cancelUpdateAccountStyles();
            expect(scope.staticController.updatingAccountStyles).toBeFalsy();
        });
    });

    describe("modal to create account style", function () {
        modal = {
            open: function (options) {
            }
        };
        it("should call modal for create account style ", function () {
            createController();
            scope.staticController.openModalForCreateAccountStyle(accountStyle);
            expect(modal.open).toHaveBeenCalled();
        });

        it("should call service to create account style", function () {
            createController();
            scope.staticController.accountStyle = accountStyle;
            scope.staticController.accountStyles = accountStyles;
            scope.staticController.createAccountStyle(accountStyle);
            createAccountStyleDeferred.resolve(accountStyle);
            scope.$apply();
            expect(scope.staticController.handleCreateAccountStyleResponse).toBeDefined();
            expect(scope.responseError).toBeUndefined();
        });
        it("should reject call to create account style", function () {
            createController();
            createAccountStyleDeferred.reject('error message');
            scope.staticController.createAccountStyle('');
            scope.$apply();
            expect(scope.staticController.responseError).toBe('error message');
            expect(scope.staticController.response).toBeUndefined();
        });
    });

    describe("modal to delete account style", function () {
        modal = {
            open: function (options) {
            }
        };

        it('should call modal for delete account style', function () {
            createController();
            scope.staticController.accountStyles = accountStyles;
            scope.staticController.openModalForDeleteAccountStyle(linkedAccountStyle);
            expect(modal.open).toHaveBeenCalled();
        });
        it('should call service to delete account style', function () {
            createController();
            scope.staticController.accountStyle = linkedAccountStyle;
            scope.staticController.accountStyles = accountStyles;
            scope.staticController.currentIndex = 1;
            scope.staticController.deleteAccountStyle(linkedAccountStyle);
            deleteAccountStyleDeferred.resolve(accountStyles);
            scope.$apply();
            expect(scope.staticController.currentIndex).toBeDefined();
            expect(scope.staticController.responseError).toBe(undefined);
        });

        it('should call service to delete account style and check if currentIndex is less than -1', function () {
            createController();
            scope.staticController.accountStyle = linkedAccountStyle;
            scope.staticController.accountStyles = accountStyles;
            scope.staticController.currentIndex = -1;
            scope.staticController.deleteAccountStyle(linkedAccountStyle);
            deleteAccountStyleDeferred.resolve();
            scope.$apply();
            expect(scope.staticController.currentIndex).toBeDefined();
            expect(scope.staticController.currentIndex).toBe(-1);
            expect(scope.staticController.responseError).toBe(undefined);
        });

        it("should reject the call to delete account style", function () {
            createController();
            deleteAccountStyleDeferred.reject('error message');
            scope.staticController.deleteAccountStyle('');
            scope.$apply();
            expect(scope.staticController.responseError).toBe('error message');
            expect(scope.staticController.response).toBeUndefined();
        });

    });

    describe("get payment instruction types", function () {
        it("should setup the payment instruction payload", function () {
            createController();
            scope.staticController.openModalToLinkAccountStyle(accountStyle);
            expect(modal.open).toHaveBeenCalled();
            expect(scope.staticController.getAllAccountStyles).toBeDefined();
        });

        it("should resolve call to get all account style", function () {
            createController();
            expect(scope.staticController.getAllAccountStyles).toBeDefined();
            scope.staticController.getAllAccountStyles();
            paymentInstructionDeferred.resolve(accountStyle);
            scope.$apply();
            expect(scope.staticController.responseError).toBeUndefined();
        });

        it("should reject call to get all account style", function () {
            createController();
            expect(scope.staticController.getAllAccountStyles).toBeDefined();
            scope.staticController.getAllAccountStyles();
            paymentInstructionDeferred.reject("error");
            scope.$apply();
            expect(scope.staticController.responseError).toBeDefined();
        });

    });

    describe("link account style to payment instruction", function () {
        it("get all selected account styles that are linked to RTC payment instructions to accountStyle array",
            function () {
                var accountWithPaymentInstruction = [
                    {
                        "id": 8,
                        "version": 0,
                        "code": "ACP",
                        "type": "030",
                        "description": "ELITE PLUS",
                        "isChecked": true
                    },
                    {
                        "id": 8,
                        "version": 0,
                        "code": "AQP",
                        "type": "031",
                        "description": "ELITE PLUS Plus",
                        "isChecked": true
                    }
                ];


                var requestParamsDefaultData = {
                    paymentInstructionTypeId: 2
                };
                createController();
                scope.staticController.accountStyles = [
                    {
                        "id": 1,
                        "version": 0,
                        "code": "ACP",
                        "type": "030",
                        "description": "ELITE PLUS"

                    },
                    {
                        "id": 2,
                        "version": 0,
                        "code": "AQP",
                        "type": "031",
                        "description": "ELITE PLUS Plus"
                    }
                ];
                scope.staticController.newArray = scope.staticController.accountStyles;
                expect(scope.staticController.linkAccountStyle).toBeDefined();
                scope.staticController.linkAccountStyle(accountWithPaymentInstruction, requestParamsDefaultData);
                linkAccountStyleDeferred.resolve();
                scope.$apply();
                expect(scope.staticController.newArray).toBeDefined();
            });

        it("get all account styles selected to be linked to RTC payment instructions", function () {
            var accountWithPaymentInstruction = [
                {
                    "id": 4,
                    "version": 0,
                    "code": "ACP",
                    "type": "030",
                    "description": "ELITE PLUS",
                    "isChecked": true
                },
                {
                    "id": 6,
                    "version": 0,
                    "code": "AQP",
                    "type": "031",
                    "description": "ELITE PLUS Plus",
                    "isChecked": true
                }
            ];

            var requestParamsDefaultData = {
                paymentInstructionTypeId: 2
            };
            createController();
            scope.staticController.accountStyles = [
                {
                    "id": 4,
                    "version": 0,
                    "code": "ACP",
                    "type": "030",
                    "description": "ELITE PLUS"
                },
                {
                    "id": 6,
                    "version": 0,
                    "code": "AQP",
                    "type": "031",
                    "description": "ELITE PLUS Plus"
                }
            ];
            scope.staticController.newArray = accountWithPaymentInstruction;
            expect(scope.staticController.linkAccountStyle).toBeDefined();
            scope.staticController.linkAccountStyle(accountWithPaymentInstruction, requestParamsDefaultData);
            linkAccountStyleDeferred.resolve();
            scope.$apply();
            expect(scope.staticController.newArray).toBeDefined();
        });

        it("reject a call to linked to RTC payment instructions to account styles", function () {
            var accountWithPaymentInstruction = [
                {
                    "id": 4,
                    "version": 0,
                    "code": "ACP",
                    "type": "030",
                    "description": "ELITE PLUS",
                    "isChecked": true
                },
                {
                    "id": 6,
                    "version": 0,
                    "code": "AQP",
                    "type": "031",
                    "description": "ELITE PLUS Plus",
                    "isChecked": true
                }
            ];
            var error = {
                "data": {
                    "message": "Payment Instruction Type with id 4 not found",
                    "errorCode": "pmt.instr.type.not.found"
                },
                "status": 400
            };
            var requestParamsDefaultData = {
                paymentInstructionTypeId: 4
            };
            createController();
            scope.staticController.newArray = accountWithPaymentInstruction;
            expect(scope.staticController.linkAccountStyle).toBeDefined();
            scope.staticController.linkAccountStyle(accountWithPaymentInstruction, requestParamsDefaultData);
            linkAccountStyleDeferred.reject(error);
            scope.$apply();
            expect(scope.staticController.newArray).toBeDefined();
        });
        it("reject a call to linked to RTC payment instructions to account styles when there is system error", function () {
            var accountWithPaymentInstruction = [
                {
                    "id": 4,
                    "version": 0,
                    "code": "ACP",
                    "type": "030",
                    "description": "ELITE PLUS",
                    "isChecked": true
                },
                {
                    "id": 6,
                    "version": 0,
                    "code": "AQP",
                    "type": "031",
                    "description": "ELITE PLUS Plus",
                    "isChecked": true
                }
            ];
            var error = {
                "data": {
                    "message": "Payment Instruction Type with id 4 not found",
                    "errorCode": "pmt.instr.type.not.found"
                },
                "status": 503
            };
            var requestParamsDefaultData = {
                paymentInstructionTypeId: 4
            };
            createController();
            scope.staticController.newArray = accountWithPaymentInstruction;
            expect(scope.staticController.linkAccountStyle).toBeDefined();
            scope.staticController.linkAccountStyle(accountWithPaymentInstruction, requestParamsDefaultData);
            linkAccountStyleDeferred.reject(error);
            scope.$apply();
            expect(scope.staticController.newArray).toBeDefined();
        });



        it("get all account styles not selected to be linked to RTC payment instructions", function () {
            var accountData = [
                {
                    "id": 5,
                    "version": 0,
                    "code": "ACP",
                    "type": "030",
                    "description": "ELITE PLUS",
                    "isChecked": false
                }
            ];
            createController();
            expect(scope.staticController.linkAccountStyle).toBeDefined();
            scope.staticController.linkAccountStyle(accountData);
        });
    });

    describe("modal to link account style", function () {
        modal = {
            open: function (options) {
            }
        };
        it("should call modal for linking account style ", function () {
            createController();
            scope.staticController.accountStyle = accountStyle;
            scope.staticController.openModalForLinkAccountStyle();
            expect(modal.open).toHaveBeenCalled();
        });

        it("should call service to link account style", function () {
            createController();
            scope.staticController.accountStyle = accountStyle;
            scope.staticController.paymentInstruction = paymentInstruction;
            scope.staticController.linkAccountStyle(accountStyle, paymentInstruction);
            linkAccountStyleDeferred.resolve(accountStyle);
            scope.$apply();
            expect(scope.staticController.responseError).toBeUndefined();
        });

        // it("should should not link already linked account style", function () {
        //
        //     var error = {
        //         "data": {
        //             "responseMessage": [
        //                 {"message": "Payment instruction type with id 2 and account style with id 2 already exist",
        //                     "errorCode": "pmt.instr.account.styles.already.exist"}
        //             ]
        //         },
        //         "status": 400
        //     };
        //
        //     createController();
        //     scope.staticController.accountStyle = linkedAccountStyle;
        //     scope.staticController.paymentInstruction = paymentInstruction;
        //     scope.staticController.linkAccountStyle(linkedAccountStyle, paymentInstruction);
        //     linkAccountStyleDeferred.reject(error);
        //     scope.$apply();
        //     expect(error.status).toBe(400);
        // });

    });

    describe(' shows payment charges from static data', function () {
        it('should get payment charges from the db when list not cached', function () {
            applicationCacheFactory.removeAll();
            var paymentCharges = {};
            applicationCacheFactory.put('paymentCharges', '');
            createController();
            expect(scope.staticController.getPaymentCharges).toBeDefined();
            scope.staticController.getPaymentCharges();
            expect(scope.staticController.paymentCharges).toBeUndefined();
            chargeDeferred.resolve(paymentCharges);
            scope.$apply();
            expect(scope.staticController.responseError).toBe(undefined);
        });

        it('should try get payment charges and handle errors when returned', function () {
            applicationCacheFactory.removeAll();
            applicationCacheFactory.put('paymentCharges', '');
            createController();
            expect(scope.staticController.getPaymentCharges).toBeDefined();
            scope.staticController.getPaymentCharges();
            expect(scope.staticController.paymentCharges).toBeUndefined();
            chargeDeferred.reject('error');
            scope.$apply();
        });

        it('should get payment charges from the cache factory ', function () {
            var paymentCharges = {};

            applicationCacheFactory.put('paymentCharges', paymentCharges);
            createController();
            expect(scope.staticController.getPaymentCharges).toBeDefined();
            scope.staticController.getPaymentCharges();
//            expect(scope.staticController.paymentCharges).toBeDefined();
        });
    });

    describe('updating payment charge', function () {

        it("should prepare for update", function () {
            applicationCacheFactory.removeAll();
            createController();
            scope.staticController.paymentCharges = paymentCharge;
            scope.staticController.editRTC = true;
            scope.staticController.openModalForEditPaymentCharge('45');
            expect(scope.staticController.editRTC).toBeTruthy();
        });

        it('should call service to update payment charge', function () {
            createController();
            scope.staticController.paymentCharges = paymentCharge;
            scope.staticController.editPaymentCharge(scope.staticController.paymentCharges);
            editPaymentChargeDeferred.resolve(paymentCharge);
            scope.$apply();
            expect(scope.staticController.handleEditPaymentChargeResponse).toBeDefined();
            expect(scope.staticController.responseError).toBeUndefined();
        });

        it("should reject the call for update payment limit", function () {
            createController();
            editPaymentChargeDeferred.reject('error message');
            scope.staticController.editPaymentCharge('');
            scope.$apply();
            expect(scope.staticController.responseError).toBe('error message');
            expect(scope.staticController.response).toBeUndefined();
        });

    });

    describe(' shows payment limit from static data', function () {
        it('should get payment limits from the db when list not cached', function () {
            applicationCacheFactory.removeAll();
            var paymentLimit = {};
            applicationCacheFactory.put('paymentLimit', '');
            createController();
            expect(scope.staticController.getPaymentLimit).toBeDefined();
            scope.staticController.getPaymentLimit();
            expect(scope.staticController.paymentLimit).toBeUndefined();
            limitDeferred.resolve(accountStyles);
            scope.$apply();
            expect(scope.staticController.responseError).toBe(undefined);
        });

        it('should try get payment limits and handle errors when returned', function () {
            applicationCacheFactory.removeAll();
            applicationCacheFactory.put('paymentLimit', '');
            createController();
            expect(scope.staticController.getPaymentLimit).toBeDefined();
            scope.staticController.getPaymentLimit();
            expect(scope.staticController.paymentLimit).toBeUndefined();
            limitDeferred.reject('error');
            scope.$apply();
        });

        it('should get get payment limits from the cache factory ', function () {
            var paymentLimit = {};
            applicationCacheFactory.put('paymentLimit', paymentLimit);
            createController();
            expect(scope.staticController.getPaymentLimit).toBeDefined();
            scope.staticController.getPaymentLimit();
            expect(scope.staticController.paymentLimit).toBeDefined();
        });
    });

    describe('updating payment limit', function () {

        it("should prepare for update", function () {
            applicationCacheFactory.removeAll();
            createController();
            scope.staticController.editRTC = true;
            scope.staticController.openModalForEditPaymentLimit();
            expect(scope.staticController.editRTC).toBeTruthy();
        });

        it('should call service to update payment limit', function () {
            createController();
            scope.staticController.paymentLimitAmount = '500000';
            scope.staticController.editPaymentLimit(scope.staticController.paymentLimitAmount);
            editPaymentLimitDeferred.resolve(paymentLimit);
            scope.$apply();
            expect(scope.staticController.handleEditPaymentLimitResponse).toBeDefined();
            expect(scope.staticController.responseError).toBeUndefined();
        });

        it("should reject the call for update payment limit", function () {
            createController();
            editPaymentLimitDeferred.reject('error message');
            scope.staticController.editPaymentLimit('');
            scope.$apply();
            expect(scope.staticController.responseError).toBe('error message');
            expect(scope.staticController.response).toBeUndefined();
        });

    });

    describe(' shows product availability times from static data', function () {
        it('should get shows product availability times from the db when list not cached', function () {
            applicationCacheFactory.removeAll();
            var productAvailability = {};
            applicationCacheFactory.put('productAvailability', '');
            createController();
            expect(scope.staticController.getProductAvailability).toBeDefined();
            scope.staticController.getProductAvailability();
            expect(scope.staticController.productAvailability).toBeUndefined();
            availabilityDeferred.resolve(productValue);
            scope.$apply();
            expect(scope.staticController.responseError).toBe(undefined);
        });
        it('should shows product availability times  for 24 hours from the db when list not cached ', function () {
            applicationCacheFactory.removeAll();
            var productAvailability = {};
            applicationCacheFactory.put('productAvailability', '');
            createController();
            expect(scope.staticController.getProductAvailability).toBeDefined();
            scope.staticController.getProductAvailability();
            expect(scope.staticController.productAvailability).toBeUndefined();
            availabilityDeferred.resolve(productValue24Hours);
            scope.$apply();
            expect(scope.staticController.responseError).toBe(undefined);
        });

        it('should try get shows product availability times and handle errors when returned', function () {
            applicationCacheFactory.removeAll();
            applicationCacheFactory.put('productAvailability', '');
            createController();
            expect(scope.staticController.getProductAvailability).toBeDefined();
            scope.staticController.getProductAvailability();
            expect(scope.staticController.productAvailability).toBeUndefined();
            availabilityDeferred.reject('error');
            scope.$apply();
        });

        it('should get shows product availability times from the cache factory ', function () {
            var productAvailability = {};
            applicationCacheFactory.put('productAvailability', productAvailability);
            createController();
            expect(scope.staticController.getProductAvailability).toBeDefined();
            scope.staticController.getProductAvailability();
            expect(scope.staticController.productAvailability).toBeDefined();
        });
    });

    describe("updating product availability", function () {
        it("should prepare for update", function () {
            applicationCacheFactory.removeAll();
            createController();
            scope.staticController.editRTC = true;
            scope.staticController.openModalForUpdateProductAvailability();
            expect(scope.staticController.editRTC).toBeTruthy();
        });

        it("should check for time error", function () {
            createController();
            scope.staticController.time = 'setTime';
            scope.staticController.startTime = new Date(1234555);
            scope.staticController.endTime = new Date(1234567);
            scope.staticController.checkTimes();
            expect(scope.staticController.TimeError).toBeFalsy();
        });

        it('should call service to update product availability to 24Hours', function () {
            createController();
            scope.staticController.startTime = new Date();
            scope.staticController.endTime = new Date();
            scope.staticController.time = "24Hours";
            scope.staticController.updateProductAvailability(scope.staticController.startTime, scope.staticController,
                scope.staticController.time);
            updateProductAvailabilityDeferred.resolve(bankList);
            scope.$apply();
            expect(scope.staticController.handleEditParticipatingBankResponse).toBeDefined();
            expect(scope.staticController.responseError).toBeUndefined();
        });

        it('should call service to update product availability', function () {
            createController();
            scope.staticController.startTime = new Date();
            scope.staticController.endTime = new Date();
            scope.staticController.time = "setTime";
            scope.staticController.updateProductAvailability(scope.staticController.startTime, scope.staticController,
                scope.staticController.time);
            updateProductAvailabilityDeferred.resolve(bankList);
            scope.$apply();
            expect(scope.staticController.handleEditParticipatingBankResponse).toBeDefined();
            expect(scope.staticController.responseError).toBeUndefined();
        });

        it("should reject the call for update product availability", function () {
            createController();
            updateProductAvailabilityDeferred.reject('error message');
            scope.staticController.updateProductAvailability('');
            scope.$apply();
            expect(scope.staticController.responseError).toBe('error message');
            expect(scope.staticController.response).toBeUndefined();
        });
    });


});
