/*global angular */

'use strict';

describe("Unit : ViewSystemPrincipalController", function () {
    var scope, manageDigitalIdService, errorMessageFactory, applicationCacheFactory, createViewSystemPrincipalController, ViewSystemPrincipalController, viewDigitalIdsForCardDeferred,
        replaceCardNumberDeferred, removeDigitalIDFromCardDeferred, deleteSystemPrincipalDeferred, populateDeferred
        , modalServiceMock;

    var digitalIDUserName = 'bob@thebuilder.com';

    var value = {
        "content": [
            {
                "id": 13058,
                "version": null,
                "userName": "suitesting1@nowhere.com",
                "channelIndicator": "CHANNEL",
                "authenticationAttempts": 0,
                "activated": true,
                "lastLoggedIn": null,
                "registrationDate": "2015-12-17T08:57:27.399+0000",
                "systemPrincipals": [
                    {
                        "type": "BANKING",
                        "version": null,
                        "id": 8510,
                        "profileStyleType": "PERSONAL",
                        "channelProfileId": 0,
                        "territory": "SA",
                        "revalidate": false,
                        "cardNo": "9988774455667783"
                    },
                    {
                        "type": "BANKING",
                        "version": null,
                        "id": 8511,
                        "profileStyleType": "PERSONAL",
                        "channelProfileId": 0,
                        "territory": "SA",
                        "revalidate": false,
                        "cardNo": "9988774455667784"
                    },
                    {
                        "type": "BANKING",
                        "version": null,
                        "id": 8382,
                        "profileStyleType": "PERSONAL",
                        "channelProfileId": 0,
                        "territory": "SA",
                        "revalidate": false,
                        "cardNo": "7777777777777777"
                    },
                    {
                        "type": "OST",
                        "version": null,
                        "id": 8386,
                        "profileStyleType": "PERSONAL",
                        "channelProfileId": 0,
                        "territory": "SA",
                        "revalidate": false,
                        "displayName": "SUI1",
                        "accessKey": "453fgfd45fgf45hgf45hgkl34l34lk1",
                        "accessTimestamp": "2015-04-08 15:02:02.078+0200"
                    }
                ],
                "preferredName": null,
                "disabled": false
            }
        ]};

    var digitalIDDetailsArray = [
        {
            "id": 13058,
            "userName": "suitesting5@nowhere.com",
            "diType": "EMAIL",
            "channelIndicator": "CHANNEL",
            "authenticationAttempts": 0,
            "activated": true,
            "lastLoggedIn": null,
            "registrationDate": "2016-02-04T08:30:58.157+0000",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 13945,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SBSA",
                    "revalidate": false,
                    "cardNo": "654321112"
                },
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 13946,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 0,
                    "territory": "SBSA",
                    "revalidate": false,
                    "cardNo": "665544332"
                }
            ],
            "preferredName": null,
            "disabled": false
        }
    ];

    var userDetails =
    {
        "id": 3214,
        "version": null,
        "userName": "cardlinking3@sit1.com",
        "credential": {
            "type": "PASSWORD",
            "password": "8A6DBEC10D43726EECDDF1C3B4AD16B7E63D532D",
            "salt": "AD583A6DBF710B85"
        },
        "channelIndicator": null,
        "authenticationAttempts": 0,
        "activated": true,
        "lastLoggedIn": "2015-04-21T09:11:40.955+0000",
        "registrationDate": "2015-04-01T09:06:05.200+0000",
        "$$hashKey": "object:44",
        "systemPrincipals": [
            {
                "type": "BANKING",
                "version": null,
                "id": 2106,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 3735,
                "cardNo": "5221266361171019"
            },
            {
                "type": "BANKING",
                "version": null,
                "id": 2111,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 3735,
                "cardNo": "5221266361171088"
            }
        ]
    };

    var OSTSystemPrincipal =
        [
            {
                "type": "OST",
                "version": null,
                "id": 3406,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 5723,
                "displayName": "load_test_56",
                "accessKey": "D5305AA223DBA9B7979CCB49BB433DF6CFDDB7B67039ABA3B3C62A220B975FE5",
                "accessTimestamp": "2015-04-08 10:47:33.444+0200"
            }
        ];

    var loyaltySystemPrincipal =
        [
            {
                "type": "LOYALTY",
                "version": null,
                "id": 3406,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 5723,
                "userName": "load_test_56",
                "accessTimestamp": "2015-04-08 10:47:33.444+0200"
            }
        ];
var InsurancestemPrincipal =
        [
            {
                "type": "INSURANCE",
                "version": null,
                "id": 3406,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 5723,
                "userName": "load_test_56",
                "accessTimestamp": "2015-04-08 10:47:33.444+0200"
            }
        ];


//    var vcrPrincipals =
//        [
//            {
//                "type": "VCR",
//                "version": null,
//                "id": 3406,
//                "profileStyleType": "PERSONAL",
//                "channelProfileId": 624169,
//                "territory": "SBSA",
//                "revalidate": false,
//                "customerRef": "531411358"
//            }
//        ];
    var bolPrincipals =
        [
            {
                "type": "BOL",
                "version": null,
                "id": 3406,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 0,
                "territory": "SBSA",
                "revalidate": false,
                "digitalKey": "4856fccb-07ed-436d-ad88-641a057df5de",
                "userId": "trish"
            }
        ];
    var vafPrincipals =
        [
            {
                "type": "VAF",
                "version": null,
                "id": 3406,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 608087,
                "territory": "SBSA",
                "revalidate": false,
                "userName": "531083223"
            }
        ];

    var offShorePrincipals =
        [
            {"type": "OFFSHORE",
                "version": null,
                "id": 3406,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 639186,
                "territory": "SBOG",
                "revalidate": false,
                "icn": "50216803"
            }
        ];

    var finaclePrincipals =
        [
            {
                "type": "FINACLE",
                "version": null,
                "id": 3406,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 614994,
                "territory": "SBNAM",
                "revalidate": false,
                "userName": "20160311030257"
            }
        ];
    var webTraderPrincipals =
        [
            {
                "type": "WEBTRADER",
                "version": null,
                "id": 3406,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 584345,
                "territory": "SBSA",
                "revalidate": false,
                "displayName": "retailtest@saxousers.com",
                "accessKey": "84DE8166FE483D6A75602D3DC533A765249C60A1E340AFA7361AD0427015E9B7",
                "accessTimestamp": "2015-02-19 15:23:35.147+0200"
            }
        ];

    var SEDSystemPrincipal =
        [
            {
                "type": "SED",
                "version": null,
                "id": 3406,
                "profileStyleType": "BUSINESS",
                "channelProfileId": 5723,
                "businessId": "4",
                "operatorId": "3"
            }
        ];

    var stanlibSystemPrincipal =
    [
      {
        "type": "STANLIB",
         "version": null,
         "id": 3406,
         "profileStyleType": "PERSONAL",
         "channelProfileId": 632000,
         "territory": "SBSA",
         "revalidate": false,
         "bpId": "530033844"
      }
    ];

    var asiSystemPrincipal =
    [
      {
        "type": "ASI",
          "version": null,
          "id": 3406,
          "profileStyleType": "PERSONAL",
          "channelProfileId": 607826,
          "territory": "SBSA",
          "revalidate": false,
          "asiBdaAccount": "511014"
      }
    ];

    var wiSystemPrincipal =
    [
      {
        "type": "WI",
         "version": null,
         "id": 3406,
         "profileStyleType": "PERSONAL",
         "channelProfileId": 607825,
         "territory": "SBSA",
         "revalidate": false,
         "clientBpId": "bpid",
         "clientId": "1234567890123"
      }
    ];
    var bankingSystemPrincipal =
        [
            {
                "type": "BANKING",
                "version": null,
                "id": 2106,
                "profileStyleType": "PERSONAL",
                "channelProfileId": 3735,
                "cardNo": "5520578340370159"}
        ];
    var bankingSystemPrincipals =
    {
        "type": "BANKING",
        "version": null,
        "id": 2106,
        "profileStyleType": "PERSONAL",
        "channelProfileId": 3735,
        "cardNo": "5520578340370159"
    };

    var bankingDigitalIdsResponse = [
        {
            "id": 40,
            "version": null,
            "userName": "yuva@yuva.com",
            "credential": {
                "type": "PASSWORD",
                "password": "16C0972707F375398ECB04E430C0198D528C278B",
                "salt": "59FF4D96E5A81A80"
            },
            "channelIndicator": null,
            "authenticationAttempts": 0,
            "activated": true,
            "lastLoggedIn": "2015-04-21T12:52:09.933+0000",
            "registrationDate": "2015-02-23T08:11:28.120+0000",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 6491,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 10731,
                    "cardNo": "5520578340370159"
                }
            ]
        },
        {
            "id": 1345,
            "version": null,
            "userName": "staffios@sit1.com",
            "credential": {
                "type": "PASSWORD",
                "password": "819DB7DA48A9A63610989B9B7250BECD7C21FB3E",
                "salt": "4F648B836A734CE5"
            },
            "channelIndicator": null,
            "authenticationAttempts": 0,
            "activated": true,
            "lastLoggedIn": "2015-04-01T12:12:59.372+0000",
            "registrationDate": "2015-03-10T11:20:28.392+0000",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 796,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 1380,
                    "cardNo": "5520578340370159"
                }
            ]
        },
        {
            "id": 2600,
            "version": null,
            "userName": "cardprocess@sit1.com",
            "credential": {
                "type": "PASSWORD",
                "password": "C11202F106E8FBB8B837E1525032B1715632EEAB",
                "salt": "61C0333E6D811555"
            },
            "channelIndicator": null,
            "authenticationAttempts": 0,
            "activated": false,
            "lastLoggedIn": "2015-04-01T10:22:35.650+0000",
            "registrationDate": "2015-03-30T07:40:38.408+0000",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 2011,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 3020,
                    "cardNo": "5520578340370159"
                }
            ]
        },
        {
            "id": 2682,
            "version": null,
            "userName": "cardlogin@sit1.com",
            "credential": {
                "type": "PASSWORD",
                "password": "0F3F25000BA77052DBF7992A0CE8F824202931FC",
                "salt": "CBAAF84C53741A09"
            },
            "channelIndicator": null,
            "authenticationAttempts": 0,
            "activated": false,
            "lastLoggedIn": "2015-03-30T09:33:43.662+0000",
            "registrationDate": "2015-03-30T09:22:22.860+0000",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 1855,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 3121,
                    "cardNo": "5520578340370159"
                }
            ]
        },
        {
            "id": 2692,
            "version": null,
            "userName": "cardlogin1@sit1.com",
            "credential": {
                "type": "PASSWORD",
                "password": "6EA436DF508732178C23754B2B38E14F7840C1F1",
                "salt": "92479379B6C1E485"
            },
            "channelIndicator": null,
            "authenticationAttempts": 0,
            "activated": true,
            "lastLoggedIn": "2015-03-30T11:38:17.108+0000",
            "registrationDate": "2015-03-30T09:34:51.037+0000",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 1865,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 3140,
                    "cardNo": "5520578340370159"
                }
            ]
        },
        {
            "id": 3221,
            "version": null,
            "userName": "cardlinking4@sit1.com",
            "credential": {
                "type": "PASSWORD",
                "password": "DB49A39773D7F4E1D5BAD3459EDDE4F65BE3C238",
                "salt": "7D72B9FFF8648A36"
            },
            "channelIndicator": null,
            "authenticationAttempts": 0,
            "activated": true,
            "lastLoggedIn": "2015-04-01T09:38:53.794+0000",
            "registrationDate": "2015-04-01T09:23:51.561+0000",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 2096,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 3717,
                    "cardNo": "5520658340272470"
                },
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 2097,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 3718,
                    "cardNo": "5520578340370159"
                }
            ]
        },
        {
            "id": 5441,
            "version": null,
            "userName": "risk@thing.com",
            "credential": {
                "type": "PASSWORD",
                "password": "AF3FE6B402A73FA76E3E065E89956E15169861B3",
                "salt": "080A03C6819057A3"
            },
            "channelIndicator": null,
            "authenticationAttempts": 0,
            "activated": true,
            "lastLoggedIn": "2015-04-21T10:31:05.476+0000",
            "registrationDate": "2015-04-09T08:25:12.757+0000",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 3671,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 6192,
                    "cardNo": "5196122260427641"
                },
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 6500,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 10733,
                    "cardNo": "5520578340370159"
                }
            ]
        },
        {
            "id": 9281,
            "version": null,
            "userName": "c@me.ly",
            "credential": {
                "type": "PASSWORD",
                "password": "A194B3548F78FB6D35B3B8918716A08DED37C59A",
                "salt": "53684C25DC2DBBA4"
            },
            "channelIndicator": "SBG",
            "authenticationAttempts": 0,
            "activated": true,
            "lastLoggedIn": "2015-04-21T09:12:57.577+0000",
            "registrationDate": "2015-04-20T10:05:14.095+0000",
            "systemPrincipals": [
                {
                    "type": "BANKING",
                    "version": null,
                    "id": 6526,
                    "profileStyleType": "PERSONAL",
                    "channelProfileId": 10770,
                    "cardNo": "5520578340370159"
                }
            ]
        }
    ];

    var index = 1;

    var selectedSystemPrincipal = {
        "type": "BANKING",
        "version": null,
        "id": 2106,
        "profileStyleType": "PERSONAL",
        "channelProfileId": 3735,
        "cardNo": "5221266361171019"
    };

    beforeEach(module('app.controllers.viewSystemPrincipalController'));
    beforeEach(function () {
        inject(function ($q, $rootScope, $controller, ManageDigitalIdService, _errorMessagesFactory_,
                         ApplicationCacheFactory) {
            scope = $rootScope.$new();
            manageDigitalIdService = ManageDigitalIdService;
            errorMessageFactory = _errorMessagesFactory_;
            applicationCacheFactory = ApplicationCacheFactory;
            var modalResult = {
                then: function (callback) {
                    callback("spiderman"); // passing fake value as result
                }
            };
            // set up fake methods
            spyOn(modalServiceMock, "open")
                .and
                .returnValue({ result: modalResult });

            viewDigitalIdsForCardDeferred = $q.defer();
            spyOn(manageDigitalIdService,
                'viewDigitalIDsLinkedToCard').and.returnValue(viewDigitalIdsForCardDeferred.promise);

            replaceCardNumberDeferred = $q.defer();
            spyOn(manageDigitalIdService, 'replaceCardOnDigitalId').and.returnValue(replaceCardNumberDeferred.promise);

            removeDigitalIDFromCardDeferred = $q.defer();
            spyOn(manageDigitalIdService,
                'removeDigitalIDFromCard').and.returnValue(removeDigitalIDFromCardDeferred.promise);

            deleteSystemPrincipalDeferred = $q.defer();
            spyOn(manageDigitalIdService,
                'deleteSystemPrincipal').and.returnValue(deleteSystemPrincipalDeferred.promise);

            populateDeferred = $q.defer();
            spyOn(manageDigitalIdService, 'listDigitalIds').and.returnValue(populateDeferred.promise);

            createViewSystemPrincipalController = function () {
                ViewSystemPrincipalController = $controller('ViewSystemPrincipalController', {
                    $scope: scope,
                    ManageDigitalIdService: manageDigitalIdService,
                    ApplicationCacheFactory: applicationCacheFactory,
                    _errorMessagesFactory_: errorMessageFactory,
                    $modal: modalServiceMock
                });
            };
        });
    });

    describe('init function', function () {
        it("should have data in session", function () {
            createViewSystemPrincipalController();
            applicationCacheFactory.put('digitalIdNumber', userDetails.id);
            applicationCacheFactory.put('searchedCardDetails', userDetails.userName);
            applicationCacheFactory.put('digitalIdStatus', userDetails.activated);
            scope.init();
            expect(scope.userDetails).toBeDefined();
        });

    });
    describe("toggle", function () {
        it('toggle function should work', function () {
            createViewSystemPrincipalController();
            scope.toggleDetail(0);
            expect(scope.activePosition).toEqual(0);
        });

        it('toggle function should set active position to -1', function () {
            createViewSystemPrincipalController();
            scope.activePosition = index;
            scope.toggleDetail(index);
            expect(scope.activePosition).toEqual(-1);
        });
    });
    describe("view digital IDs linked to card", function () {
        it("should view using cardNo for type Banking", function () {
            createViewSystemPrincipalController();
            scope.userSystemPrincipals = bankingSystemPrincipal;
            scope.$apply();
        });

        it("should view using accessKey for type OST", function () {
            createViewSystemPrincipalController();
            scope.userSystemPrincipals = OSTSystemPrincipal;
            scope.$apply();
        });

        it("should list digital id linked to a specific card", function () {
            createViewSystemPrincipalController();
            scope.userSystemPrincipals = bankingSystemPrincipal;
            scope.$apply();
            viewDigitalIdsForCardDeferred.resolve(bankingDigitalIdsResponse);
            expect(scope.handleViewDigitalIDsLinkedToCardResponse).toBeDefined();
            expect(scope.responseError).toBe(undefined);

        });

        // it("should reject a call to list digital id linked to a card", function () {
        //     createViewSystemPrincipalController();
        //     viewDigitalIdsForCardDeferred.reject('error message');
        //     scope.userSystemPrincipals = bankingSystemPrincipal;
        //     scope.$apply();
        //     expect(scope.handleViewDigitalIDsLinkedToCardError).toBeDefined();
        //     scope.handleViewDigitalIDsLinkedToCardError('error');
        //     expect(scope.responseError).toBeDefined();
        // });

        it("should not show main digitalID", function () {
            createViewSystemPrincipalController();
            scope.hideMainDigitalID('dog@kennel.com', 'dog@kennel.com');
            expect(scope.hidingMainDigitalID).toBeTruthy();
        });

        it("should  show main digitalID", function () {
            createViewSystemPrincipalController();
            scope.hideMainDigitalID('dog@kennel.com', 'dogsrrr@kennel.com');
            expect(scope.hidingMainDigitalID).toBeFalsy();
        });

        it('should store digitalIDs details', function () {
            createViewSystemPrincipalController();
            scope.handleViewDigitalIDsLinkedToCardResponse(bankingDigitalIdsResponse);
            expect(scope.digitalIDs).toBeDefined();
            expect(scope.digitalIDs).toEqual(bankingDigitalIdsResponse);
        });
    });
    describe("remove principal", function () {

        modalServiceMock = {
            open: function (options) {
            }
        };

        it("should open modal for removing principal", function () {
            createViewSystemPrincipalController();
            scope.openModalForRemovePrincipal(bankingSystemPrincipal);
            expect(modalServiceMock.open).toHaveBeenCalled();
        });

        it('should call the error handling modal when error occurs ', function () {
            createViewSystemPrincipalController();
            scope.errorHandlingModal('Invalid card number', 'Please enter valid card number');
            expect(modalServiceMock.open).toHaveBeenCalled();
        });

        it("should remove the principal entry on digital id", function () {
            createViewSystemPrincipalController();
            scope.removePrincipal(selectedSystemPrincipal.profileStyleType, selectedSystemPrincipal.type,
                selectedSystemPrincipal.id);
            deleteSystemPrincipalDeferred.resolve(userDetails);
            scope.$apply();
            expect(manageDigitalIdService.deleteSystemPrincipal).toHaveBeenCalled();
            expect(scope.getSystemPrincipals).toBeDefined();
            expect(scope.responseError).toBe(undefined);
        });

        it("should reject call to remove entry on system principals", function () {
            createViewSystemPrincipalController();
            deleteSystemPrincipalDeferred.reject('error message');
            scope.removePrincipal('', '', '');
            scope.$apply();
            expect(scope.handleRemovePrincipalResponseError).toBeDefined();
            scope.handleRemovePrincipalResponseError('error message');
            expect(scope.responseError).toBe('error message');
            expect(scope.errorMessage).toBe(errorMessageFactory.error502);
            expect(scope.response).toBeUndefined();
        });
    });
    describe("populate system principals", function () {
        it('should list the system principals', function () {
            createViewSystemPrincipalController();
            scope.removePrincipal(selectedSystemPrincipal.profileStyleType, selectedSystemPrincipal.type,
                selectedSystemPrincipal.id);
            deleteSystemPrincipalDeferred.resolve(userDetails);
            scope.$apply();
            expect(manageDigitalIdService.deleteSystemPrincipal).toHaveBeenCalled();
            expect(scope.handleRemovePrincipalResponseSuccess).toBeDefined();
            scope.handleRemovePrincipalResponseSuccess();
            expect(scope.getSystemPrincipals).toBeDefined();
            applicationCacheFactory.put('userName', digitalIDUserName);
            scope.digitalIDUserName = applicationCacheFactory.get('userName');
            scope.getSystemPrincipals();
            var requestParameters = {
                username: scope.digitalIDUserName
            };
            expect(scope.getSystemPrincipals).toBeDefined();
            expect(scope.digitalIDUserName).toBe('bob@thebuilder.com');
            expect(requestParameters).toBeDefined();
            expect(requestParameters.username).toBe('bob@thebuilder.com');
            populateDeferred.resolve(value);
            scope.$apply();
            var results = value.content[0];
            expect(scope.userDetails.id).toBeDefined();
            expect(scope.userDetails.systemPrincipals).toBe(results.systemPrincipals);
            applicationCacheFactory.put('bankingSystemPrincipals', results.systemPrincipals);
            scope.bankingSystemPrincipals = applicationCacheFactory.get('bankingSystemPrincipals');
            applicationCacheFactory.remove('searchedCardDetails');
            scope.searchResults = digitalIDDetailsArray;
            expect(scope.searchResults).toBeDefined();
            expect(scope.userDetails).toBeDefined();
            expect(scope.userDetails.id).toBe(13058);
            expect(digitalIDDetailsArray[0].id).toBeDefined();
            expect(scope.findSystemPrincipals).toBeDefined();
            scope.findSystemPrincipals();
            expect(scope.userDetails.id).toEqual(digitalIDDetailsArray[0].id);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(results.systemPrincipals).toBeDefined();
            expect(8510).toEqual(scope.bankingSystemPrincipals[0].id);
            expect(8510).toEqual(scope.userDetails.systemPrincipals[0].id);
        });

        it('should not list the system principals', function () {
            createViewSystemPrincipalController();
            scope.removePrincipal(selectedSystemPrincipal.profileStyleType, selectedSystemPrincipal.type,
                selectedSystemPrincipal.id);
            deleteSystemPrincipalDeferred.resolve(userDetails);
            scope.$apply();
            expect(manageDigitalIdService.deleteSystemPrincipal).toHaveBeenCalled();
            expect(scope.handleRemovePrincipalResponseSuccess).toBeDefined();
            scope.handleRemovePrincipalResponseSuccess();
            expect(scope.getSystemPrincipals).toBeDefined();
            applicationCacheFactory.put('userName', digitalIDUserName);
            scope.digitalIDUserName = applicationCacheFactory.get('userName');
            scope.getSystemPrincipals();
            var requestParameters = {
                username: scope.digitalIDUserName
            };
            expect(scope.getSystemPrincipals).toBeDefined();
            expect(scope.digitalIDUserName).toBe('bob@thebuilder.com');
            expect(requestParameters).toBeDefined();
            expect(requestParameters.username).toBe('bob@thebuilder.com');
            populateDeferred.resolve(value);
            scope.$apply();
            var results = value.content[0];
            expect(scope.userDetails.id).toBeDefined();
            expect(scope.userDetails.systemPrincipals).toBe(results.systemPrincipals);
            applicationCacheFactory.put('bankingSystemPrincipals', results.systemPrincipals);
            scope.bankingSystemPrincipals = applicationCacheFactory.get('bankingSystemPrincipals');
            applicationCacheFactory.remove('searchedCardDetails');
            scope.searchResults = bankingDigitalIdsResponse;
            expect(scope.searchResults).toBeDefined();
            expect(scope.userDetails).toBeDefined();
            expect(scope.userDetails.id).toBe(13058);
            expect(bankingDigitalIdsResponse[0].id).toBeDefined();
            expect(scope.findSystemPrincipals).toBeDefined();
            scope.findSystemPrincipals();
            expect(scope.userDetails.id).not.toEqual(bankingDigitalIdsResponse[0].id);
            expect(scope.bankingSystemPrincipals).toBeDefined();
        });

        it("should reject call to remove entry on system principals", function () {
            createViewSystemPrincipalController();
            scope.removePrincipal(selectedSystemPrincipal.profileStyleType, selectedSystemPrincipal.type,
                selectedSystemPrincipal.id);
            deleteSystemPrincipalDeferred.resolve(userDetails);
            scope.$apply();
            expect(manageDigitalIdService.deleteSystemPrincipal).toHaveBeenCalled();
            expect(scope.handleRemovePrincipalResponseSuccess).toBeDefined();
            scope.handleRemovePrincipalResponseSuccess();
            expect(scope.getSystemPrincipals).toBeDefined();
            applicationCacheFactory.put('userName', digitalIDUserName);
            scope.digitalIDUserName = applicationCacheFactory.get('userName');
            scope.getSystemPrincipals();
            expect(manageDigitalIdService.listDigitalIds).toHaveBeenCalled();
            populateDeferred.reject('error message');
            scope.$apply();
            expect(scope.handleSearchByUserDigitalIdError).toBeDefined();
            scope.handleSearchByUserDigitalIdError('error message');
            expect(scope.responseError).toBe('error message');
            expect(scope.errorMessage).toBe(errorMessageFactory.error502);
        });
    });
    describe('populate card or access keys', function () {
        it('should not find any system principals to list', function () {
            scope.bankingSystemPrincipals = bankingSystemPrincipal;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 2222;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).not.toEqual(systemPrincipalId);
            expect(scope.results).not.toEqual(scope.bankingSystemPrincipals);
        });

        it('should list the selected card details or access keys', function () {
            scope.bankingSystemPrincipals = bankingSystemPrincipal;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 2106;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('BANKING');
            expect(scope.callService).toBeDefined();
        });

        it('should list the selected OST details or access keys', function () {
            scope.bankingSystemPrincipals = OSTSystemPrincipal;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 3406;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('OST');
            expect(scope.callService).toBeDefined();
        });

        it('should list the selected SED details ', function () {
            scope.bankingSystemPrincipals = SEDSystemPrincipal;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 3406;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('SED');
            expect(scope.callService).toBeDefined();
        });

        it('should list the loyalty card details unique identifier', function () {
            scope.bankingSystemPrincipals = loyaltySystemPrincipal;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 3406;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('LOYALTY');
            expect(scope.callService).toBeDefined();
        });

        it('should list the insurance card details unique identifier', function () {
            scope.bankingSystemPrincipals = InsurancestemPrincipal;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 3406;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('INSURANCE');
            expect(scope.callService).toBeDefined();
        });
//        it('should list the virtual card card details unique identifier', function () {
//            scope.bankingSystemPrincipals = vcrPrincipals;
//            createViewSystemPrincipalController();
//            scope.results = {};
//            var systemPrincipalId = 3406;
//            scope.populateCardOrAccessKey(systemPrincipalId);
//            expect(scope.bankingSystemPrincipals).toBeDefined();
//            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
//            expect(scope.results).toBeDefined();
//            expect(scope.results.type).toEqual('VCR');
//            expect(scope.callService).toBeDefined();
//        });
        it('should list the Bol card details unique identifier', function () {
            scope.bankingSystemPrincipals = bolPrincipals;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 3406;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('BOL');
            expect(scope.callService).toBeDefined();
        });
        it('should list the vaf card details unique identifier', function () {
            scope.bankingSystemPrincipals = vafPrincipals;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 3406;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('VAF');
            expect(scope.callService).toBeDefined();
        });
        it('should list the webTrader card details unique identifier', function () {
            scope.bankingSystemPrincipals = webTraderPrincipals;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 3406;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('WEBTRADER');
            expect(scope.callService).toBeDefined();
        });
        it('should list the finacle card details unique identifier', function () {
            scope.bankingSystemPrincipals = finaclePrincipals;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 3406;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('FINACLE');
            expect(scope.callService).toBeDefined();
        });
        it('should list the offshore card details unique identifier', function () {
            scope.bankingSystemPrincipals = offShorePrincipals;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 3406;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('OFFSHORE');
            expect(scope.callService).toBeDefined();
        });
        it('should list the stanlib card details unique identifier', function () {
            scope.bankingSystemPrincipals = stanlibSystemPrincipal;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 3406;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('STANLIB');
            expect(scope.callService).toBeDefined();
        });
        it('should list the asi card details unique identifier', function () {
            scope.bankingSystemPrincipals = asiSystemPrincipal;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 3406;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('ASI');
            expect(scope.callService).toBeDefined();
        });
        it('should list the wi card details unique identifier', function () {
            scope.bankingSystemPrincipals = wiSystemPrincipal;
            createViewSystemPrincipalController();
            scope.results = {};
            var systemPrincipalId = 3406;
            scope.populateCardOrAccessKey(systemPrincipalId);
            expect(scope.bankingSystemPrincipals).toBeDefined();
            expect(scope.bankingSystemPrincipals[0].id).toEqual(systemPrincipalId);
            expect(scope.results).toBeDefined();
            expect(scope.results.type).toEqual('WI');
            expect(scope.callService).toBeDefined();
        });
    });
    describe('view more system principals', function () {
        it('should list all system principal linked to digital id', function () {
            createViewSystemPrincipalController();
            expect(scope.viewMoreDetailsForSystemPrincipal).toBeDefined();
            scope.viewMoreDetailsForSystemPrincipal(1, 13);
        });
    });
    describe('view Digital id linked to card', function () {
        it('should list all digital id linked to a card', function () {
            createViewSystemPrincipalController();
            expect(scope.viewDigitalIDsLinkedToCard).toBeDefined();
            scope.viewDigitalIDsLinkedToCard(1, 13, 102);
            expect(scope.selectedSystemPrincipal).toBeDefined();
            expect(scope.getDigitalIDs).toBe(1);
        });
        it('should set index to -1 when listing all digital id linked to a card', function () {
            createViewSystemPrincipalController();
            expect(scope.viewDigitalIDsLinkedToCard).toBeDefined();
            scope.getDigitalIDs = index;
            scope.viewDigitalIDsLinkedToCard(index, 13, 102);
            expect(scope.getDigitalIDs).toBe(-1);
        });
    });
    describe('call view  Digital id linked to card', function () {
        it('should re-list all digital id linked to a card', function () {
            createViewSystemPrincipalController();
            expect(scope.callService).toBeDefined();
            scope.callService('PERSON', 'cardNo', '102');
            viewDigitalIdsForCardDeferred.resolve(userDetails);
            scope.$apply();
            expect(scope.handleViewDigitalIDsLinkedToCardResponse).toBeDefined();
            scope.handleViewDigitalIDsLinkedToCardResponse(userDetails);
        });
        it('should fail to re-list all digital id linked to a card', function () {
            createViewSystemPrincipalController();
            expect(scope.callService).toBeDefined();
            scope.callService('PERSON', 'cardNo', '102');
            viewDigitalIdsForCardDeferred.reject('error');
            scope.$apply();
            expect(scope.handleViewDigitalIDsLinkedToCardError).toBeDefined();
            scope.handleViewDigitalIDsLinkedToCardError('error');
        });
    });
});
