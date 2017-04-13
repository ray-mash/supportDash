describe('ACCEPTANCE: RTC Payment Charge', function () {
  'use strict';
  var paymentChargePage = require('./../../pages/paymentChargePage.js');
  var searchByRTCPage =  require('./../../pages/searchByRTCPage.js');
  var navBar = require('./../../pages/navBar.js');
  var dashboardPage = require('./../../pages/dashboardPage.js');

  it('should take user to view paymentCharge page', function() {
      searchByRTCPage.clickPaymentChargeMenu();
      browser.waitForAngular();
      expect(paymentChargePage.getDescription()).toEqual("RTC");
  });

  it('should update paymentCharge', function () {
    paymentChargePage.clickEditBtn();
    browser.waitForAngular();
    paymentChargePage.clearField(element(by.id('editPaymentChargeAmount')));
    paymentChargePage.enterEditPaymentChargeTextField('50');
    expect(element(by.id('editPaymetChargeModalHeading')).getText()).toEqual("Edit Payment Charge");
    paymentChargePage.clickConfirmEditPaymentChargeModalBtn();
    paymentChargePage.clickConfirmBtn();
    browser.waitForAngular();

  });

  // it('should navigate to static menu page', function () {
  //     browser.navigate().back();
  //     browser.setLocation('/real-time-clearance-dashboard');
  //     expect(browser.getLocationAbsUrl()).toMatch('/real-time-clearance-dashboard');
  // });


  });
