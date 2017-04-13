/*global angular */

'use strict';

describe("Unit : SearchByPrincipalTypeController", function () {

    var scope, manageDigitalIdService, principalTypeDeferred, createController, errorMessageFactory, applicationCacheFactory,
        cardUtilService, modalServiceMock, location;
    var oneItemArray = [
        {
            "userName": "bobbi99@somewhere.com",
            "id": 12829,
            "channelIndicator": "CHANNEL",
            "lastLoggedIn": null,
            "registrationDate": "2015-10-29T12:41:14.908+0000",
            "authenticationAttempts": 0,
            "activated": false,
            "disabled": false,
            "systemPrincipals": {
                "type": "BANKING",
                "version": null,
                "id": 8249,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 0,
                "territory": "SA",
                "revalidate": false,
                "cardNo": "9988776655443322"
            }
        }
    ];
    var array =
        [
            {
                "userName": "bobbi99@somewhere.com",
                "id": 12829,
                "channelIndicator": "CHANNEL",
                "lastLoggedIn": null,
                "registrationDate": "2015-10-29T12:41:14.908+0000",
                "authenticationAttempts": 0,
                "activated": false,
                "disabled": false,
                "systemPrincipals": {
                    "type": "BANKING",
                    "version": null,
                    "id": 8249,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988776655443322"
                }
            },
            {
                "userName": "bobbid@somewhere.com",
                "id": 12831,
                "channelIndicator": "CHANNEL",
                "lastLoggedIn": null,
                "registrationDate": "2015-10-29T12:42:09.782+0000",
                "authenticationAttempts": 0,
                "activated": true,
                "disabled": false,
                "systemPrincipals": {
                    "type": "BANKING",
                    "version": null,
                    "id": 8253,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988776655443322"
                }
            },
            {
                "userName": "bobbic@somewhere.com",
                "id": 12833,
                "channelIndicator": "CHANNEL",
                "lastLoggedIn": null,
                "registrationDate": "2015-10-29T12:42:55.865+0000",
                "authenticationAttempts": 0,
                "activated": true,
                "disabled": false,
                "systemPrincipals": {
                    "type": "BANKING",
                    "version": null,
                    "id": 8261,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988776655443322"
                }
            },
            {
                "userName": "bobbie@somewhere.com",
                "id": 12835,
                "channelIndicator": "CHANNEL",
                "lastLoggedIn": null,
                "registrationDate": "2015-10-29T12:43:50.793+0000",
                "authenticationAttempts": 0,
                "activated": true,
                "disabled": false,
                "systemPrincipals": {
                    "type": "BANKING",
                    "version": null,
                    "id": 8267,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988776655443322"
                }
            },
            {
                "userName": "suitesting5@nowhere.com",
                "id": 13062,
                "channelIndicator": "CHANNEL",
                "lastLoggedIn": null,
                "registrationDate": "2015-12-17T09:18:41.086+0000",
                "authenticationAttempts": 0,
                "activated": false,
                "disabled": false,
                "systemPrincipals": {
                    "type": "BANKING",
                    "version": null,
                    "id": 8578,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988774455667713"
                }
            }
        ];

    var values = [
        {
            "id": 13060,
            "version": null,
            "userName": "suitesting3@nowhere.com",
            "diType": "EMAIL",
            "credential": {
                "type": "PASSWORD",
                "password": "5C6805CB0D459EB863FD25994155215BE90F409F",
                "salt": "C449D30092B08BD4"
            },
            "channelIndicator": "CHANNEL",
            "authenticationAttempts": 0,
            "activated": true,
            "lastLoggedIn": null,
            "registrationDate": "2015-12-17T09:10:25.167+0000",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 8537,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988774455667788"
                }
            ],
            "preferredName": null,
            "disabled": false
        }
    ];

    var value = [
        {
            "id": 13060,
            "version": null,
            "userName": "suitesting3@nowhere.com",
            "diType": "EMAIL",
            "credential": {
                "type": "PASSWORD",
                "password": "5C6805CB0D459EB863FD25994155215BE90F409F",
                "salt": "C449D30092B08BD4"
            },
            "channelIndicator": "CHANNEL",
            "authenticationAttempts": 0,
            "activated": true,
            "lastLoggedIn": null,
            "registrationDate": "2015-12-17T09:10:25.167+0000",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 8537,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988774455667788"
                },
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 8549,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988774455667714"
                },
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 8550,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988774455667715"
                }
            ],
            "preferredName": null,
            "disabled": false
        },
        {
            "id": 13061,
            "version": null,
            "userName": "suitesting4@nowhere.com",
            "diType": "EMAIL",
            "credential": {
                "type": "PASSWORD",
                "password": "077754261A44539B8DAE057297F6288485B0204D",
                "salt": "81B175863DB58791"
            },
            "channelIndicator": "CHANNEL",
            "authenticationAttempts": 0,
            "activated": true,
            "lastLoggedIn": null,
            "registrationDate": "2015-12-17T09:16:02.928+0000",
            "systemPrincipals": [
                {
                    "type": "OST",
                    "version": null,
                    "id": 8419,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "displayName": "SUI1",
                    "accessKey": "453fgfd45fgf45hgf45hl314l34k11",
                    "accessTimestamp": "2015-04-08 15:02:02.078+0200"
                },
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 8551,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "2222222332222222"
                },
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 8552,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988774455667788"
                },
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 8553,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988774455667781"
                },

                {
                    "type": "BANKING",
                    "version": null,
                    "id": 8558,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "998877445566776"
                }

            ],
            "preferredName": null,
            "disabled": false
        }
    ];
    var digitalIDDetails = [
        {
            id: 11163,
            version: null,
            userName: 'bob@thebuilder.com',
            channelIndicator: 'CHANNEL',
            authenticationAttempts: 3,
            activated: true,
            lastLoggedIn: null,
            registrationDate: null,
            systemPrincipals: [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 8455,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988774455667788"
                }
            ]
        }
    ];
    var ostResponse = [
        {
            id: 11163,
            version: null,
            userName: 'bob@thebuilder.com',
            channelIndicator: 'CHANNEL',
            authenticationAttempts: 3,
            activated: true,
            lastLoggedIn: null,
            registrationDate: null,
            "systemPrincipals": [
                {
                    "type": "OST",
                    "version": null,
                    "id": 15770,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SBSA",
                    "revalidate": false,
                    "displayName": "ourOST_Sui3",
                    "accessKey": "7AAE7F10BCAC0C4DEF3C6C48FF7BCBB8879A8600146E34DDEA63456174",
                    "accessTimestamp": "2014-11-26 07:25:06.604+0200"
                }
            ]
        }
    ];

    var digitalIDDetailsArray =
        [
            {
                "userName": "bobbi99@somewhere.com",
                "id": 12829,
                "channelIndicator": "CHANNEL",
                "lastLoggedIn": null,
                "registrationDate": "2015-10-29T12:41:14.908+0000",
                "authenticationAttempts": 0,
                "activated": false,
                "systemPrincipals": [
                    {
                        "type": "BANKING",
                        "version": null,
                        "id": 8249,
                        "profileStyleType": "PERSONAL",
                        "channelProfileId": 0,
                        "territory": "SA",
                        "revalidate": false,
                        "cardNo": "9988776655443322"
                    },
                    {
                        "type": "BANKING",
                        "version": null,
                        "id": 8550,
                        "profileStyleType": "PERSONAL",
                        "channelProfileId": 0,
                        "territory": "SA",
                        "revalidate": false,
                        "cardNo": "9988774455667715"
                    }
                ],
                "preferredName": null,
                "disabled": false
            }
        ];

    beforeEach(module('app.controllers.searchDashBoard.searchByPrincipalTypeController'));

    beforeEach(inject(function ($q, $rootScope, $controller,$location, ManageDigitalIdService, _errorMessagesFactory_,
                                ApplicationCacheFactory, CardUtilService) {
        scope = $rootScope.$new();
        manageDigitalIdService = ManageDigitalIdService;
        errorMessageFactory = _errorMessagesFactory_;
        applicationCacheFactory = ApplicationCacheFactory;
        location = $location;
        cardUtilService = CardUtilService;

        principalTypeDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'listDigitalIds').and.returnValue(principalTypeDeferred.promise);

        var modalResult = {
            then: function (callback) {
                callback("spiderman"); // passing fake value as result
            }
        };

        spyOn(modalServiceMock, "open")
            .and
            .returnValue({ result: modalResult });

        createController = function () {
            return   $controller("SearchByPrincipalTypeController", {
                $scope: scope,
                $location: location,
                ManageDigitalIdService: manageDigitalIdService,
                ApplicationCacheFactory: applicationCacheFactory,
                CardUtilService: cardUtilService,
                _errorMessagesFactory_: errorMessageFactory,
                $modal: modalServiceMock
            })
        };

    }));

    describe('initializing function ', function () {
        it('should find scope ', function () {
            expect(scope).toBeDefined();
            expect(scope.searching).toBeFalsy();
            expect(scope.searchResults).toBeUndefined();
        });

        it('init Method should check for previous search results', function () {
            createController();
            applicationCacheFactory.put('searchResults', digitalIDDetailsArray);
            scope.searchResults = applicationCacheFactory.get('searchResults');
            scope.searching = false;
            scope.currentPage = 1;
            scope.maxSize = scope.numPerPage = 10;
            scope.begin = 0;
            scope.init();
            expect(applicationCacheFactory.get('searchResults')).toBeDefined();
            expect(scope.searching).toBeDefined();
            expect(scope.maxSize).toBeDefined();
            expect(scope.searchResults).toEqual(digitalIDDetailsArray);
            expect(scope.searching).toBeTruthy();
            applicationCacheFactory.put('searchResults', digitalIDDetails);
            applicationCacheFactory.put('searchingByCard', true);
        });

        it('init Method should not get applicationCacheFactory searchResults', function () {
            createController();
            scope.init();
            expect(applicationCacheFactory.get('searchResults')).toBeUndefined();
            expect(scope.searchResults).toBeUndefined();
        });

        it('should reset the value to initial state ', function () {
            createController();
            applicationCacheFactory.put('filteredCardResults', digitalIDDetailsArray);
            applicationCacheFactory.put('filteredCardResults', digitalIDDetailsArray);
            scope.paginatedFilteredCardResults = applicationCacheFactory.get('filteredCardResults');
            scope.searching = false;
            scope.currentPage = 1;
            scope.maxSize = scope.numPerPage = 10;
            scope.begin = 0;
            scope.init();
            expect(applicationCacheFactory.get('filteredCardResults')).toBeDefined();
            expect(scope.searching).toBeDefined();
            expect(scope.maxSize).toBeDefined();
            expect(scope.paginatedFilteredCardResults).toEqual(digitalIDDetailsArray);
            applicationCacheFactory.put('filteredCardResults', value);
            applicationCacheFactory.put('searchingByCard', true);
            expect(scope.searching).toBeFalsy();
            expect(scope.doPagination).toBeDefined();
            expect(scope.searchCardResults).toBeUndefined();
            scope.searchCardResults = value;
            expect(scope.searchCardResults).toBeDefined();
            scope.begin = 5;
            scope.end = 15;
            expect(scope.begin).toBeDefined();
            expect(scope.end).toBeDefined();
            scope.paginatedFilteredCardResults = value;
            expect(scope.paginatedFilteredCardResults).toBeDefined();
        });

        it('should execute the init function if there is no cache', function () {
            createController();
            applicationCacheFactory.put('searchResults', undefined);
            scope.init();
            spyOn(scope, 'doPagination');
            expect(scope.doPagination).not.toHaveBeenCalled();
        });
    });

    describe("show hints", function(){
        modalServiceMock = {
            open: function (options) {
            }
        };

        it("should open modal to show hints", function () {
            createController();
            scope.searchHintsModal();
            expect(modalServiceMock.open).toHaveBeenCalled();
            expect(scope.hintsHeader).toEqual('Search Hints');
            expect(scope.hintsMessage1).toEqual('%@standardbank%');
            expect(scope.hintsMessage2).toEqual("Using '%' before and after your input will return all the results that contain that specific text somewhere in it.");
            expect(scope.hintsMessage3).toEqual('%jack@_bank.co.za%');
            expect(scope.hintsMessage4).toEqual("Using '_' together with '%' fills in missing information for you and will return all information that has that text with anything else in the '_' space.");
        });
    });

    describe('Sort order ', function () {
        it('should sort the order according to the field specified', function () {
            createController();
            scope.predicate = 'userName';
            scope.reverse = false;
            expect(scope.order).toBeDefined();
            scope.order('userName');
            expect(scope.reverse).toBeTruthy();
            expect(scope.predicate).toEqual('userName');
        });

        it('should not sort fields not  specified', function () {
            createController();
            expect(scope.order).toBeDefined();
            scope.predicate = 'disabled';
            scope.reverse = true;
            scope.order('userName');
            expect(scope.reverse).toBe(false);
        });
    });

    describe("should call the search by digital ID service", function () {
        it("should list the digital id searched", function () {
            createController();
            applicationCacheFactory.put('searchType','DIGITALID');
            scope.searchByTypePrincipal();
            var searchType = applicationCacheFactory.get('searchType');
            principalTypeDeferred.resolve(digitalIDDetails);
            scope.$apply();
            expect(scope.responseError).toBeUndefined();
        });

        it("should list the card number id searched", function () {
            createController();
            applicationCacheFactory.put('searchType','CARDNO');
            scope.searchByTypePrincipal(123456789);
            var searchType = applicationCacheFactory.get('searchType');
            principalTypeDeferred.resolve(digitalIDDetails);
            scope.$apply();
            expect(scope.responseError).toBeUndefined();
        });

        it("should list the ost id searched", function () {
            createController();
            applicationCacheFactory.put('searchType','OST');
            scope.searchByTypePrincipal();
            var searchType = applicationCacheFactory.get('searchType');
            principalTypeDeferred.resolve(digitalIDDetails);
            scope.$apply();
            expect(scope.responseError).toBeUndefined();
        });

        it("should list the digital id searched", function () {
            createController();
            var searchValue = '123456789012345678';
            applicationCacheFactory.put('searchType','CARDNO');
            scope.searchByTypePrincipal(searchValue);
            var searchType = applicationCacheFactory.get('searchType');
            principalTypeDeferred.resolve(digitalIDDetails);
            scope.$apply();
            expect(scope.responseError).toBeUndefined();
        });

        it("should reject call to list searched digital id", function () {
            createController();
            scope.searchByTypePrincipal();
            principalTypeDeferred.reject('error message');
            scope.$apply();
            expect(scope.responseError).toBe('error message');
            expect(scope.errorMessage).toBe(errorMessageFactory.error502);
            expect(scope.response).toBeUndefined();
        });
    });

    describe('searching by card or OST or digital id', function () {
        it('should search by card number and list all digital ids linked to a card', function () {
            createController();
            var searchCardValue = "9988776655443322";
            applicationCacheFactory.put('random', digitalIDDetails);
            scope.searchByTypePrincipal(searchCardValue);
            expect(searchCardValue.length).toBe(16);
            principalTypeDeferred.resolve(digitalIDDetailsArray);
            scope.$apply();
            expect(scope.searchByTypePrincipal).toBeDefined();
        });

        it('should not list digital id not matching the card number searched leading to scope.mapCardSearchResults to not be called', function () {
            createController();
            var cardNumberValue = '9988774455667788';
            var cardNumber = '9988774455667788';
            expect(scope.searchByTypePrincipal).toBeTruthy();
            expect(scope.listOfSystemPrincipals).toBeDefined();
            scope.listOfSystemPrincipals(value, cardNumberValue);
            expect(scope.mapCardSearchResults).toBeDefined();
            expect(value[1].systemPrincipals[0].type).not.toBe("BANKING");
            expect(cardUtilService.cardNumberExactMatchUtil).toBeDefined();
            expect(cardUtilService.cardNumberExactMatchUtil(cardNumber, cardNumberValue)).toBeTruthy();
            scope.$digest();
            spyOn(scope, 'mapCardSearchResults');
            expect(scope.mapCardSearchResults).not.toHaveBeenCalled();
        });

        it('should list all digital id matching the card number searched', function () {
            var results = {
                "userName": "bobbi99@somewhere.com",
                "id": 12829,
                "channelIndicator": "CHANNEL",
                "lastLoggedIn": null,
                "registrationDate": "2015-10-29T12:41:14.908+0000",
                "authenticationAttempts": 0,
                "activated": false,
                "disabled": false,
                "systemPrincipals": {
                    "type": "BANKING",
                    "version": null,
                    "id": 8249,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SA",
                    "revalidate": false,
                    "cardNo": "9988776655443322"
                }
            };
            createController();
            var cardNumberValue = '9988774455667788';
            var cardStore = '9988774455667788';
            expect(scope.searchByTypePrincipal).toBeTruthy();
            applicationCacheFactory.put('searchType', 'CARDNO');

            principalTypeDeferred.resolve(digitalIDDetails);
            var searchType = applicationCacheFactory.get('searchType');

            expect(scope.listOfSystemPrincipals).toBeDefined();
            scope.listOfSystemPrincipals(values, cardNumberValue);
            expect(scope.mapCardSearchResults).toBeDefined();
            expect(values[0].systemPrincipals[0].type).toBe("BANKING");
            expect(cardUtilService.cardNumberExactMatchUtil).toBeDefined();
            expect(cardUtilService.cardNumberExactMatchUtil(cardStore, cardNumberValue)).toBeTruthy();
            scope.mapCardSearchResults(values, values.systemPrincipals);
            var cardSearchResults = {};
            expect(values).toBeDefined();
            expect(cardNumberValue).toBeDefined();
            expect(cardSearchResults).toBeDefined();
            cardSearchResults.id = results.id;
            expect(cardSearchResults.id).toEqual(results.id);
        });
        it('should list all ost display name matching the searched OST display name', function () {
            var results = {
                "userName": "bobbi99@somewhere.com",
                "id": 12829,
                "channelIndicator": "CHANNEL",
                "lastLoggedIn": null,
                "registrationDate": "2015-10-29T12:41:14.908+0000",
                "authenticationAttempts": 0,
                "activated": false,
                "disabled": false,
                "systemPrincipals": [
                    {
                        "type": "OST",
                        "version": null,
                        "id": 15770,
                        "profileStyleType": "PERSONAL",
                        "channelProfileId": 0,
                        "territory": "SBSA",
                        "revalidate": false,
                        "displayName": "ourOST_Sui3",
                        "accessKey": "7AAE7F10BCAC0C4DEF3C6C48FF7BCBB8879A8600146E34DDEA63456174",
                        "accessTimestamp": "2014-11-26 07:25:06.604+0200"
                    }
                ]
            };
            createController();
            var ostDisplayName = 'ourOST';
            var ostStore = 'ourOST_Sui3';
            expect(scope.searchByTypePrincipal).toBeTruthy();
            applicationCacheFactory.put('searchType', 'OST');
            principalTypeDeferred.resolve(ostResponse);
            var searchType = applicationCacheFactory.get('searchType');
            expect(scope.handleOstResponse).toBeDefined();
            scope.handleOstResponse(ostResponse, ostDisplayName);
            expect(scope.mapCardSearchResults).toBeDefined();
            expect(ostResponse[0].systemPrincipals[0].type).toBe("OST");
            expect(cardUtilService.stringStartsWithUtil(ostStore, ostDisplayName)).toEqual(true);
            scope.mapCardSearchResults(ostDisplayName, ostResponse.systemPrincipals);
            var cardSearchResults = {};
            expect(values).toBeDefined();
            expect(ostDisplayName).toBeDefined();
            expect(cardSearchResults).toBeDefined();
            cardSearchResults.id = results.id;
            expect(cardSearchResults.id).toEqual(results.id);
            scope.handleOstResponse(ostResponse, ostDisplayName);
            expect(scope.mapCardSearchResults).toBeDefined();
            expect(ostResponse[0].systemPrincipals[0].type).not.toBe("OST1");
            expect(cardUtilService.stringStartsWithUtil(ostStore, 'ostDisplayName')).toEqual(false);
        });
        it('should fail to list all ost display name when not matching the searched OST display name', function () {
            createController();
            var ostDisplayName = 'ourOST1';
            var ostStore = 'ourOST_Sui3';
            expect(scope.searchByTypePrincipal).toBeTruthy();
            applicationCacheFactory.put('searchType', 'OST');
            principalTypeDeferred.resolve(ostResponse);
            var searchType = applicationCacheFactory.get('searchType');
            expect(scope.handleOstResponse).toBeDefined();
            scope.handleOstResponse(ostResponse, ostDisplayName);
            expect(scope.mapCardSearchResults).toBeDefined();
            expect(ostResponse[0].systemPrincipals[0].type).toBe("OST");
            expect(cardUtilService.stringStartsWithUtil(ostStore, ostDisplayName)).toEqual(false);
            scope.mapCardSearchResults(ostDisplayName, ostResponse.systemPrincipals);
        });

        it('should search by card and return error when system fails', function () {
            createController();
            var searchCardValue = "5555555444433399";
            expect(searchCardValue.length).toBe(16);
            applicationCacheFactory.put('random', digitalIDDetails);
            scope.searchByTypePrincipal(searchCardValue);
            principalTypeDeferred.reject('error message');
            scope.$apply();
            expect(scope.responseError).toBeDefined();
            expect(scope.errorMessage).toBeDefined();
            expect(scope.errorMessage).toBe('A communication error has occurred');

        });

        it('should search by card and return error when it is not a full card number', function () {
            createController();
            applicationCacheFactory.put('searchType', 'CARDNO');
            var searchType = applicationCacheFactory.get('searchType');
            expect(scope.cardNumberSearchMessage).toBeUndefined();
            scope.searchByTypePrincipal('99');
            expect(applicationCacheFactory.get('searchType')).toBeDefined();
            scope.$apply();
            expect(scope.cardNumberSearchMessage).toBe('Search by full card number: 9, 16 or 18 digits only');
        });
    });

    describe('view specific digital id details', function () {
        it('should list details for a selected digital id ', function () {
            var username = 'bobbi99@somewhere.com';
            createController();
            applicationCacheFactory.put('searchCardResults', oneItemArray);
            scope.viewSelectedPrincipalDetails(username);
            scope.searchCardResults = oneItemArray;
            expect(scope.searchCardResults.length).toBe(1);
            expect(scope.viewSelectedPrincipalDetails).toBeDefined();
            var cardResultsDetails = applicationCacheFactory.get('searchCardResults');
            scope.viewSelectedPrincipalDetails(username, cardResultsDetails);
            scope.selectedSpecificCardDetails(username, cardResultsDetails);
            expect(username).toEqual(cardResultsDetails[0].userName);
            expect(scope.searchedCardDetails).toBeDefined();
        });

        it('should not list details for a selected digital id if the userNames dont match', function () {
            var username = 'bobbi@somewhere.com';
            createController();
            applicationCacheFactory.put('searchCardResults', oneItemArray);
            scope.viewSelectedPrincipalDetails(username);
            scope.searchCardResults = oneItemArray;
            expect(scope.searchCardResults.length).toBe(1);
            expect(scope.viewSelectedPrincipalDetails).toBeDefined();
            var cardResultsDetails = applicationCacheFactory.get('searchCardResults');
            scope.viewSelectedPrincipalDetails(username, cardResultsDetails);
            scope.selectedSpecificCardDetails(username, cardResultsDetails);
            expect(username).not.toEqual(cardResultsDetails[0].userName);
        });
    });

    describe('pagination', function () {
        it('should paginate and list detail for search by digital Id', function () {
            createController();
            scope.searchResults = array;
            applicationCacheFactory.put('searchType', 'DIGITALID');
            scope.doPagination();

            scope.$apply();
            scope.begin = 1;
            scope.end = 2;
            scope.searchCardResults = array;
            scope.paginatedFilteredCardResults = value;
            scope.filteredCardResults = array;
            scope.$apply();
            expect(scope.filteredCardResults).toBeDefined();
            expect(scope.searchCardResults).toBeDefined();
            expect(scope.begin).toBeDefined();
            expect(scope.end).toBeDefined();
            expect(scope.paginatedFilteredCardResults).toBeDefined();
        });

        it('should paginate and list detail  for search types not digital Id', function () {
            createController();
            scope.searchResults = array;
            scope.doPagination();

            scope.$apply();
            scope.begin = 1;
            scope.end = 2;
            scope.searchCardResults = array;
            scope.paginatedFilteredCardResults = value;
            scope.filteredCardResults = array;
            scope.$apply();
            expect(scope.filteredCardResults).toBeDefined();
            expect(scope.searchCardResults).toBeDefined();
            expect(scope.begin).toBeDefined();
            expect(scope.end).toBeDefined();
            expect(scope.paginatedFilteredCardResults).toBeDefined();
        });
    });

});


