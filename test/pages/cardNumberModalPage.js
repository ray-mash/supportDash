var cardNumberModalPage = function(){

    this.baseActions = require('./baseActions.js');
    var helpers = require('./helpers.js');
    var replaceCardHeading = element(by.tagName('h3'));
    var oldNumberTxt = element(by.id('oldNumberTxt'));
    var confirmChangeCardModalBtn = element(by.id('confirmChangeCardModalBtn'));
    var cancelChangeCardModalBtn = element(by.id('cancelChangeCardModalBtn'));
    var newCardNumberInput = element(by.id('newCardNumberInput'));
    var invalidCardErrorMessage = element(by.id('invalidCardErrorMessage'));
    var invalidCardErrorCancelBtn = element(by.id('invalidCardErrorCancelBtn'));

    this.newCardNumberInputEnabled = function() {
        return newCardNumberInput.isEnabled(true);
    };

    this.enterNewCardNumber = function(text) {
        newCardNumberInput.sendKeys(text);
    };

    this.clearNewCardNumber = function() {
        return newCardNumberInput.clear();
    };

    this.getNewCardNumberInput = function() {
        return newCardNumberInput.getText();
    };
    this.clickInvalidCardErrorCancelBtn = function() {
        return invalidCardErrorCancelBtn.click();
    };

    this.getInvalidCardErrorCancelBtn = function() {
        return invalidCardErrorCancelBtn.getText();
    };

    this.getNewCardValue = function() {
        return newCardNumberInput.getAttribute('value');
    };

    this.invalidCardErrorCancelBtnEnabled = function() {
        return invalidCardErrorCancelBtn.isEnabled(true);
    };

    this.getInvalidCardErrorMessage = function() {
        return invalidCardErrorMessage.getText();
    };

    this.cancelChangeCardModalBtnEnabled = function() {
        return cancelChangeCardModalBtn.isEnabled(true);
    };

    this.confirmChangeCardModalBtnEnabled = function() {
        return confirmChangeCardModalBtn.isEnabled(true);
    };

    this.clickConfirmChangeCard = function() {
        confirmChangeCardModalBtn.click();
    };

    this.getCancelChangeCardModalBtn = function() {
        return cancelChangeCardModalBtn.getText();
   };

    this.clickCancelChangeCardModalBtn = function() {
        return cancelChangeCardModalBtn.click();
    };
    this.
    getConfirmChangeCardModalBtn = function() {
        return confirmChangeCardModalBtn.getText();
    };

    this.replaceCardHeadingText = function(){
    	return replaceCardHeading.getText();
    };

    this.getOldNumberTxt = function(){
    	return oldNumberTxt.getText();
    };

};

module.exports = new cardNumberModalPage();