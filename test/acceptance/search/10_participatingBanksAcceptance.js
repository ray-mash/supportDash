describe('ACCEPTANCE: RTC Participating Banks', function () {
  'use strict';
  var participatingBanksPage = require('./../../pages/participatingBanksPage.js');
  var searchByRTCPage =  require('./../../pages/searchByRTCPage.js');
  var navBar = require('./../../pages/navBar.js');
  var dashboardPage = require('./../../pages/dashboardPage.js');

  it('should take user to view participatingBanks page', function() {
      searchByRTCPage.clickParticipatingBanksMenu();
      browser.waitForAngular();
      expect(participatingBanksPage.getUpdateParticipatingBanksBtn()).toEqual("Update");
  });

  it('should take user to update participatingBank page', function() {
      participatingBanksPage.clickUpdateParticipatingBanksBtn();
      browser.waitForAngular();
      expect(participatingBanksPage.getAddParticipatingBankBtn()).toEqual("Add");
      expect(participatingBanksPage.getCancelParticipatingBankBtn()).toEqual("Cancel");
  });

  it('should add participatingBank', function () {
    participatingBanksPage.clickAddParticipatingBankBtn();
    browser.waitForAngular();
    participatingBanksPage.enterNewBankName('TesterBank');
    participatingBanksPage.enterNewBankBic('JUSTABIC');
    participatingBanksPage.enterNewBankCode('097');
    expect(participatingBanksPage.getSaveAddBankBtn()).toEqual("Save");
    expect(participatingBanksPage.getCancelAddBankBtn()).toEqual("Cancel");
    participatingBanksPage.clickAddBankBtn();
    participatingBanksPage.clickConfirmBtn();
    browser.waitForAngular();
  });

  it('should edit participatingBank', function () {
    participatingBanksPage.clickEditBankBtn();
    browser.waitForAngular();
    participatingBanksPage.clearField(element(by.id('editBankBic')));
    participatingBanksPage.clearField(element(by.id('editBankCode')));
    participatingBanksPage.enterEditBankBic('BICEDITS');
    participatingBanksPage.enterEditBankCode('946');
    expect(element(by.id('editParticipatingBanksModalHeading')).getText()).toEqual("Edit Participating Banks");
    participatingBanksPage.clickConfirmEditBankModalBtn();
    participatingBanksPage.clickConfirmBtn();
    browser.waitForAngular();
  });

  it('should delete participatingBank', function () {
    participatingBanksPage.clickDeleteBankBtn();
    browser.waitForAngular();
    // expect(participatingBanksPage.getconfirmDeleteBankModalMsg()).toEqual("Are you sure you want to remove bank: TESTERBANK");
    expect(element(by.id('deleteParticipatingBankConfirmation')).getText()).toEqual("Are you sure you want to remove bank: TESTERBANK");
    participatingBanksPage.clickConfirmDeleteBankModalBtn();
    participatingBanksPage.clickConfirmBtn();
    browser.waitForAngular();


  });

  // it('should navigate to static menu page', function () {
  //     browser.navigate().back();
  //     browser.setLocation('/real-time-clearance-dashboard');
  //     expect(browser.getLocationAbsUrl()).toMatch('/real-time-clearance-dashboard');
  // });

});
