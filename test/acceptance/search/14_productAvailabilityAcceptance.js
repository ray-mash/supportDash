describe('ACCEPTANCE: RTC Product Availability', function () {
  'use strict';
  var productAvailabilityPage = require('./../../pages/productAvailabilityPage.js');
  var searchByRTCPage =  require('./../../pages/searchByRTCPage.js');
  var navBar = require('./../../pages/navBar.js');
  var dashboardPage = require('./../../pages/dashboardPage.js');

  it('should take user to view paymentLimit page', function() {
      searchByRTCPage.clickProductAvailabilityMenu();
      browser.waitForAngular();
      expect(productAvailabilityPage.getUpdateProductAvailabilityBtn()).toEqual("Update");
  });

  it('should take user to update product availability page', function() {
      productAvailabilityPage.clickUpdateParticipatingBanksBtn();
      browser.waitForAngular();
      productAvailabilityPage.click24HrRadioBtn();
      expect(productAvailabilityPage.getConfirmUpdateProductAvailabilityModalBtn()).toEqual("Save");
      expect(productAvailabilityPage.getCancelUpdateProductAvailabilityModalBtn()).toEqual("Cancel");
      productAvailabilityPage.clickConfirmUpdateProductAvailabilityModalBtn();
      productAvailabilityPage.clickConfirmBtn();
      browser.waitForAngular();
  });

  it('should navigate to static menu page', function () {
      browser.navigate().back();
      browser.setLocation('/real-time-clearance-dashboard');
      expect(browser.getLocationAbsUrl()).toMatch('/real-time-clearance-dashboard');
  });



  });
