var cardDetailsViewPage = function(){

	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
	var cardNo = element(by.id('cardNo'));
	var userName = element(by.id('userName'));
	var viewBankingBreadCrumb = element(by.id('viewBankingBreadCrumb'));
	var changeCardButton = element(by.id('changeCardButton'));
	var viewLinkedDI = element(by.id('viewLinkedDI'));
	var linkedUserName = element(by.id('linkedUserName'));
	var moreDIsMessage = element(by.id('moreDIsMessage'));
	var removeLinkedDigitalId = element(by.id('removeLinkedDigitalId'));

	this.load = function () {
		//browser.get(browser.searchUrl);
		//browser.waitForAngular();
	};

    this.getRemoveLinkedDigitalId= function() {
       return removeLinkedDigitalId.getText();
    };

    this.clickRemoveLinkedDigitalId = function() {
       return removeLinkedDigitalId.click();
    };

    this.removeLinkedDigitalIdEnabled = function() {
       return removeLinkedDigitalId.isEnabled(true);
    };

    this.getViewLinkedDI = function() {
       return viewLinkedDI.getText();
    };

    this.getLinkedUserName = function() {
       return linkedUserName.getText();
    };

    this.getMoreDIsMessage = function() {
       return moreDIsMessage.getText();
    }

    this.clickLinkedUserName = function() {
       return linkedUserName.click();
    };

    this.clickViewLinkedDI = function() {
       return viewLinkedDI.click();
    };

    this.getViewBankingBreadCrumb = function() {
       return viewBankingBreadCrumb.getText();
    };

    this.getChangeCardButton = function() {
       return changeCardButton.getText();
    };

    this.changeCardButtonEnabled = function() {
       return changeCardButton.isEnabled(true);
    };

    this.clickChangeCardButton = function() {
//        return helpers.scrollThenClick(element(by.id('changeCardButton')));
       return changeCardButton.click();
    };

    this.getCardNo = function() {
       return cardNo.getText();
    };

    this.getUserName = function() {
       return userName.getText();
    };

};

module.exports = new cardDetailsViewPage();