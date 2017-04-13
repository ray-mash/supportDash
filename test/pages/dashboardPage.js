var dashboardPage = function(){

	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');

	var digitalIdButton = element(by.id('digitalIdButton'));
	var cardNumberButton = element(by.id('cardNumberButton'));
	var ostButton = element(by.id('ostButton'));
	var obbButton = element(by.id('obbButton'));
	var auditHistoryButton = element(by.id('digitalIdAuditButton'));
	var RTCButton = element(by.id('rtcPaymentsButton'))

	this.load = function () {
		//browser.get(browser.searchUrl);
		//browser.waitForAngular();
	};

    this.clickDigitalID = function(){
       digitalIdButton.click();
    };

    this.clickCardNumberButton = function(){
       cardNumberButton.click();
    };

    this.clickOSTButton = function(){
       ostButton.click();
    };

    this.clickOBBButton = function(){
       obbButton.click();
    };

    this.clickAuditHistoryButton = function () {
        auditHistoryButton.click();
    };

    this.clickInsuranceBtn = function(){
       obbButton.click();
    };

		this.clickRTCButton = function () {
			RTCButton.click();
		};

	this.OSTBtnEnabled = function() {
		return ostButton.isEnabled(true);
	};

	this.insuranceBtnEnabled = function() {
		return obbButton.isEnabled(true);
	};

	this.cardNrBtnEnabled = function() {
		return cardNumberButton.isEnabled(true);
	};

	this.digitalIDBtnEnabled = function() {
		return digitalIdButton.isEnabled(true);
	};

    this.getDigitalIdButton = function(){
        return digitalIdButton.getText();
    };

    this.getCardNumberButton = function(){
        return cardNumberButton.getText();
    };

    this.getOSTButton = function(){
        return ostButton.getText();
    };

    this.getOBBButton = function(){
        return obbButton.getText();
    };

};

module.exports = new dashboardPage();
