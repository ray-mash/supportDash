var participatingBanksPage = function(){

  var _ = require('lodash');
	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
  var updateParticipatingBanksBtn = element(by.id('updateParticipatingBanks'));
  var addParticipatingBankBtn = element(by.id('createParticipatingBanks'));
  var cancelParticipatingBankBtn = element(by.id('cancelParticipatingBanks'));
  var newBankNameTextField = element(by.id('newBankName'));
  var newBankBicTextField = element(by.id('newBankBic'));
  var newBankCodeTextField = element(by.id('newBankCode'));
	var saveAddBankBtn = element(by.id('confirmAddParticipatingBankModalBtn'));
	var cancelAddBankBtn = element(by.id('cancelAddParticipatingBankModalBtn'));
	var confirmBtn = element(by.id('confirmRTCBtn'));
	var editBankBtn = element(by.id('editBankBtn0'));
	var editBankNameTextField = element(by.id('editBankName'));
	var editBankBicTextField = element(by.id('editBankBic'));
	var editBankCodeTextField = element(by.id('editBankCode'));
	var deleteBankBtn = element(by.id('deleteBankBtn0'));
	var confirmEditBankModalBtn = element(by.id('confirmEditBankModalBtn'));
	var confirmDeleteBankModalBtn = element(by.id('confirmDeleteBankModalBtn'));
	var confirmDeleteBankModalMsg = element(by.id('deleteParticipatingBankConfirmation'));
	var editBankModalHeader = element(by.id('editParticipatingBanksModalHeading'));


  this.getUpdateParticipatingBanksBtn = function() {
      return updateParticipatingBanksBtn.getText();
  };

  this.clickUpdateParticipatingBanksBtn = function (){
    return updateParticipatingBanksBtn.click();
  };

  this.getAddParticipatingBankBtn = function() {
      return addParticipatingBankBtn.getText();
  };

  this.clickAddParticipatingBankBtn = function (){
    return addParticipatingBankBtn.click();
  };

  this.getCancelParticipatingBankBtn = function() {
      return cancelParticipatingBankBtn.getText();
  };

  this.clickCancelParticipatingBanksBtn = function (){
    return cancelParticipatingBankBtn.click();
  };

	this.enterNewBankName = function(text) {
			newBankNameTextField.sendKeys(text);
	};

	this.enterNewBankBic = function(text) {
			newBankBicTextField.sendKeys(text);
	};

	this.enterNewBankCode = function(text) {
			newBankCodeTextField.sendKeys(text);
	};

	this.getSaveAddBankBtn = function() {
      return saveAddBankBtn.getText();
  };

  this.clickAddBankBtn = function (){
    return saveAddBankBtn.click();
  };

	this.getCancelAddBankBtn = function() {
      return cancelAddBankBtn.getText();
  };

  this.clickCancelAddBankBtn = function (){
    return cancelAddBankBtn.click();
  };

	this.clickConfirmBtn = function() {
		return confirmBtn.click();
	};

	this.clickEditBankBtn = function() {
		return editBankBtn.click();
	};

	this.clickDeleteBankBtn = function() {
		return deleteBankBtn.click();
	};

  this.getEditBankNameField = function () {
		editBankNameTextField.getText();
	};

	this.enterEditBankName = function (text) {
		editBankNameTextField.sendKeys(text);
	};

	this.clearField = function (element) {
		return element.getAttribute('value').then(function (text) {
            var backspaceSeries = '',
                textLength = text.length;

            _.times(textLength, function () {
                backspaceSeries += protractor.Key.BACK_SPACE;
            });
            return element.sendKeys(backspaceSeries);
        });
	};

  this.getEditBankBicField = function () {
		editBankBicTextField.getText();
	};

	this.enterEditBankBic = function (text) {
		editBankBicTextField.sendKeys(text);
	};

  this.getEditBankCodeField = function () {
		editBankCodeTextField.getText();
	};

	this.enterEditBankCode = function (text) {
		editBankCodeTextField.sendKeys(text);
	};

	this.getConfirmEditBankModalBtn = function () {
		confirmEditBankModalBtn.getText();
	};

	this.clickConfirmEditBankModalBtn = function () {
		confirmEditBankModalBtn.click();
	};

	this.getConfirmDeleteBankModalBtn = function () {
		confirmDeleteBankModalBtn.getText();
	};

	this.clickConfirmDeleteBankModalBtn = function () {
		confirmDeleteBankModalBtn.click();
	};

	this.getconfirmDeleteBankModalMsg = function () {
		confirmDeleteBankModalMsg.getText();
	};

	this.getEditBankModalHeader = function () {
		editBankModalHeader.getText();
	};


};

module.exports = new participatingBanksPage();
