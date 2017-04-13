var paymentLimitPage = function(){

	var _ = require('lodash');
	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
  var description = element(by.id('paymentLimitDescription'));
  var value = element(by.id('paymentLimitAmount'));
	var editBtn = element(by.id('editPaymentLimitBtn'));
  var editPaymentLimitAmountTextField = element(by.id('editPaymentLimitAmount'));
  var confirmEditPaymentLimitModalBtn = element(by.id('confirmEditPaymentLimitModalBtn'));
	var confirmBtn = element(by.id('confirmRTCBtn'));

  this.getDescription = function () {
    return description.getText();
  };

  this.getValue = function () {
    return value.getText();
  };

	this.clickEditBtn = function () {
		return editBtn.click();
	};

	this.getEditPaymentLimitTextField = function () {
			return editPaymentLimitAmountTextField.getText();
	};

	this.enterEditPaymentLimitTextField = function (text) {
		editPaymentLimitAmountTextField.sendKeys(text);
	};

	this.clickConfirmEditPaymentLimitModalBtn = function () {
		confirmEditPaymentLimitModalBtn.click();
	};

	this.clickConfirmBtn = function() {
		return confirmBtn.click();
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


};

module.exports = new paymentLimitPage();
