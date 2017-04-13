var SearchAuditLogPage = function(){

	var _ = require('lodash');
	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
  var startDateInputField = element(by.id('auditLogStartDateInput'));
  var endDateInputField = element(by.id('auditLogEndDateInput'));
  var searchAuditLogBtn = element(by.id('searchAuditLog'));


	this.enterStartDate = function (text) {
		startDateInputField.sendKeys(text);
	};

	this.enterEndDate = function (text) {
		endDateInputField.sendKeys(text);
	};

	this.clickSearchAuditLogBtn = function () {
		return searchAuditLogBtn.click();
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

  module.exports = new SearchAuditLogPage();
