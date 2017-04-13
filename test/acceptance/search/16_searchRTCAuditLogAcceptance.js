describe('ACCEPTANCE: RTC Search Audit Log', function () {
  'use strict';
  var searchAuditLogPage = require('./../../pages/searchAuditLogPage.js');
  var searchByRTCPage =  require('./../../pages/searchByRTCPage.js');
  var navBar = require('./../../pages/navBar.js');
  var dashboardPage = require('./../../pages/dashboardPage.js');

  it('should search audit log', function() {
      searchByRTCPage.clickSearchAuditLogMenu();
      searchAuditLogPage.clearField(element(by.id('auditLogStartDateInput')));
      searchAuditLogPage.enterStartDate('2016-10-11');
      searchAuditLogPage.clearField(element(by.id('auditLogEndDateInput')));
      searchAuditLogPage.enterEndDate('2016-10-14');
      searchAuditLogPage.clickSearchAuditLogBtn();
      browser.waitForAngular();
  });



});
