describe('ACCEPTANCE: Search RTC', function () {
  'use strict';
  var searchByRTCPage = require('./../../pages/searchByRTCPage.js');
  var navBar = require('./../../pages/navBar.js');
  var dashboardPage = require('./../../pages/dashboardPage.js');

  it('should take user to search RTC page', function() {
      dashboardPage.clickRTCButton();
      browser.waitForAngular();
  });
  it('should navigate to search by RTC page', function () {
      expect(browser.getLocationAbsUrl()).toMatch('/real-time-clearance-dashboard');
      expect(searchByRTCPage.getSearchRTCBreadCrumb()).toEqual("Search Selection RTC Dashboard");
      expect(searchByRTCPage.getSearchByStaticDataBtn()).toEqual("Static Data");
      expect(searchByRTCPage.getSearchByRefNumberBtn()).toEqual("Search by Reference Number");
      expect(searchByRTCPage.getSearchByCardNumberBtn()).toEqual("Search By Card Number");
      expect(searchByRTCPage.getSearchByAccNumberBtn()).toEqual("Search By Account Number");
  });

  it('should display the Logout link in the navigation bar', function () {
      expect(navBar.getLoginLink()).toEqual("Sign out");
  });

  it('should display static data menu', function () {
    searchByRTCPage.clickSearchByStaticDataBtn();
    expect(searchByRTCPage.getParticipatingBanksMenu()).toEqual("Participating Banks");
    expect(searchByRTCPage.getAccountStylesMenu()).toEqual("Account Styles");
    expect(searchByRTCPage.getPaymentChargeMenu()).toEqual("Payment Charge");
    expect(searchByRTCPage.getPaymentLimitMenu()).toEqual("Payment Limit");
    expect(searchByRTCPage.getProductAvailabilityMenu()).toEqual("Product Availability");

  });

});
