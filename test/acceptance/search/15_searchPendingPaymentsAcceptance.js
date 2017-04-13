describe('ACCEPTANCE: RTC Search Pending Payments', function () {
  'use strict';
  var searchPendingPaymentsPage = require('./../../pages/searchPendingPaymentsPage.js');
  var searchByRTCPage =  require('./../../pages/searchByRTCPage.js');
  var navBar = require('./../../pages/navBar.js');
  var dashboardPage = require('./../../pages/dashboardPage.js');

  it('should take user to search pending payments page', function() {
      searchByRTCPage.clickSearchPendingPaymentsMenu();
      browser.waitForAngular();
      expect(searchPendingPaymentsPage.getHeader()).toEqual("Search for RTC Pending Payments");
  });

  it('should search for pending payments', function () {
      searchPendingPaymentsPage.clearField(element(by.id('startDateInput')));
      searchPendingPaymentsPage.enterStartDate('2016-10-10');
      searchPendingPaymentsPage.clearField(element(by.id('endDateInput')));
      searchPendingPaymentsPage.enterEndDate('2016-10-13');
      searchPendingPaymentsPage.clickSearchPendingBtn();
      browser.waitForAngular();
  });

});
