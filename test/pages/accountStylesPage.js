var accountStylesPage = function(){

	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
  var updateAccountStylesBtn = element(by.id('updateAccountStyles'));
  var addAccountStylesBtn = element(by.id('createAccountStyle'));
  var cancelAccountStylesBtn = element(by.id('cancelAccountStyle'));
  var newCodeField = element(by.id('newCode'));
  var newTypeField = element(by.id('newType'));
  var newDescriptionField = element(by.id('newDescription'));
  var saveAddStyleBtn = element(by.id('confirmAddAccountStyleModalBtn'));
	var cancelAddStyleBtn = element(by.id('cancelAddAccountStyleModalBtn'));
	var confirmBtn = element(by.id('confirmRTCBtn'));

  this.getUpdateAccountStylesBtn = function() {
      return updateAccountStylesBtn.getText();
  };

  this.clickUpdateAccountStylesBtn = function (){
    return updateAccountStylesBtn.click();
  };

  this.getAddAccountStyleBtn = function() {
      return addAccountStylesBtn.getText();
  };

  this.clickAddAccountStyleBtn = function (){
    return addAccountStylesBtn.click();
  };

  this.getCancelAccountStyleBtn = function() {
      return cancelAccountStylesBtn.getText();
  };

  this.clickCancelAccountStylesBtn = function (){
    return cancelAccountStylesBtn.click();
  };

  this.enterNewCode = function(text) {
			newCodeField.sendKeys(text);
	};

  this.enterNewType = function(text) {
			newTypeField.sendKeys(text);
	};

  this.enterNewDescription = function(text) {
			newDescriptionField.sendKeys(text);
	};

  this.getSaveAddBtn = function () {
    return saveAddStyleBtn.getText();
  };

  this.clickSaveAddBtn = function () {
    return saveAddStyleBtn.click();
  };

  this.getCancelAddBtn = function () {
    return cancelAddStyleBtn.getText();
  };

  this.clickCancelAddBtn = function () {
    return cancelAddStyleBtn.click();
  };

  this.clickConfirmBtn = function() {
		return confirmBtn.click();
	};
};

module.exports = new accountStylesPage();
