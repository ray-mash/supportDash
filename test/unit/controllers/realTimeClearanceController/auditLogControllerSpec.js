/*global angular */

'use strict';

describe("Unit : AuditLogController", function () {

    var scope, manageDigitalIdService, location, $httpBackend, createController,
     errorMessageFactory, applicationCacheFactory;

    var getEntitiesDeferred, auditLogResponseDeferred;

    var entities = ["ACCOUNT_STYLE", "ACCT_STYLE_PMT_INST_TYPE_LINK", "PAYMENT_CHARGE", "PAYMENT_LIMIT"];

    var auditData = {
      'userName' :'',
      'startDate' :'2016-10-10',
      'endDate' :'2016-10-11',
      'entity' :''
    };

    var auditLogResponse = [
      {"username":"SA4212100","entity":"ACCT_STYLE_PMT_INST_TYPE_LINK","ipAddress":"10.5.142.88, 10.145.21.35","operationPerformed":"DELETE",
      "beforeEntitySnapshot":"PaymentInstructionTypeAccountStyle [id=80, paymentInstructionType=PaymentInstructionType [id=2, code=RTC, name=Real Time Clearance Name, description=Real Time Clearance payment instruction type], accountStyle=AccountStyle [id=1000, code=ZZZ, type=011, description=MY TEST]]",
      "afterEntitySnapshot":"","creationDate":1476115655008},
      {"username":"a182660","entity":"PAYMENT_CHARGE","ipAddress":"10.5.32.65, 10.145.21.35","operationPerformed":"UPDATE",
      "beforeEntitySnapshot":"Id:=  description :=RTC value:= 21","afterEntitySnapshot":"Id:= RTC description :=RTC value:= 71",
      "creationDate":1476193376145}];

    var moreThan30daysDifference = 31;

    var negativeDifference = -1;

    var datepickers = {
       startDt: false,
       endDt: false
   };

   var myEvent = { preventDefault: jasmine.createSpy(), stopPropagation: jasmine.createSpy() }


    var  controller;
    beforeEach(module('app.controllers.orderManagementView.realTimeClearance.auditLogController'));

    beforeEach(inject(function ($q, $rootScope, $controller, ManageDigitalIdService, $location, _errorMessagesFactory_,
                                ApplicationCacheFactory, _$httpBackend_) {
        scope = $rootScope.$new();
        controller = $controller;
        manageDigitalIdService = ManageDigitalIdService;
        $httpBackend = _$httpBackend_;
        location = $location;
        errorMessageFactory = _errorMessagesFactory_;
        applicationCacheFactory = ApplicationCacheFactory;

        getEntitiesDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'getRTCEntities').and.returnValue(getEntitiesDeferred.promise);

        auditLogResponseDeferred = $q.defer();
        spyOn(manageDigitalIdService, 'searchRTCAuditLog').and.returnValue(auditLogResponseDeferred.promise);


        createController = function () {
            return   controller("AuditLogController as auditLogController", {
                $scope: scope,
                ManageDigitalIdService: manageDigitalIdService,
                ApplicationCacheFactory: applicationCacheFactory,
                _errorMessagesFactory_: errorMessageFactory

            })
        };
    }));

    describe('initializing function ', function () {
        it('should initialize the scope and call get entities', function () {
           applicationCacheFactory.removeAll();
           applicationCacheFactory.put('RTCEntities', '');
            createController();
            scope.auditLogController.currentPage = 1;
            scope.auditLogController.numPerPage = 7;
            scope.auditLogController.init();
            expect(scope.auditLogController.getEntities).toBeDefined();
            scope.auditLogController.getEntities();
            applicationCacheFactory.put('RTCEntities', entities);
            getEntitiesDeferred.resolve(entities);
            scope.$apply();
            expect(scope.auditLogController.responseError).toBeUndefined();

        });

        it('should get a list of entities from the cache factory ', function () {
            applicationCacheFactory.put('RTCEntities', entities);
            createController();
            expect(scope.auditLogController.getEntities).toBeDefined();
            scope.auditLogController.getEntities();
            expect(scope.auditLogController.getEntities).toBeDefined();
        });

        it("should reject call to get entities when not found", function () {
            var error = {
                "data": {
                    "responseMessage": [
                        {
                            "message": "No entities found",
                            "errorCode": "audit.entities.not.found"
                        }
                    ]
                },
                "status": 404
            };
            var responseMessage = [
                {"message": "No entities found", "errorCode": "audit.entities.not.found"}
            ];
            createController();
            scope.auditLogController.getEntities();
            getEntitiesDeferred.reject(error);
            scope.$apply();
            expect(error.status).toBe(404);
            expect(scope.auditLogController.errorMessage).toBe(error.data.responseMessage[0].message);
            expect(scope.auditLogController.response).toBeUndefined();
        });

        it("should reject the call to get entities", function () {
            createController();
            getEntitiesDeferred.reject('error message');
            scope.auditLogController.getEntities('something');
            scope.$apply();
            expect(scope.auditLogController.errorMessage).toBe('A communication error has occurred');
            expect(scope.auditLogController.response).toBeUndefined();
        });
    });

    describe('search audit log', function () {
      it('should open calender', function () {
        createController();
        scope.auditLogController.isOpenCalendar(myEvent,datepickers.endDt);
        expect(scope.auditLogController.datepickers[datepickers.endDt]).toBeTruthy();
      });

      it('should check that dates are not more than 30 days', function () {
        createController();
        scope.auditLogController.checkDatesErrors(moreThan30daysDifference);
        expect(scope.auditLogController.errorMessageForDate).toEqual('Search cannot be more than 30 days');
      });

      it('should check that start date is before end date', function () {
        createController();
        scope.auditLogController.checkDatesErrors(negativeDifference);
        expect(scope.auditLogController.errorMessageForDate).toEqual('The start date should be before the end date');
      });

      it('should search audit log', function () {
        createController();
        scope.auditLogController.searchRTCAuditLog(auditData);
        scope.auditLogController.checkDatesErrors(1);
        expect(scope.auditLogController.checkDatesErrors(1)).toBeTruthy();
        expect(scope.auditLogController.errorMessageForDate).toBeUndefined();

        auditLogResponseDeferred.resolve(auditLogResponse);
        scope.$apply();
        expect(scope.auditLogController.responseError).toBeUndefined();

      });

      it('should not search audit log if there are date errors', function () {
        createController();
        var auditDate = {
          'userName' :'',
          'startDate' :'2016-10-10',
          'endDate' :'2016-12-11',
          'entity' :''
        };
        scope.auditLogController.searchRTCAuditLog(auditDate);
        scope.auditLogController.checkDatesErrors(moreThan30daysDifference);
        expect(scope.auditLogController.checkDatesErrors(moreThan30daysDifference)).toBeFalsy();
        expect(scope.auditLogController.errorMessageForDate).toEqual("Search cannot be more than 30 days");
        expect(scope.auditLogController.RTCAuditLog).toBeUndefined();

      });


      it('should reject call to search audit log', function () {
        createController();
        auditLogResponseDeferred.reject('error message');
        scope.auditLogController.searchRTCAuditLog('undefined');
        scope.$apply();
        expect(scope.auditLogController.errorMessage).toBe('A communication error has occurred');
        expect(scope.auditLogController.response).toBeUndefined();
      });
    });


});
