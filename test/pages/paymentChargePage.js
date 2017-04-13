var paymentChargePage = function(){

  var _ = require('lodash');
	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
  var description = element(by.id('description'));
  var value = element(by.id('value'));
  var editBtn = element(by.id('editPaymentChargeBtn'));
  var editPaymentChargeAmountTextField = element(by.id('editPaymentChargeAmount'));
  var confirmEditPaymentChargeModalBtn = element(by.id('confirmEditPeymentChargeModalBtn'));
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
	this.getEditPaymentChargeTextField = function () {
			return editPaymentChargeAmountTextField.getText();
	};

	this.enterEditPaymentChargeTextField = function (text) {
		editPaymentChargeAmountTextField.sendKeys(text);
	};

	this.clickConfirmEditPaymentChargeModalBtn = function () {
		confirmEditPaymentChargeModalBtn.click();
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

module.exports = new paymentChargePage();
