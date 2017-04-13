var productAvailabilityPage = function(){

	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
  var description = element(by.id('productAvailabilityDescription'));
  var value = element(by.id('productAvailabilityTimes'));
	var updateProductAvailabilityBtn = element(by.id('updateProductAvailability'));
	var _24HrRadioBtn = element(by.id('24HrRadioBtn'));
	var confirmUpdateProductAvailabilityModalBtn = element(by.id('confirmUpdateProductAvailabilityModalBtn'));
	var cancelUpdateProductAvailabilityModalBtn = element(by.id('cancelUpdateProductAvailabilityModalBtn'));
	var confirmBtn = element(by.id('confirmRTCBtn'));

  this.getDescription = function () {
    return description.getText();
  };

  this.getValue = function () {
    return value.getText();
  };

	this.getUpdateProductAvailabilityBtn = function() {
      return updateProductAvailabilityBtn.getText();
  };

	this.clickUpdateParticipatingBanksBtn = function () {
		return updateProductAvailabilityBtn.click();
	};

	this.click24HrRadioBtn = function () {
		return _24HrRadioBtn.click();
	};

	this.getConfirmUpdateProductAvailabilityModalBtn = function () {
		return confirmUpdateProductAvailabilityModalBtn.getText();
	};

	this.clickConfirmUpdateProductAvailabilityModalBtn = function () {
		return confirmUpdateProductAvailabilityModalBtn.click();
	};

	this.getCancelUpdateProductAvailabilityModalBtn = function () {
		return cancelUpdateProductAvailabilityModalBtn.getText();
	};

	this.clickConfirmBtn = function() {
		return confirmBtn.click();
	};

};

module.exports = new productAvailabilityPage();
