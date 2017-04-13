/*global angular */
'use strict';
describe("Unit : ViewSelectedPrincipalController", function () {
    var scope, modalServiceMock, principalDeferred, principalLinkedDeferred, listSystemPrincipalsDeferred, createController, errorMessageFactory,
        applicationCacheFactory, location, manageDigitalIdService, linkedDigitalIdDeferred;
    var newCard = '112233445566778899';
    var selectedDigitalDetails =
        [
            {
                "type": "OST",
                "version": null,
                "id": 6971,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 58577,
                "territory": "SBSA",
                "revalidate": false,
                "displayName": "load_test_491@ostusers.com",
                "accessKey": "308860913D277B305655448C110595BC4C9BD3C5A41B3F866DF0C0BBF2F22DCC",
                "accessTimestamp": "2014-10-14 11:20:06.223+0200"
            },
            {
                "type": "BANKING",
                "version": null,
                "id": 13859,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 0,
                "territory": "SBSA",
                "revalidate": false,
                "cardNo": "9988774455667781"
            },
            {
                "type": "BANKING",
                "version": null,
                "id": 13871,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 0,
                "territory": "SBSA",
                "revalidate": false,
                "cardNo": "9988774455667715"
            }
        ];

    var systemPrincipals =
    {
        "type": "BANKING",
        "version": null,
        "id": 2106,
        "profileStyleType": "PERSONAL",
        "channelProfileId": 3735,
        "revalidate": false,
        "territory": "SA",
        "cardNo": "5221266361171019"
    };

    var moreDetails =
        [
        {
            "id": 13062,
            "version": null,
            "userName": "11:19:58osttesting@standardbank.co.za",
            "diType": "EMAIL",
            "channelIndicator": null,
            "authenticationAttempts": 0,
            "activated": true,
            "lastLoggedIn": "2014-10-14T09:20:03.331+0000",
            "registrationDate": "2014-10-14T09:15:55.564+0000",
            "systemPrincipals": [
                {
                    "type": "OST",
                    "version": null,
                    "id": 6971,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 58577,
                    "territory": "SBSA",
                    "revalidate": false,
                    "displayName": "load_test_491@ostusers.com",
                    "accessKey": "308860913D277B305655448C110595BC4C9BD3C5A41B3F866DF0C0BBF2F22DCC",
                    "accessTimestamp": "2014-10-14 11:20:06.223+0200"
                },
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 13871,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SBSA",
                    "revalidate": false,
                    "cardNo": "9988774455667715"
                }
            ],
            "preferredName": null,
            "disabled": false,
            "$$hashKey": "object:395"
        },
        {
            "id": 27160,
            "version": null,
            "userName": "suitesting2@nowhere.com",
            "diType": "EMAIL",
            "channelIndicator": "CHANNEL",
            "authenticationAttempts": 0,
            "activated": true,
            "lastLoggedIn": null,
            "registrationDate": "2016-02-04T08:30:55.476+0000",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 13849,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SBSA",
                    "revalidate": false,
                    "cardNo": "1234567891234567"
                },
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 13886,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SBSA",
                    "revalidate": false,
                    "cardNo": "9988774455667715"
                }
            ],
            "preferredName": null,
            "disabled": false,
            "$$hashKey": "object:396"
        }
    ];
    var linkedDigitalId = {
        "id": 13062,
        "version": null,
        "userName": "11:19:58osttesting@standardbank.co.za",
        "diType": "EMAIL",
        "channelIndicator": null,
        "authenticationAttempts": 0,
        "activated": true,
        "lastLoggedIn": "2014-10-14T09:20:03.331+0000",
        "registrationDate": "2014-10-14T09:15:55.564+0000",
        "systemPrincipals": [
            {
                "type": "OST",
                "version": null,
                "id": 6971,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 58577,
                "territory": "SBSA",
                "revalidate": false,
                "displayName": "load_test_491@ostusers.com",
                "accessKey": "308860913D277B305655448C110595BC4C9BD3C5A41B3F866DF0C0BBF2F22DCC",
                "accessTimestamp": "2014-10-14 11:20:06.223+0200"
            },
            {
                "type": "BANKING",
                "version": null,
                "id": 13859,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 0,
                "territory": "SBSA",
                "revalidate": false,
                "cardNo": "9988774455667781"
            },
            {
                "type": "BANKING",
                "version": null,
                "id": 13860,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 0,
                "territory": "SBSA",
                "revalidate": false,
                "cardNo": "9988774455667782"
            }
        ],
        "preferredName": null,
        "disabled": false
    };

    var systemsPrincipalsData = [
        {
            "id": 13058,
            "version": null,
            "userName": "suitesting1@nowhere.com",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 8507,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988774455667788",
                    "numberOfElements": 2
                }
            ],
            "disabled": false
        },
        {
            "id": 13059,
            "version": null,
            "userName": "suitesting2@nowhere.com",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 8535,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988774455667715"
                }
            ],
            "disabled": false
        }
    ];
    var userDetails =
    {
        "id": 3214,
        "version": null,
        "userName": "cardlinking3@sit1.com",
        "systemPrincipals": [
            {
                "type": "BANKING",
                "version": null,
                "id": 2206,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 3785,
                "cardNo": "5221266361171020"
            },
            {
                "type": "BANKING",
                "version": null,
                "id": 2206,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 3785,
                "cardNo": "1234567890123453"
            }
        ]
    };
    beforeEach(module('app.controllers.updateSelectedPrincipal.selectedPrincipals.viewSelectedPrincipalController'));
    beforeEach(inject(function ($q, $rootScope, $controller, ManageDigitalIdService, _errorMessagesFactory_,
                                ApplicationCacheFactory, $location) {
        scope = $rootScope.$new();
        location = $location;
        manageDigitalIdService = ManageDigitalIdService;
        errorMessageFactory = _errorMessagesFactory_;
        applicationCacheFactory = ApplicationCacheFactory;

        var modalResult = {
            then: function (callback) {
                callback("1234567890123453");
            }
        };
        spyOn(modalServiceMock, "open")
            .and
            .returnValue({ result: modalResult });

        principalDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'replaceCardOnDigitalId').and.returnValue(principalDeferred.promise);

        principalLinkedDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'viewDigitalIDsLinkedToCard').and.returnValue(principalLinkedDeferred.promise);

        listSystemPrincipalsDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'listDigitalIds').and.returnValue(listSystemPrincipalsDeferred.promise);

        linkedDigitalIdDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'removeDigitalIDFromCard').and.returnValue(linkedDigitalIdDeferred.promise);


        createController = function () {
            return   $controller("ViewSelectedPrincipalController", {
                $scope: scope,
                ManageDigitalIdService: manageDigitalIdService,
                $location: location,
                _errorMessagesFactory_: errorMessageFactory,
                $modal: modalServiceMock,
                ApplicationCacheFactory: applicationCacheFactory
            })
        };
    }));

    it('should initialize scope ', function () {
        createController();
        expect(scope.init).toBeDefined();
        applicationCacheFactory.put('searchResults', userDetails);
        scope.userDetails = applicationCacheFactory.get('searchResults');
        scope.init();
        scope.$apply();
    });

    describe('modal to replace card number ', function () {
        modalServiceMock = {
            open: function (options) {
            }
        };

        it("should call modal for card replacement and processed with card change after card validations ",
            function () {
                createController();
                scope.openModalForReplaceCardNumber('123456789012345', 24012);
                expect(modalServiceMock.open).toHaveBeenCalled();
                expect(scope.principalCardNumber).toBeDefined();
                expect(scope.principalId).toBeDefined();
                var newCard = '1234567890123453';
                applicationCacheFactory.put('searchResults', userDetails.systemPrincipals);
                expect(newCard).toBeDefined();
                expect(newCard.toString().length).toBe(16);
                scope.bankingSystemPrincipals = applicationCacheFactory.get('searchResults');
                expect(scope.principalCardNumber).toBe('123456789012345');
                scope.checkDuplicatedCardNumbers(newCard);
                expect(newCard).toEqual(scope.bankingSystemPrincipals[1].cardNo);
            });

        it("should call modal for card replacement and show error modal upon failed card validations ", function () {
            createController();
            scope.openModalForReplaceCardNumber('1234567890123453', 24012);
            expect(modalServiceMock.open).toHaveBeenCalled();
            expect(scope.principalCardNumber).toBeDefined();
            expect(scope.principalId).toBeDefined();
            var newCard = '1234567890123453';
            applicationCacheFactory.put('searchResults', userDetails);
            scope.bankingSystemPrincipals = applicationCacheFactory.get('searchResults');
            expect(newCard).toBeDefined();
            expect(newCard.toString().length).toBe(16);
            expect(scope.principalCardNumber).toBe('1234567890123453');
            scope.errorHandlingModal();
            expect(scope.errorHandlingModal).toBeDefined();
        });

        it('should call the error handling modal when a duplicate card is found in the DI System Principals',
            function () {
                createController();
                scope.checkDuplicatedCardNumbers(665544332, true);
                scope.errorHandlingModal('Invalid card number', 'This Digital ID already contains this number');
                expect(scope.errorHandlingModal).toBeDefined();
            });
    });

    describe(' replace existing card with new card number ', function () {
        it('should call the service for card replacement and resolve promise', function () {
            var digitalUserName = "ray@win.com";
            var requestParameters = {username: digitalUserName};

            scope.principalType = 'something';
            createController();
            scope.replaceCardNumber(newCard);
            principalDeferred.resolve(systemPrincipals);
            scope.$apply();
            expect(scope.principalType).toBe('something');
            expect(scope.handleReplacementCardResponse).toBeDefined();
            scope.handleReplacementCardResponse(systemPrincipals);
            expect(scope.selectedBankingPrincipals).toEqual(systemPrincipals);
            expect(scope.listSystemPrincipals).toBeDefined();
            expect(scope.responseError).toBe(undefined);
            expect(requestParameters).toBeDefined();
            expect(digitalUserName).toBeDefined();

        });

        it('should call the service for card replacement and resolve with error', function () {
            scope.selectedBankingPrincipals =
            {
                "type": "BANKING",
                "version": null,
                "id": 2106,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 3735,
                "revalidate": false,
                "territory": "SA",
                "cardNo": "5221266361171019"
            };
            createController();
            scope.replaceCardNumber(newCard);
            principalDeferred.reject('error message');
            scope.$apply();
            expect(scope.handleReplaceCardNumberError).toBeDefined();
            scope.handleReplaceCardNumberError('error message');
            expect(scope.selectedBankingPrincipals.id).toBeDefined();
            expect(scope.replacementCard).toBe(undefined);
        });
    });

    describe('populate the system principal', function () {
        it('should list all the system principal for a digital id', function () {
            applicationCacheFactory.put('userDetails', userDetails);
            var value = {
                "content": [
                    {
                        "id": 13057,
                        "version": null,
                        "userName": "suitesting@nowhere.com",
                        "diType": "EMAIL",
                        "credential": {
                            "type": "PASSWORD",
                            "password": "1C6FA5314A606B01108141B6E34C3F38400D9F57",
                            "salt": "602A7531838CC074"
                        },
                        "channelIndicator": "CHANNEL",
                        "authenticationAttempts": 0,
                        "activated": false,
                        "lastLoggedIn": null,
                        "registrationDate": "2015-12-17T08:55:25.987+0000",
                        "systemPrincipals": [
                            {
                                "type": "BANKING",
                                "version": null,
                                "id": 8499,
                                "profileStyleType": "PERSONAL",
                                "channelProfileId": 0,
                                "territory": "SA",
                                "revalidate": false,
                                "cardNo": "2233445566778800"
                            },
                            {
                                "type": "BANKING",
                                "version": null,
                                "id": 8486,
                                "profileStyleType": "PERSONAL",
                                "channelProfileId": 0,
                                "territory": "SA",
                                "revalidate": false,
                                "cardNo": "9988774455667711"
                            }

                        ],
                        "preferredName": null,
                        "disabled": false
                    }
                ]
            };
            createController();
            scope.replaceCardNumber(newCard);
            principalDeferred.resolve(value);
            scope.$apply();
            scope.handleReplacementCardResponse(value);

            scope.listSystemPrincipals();
            expect(scope.digitalIdUserName).toBeUndefined();
            applicationCacheFactory.put('userName', 'cardlinking3@sit1.com');
            scope.digitalIdUserName = applicationCacheFactory.get('userName');
            expect(scope.digitalIdUserName).toBeTruthy();
            expect(scope.digitalIdUserName).toBe('cardlinking3@sit1.com');
            var requestParameters = {
                username: scope.digitalIdUserName
            };
            expect(requestParameters).toBeDefined();
            expect(requestParameters.username).toBe('cardlinking3@sit1.com');
            listSystemPrincipalsDeferred.resolve(value);
            scope.$apply();
            expect(scope.handleSearchByUserDigitalIdResponse).toBeDefined();
            scope.handleSearchByUserDigitalIdResponse(userDetails);
        });

        it('should reject a call to list the system principal for a digital id', function () {
            applicationCacheFactory.put('userDetails', userDetails);
            var value =
            {
                "type": "BANKING",
                "version": null,
                "id": 2106,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 3735,
                "revalidate": false,
                "territory": "SA",
                "cardNo": "5221266361171019"
            };
            createController();
            scope.replaceCardNumber(newCard);
            principalDeferred.resolve(value);
            scope.$apply();
            scope.handleReplacementCardResponse(value);

            expect(scope.listSystemPrincipals).toBeDefined();
            scope.listSystemPrincipals();
            scope.digitalIDUserName = 'cardlinking3@sit1.com';

            applicationCacheFactory.put('userName', scope.digitalIDUserName);
            scope.digitalIDUserName = applicationCacheFactory.get('userName');
            var requestParameters = {
                username: scope.digitalIDUserName
            };
            expect(scope.digitalIDUserName).toBe('cardlinking3@sit1.com');
            expect(requestParameters).toBeDefined();
            expect(requestParameters.username).toBe('cardlinking3@sit1.com');
            listSystemPrincipalsDeferred.reject('error message');
            scope.$apply();
            expect(scope.handleSearchByUserDigitalIdError).toBeDefined();
            scope.handleSearchByUserDigitalIdError('error');
        });
    });

    describe(' view extra linked digital id ', function () {
        it('should list more linked digital ids', function () {
            createController();
            var systemsPrincipalsValue = [
                {
                    "id": 13058,
                    "version": null,
                    "userName": "suitesting1@nowhere.com",
                    "numberOfElements": 2,
                    "systemPrincipals": [
                        {
                            "type": "BANKING",
                            "version": null,
                            "id": 8507,
                            "profileStyleType": "PERSONAL",
                            "channelProfileId": 0,
                            "territory": "SA",
                            "revalidate": false,
                            "cardNo": "9988774455667788",
                            "numberOfElements": 2
                        }
                    ],
                    "disabled": false
                }
            ];
            var value = {
                "numberOfElements": 5,
                "totalPages": 1,
                "totalElements": 5,
                "content": [
                    {
                        "id": 27159,
                        "version": null,
                        "userName": "suitesting1@nowhere.com",
                        "diType": "EMAIL",
                        "channelIndicator": "CHANNEL",
                        "authenticationAttempts": 0,
                        "activated": true,
                        "lastLoggedIn": null,
                        "registrationDate": "2016-02-04T08:30:54.570+0000",
                        "systemPrincipals": [
                            {
                                "type": "BANKING",
                                "version": null,
                                "id": 13847,
                                "profileStyleType": "PERSONAL",
                                "channelProfileId": 0,
                                "territory": "SBSA",
                                "revalidate": false,
                                "cardNo": "9988774455667788"
                            }
                        ],
                        "preferredName": null,
                        "disabled": false
                    }
                ]
            };
            expect(scope.viewExtraLinkedDigitalId).toBeDefined();
            scope.viewExtraLinkedDigitalId('PERSONAL', 'BANKING', 234563456767678);
            principalLinkedDeferred.resolve(value);
            scope.$apply();
            scope.userName = 'cardlinking3@sit1.com';
            scope.cardNumber = '9988774455667788';
            expect(value.numberOfElements).toBeGreaterThan(1);
            expect(scope.moreDigitalsIdResults).toEqual(value.content);
            expect(scope.handleViewDigitalIDsLinkedToCardResponse).toBeDefined();
            scope.handleViewDigitalIDsLinkedToCardResponse(systemsPrincipalsValue);
            expect(scope.cardNumber).toEqual(systemsPrincipalsValue[0].systemPrincipals[0].cardNo);
            scope.moreDigitalsIdResults = systemsPrincipalsValue;
            scope.$apply();
            expect(scope.moreDigitalsIdResults).toBeDefined();
            expect(scope.moreDigitalsIdResults[0].id).toEqual(13058);
            expect(scope.moreDigitalsIdResults[0].userName).toEqual("suitesting1@nowhere.com");
        });

        it('should not have more than one linked DI', function () {
            createController();
            var value = {
                "numberOfElements": 1,
                "totalPages": 1,
                "totalElements": 5,
                "content": [
                    {
                        "id": 27159,
                        "version": null,
                        "userName": "suitesting1@nowhere.com",
                        "diType": "EMAIL",
                        "channelIndicator": "CHANNEL",
                        "authenticationAttempts": 0,
                        "activated": true,
                        "lastLoggedIn": null,
                        "registrationDate": "2016-02-04T08:30:54.570+0000",
                        "systemPrincipals": [
                            {
                                "type": "BANKING",
                                "version": null,
                                "id": 13847,
                                "profileStyleType": "PERSONAL",
                                "channelProfileId": 0,
                                "territory": "SBSA",
                                "revalidate": false,
                                "cardNo": "9988774455667788"
                            }
                        ],
                        "preferredName": null,
                        "disabled": false
                    }
                ]
            };
            expect(scope.viewExtraLinkedDigitalId).toBeDefined();
            scope.viewExtraLinkedDigitalId('PERSONAL', 'BANKING', 234563456767678);
            principalLinkedDeferred.resolve(value);
            scope.$apply();
            expect(value.numberOfElements).toBe(1);
            expect(scope.moreDigitalsIdResults).toBeUndefined();
            expect(scope.moreDigitalsIdinfo).toBe("No other linked Digital ID's");
        });

        it('should not find any more DIs', function () {
            createController();
            var value = {
                "numberOfElements": 5,
                "totalPages": 1,
                "totalElements": 5,
                "content": [
                    {
                        "id": 27159,
                        "version": null,
                        "userName": "suitesting1@nowhere.com",
                        "diType": "EMAIL",
                        "channelIndicator": "CHANNEL",
                        "authenticationAttempts": 0,
                        "activated": true,
                        "lastLoggedIn": null,
                        "registrationDate": "2016-02-04T08:30:54.570+0000",
                        "systemPrincipals": [
                            {
                                "type": "BANKING",
                                "version": null,
                                "id": 13847,
                                "profileStyleType": "PERSONAL",
                                "channelProfileId": 0,
                                "territory": "SBSA",
                                "revalidate": false,
                                "cardNo": "9988774455667788"
                            }
                        ],
                        "preferredName": null,
                        "disabled": false
                    }
                ]
            };
            expect(scope.viewExtraLinkedDigitalId).toBeDefined();
            scope.viewExtraLinkedDigitalId('PERSONAL', 'BANKING', 234563456767678);
            principalLinkedDeferred.resolve(value);
            scope.$apply();
            scope.userName = 'suitesting1@nowhere.com';
            scope.cardNumber = '9988774455667788';
            expect(value.numberOfElements).toBeGreaterThan(1);
            scope.handleViewDigitalIDsLinkedToCardResponse(value.content);
            expect(scope.handleViewDigitalIDsLinkedToCardResponse).toBeDefined();
            expect(scope.userName).toEqual(value.content[0].userName);
        });

        it('should reject a call to list more linked digital ids', function () {
            createController();
            scope.viewExtraLinkedDigitalId('PERSONAL', 'BANKING', 234563456767678);
            principalLinkedDeferred.reject('error');
            scope.$apply();
            expect(systemPrincipals.numberOfElements).not.toEqual(2);
            expect(scope.handleViewDigitalIDsLinkedToCardError).toBeDefined();
            expect(scope.moreDigitalsIdResults).toBeUndefined();
            expect(scope.viewExtraLinkedDigitalId).toBeDefined();
        });

        it('should retrieve more linked digital id and resolve promise', function () {
            createController();
            scope.setDigitalIDsLinkedToCardData('Banking', "PERSONAL", systemPrincipals);
        });

        it('should set the index to -1 when retrieve more linked digital id and resolve promise', function () {
            var index = 1;
            scope.getDigitalIDs = index;
            createController();
            scope.setDigitalIDsLinkedToCardData(index, 2106, systemPrincipals);
            expect(scope.getDigitalIDs).toBe(-1);
        });

        it('should list the digital id details', function () {
            createController();
            var username = 'suitesting2@nowhere.com';
            scope.moreDigitalsIdResults = systemsPrincipalsData;
            scope.viewDigitalIDDetails(username);
            expect(username).toEqual(scope.moreDigitalsIdResults[1].userName);
            scope.searchedCardDetails = scope.moreDigitalsIdResults[0];
            expect(scope.moreDigitalsIdResults).toBeDefined();
            expect(scope.searchedCardDetails).toBeDefined();
            expect(scope.searchedCardDetails).toEqual(scope.moreDigitalsIdResults[0]);
            applicationCacheFactory.put('selectedId', userDetails.id);
            applicationCacheFactory.put('searchedCardDetails', userDetails);
        });
    });

    describe(' remove linked card number from a digital id ', function () {
        it("should call modal for card removal from linked digital id from Banking ", function () {
            createController();
            var selectedDetail = { "type": "BANKING",
                "version": null,
                "id": 13866,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 0,
                "territory": "SBSA",
                "revalidate": false,
                "cardNo": "9988774455667781"
            };
            scope.openModalForRemoveLinkedDigitalId(linkedDigitalId);
            applicationCacheFactory.put('selectedPrincipalType', 'BANKING');
            applicationCacheFactory.put('selectedPrincipalValue', selectedDetail.cardNo);
            expect(scope.selectedDetailsType).not.toBeDefined();
            expect(scope.selectedDetailsValue).not.toBeDefined();
            expect(scope.findSelectedProduct).toBeDefined();
            scope.findSelectedProduct(linkedDigitalId.systemPrincipals);
            scope.selectedDetailsValue = applicationCacheFactory.get('selectedPrincipalValue');
            scope.selectedDetailsType = applicationCacheFactory.get('selectedPrincipalType');
            expect(scope.selectedDetailsType).toBeDefined();
            expect(scope.selectedDetailsValue).toBeDefined();
            expect(scope.selectedDetailsType).toEqual(linkedDigitalId.systemPrincipals[1].type);
            expect(scope.selectedDetailsValue).toBe(linkedDigitalId.systemPrincipals[1].cardNo);
            scope.selectedCardDetails = selectedDetail.id;
            expect(scope.selectedCardDetails).toBeDefined();
            scope.principalId = selectedDetail.id;
            expect(scope.principalId).toBeDefined();
            applicationCacheFactory.put('linkedDigitalId', linkedDigitalId);
            expect(scope.digitalId).toBeDefined();
            expect(modalServiceMock.open).toHaveBeenCalled();

            expect(scope.digitalId).toEqual('11:19:58osttesting@standardbank.co.za');

            expect(scope.principalId).toEqual(13866);
        });
        it("should call modal for card removal from linked digital id form OST", function () {
            createController();
            var selectedDetail =  {
                "type": "OST",
                "version": null,
                "id": 6971,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 58577,
                "territory": "SBSA",
                "revalidate": false,
                "displayName": "load_test_491@ostusers.com",
                "accessKey": "308860913D277B305655448C110595BC4C9BD3C5A41B3F866DF0C0BBF2F22DCC",
                "accessTimestamp": "2014-10-14 11:20:06.223+0200"
            };
            scope.openModalForRemoveLinkedDigitalId(linkedDigitalId);
            applicationCacheFactory.put('selectedPrincipalType', selectedDetail.type);
            applicationCacheFactory.put('selectedPrincipalValue', selectedDetail.displayName);
            expect(scope.selectedDetailsType).not.toBeDefined();
            expect(scope.selectedDetailsValue).not.toBeDefined();
            expect(scope.findSelectedProduct).toBeDefined();
            scope.findSelectedProduct(linkedDigitalId.systemPrincipals);
            scope.selectedDetailsValue = applicationCacheFactory.get('selectedPrincipalValue');
            scope.selectedDetailsType = applicationCacheFactory.get('selectedPrincipalType');
            expect(scope.selectedDetailsType).toBeDefined();
            expect(scope.selectedDetailsValue).toBeDefined();
            expect(scope.selectedDetailsType).toEqual(linkedDigitalId.systemPrincipals[0].type);
            expect(scope.selectedDetailsValue).toEqual(linkedDigitalId.systemPrincipals[0].displayName);
            scope.selectedCardDetails = selectedDetail.id;
            expect(scope.selectedCardDetails).toBeDefined();
            scope.principalId = selectedDetail.id;
            expect(scope.principalId).toBeDefined();
            applicationCacheFactory.put('linkedDigitalId', linkedDigitalId);
            expect(scope.digitalId).toBeDefined();
            expect(modalServiceMock.open).toHaveBeenCalled();
            expect(scope.digitalId).toEqual('11:19:58osttesting@standardbank.co.za');
            expect(scope.principalId).toEqual(6971);
        });
        it('should removed a card number from a linked digital id', function () {
            var digitalID = 3214;
            var principalId = 2206;
            var systemPrincipals = [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 2207,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 3785,
                    "cardNo": "1234567890123453"
                },
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 2206,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 3785,
                    "cardNo": "5221266361171020"
                }

            ];
            createController();
            scope.removeLinkedDigital(digitalID, principalId);
            linkedDigitalIdDeferred.resolve(systemPrincipals);
            scope.$apply();
            scope.moreDigitalsIdResults = moreDetails;
            expect(scope.handleRemoveDigitalIDFromCardResponse).toBeDefined();
            scope.handleRemoveDigitalIDFromCardResponse();
            scope.digitalId = linkedDigitalId.userName;
            expect(applicationCacheFactory.remove).toBeDefined();
            expect(scope.digitalId).toBeDefined();
            expect(scope.digitalId).toEqual('11:19:58osttesting@standardbank.co.za');
            expect(scope.moreDigitalsIdResults).toBeDefined();
        });

        it('should try to remove card number from a linked digital id and receive an error', function () {
            var digitalID = 3214;
            var principalId = 2206;
            createController();
            scope.removeLinkedDigital(digitalID, principalId);
            linkedDigitalIdDeferred.reject('error message');
            scope.$apply();
            expect(scope.handleRemoveDigitalIDFromCardError).toBeDefined();
            scope.handleRemoveDigitalIDFromCardError('error message');
            expect(scope.responseError).toEqual('error message');
            scope.moreDigitalsIdResults = selectedDigitalDetails.systemPrincipals;
            expect(scope.errorMessage).toEqual(errorMessageFactory.error502);
        });
    });
});


