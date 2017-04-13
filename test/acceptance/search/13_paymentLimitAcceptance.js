describe('ACCEPTANCE: RTC Payment limit', function () {
  'use strict';
  var paymentLimitPage = require('./../../pages/paymentLimitPage.js');
  var searchByRTCPage =  require('./../../pages/searchByRTCPage.js');
  var navBar = require('./../../pages/navBar.js');
  var dashboardPage = require('./../../pages/dashboardPage.js');

  it('should take user to view paymentLimit page', function() {
      searchByRTCPage.clickPaymentLimitMenu();
      browser.waitForAngular();
      expect(paymentLimitPage.getDescription()).toEqual("Payment Limit for RTC");
  });

  it('should update paymentLimit', function () {
    paymentLimitPage.clickEditBtn();
    browser.waitForAngular();
    paymentLimitPage.clearField(element(by.id('editPaymentLimitAmount')));
    paymentLimitPage.enterEditPaymentLimitTextField('50000');
    expect(element(by.id('editPaymetLimitModalHeading')).getText()).toEqual("Edit Payment Limit");
    paymentLimitPage.clickConfirmEditPaymentLimitModalBtn();
    paymentLimitPage.clickConfirmBtn();
    browser.waitForAngular();

  });

  // it('should navigate to static menu page', function () {
  //     browser.navigate().back();
  //     browser.setLocation('/real-time-clearance-dashboard');
  //     expect(browser.getLocationAbsUrl()).toMatch('/real-time-clearance-dashboard');
  // });



  });
