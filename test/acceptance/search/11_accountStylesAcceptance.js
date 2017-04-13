xdescribe('ACCEPTANCE: RTC Account Styles', function () {
  'use strict';
  var accountStylesPage = require('./../../pages/accountStylesPage.js');
  var searchByRTCPage =  require('./../../pages/searchByRTCPage.js');
  var navBar = require('./../../pages/navBar.js');
  var dashboardPage = require('./../../pages/dashboardPage.js');

  it('should take user to view accountStyles page', function() {
      searchByRTCPage.clickAccountStylesMenu();
      browser.waitForAngular();
      expect(accountStylesPage.getUpdateAccountStylesBtn()).toEqual("Update");
  });

  it('should take user to update account Style page', function() {
      accountStylesPage.clickUpdateAccountStylesBtn();
      browser.waitForAngular();
      expect(accountStylesPage.getAddAccountStyleBtn()).toEqual("Add");
      expect(accountStylesPage.getCancelAccountStyleBtn()).toEqual("Cancel");
  });

  it('should delete account style', function () {

  });

  // it('should add accountStyle', function () {
  //   accountStylesPage.clickAddAccountStyleBtn();
  //   browser.waitForAngular();
  //   accountStylesPage.enterNewCode("ZZZ");
  //   accountStylesPage.enterNewType("098");
  //   accountStylesPage.enterNewDescription("TEST STYLE");
  //   expect(accountStylesPage.getSaveAddBtn()).toEqual("Save");
  //   expect(accountStylesPage.getCancelAddBtn()).toEqual("Cancel");
  //   accountStylesPage.clickSaveAddBtn();
  //   accountStylesPage.clickConfirmBtn();
  //   browser.waitForAngular();
  //   accountStylesPage.clickCancelAddBtn();
  // });
  //
  // it('should link account style to payment instruction', function () {
  //
  // });

  // it('should navigate to static menu page', function () {
  //     browser.navigate().back();
  //     browser.setLocation('/real-time-clearance-dashboard');
  //     expect(browser.getLocationAbsUrl()).toMatch('/real-time-clearance-dashboard');
  // });

});
