var SearchPendingPaymentsPage = function(){

	var _ = require('lodash');
	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
  var header = element(by.id('pendingPaymentsHeader'));
  var startDatePopUp = element(by.id('startDate'));
  var endDatePopUp = element(by.id('endDate'));
  var startDateInputField = element(by.id('startDateInput'));
  var endDateInputField = element(by.id('endDateInput'));
  var searchPendingBtn = element(by.id('searchPending'));

  this.getHeader = function() {
      return header.getText();
  };

  this.clickStartDate = function () {
      return startDatePopUp.click();
  };

  this.clickEndDate  = function () {
    return endDatePopUp.click();
  };

	this.enterStartDate = function (text) {
		startDateInputField.sendKeys(text);
	};

	this.enterEndDate = function (text) {
		endDateInputField.sendKeys(text);
	};

	this.clickSearchPendingBtn = function () {
		return searchPendingBtn.click();
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

  module.exports = new SearchPendingPaymentsPage();
