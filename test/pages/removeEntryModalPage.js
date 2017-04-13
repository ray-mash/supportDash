var removeEntryModalPage = function(){

    this.baseActions = require('./baseActions.js');
    var helpers = require('./helpers.js');
    var removeEntryHeading = element(by.tagName('h3'));
    var removeEntryYesBtn = element(by.id('removeEntryYesBtn'));
    var removeEntryConfirmBtn = element(by.id('removeEntryConfirmBtn'));
    var removeEntryNoBtn = element(by.id('removeEntryNoBtn'));
    var removeDeviceConfirmation = element(by.id('removeDeviceConfirmation'));
    var removeDeviceNotification = element(by.id('removeDeviceNotification'));
    var removeLinkedDigitalIdConfirmation = element(by.id('removeLinkedDigitalIdConfirmation'));
    var removeLinkedDigitalIdNotification = element(by.id('removeLinkedDigitalIdNotification'));
    var removeCardStatement = element(by.id('removeCardStatement'));
    var removeCardConfirmation = element(by.id('removeCardConfirmation'));

    this.getRemoveEntryHeading = function() {
        return removeEntryHeading.getText();
    };

    this.getRemoveCardStatement = function(){
        return removeCardStatement.getText();
    };

    this.getRemoveCardConfirmation = function(){
        return removeCardConfirmation.getText();
    };

    this.getRemoveDeviceNotification = function(){
        return removeDeviceNotification.getText();
    };

    this.getRemoveLinkedDigitalIdConfirmation = function(){
        return removeLinkedDigitalIdConfirmation.getText();
    };

    this.getRemoveLinkedDigitalIdNotification = function(){
        return removeLinkedDigitalIdNotification.getText();
    };

    this.getRemoveDeviceConfirmation = function(){
        return removeDeviceConfirmation.getText();
    };

    this.getRemoveEntryYesBtn = function() {
        return removeEntryYesBtn.getText();
    };

    this.removeEntryYesBtnEnabled = function() {
        return removeEntryYesBtn.isEnabled(true);
    };

    this.displayRemoveEntryYesBtn = function() {
        return removeEntryYesBtn.isDisplayed(true);
    };

    this.clickRemoveEntryYesBtn = function() {
        removeEntryYesBtn.click();
    };

    this.getRemoveEntryConfirmBtn = function() {
        return removeEntryConfirmBtn.getText();
    };

    this.removeEntryConfirmBtnEnabled = function() {
        return removeEntryConfirmBtn.isEnabled(true);
    };

    this.displayRemoveEntryConfirmBtn = function() {
        return removeEntryConfirmBtn.isDisplayed(true);
    };

    this.clickRemoveEntryConfirmBtn = function() {
        removeEntryConfirmBtn.click();
    };

    this.getRemoveEntryNoBtn = function() {
        return removeEntryNoBtn.getText();
    };

    this.removeEntryNoBtnEnabled = function() {
        return removeEntryNoBtn.isEnabled(true);
    };

    this.displayRemoveEntryNoBtn = function() {
        return removeEntryNoBtn.isDisplayed(true);
    };

    this.clickRemoveEntryNoBtn = function() {
        removeEntryNoBtn.click();
    };
};

module.exports = new removeEntryModalPage();