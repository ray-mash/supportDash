var digitalIDDetailsPage = function(){

    this.baseActions = require('./baseActions.js');
    var helpers = require('./helpers.js');
    var deactivateBtn = element(by.id('deactivateBtn'));
    var activateBtn = element(by.id('activateBtn'));
    var enableBtn = element(by.id('enableBtn'));
    var disableBtn = element(by.id('disableBtn'));
    var breadCrum = element(by.id('viewDIBreadCrumb'));
    var noSystemPrincipals = element(by.id('noLinkedSystems'));
    var noDevicesFound = element(by.id('noDevicesFound'));
    var IDStatus = element(by.id('IDStatus'));
    var disabledStatus = element(by.id('disabledStatus'));
    var uniqueIdentifier = element(by.id('uniqueIdentifier'));
    var cardNoLink = element(by.id('cardNoLink'));
    var deLinkCardButton = element(by.id('deLinkCardButton'));
    var deviceName = element(by.id('deviceName'));
    var deviceID = element(by.id('deviceID'));
    var digitalID = element(by.id('dIDUserName'));
    var systemTypeLabel = element(by.id('systemType'));
    var profileTypeLabel = element(by.id('profileType'));
    var removeDeviceBtn = element(by.id('removeDeviceBtn'));
    var cardNoLink = element(by.id('cardNoLink'));
    var ostLink = element(by.id('ostLink'));

    this.load = function () {
        //browser.get(browser.searchUrl);
        //browser.waitForAngular();
    };

    this.clickCardNoLink = function(){
        return cardNoLink.click();
    };

    this.clickOstLink = function(){
        return ostLink.click();
    };

    this.getIDStatus = function(){
        return IDStatus.getText();
    };

    this.getDisabledStatus = function(){
        return disabledStatus.getText();
    };

    this.getDeLinkCardButton = function(){
        return deLinkCardButton.getText();
    };

    this.clickDeLinkCardButton = function(){
        return deLinkCardButton.click();
    };

    this.getUniqueIdentifier = function() {
        return uniqueIdentifier.getText();
    };
    this.getcardNoLink = function() {
        return cardNoLink.getText();
    };

    this.clickUniqueIdentifier = function() {
//        return uniqueIdentifier.click();
        helpers.scrollThenClick(element(by.id('uniqueIdentifier')));
    };

    this.clickFirstUniqueId = function(){
        helpers.scrollThenClick(uniqueIdentifier);
    };

    this.getDeactivateBtn = element(by.id('deactivateBtn'));

    this.getActivateBtn =  element(by.id('activateBtn'));

    this.getEnableBtn =  element(by.id('enableBtn'));

    this.getDisableBtn =  element(by.id('disableBtn'));

    this.deactivateBtnDisplayed = function() {
        return deactivateBtn.isDisplayed(true);
    };

    this.activateBtnDisplayed = function() {
        return activateBtn.isDisplayed(true);
    };

     this.enableBtnDisplayed = function() {
        return enableBtn.isDisplayed(true);
    };

    this.disableBtnDisplayed = function() {
        return disableBtn.isDisplayed(true);
    };

    this.clickDeactivateBtn = function() {
        deactivateBtn.click();
    };

    this.clickActivateBtn = function() {
        activateBtn.click();
    };

    this.clickEnableBtn = function() {
        enableBtn.click();
    };

    this.clickDisableBtn = function() {
        disableBtn.click();
    };

    this.getBreadCrumb = function(){
        return breadCrum.getText();
    };

    this.getNoSystemPrincipalText = function(){
        return noSystemPrincipals.getText();
    };

    this.getNoDevicesFound = function(){
        return noDevicesFound.getText();
    };

    this.getDeviceName = function(){
        return deviceName.getText();
    };

    this.getDeviceID = function(){
        return deviceID.getText();
    };


    this.getDigitalID = function(){
        return digitalID.getText();
    };

    this.getSystemTypeText = function(){
        return systemTypeLabel.getText();
    };

    this.getProfileTypeText = function(){
        return profileTypeLabel.getText();
    };

    this.removeDeviceBtnEnabled = function() {
        return removeDeviceBtn.isEnabled(true);
    };

    this.getRemoveDeviceBtn = function() {
        return removeDeviceBtn.getText();
    };

    this.clickRemoveDeviceButton = function(){
        removeDeviceBtn.click();
    };

};

module.exports = new digitalIDDetailsPage();