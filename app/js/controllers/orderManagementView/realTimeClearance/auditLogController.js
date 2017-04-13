'use strict';
var controllersModule = require('./_index_auditLogController');

/**f
 * @ngInject
 */
controllersModule.controller('AuditLogController',
    ['$scope', '$location', 'ManageDigitalIdService', 'errorMessagesFactory', 'ApplicationCacheFactory','$filter',
        function ($scope, $location, ManageDigitalIdService, errorMessagesFactory, ApplicationCacheFactory, $filter) {
            var auditLogController = this;
            auditLogController.currentPage = 1;
            auditLogController.itemPerPage = 7;
            auditLogController.maxSize = 15;
            auditLogController.searchFilter = '';

            auditLogController.init = function () {
                auditLogController.userAccessRights = ApplicationCacheFactory.get('accessRights');
                auditLogController.RTCEntities = auditLogController.getEntities();
                auditLogController.auditData = {
                  'userName' :'',
                  'startDate' :new Date(),
                  'endDate' :new Date(),
                  'entity' :''
                };
                auditLogController.startDate = new Date();
                auditLogController.endDate = new Date();
                auditLogController.RTCAuditLog = undefined;
                auditLogController.daysDifference = undefined;
                auditLogController.errorMessageForDate = undefined;
            };

            auditLogController.getEntities = function () {
              if (!ApplicationCacheFactory.get('RTCEntities')) {
                  ManageDigitalIdService.getRTCEntities()
                      .then(
                      function (value) {
                          ApplicationCacheFactory.put('RTCEntities', value);
                          auditLogController.RTCEntities = ApplicationCacheFactory.get('RTCEntities');
                          auditLogController.errorMessage = "";
                      },
                      function (error) {
                        if (error.status === 404) {
                            auditLogController.errorMessage = error.data.responseMessage[0].message;

                        }
                        else {
                            auditLogController.errorMessage = errorMessagesFactory.error502;
                        }
                      });
              } else {
                  auditLogController.RTCEntities = ApplicationCacheFactory.get('RTCEntities');
              }
            };

            auditLogController.searchRTCAuditLog = function (auditData) {
              auditLogController.RTCAuditLog = undefined;
              auditLogController.errorMessageForDate = undefined;
              auditLogController.responseError = undefined;

              var startDateFormatted = auditLogController.formatDate(auditData.startDate);
              var endDateFormatted = auditLogController.formatDate(auditData.endDate);
              var daysDifference = auditLogController.differenceInDays(startDateFormatted, endDateFormatted);

              if(auditLogController.checkDatesErrors(daysDifference)) {
                ManageDigitalIdService.searchRTCAuditLog(startDateFormatted, endDateFormatted, auditData.userName, auditData.entity)
                  .then(
                    function (value) {
                      ApplicationCacheFactory.put('RTCAuditLog', value);
                      auditLogController.RTCAuditLog = ApplicationCacheFactory.get('RTCAuditLog');
                      auditLogController.errorMessage = "";
                    },
                    function (error) {
                      auditLogController.responseError = error;
                      auditLogController.errorMessage = errorMessagesFactory.error502;
                    });
              }
            };

            auditLogController.datepickers = {
               startDt: false,
               endDt: false
           };

           auditLogController.dateOptions = {
                'year-format': "'yyyy'",
                'starting-day': 1
            };

            auditLogController.isOpenCalendar = function($event, whichDt) {
                    $event.preventDefault();
                    $event.stopPropagation();
                auditLogController.datepickers[whichDt]= true;
            };

            auditLogController.formatDate = function (date){
              var formattedDate = $filter('date')(new Date(date),'yyyy-MM-dd');
              return formattedDate;
            };

            auditLogController.differenceInDays = function (startDateFormatted, endDateFormatted) {
               var d1 = new Date(startDateFormatted);
                var d2 = new Date(endDateFormatted);
                var miliseconds = d2-d1;
                var seconds = miliseconds/1000;
                var minutes = seconds/60;
                var hours = minutes/60;
                var days = hours/24;

                return days;
            };

            auditLogController.checkDatesErrors = function (daysDifference) {
              auditLogController.daysDifference = daysDifference;
              if(daysDifference > 30){
                auditLogController.errorMessageForDate = "Search cannot be more than 30 days";
                return false;
              }
              if(daysDifference < 0){
                auditLogController.errorMessageForDate = "The start date should be before the end date";
                return false;
              }
              return true;
            };

          }
      ]);
