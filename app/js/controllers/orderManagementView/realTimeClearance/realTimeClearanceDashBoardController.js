'use strict';
var controllersModule = require('./_index_realTimeClearanceDashBoardController');
var lodash = require('lodash');

/**
 * @ngInject
 */
controllersModule.controller('RealTimeClearanceDashBoardController',
    ['$scope', '$location', 'ManageDigitalIdService', 'errorMessagesFactory', 'ApplicationCacheFactory', '$filter',
        function ($scope, $location, ManageDigitalIdService, errorMessagesFactory, ApplicationCacheFactory, $filter) {
            var rtcController = this;

            rtcController.userAccessRights = ApplicationCacheFactory.get('accessRights');

            rtcController.currentPage = 1;
            rtcController.itemPerPage = 7;
            rtcController.showPaymentResults = false;
            rtcController.maxSize = 15;


            rtcController.dateTimeRanges = {
                "startDate": new Date(),
                "endDate": new Date()
            };

            rtcController.today = function () {
                rtcController.startDate = new Date();
                rtcController.endDate = new Date();
            };

            rtcController.datepickers = {
                startDt: false,
                endDt: false
            };

            rtcController.dateOptions = {
                'year-format': "'yyyy'",
                'starting-day': 1
            };
            rtcController.today();

            rtcController.isOpenCalendar = function ($event, whichDt) {
                $event.preventDefault();
                $event.stopPropagation();
                rtcController.datepickers[whichDt] = true;
            };

            rtcController.init = function () {
                rtcController.userAccessRights = ApplicationCacheFactory.get('accessRights');
                rtcController.searchType = ApplicationCacheFactory.get('searchType');
                rtcController.participatingBanks = undefined;
                rtcController.accountStyles = undefined;
                rtcController.paymentCharges = undefined;
                rtcController.paymentLimit = undefined;
                rtcController.productAvailability = undefined;
                rtcController.dateTimeRanges = {
                    "startDate": new Date(),
                    "endDate": new Date()
                };
            };

            rtcController.showSelectedSearchMode = function (searchType) {
                rtcController.paymentSearchResults = undefined;
                rtcController.errorRefMessage = undefined;
                rtcController.searchValue = '';
                rtcController.paymentDetailsResults = undefined;
                rtcController.participatingBanks = undefined;
                rtcController.accountStyles = undefined;
                rtcController.paymentCharges = undefined;
                rtcController.paymentLimit = undefined;
                rtcController.productAvailability = undefined;
                rtcController.userAccessRights = ApplicationCacheFactory.get('accessRights');
                ApplicationCacheFactory.removeAll();
                ApplicationCacheFactory.put('accessRights', rtcController.userAccessRights);
                ApplicationCacheFactory.put('searchType', searchType);
                rtcController.searchType = ApplicationCacheFactory.get('searchType');
                if (searchType === "STATICDATA") {
                    $location.path('/real-time-clearance-static-data');
                }
            };

            rtcController.dateValidations = function (startDate, endDate) {
                var currentMinusSevenDays = new Date();
                var endDates = new Date(endDate);
                if (endDates > new Date()){
                    rtcController.dateErrorMessage = "The end date should not be greater than current date";
                    return false;
                }
                var weekMs = currentMinusSevenDays.getTime() - 1000 * 60 * 60 * 24 * 7; // Offset by seven days;
                var startDateMs = startDate.getTime();
                var endDateMs = endDates.getTime();
                if(startDateMs < weekMs) {
                    rtcController.dateErrorMessage = "The start date should not be less than a week (7 Days)";
                    return false;
                }else if (endDateMs < startDateMs) {
                    rtcController.dateErrorMessage = "The end date should not be less than a start date";
                    return false;
                }
                return true;
            };

            rtcController.searchByReferenceNumber = function (referenceNumber) {
                rtcController.paymentSearchResults = undefined;
                rtcController.showPaymentResults = undefined;
                rtcController.errorRefMessage = undefined;
                rtcController.paymentDetailsResults = undefined;
                ApplicationCacheFactory.put('searchType', 'SEARCHBYREFERENCE');
                var requestParamsDefaultData = {
                    referenceNumber: referenceNumber
                };
                ManageDigitalIdService.findByReferenceNumber(requestParamsDefaultData)
                    .then(
                    function (value) {
                        if (value.customerRef) {
                            rtcController.searchResults = true;
                            rtcController.paymentSearchResults = value;
                            ApplicationCacheFactory.put('paymentSearchResults', rtcController.paymentSearchResults);
                            rtcController.errorMessage = "";
                            rtcController.paymentSearchResults = ApplicationCacheFactory.get('paymentSearchResults');
                            rtcController.searchValue = '';
                        } else {
                            rtcController.errorRefMessage =
                                errorMessagesFactory.error502 + " - " + " om-domestic-payments-service down";
                        }
                    },
                    function (error) {
                        if (error.status === 404) {
                            rtcController.errorRefMessage = error.data.responseMessage[0].message;

                        }
                        else {
                            rtcController.errorRefMessage = errorMessagesFactory.error502;
                        }
                    });
            };

            rtcController.searchPendingPayments = function (dateTimeRanges) {
                rtcController.pendingPaymentResults = undefined;
                rtcController.errorRefMessage = undefined;
                rtcController.dateErrorMessage = undefined;
                if (rtcController.dateValidations(dateTimeRanges.startDate, dateTimeRanges.endDate)){

                var dateTo = $filter('date')(dateTimeRanges.endDate, 'yyyy-MM-dd');
                var dateFrom = $filter('date')(dateTimeRanges.startDate, 'yyyy-MM-dd');

                rtcController.dateTimeRanges = {
                    "startDate": dateFrom,
                    "endDate": dateTo
                };
                rtcController.paymentSearchResults = undefined;
                rtcController.showPaymentResults = undefined;
                rtcController.errorRefMessage = undefined;
                rtcController.paymentDetailsResults = undefined;
                ApplicationCacheFactory.put('searchType', 'SEARCHPENDINGPAYMENTS');
                var requestParamsDefaultData = {
                    startDate: dateFrom,
                    endDate: dateTo
                };
                ManageDigitalIdService.searchPendingPayments(requestParamsDefaultData)
                    .then(
                    function (value) {
                        if (value.numberOfElements !== 0) {
                            rtcController.searchResults = true;
                            rtcController.pendingPaymentResults = value.content;
                            ApplicationCacheFactory.put('pendingPaymentResults', rtcController.pendingPaymentResults);
                            rtcController.errorMessage = "";
                            rtcController.searchValue = '';
                        } else {
                            rtcController.errorRefMessage =
                                " No pending payments for specified dates";
                        }
                    },
                    function (error) {
                        rtcController.errorRefMessage = error.data.responseMessage[0].message;
                    });
                }

            };

            rtcController.goBackToResults = function () {
                rtcController.searchResults = true;
                rtcController.showPaymentResults = false;
                rtcController.paymentSearchResults = ApplicationCacheFactory.get('paymentSearchResults');
            };

            rtcController.searchByCardNumber = function (cardNumber) {
                rtcController.paymentSearchResults = undefined;
                rtcController.showPaymentResults = undefined;
                rtcController.errorRefMessage = undefined;
                rtcController.paymentDetailsResults = undefined;
                ApplicationCacheFactory.put('searchType', 'SEARCHBYCARDNUMBER');
                var requestParamsDefaultData = {
                    cardNumber: cardNumber
                };
                ManageDigitalIdService.findByCardNumber(requestParamsDefaultData)
                    .then(
                    function (value) {
                        if (value.numberOfElements) {
                            rtcController.searchResults = true;
                            rtcController.paymentSearchResults = value.content;
                            ApplicationCacheFactory.put('paymentSearchResults', rtcController.paymentSearchResults);
                            rtcController.errorMessage = "";
                            // rtcController.searchValue = '';
                        } else {
                            rtcController.errorRefMessage =
                                errorMessagesFactory.error502 + " - " + " om-domestic-payments-service down";
                        }
                    },
                    function (error) {
                        if (error.status === 404) {
                            rtcController.errorRefMessage = error.data.responseMessage[0].message;
                        }
                        else {
                            rtcController.errorRefMessage = errorMessagesFactory.error502;
                        }
                    });

            };

            rtcController.searchByAccountNumber = function (accountFrom) {
                rtcController.paymentSearchResults = undefined;
                rtcController.errorRefMessage = undefined;
                rtcController.showPaymentResults = undefined;
                rtcController.paymentDetailsResults = undefined;
                ApplicationCacheFactory.put('searchType', 'SEARCHBYACCOUNTNUMBER');
                var requestParamsDefaultData = {
                    accountFrom: accountFrom
                };
                ManageDigitalIdService.findByAccountNumber(requestParamsDefaultData)
                    .then(
                    function (value) {
                        if (value.numberOfElements) {
                            rtcController.searchResults = true;
                            rtcController.paymentSearchResults = value.content;
                            ApplicationCacheFactory.put('paymentSearchResults', rtcController.paymentSearchResults);
                            rtcController.errorMessage = "";
                            // rtcController.searchValue = '';
                        } else {
                            rtcController.errorRefMessage =
                                errorMessagesFactory.error502 + " - " + " om-domestic-payments-service down";
                        }
                    },
                    function (error) {
                        if (error.status === 404) {
                            rtcController.errorRefMessage = error.data.responseMessage[0].message;
                        }
                        else {
                            rtcController.errorRefMessage = errorMessagesFactory.error502;
                        }
                    });
            };

            rtcController.findBySelectedReference = function (referenceNumber) {
                var paymentResults = ApplicationCacheFactory.get('paymentSearchResults');
                return lodash.find(paymentResults, function (item) {
                    if (item.interchangeId === referenceNumber) {
                        return item;
                    }
                });

            };

            rtcController.getBolpesStatus = function (referenceNumber) {
                var requestParamsDefaultData = {
                    referenceNumber: referenceNumber
                };
                ManageDigitalIdService.getBolpesStatus(requestParamsDefaultData)
                    .then(
                    function (value) {
                        rtcController.bolpesResults = value.numberOfElements !== 0 ? value.content : undefined;
                        ApplicationCacheFactory.put('bolpesResults', value.content);
                    },
                    function (error) {
                        rtcController.error = error;
                        rtcController.errorRefMessage = errorMessagesFactory.error502;
                    });
            };
            rtcController.viewSelectedReferenceNumberDetails = function (referenceNumber) {
                rtcController.searchResults = false;
                rtcController.showPaymentResults = true;
                rtcController.getBolpesStatus(referenceNumber);

                if (ApplicationCacheFactory.get('searchType') === "SEARCHBYREFERENCE") {
                    rtcController.paymentSearchResults = ApplicationCacheFactory.get('paymentSearchResults');
                } else {
                    rtcController.paymentSearchResults = rtcController.findBySelectedReference(referenceNumber);
                }
                rtcController.errorRefMessage = undefined;
                var requestParamsDefaultData = {
                    referenceNumber: referenceNumber
                };
                ManageDigitalIdService.findPaymentDetails(requestParamsDefaultData)
                    .then(
                    function (value) {
                        rtcController.paymentDetailsResults = value.numberOfElements !== 0 ? value.content : undefined;
                        ApplicationCacheFactory.put('paymentDetailsResults', rtcController.paymentDetailsResults);
                        if (rtcController.paymentDetailsResults === undefined) {
                            rtcController.errorPaymentMessage = " No details found for " + referenceNumber;
                            rtcController.searchResults = true;
                        }
                    },
                    function (error) {
                        rtcController.error = error;
                        rtcController.errorRefMessage = errorMessagesFactory.error502;
                    });
            };

        }
    ]);
