var confirmationModalPage = function(){

    this.baseActions = require('./baseActions.js');
    var helpers = require('./helpers.js');

    var confirmationHeading = element(by.tagName('h3'));
    var confirmationText = element(by.id('confirmationModalText'));
    var confirmButton = element(by.id('confirmChange'));
    var cancelButton = element(by.id('cancelChange'));

    this.getConfirmationHeading = function() {
       return confirmationHeading.getText();
    };

    this.getConfirmationText = function() {
       return confirmationText.getText();
    };

    this.getConfirmButton = function() {
       return confirmButton.isEnabled(true);
    };

    this.getCancelButton = function() {
       return cancelButton.isEnabled(true);
    };

    this.cancelButtonText = element(by.id('cancelChange'));

    this.confirmButtonText = element(by.id('confirmChange'));

    this.clickConfirmButton = function() {
        confirmButton.click();
    };

   this.clickCancelButton = function() {
       cancelButton.click();
   };

};

module.exports = new confirmationModalPage();