'use strict';
var controllersModule = require('./_index_staticDataController');
var lodash = require('lodash');

/**f
 * @ngInject
 */
controllersModule.controller('StaticDataController',
    ['$scope', '$location', 'ManageDigitalIdService', 'errorMessagesFactory', 'ApplicationCacheFactory', '$modal',
        '$filter',
        function ($scope, $location, ManageDigitalIdService, errorMessagesFactory, ApplicationCacheFactory, $modal,
                  $filter) {
            var staticController = this;

            staticController.startTime = new Date();
            staticController.endTime = new Date();
            staticController.currentPage = 1;
            staticController.itemPerPage = 7;
            staticController.maxSize = 15;
            staticController.searchFilter = '';
            staticController.isVisible = false;
            staticController.userAccessRights = ApplicationCacheFactory.get('accessRights');
            staticController.searchType = ApplicationCacheFactory.get('searchType');

            staticController.accountStylesFilterChange = function () {
                staticController.changeTime = true;
            };

            staticController.availabilityToggle = function (status, action, updatedStatus, message) {
                if (staticController.isVisible !== status) {
                    staticController.status = staticController.isVisible;
                    staticController.headerMessage = "Real-Time-Clearance Payments";
                    staticController.updatingActiveOrDisabled = updatedStatus;
                    staticController.confirmMessage = message;
                    var modalOptions = {
                        placement: 'top-right',
                        scope: staticController,
                        templateUrl: 'confirmationModal.html',
                        controller: 'ConfirmationModalController',
                        backdrop: 'static',
                        keyboard: false
                    };
                    $modal
                        .open(modalOptions, staticController.headerMessage, staticController.confirmMessage)
                        .result
                        .then(function () {
                        });
                }
            };

            staticController.init = function () {
                staticController.userAccessRights = ApplicationCacheFactory.get('accessRights');
                staticController.searchType = undefined;
                staticController.searchType = ApplicationCacheFactory.get('searchType');
                staticController.participatingBanks = undefined;
                staticController.accountStyles = undefined;
                staticController.paymentCharges = undefined;
                staticController.paymentLimit = undefined;
                staticController.productAvailability = undefined;
            };

            staticController.getParticipatingBanks = function () {
                staticController.accountStyles = undefined;
                staticController.paymentCharges = undefined;
                staticController.paymentLimit = undefined;
                staticController.productAvailability = undefined;
                if (!ApplicationCacheFactory.get('Banks')) {
                    ManageDigitalIdService.getParticipatingBanks()
                        .then(
                        function (value) {
                            ApplicationCacheFactory.put('Banks', value);
                            staticController.participatingBanks = ApplicationCacheFactory.get('Banks');
                            staticController.errorMessage = "";
                        },
                        function (error) {
                            staticController.responseError = error;
                            staticController.errorMessage = errorMessagesFactory.error502;
                        });
                } else {
                    staticController.participatingBanks = ApplicationCacheFactory.get('Banks');
                }
            };

            staticController.updateParticipatingBanks = function () {
                staticController.updatingParticipatingBanks = true;
            };

            staticController.cancelUpdateParticipatingBanks = function () {
                staticController.updatingParticipatingBanks = false;
            };

            staticController.openModalForCreateParticipatingBank = function () {
                $scope.editRTC = true;
                staticController.isDuplicate = false;
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'dashboardRealTimeClearance/staticData/participatingBanksPartials/createParticipatingBankModal.html',
                    controller: 'CreateParticipatingBankModalController',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, staticController.bank, staticController.isDuplicate)
                    .result
                    .then(function (bank) {
                        staticController.checkDuplication(bank);
                    });
            };

            staticController.createParticipatingBank = function (bank) {
                ManageDigitalIdService.createParticipatingBank(bank)
                    .then(
                    function (value) {
                        staticController.handleCreateParticipatingBankResponse(value);
                    },
                    function (error) {
                        staticController.responseError = error;
                        staticController.error = errorMessagesFactory.error502;
                    });
            };

            staticController.handleCreateParticipatingBankResponse = function (bank) {
                staticController.participatingBanks.unshift(bank);
                staticController.confirmationModal('', 'Results', '',
                        bank.name + ' bank successfully added');
            };

            staticController.openModalForEditParticipatingBanks = function (bank) {
                $scope.editRTC = true;
                staticController.bank = {
                    "id": bank.id,
                    "bic": bank.bic,
                    "name": bank.name,
                    "code": bank.code

                };
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'dashboardRealTimeClearance/staticData/participatingBanksPartials/editParticipatingBanksModal.html',
                    controller: 'EditParticipatingBanksModalController as editBanksModal',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, staticController.bank)
                    .result
                    .then(function () {
                        staticController.editParticipatingBank(staticController.bank);
                    });
            };

            staticController.checkDuplication = function (newBankDetails) {
                var existingBankList = ApplicationCacheFactory.get('Banks');
                var response = lodash.find(existingBankList, function (result) {
                    if ((newBankDetails.bic === result.bic && newBankDetails.id !== result.id) ||
                        (newBankDetails.code === result.code && newBankDetails.id !== result.id )) {
                        return newBankDetails;
                    }
                });

                if (response !== undefined) {
                    staticController.errorHandlingModal('Duplicate BIC or Code ',
                        'Duplicate BIC or Code exist, Please try again');
                } else {
                    staticController.createParticipatingBank(newBankDetails);
                }
            };

            staticController.errorHandlingModal = function (header, message) {
                $scope.errorMessageHeader = header;
                $scope.errorMessage = message;
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'errorHandlingModal.html',
                    controller: 'ErrorHandlingModalController'
                };
                $modal
                    .open(modalOptions, $scope.errorMessageHeader, $scope.errorMessage)
                    .result
                    .then(function () {
                    });
            };

            staticController.confirmationModal = function (status, action, updatedStatus, message) {
                $scope.editRTC = true;
                $scope.status = status;
                $scope.headerMessage = action;
                $scope.updatingActiveOrDisabled = updatedStatus;
                $scope.confirmMessage = message;
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'confirmationModal.html',
                    controller: 'ConfirmationModalController',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, $scope.headerMessage, $scope.confirmMessage)
                    .result
                    .then(function () {
                    });
            };

            staticController.editParticipatingBank = function (editedBank) {
                var existingBankList = ApplicationCacheFactory.get('Banks');
                var response = lodash.find(existingBankList, function (result) {
                    if ((editedBank.bic === result.bic && editedBank.id !== result.id) ||
                        (editedBank.code === result.code && editedBank.id !== result.id )) {
                        return editedBank;
                    }
                });

                if (response !== undefined) {
                    staticController.errorHandlingModal('Duplicate BIC or Name or Code ',
                        'Duplicate BIC or Code exist, Please try again');
                } else {

                    var requestParamsDefaultData = {
                        id: editedBank.id
                    };

                    ManageDigitalIdService.editParticipatingBank(editedBank, requestParamsDefaultData)
                        .then(
                        function (value) {
                            staticController.handleEditParticipatingBankResponse(value);
                        },
                        function (error) {
                            staticController.handleEditParticipatingBankError(error);
                        });
                }

            };

            staticController.handleEditParticipatingBankResponse = function (editedBankDetails) {
                var existingBankList = ApplicationCacheFactory.get('Banks');
                lodash.find(existingBankList, function (result) {
                    if (editedBankDetails.id === result.id) {
                        result.bic = editedBankDetails.bic;
                        result.code = editedBankDetails.code;
                        result.name = editedBankDetails.name;
                        return editedBankDetails;
                    }
                });

                staticController.confirmationModal('', 'Results', '',
                        editedBankDetails.name + ' details successfully updated');
            };

            staticController.handleEditParticipatingBankError = function (error) {
                staticController.responseError = error;
                staticController.error = errorMessagesFactory.error502;
            };

            staticController.openModalForDeleteParticipatingBank = function (bank) {
                $scope.editRTC = true;
                staticController.bank = bank;
                staticController.currentIndex = staticController.participatingBanks.indexOf(bank);
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'dashboardRealTimeClearance/staticData/participatingBanksPartials/deleteParticipatingBankModal.html',
                    controller: 'DeleteParticipatingBanksModalController as deleteBanksModal',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, staticController.bank)
                    .result
                    .then(function () {
                        staticController.deleteParticipatingBank(staticController.bank);
                    });

            };

            staticController.deleteParticipatingBank = function (bank) {
                var requestParamsDefaultData = {
                    id: bank.id
                };

                ManageDigitalIdService.deleteParticipatingBank(requestParamsDefaultData)
                    .then(
                    function () {
                        if (staticController.currentIndex > -1) {
                            staticController.participatingBanks.splice(staticController.currentIndex, 1);
                        }
                        staticController.participatingBanks = ApplicationCacheFactory.get('Banks');
                        staticController.confirmationModal('', 'Results', '',
                                staticController.bank.name + ' details successfully deleted');
                    },
                    function (error) {
                        staticController.responseError = error;
                        staticController.error = errorMessagesFactory.error502;
                    });
            };

            staticController.getAccountStyles = function () {
                staticController.participatingBanks = undefined;
                staticController.paymentCharges = undefined;
                staticController.paymentLimit = undefined;
                staticController.productAvailability = undefined;
                if (!ApplicationCacheFactory.get('accountStyles')) {

                    var requestParamsDefaultData = {
                        paymentInstructionCode: "RTC"
                    };

                    ManageDigitalIdService.getAccountStyles(requestParamsDefaultData)
                        .then(
                        function (value) {
                            ApplicationCacheFactory.put('accountStyles', value);
                            staticController.accountStyles = value;
                            staticController.errorMessage = "";
                        },
                        function (error) {
                            staticController.responseError = error;
                            staticController.errorMessage = errorMessagesFactory.error502;
                        });
                } else {
                    staticController.accountStyles = ApplicationCacheFactory.get('accountStyles');
                }
            };

            staticController.updateAccountStyles = function () {
                staticController.updatingAccountStyles = true;
            };

            staticController.cancelUpdateAccountStyles = function () {
                staticController.updatingAccountStyles = false;
            };

            staticController.getAllAccountStyles = function () {
                ManageDigitalIdService.getAllAccountStyles()
                    .then(
                    function (value) {
                        ApplicationCacheFactory.put('allAccountStyles', value);
                        staticController.allAccountStyles = value;
                        staticController.findAllRTCAccounts(staticController.allAccountStyles);
                    },
                    function (error) {
                        staticController.responseError = error;
                        staticController.errorMessage = errorMessagesFactory.error502;
                    });
            };


            staticController.findAllRTCAccounts = function (allAccountStyles) {
                staticController.newArray = undefined;
                staticController.nonLinkedRtcAccounts = lodash.filter(allAccountStyles, function (object) {
                    return !lodash.findWhere(staticController.accountStyles, object);
                });
                staticController.newArray = lodash.map(staticController.nonLinkedRtcAccounts, function (elem) {
                    return lodash.extend({}, elem, {"isChecked": false});
                });
            };


            staticController.openModalForCreateAccountStyle = function () {
                $scope.editRTC = true;
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'dashboardRealTimeClearance/staticData/accountStylesPartials/createAccountStyleModal.html',
                    controller: 'CreateAccountStyleModalController',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, staticController.accountStyle)
                    .result
                    .then(function (accountStyle) {
                        staticController.accountStyle = accountStyle;
                        staticController.createAccountStyle(staticController.accountStyle);
                    });
            };

            staticController.openModalToLinkAccountStyle = function () {
                staticController.getAllAccountStyles();

                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'dashboardRealTimeClearance/staticData/accountStylesPartials/linkAccountStyleModal.html',
                    controller: 'LinkAccountStyleModalController',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, ApplicationCacheFactory.get('nonLinkedRtcAccounts'))
                    .result
                    .then(function (addRTCAccounts) {
                        staticController.nonLinkedRtcAccounts = addRTCAccounts;
                        staticController.linkAccountStyle(addRTCAccounts);
                    });
            };

            staticController.createAccountStyle = function (accountStyle) {

                ManageDigitalIdService.createAccountStyle(accountStyle)
                    .then(
                    function (value) {
                        staticController.handleCreateAccountStyleResponse(value);
                    },
                    function (error) {
                        staticController.responseError = error;
                        staticController.error = errorMessagesFactory.error502;
                    });
            };

            staticController.handleCreateAccountStyleResponse = function (accountStyle) {

                staticController.accountStyles.push(accountStyle);
                staticController.accountStyles = ApplicationCacheFactory.get('accountStyles');
                staticController.confirmationModal('', 'Results', '',
                        staticController.accountStyle.code + ' account style successfully added');
            };

            staticController.openModalForLinkAccountStyle = function () {
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'dashboardRealTimeClearance/staticData/accountStylesPartials/linkAccountStyleModal.html',
                    controller: 'LinkAccountStyleModalController',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, staticController.accountStyle, staticController.paymentInstruction)

                    .result
                    .then(function () {
                        staticController.linkAccountStyle(staticController.accountStyle,
                            staticController.paymentInstruction);
                    });
            };

            staticController.openModalForDeleteAccountStyle = function (accountStyle) {
                $scope.editRTC = true;
                staticController.currentIndex = staticController.accountStyles.indexOf(accountStyle);
                staticController.accountStyle = {
                    "id": accountStyle.id,
                    "version": accountStyle.version,
                    "code": accountStyle.code,
                    "type": accountStyle.type,
                    "description": accountStyle.description
                };
                var paymentInstructionTypeID = '2';
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'dashboardRealTimeClearance/staticData/accountStylesPartials/deleteAccountStyleModal.html',
                    controller: 'DeleteAccountStyleModalController as deleteAccountStyleModal',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, staticController.accountStyle)
                    .result
                    .then(function () {
                        staticController.deleteAccountStyle(staticController.accountStyle, paymentInstructionTypeID);
                    });
            };

            staticController.deleteAccountStyle = function (accountStyle, paymentInstructionTypeID) {
                var requestParamsDefaultData = {
                    accountStyleId: accountStyle.id,
                    paymentInstructionTypeId: paymentInstructionTypeID
                };

                ManageDigitalIdService.deleteAccountStyle(requestParamsDefaultData)
                    .then(
                    function () {
                        if (staticController.currentIndex > -1) {
                            staticController.accountStyles.splice(staticController.currentIndex, 1);
                        }
                        staticController.accountStyles = ApplicationCacheFactory.get('accountStyles');
                        staticController.confirmationModal('', 'Results', '',
                                staticController.accountStyle.description + ' details successfully deleted');
                    },
                    function (error) {
                        staticController.responseError = error;
                        staticController.error = errorMessagesFactory.error502;
                    });
            };

            staticController.linkAccountStyle = function (accountData) {

                var accountWithPaymentInstruction = [];
                lodash.each(accountData, function (item) {
                    if (item.isChecked) {
                        accountWithPaymentInstruction.push({
                            "id": item.id,
                            "version": 0,
                            "code": item.code,
                            "type": item.type,
                            "description": item.description
                        });
                    }
                });
                if (accountWithPaymentInstruction.length !== 0) {
                    var requestParamsDefaultData = {
                        paymentInstructionTypeId: 2
                    };
                    ManageDigitalIdService.linkAccountStyle(accountWithPaymentInstruction, requestParamsDefaultData)
                        .then(
                        function () {
                            lodash.forEach(accountWithPaymentInstruction, function (item) {
                                for (var i = 0; i < staticController.newArray.length; i++) {
                                    if (item.id === staticController.newArray[i].id) {
                                        staticController.accountStyles.push(item);
                                        staticController.newArray.splice(i, 1);
                                    }
                                }
                            });
                            staticController.confirmationModal('', 'Results', '',
                                'Account Style/s successfully linked to RTC');
                            ApplicationCacheFactory.put('accountStyles', undefined);
                            staticController.getAccountStyles();
                            ApplicationCacheFactory.put('nonRTCAccounts', staticController.newArray);
                        },
                        function (error) {
                            staticController.responseError = error;
                            if (error.status === 400) {
                                staticController.errorMessage = "Style and Type already exists, please try again";
                                staticController.errorHandlingModal('Duplicate payment instruction',
                                    staticController.errorMessage);
                            }
                            else {
                                staticController.errorMessage = errorMessagesFactory.error502;
                            }
                        });
                } else {
                    staticController.errorHandlingModal('Link Account Style to RTC ',
                        ' No Account Style was linked to RTC');
                }
            };

            staticController.getPaymentCharges = function () {
                staticController.participatingBanks = undefined;
                staticController.accountStyles = undefined;
                staticController.paymentLimit = undefined;
                staticController.productAvailability = undefined;

                if (!ApplicationCacheFactory.get('paymentCharges')) {
                    ManageDigitalIdService.getPaymentCharges()
                        .then(
                        function (value) {
                            ApplicationCacheFactory.put('paymentCharges', value);
                            staticController.paymentCharges = ApplicationCacheFactory.get('paymentCharges');
                            staticController.errorMessage = "";
                        },
                        function (error) {
                            staticController.responseError = error;
                            staticController.errorMessage = errorMessagesFactory.error502;
                        });
                } else {
                    staticController.paymentCharges = ApplicationCacheFactory.get('paymentCharges');
                }
            };

            staticController.openModalForEditPaymentCharge = function (amount) {
                $scope.editRTC = true;
                staticController.paymentChargeAmount = amount;

                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'dashboardRealTimeClearance/staticData/paymentChargesPartials/editPaymentChargeModal.html',
                    controller: 'EditPaymentChargeModalController as editPaymentChargeModal',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, staticController.paymentChargeAmount)
                    .result
                    .then(function () {
                        staticController.editPaymentCharge(staticController.paymentChargeAmount);
                    });
            };

            staticController.editPaymentCharge = function (paymentChargeAmount) {
                var requestParamsDefaultData = {
                    product: "RTC"
                };

                ManageDigitalIdService.editPaymentCharge(paymentChargeAmount, requestParamsDefaultData)
                    .then(
                    function (value) {
                        staticController.handleEditPaymentChargeResponse(value);
                    },
                    function (error) {
                        staticController.responseError = error;
                        staticController.error = errorMessagesFactory.error502;
                    });
            };

            staticController.handleEditPaymentChargeResponse = function (value) {
                staticController.paymentCharges = value;
                ApplicationCacheFactory.put('paymentCharges', value);

                staticController.confirmationModal('', 'Results', '',
                    ' Payment charge successfully updated');
            };

            staticController.getPaymentLimit = function () {
                staticController.participatingBanks = undefined;
                staticController.accountStyles = undefined;
                staticController.paymentCharges = undefined;
                staticController.productAvailability = undefined;

                if (!ApplicationCacheFactory.get('paymentLimit')) {
                    ManageDigitalIdService.getPaymentLimit()
                        .then(
                        function (value) {
                            ApplicationCacheFactory.put('paymentLimit', value);
                            staticController.paymentLimit = ApplicationCacheFactory.get('paymentLimit');
                            staticController.errorMessage = "";
                        },
                        function (error) {
                            staticController.responseError = error;
                            staticController.errorMessage = errorMessagesFactory.error502;
                        });
                } else {
                    staticController.paymentLimit = ApplicationCacheFactory.get('paymentLimit');
                }
            };

            staticController.openModalForEditPaymentLimit = function (amount) {
                $scope.editRTC = true;
                staticController.paymentLimitAmount = amount;

                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'dashboardRealTimeClearance/staticData/paymentLimitPartials/editPaymentLimitModal.html',
                    controller: 'EditPaymentLimitModalController as editPaymentLimitModal',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, staticController.paymentLimitAmount)
                    .result
                    .then(function () {
                        staticController.editPaymentLimit(staticController.paymentLimitAmount);
                    });
            };

            staticController.editPaymentLimit = function (paymentLimitAmount) {
                ManageDigitalIdService.editPaymentLimit(paymentLimitAmount)
                    .then(
                    function (value) {
                        staticController.handleEditPaymentLimitResponse(value);
                    },
                    function (error) {
                        staticController.responseError = error;
                        staticController.error = errorMessagesFactory.error502;
                    });
            };

            staticController.handleEditPaymentLimitResponse = function (value) {
                staticController.paymentLimit = value;
                ApplicationCacheFactory.put('paymentLimit', value);

                staticController.confirmationModal('', 'Results', '',
                    ' Payment limit successfully updated');
            };

            staticController.getProductAvailability = function () {
                staticController.participatingBanks = undefined;
                staticController.accountStyles = undefined;
                staticController.paymentCharges = undefined;
                staticController.paymentLimit = undefined;

                if (!ApplicationCacheFactory.get('productAvailability')) {
                    ManageDigitalIdService.getProductAvailability()
                        .then(
                        function (value) {
                            staticController.productAvailability = value;
                            if (value.startTime === null && value.endTime === null) {
                                staticController.time = '24Hours';
                                staticController.startTimeMsg = 'none';
                                staticController.endTimeMsg = 'none';
                            } else {
                                staticController.time = 'setTime';
                                staticController.startTimeMsg = value.startTime;
                                staticController.endTimeMsg = value.endTime;
                            }
                            ApplicationCacheFactory.put('productAvailability', staticController.productAvailability);
                            staticController.errorMessage = "";
                        },
                        function (error) {
                            staticController.responseError = error;
                            staticController.errorMessage = errorMessagesFactory.error502;
                        });
                } else {
                    staticController.productAvailability = ApplicationCacheFactory.get('productAvailability');
                }
            };

            staticController.openModalForUpdateProductAvailability = function () {
                $scope.editRTC = true;
                var modalOptions = {
                    placement: 'top-right',
                    scope: $scope,
                    templateUrl: 'dashboardRealTimeClearance/staticData/productAvailabilityPartials/updateProductAvailabilityModal.html',
                    controller: 'UpdateProductAvailabilityModalController as updateProductAvailabilityModal',
                    backdrop: 'static',
                    keyboard: false
                };
                $modal
                    .open(modalOptions, staticController.startTime, staticController.endTime, staticController.time)
                    .result
                    .then(function () {

                        staticController.updateProductAvailability(staticController.startTime, staticController.endTime,
                            staticController.time);
                    });

            };
            $scope.$watch('staticController.startTime + staticController.endTime', function () {
                staticController.checkTimes();
            });

            staticController.checkTimes = function () {
                if (staticController.time === '24Hours') {
                    staticController.startTime = null;
                    staticController.endTime = null;
                    staticController.TimeError = false;
                } else {

                    if ((staticController.endTime.getTime() - staticController.startTime.getTime()) <= 0) {
                        staticController.TimeError = true;
                        staticController.timeErrorMessage =
                            'Start-time must be before the end-time in a single calendar day';
                    } else {
                        staticController.TimeError = false;
                    }
                }
            };

            staticController.updateProductAvailability = function (startTime, endTime, time) {
                var startTimeString;
                var endTimeString;

                if (time === '24Hours') {
                    startTimeString = null;
                    endTimeString = null;
                } else {
                    startTimeString = $filter('date')(startTime, 'HH:mm');
                    endTimeString = $filter('date')(endTime, 'HH:mm');
                }


                var requestParamsDefaultData = {
                    product: 'RTC'
                };

                ManageDigitalIdService.updateProductAvailability(startTimeString, endTimeString,
                    requestParamsDefaultData)
                    .then(
                    function () {
                        staticController.confirmationModal('', 'Results', '', ' Cut-off time successfully updated');
                        staticController.startTimeMsg = startTimeString;
                        staticController.endTimeMsg = endTimeString;
                        if (time === '24Hours') {
                            staticController.startTimeMsg = "none";
                            staticController.endTimeMsg = "none";
                        }
                    },
                    function (error) {
                        staticController.responseError = error;
                        staticController.error = errorMessagesFactory.error502;
                    });
            };

            staticController.showSelectedSearchMode = function (searchType) {
                staticController.participatingBanks = undefined;
                staticController.accountStyles = undefined;
                staticController.paymentCharges = undefined;
                staticController.paymentLimit = undefined;
                staticController.productAvailability = undefined;
                ApplicationCacheFactory.removeAll();
                ApplicationCacheFactory.put('accessRights', staticController.userAccessRights);
                ApplicationCacheFactory.put('searchType', searchType);
                staticController.searchType = ApplicationCacheFactory.get('searchType');
                if (searchType === "STATICDATA") {
                    $location.path('/real-time-clearance-static-data');
                } else {
                    $location.path('/real-time-clearance-dashboard');
                }
            };
        }
    ]);
