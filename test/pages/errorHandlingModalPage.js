var errorHandlingModalPage = function(){

    this.baseActions = require('./baseActions.js');
    var helpers = require('./helpers.js');

    var errorHeading = element(by.tagName('h3'));
    var errorText = element(by.id('invalidCardErrorMessage'));
    var errorButton = element(by.id('invalidCardErrorCancelBtn'));

    this.getErrorHeading = function() {
       return errorHeading.getText();
    };

    this.getErrorText = function() {
       return errorText.getText();
    };

    this.getErrorButton = function() {
       return errorButton.isEnabled(true);
    };
};

module.exports = new errorHandlingModalPage();