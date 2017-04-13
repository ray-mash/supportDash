var OSTDetailsViewPage = function(){

	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
	var ostPrincipalType = element(by.id('ostPrincipalType'));
	var ostPrincipalDisplayName = element(by.id('ostPrincipalDisplayName'));
	var ostPrincipalAccessKey = element(by.id('ostPrincipalAccessKey'));
	var ostAccessTimeStamp = element(by.id('ostAccessTimeStamp'));
	var userNameOST = element(by.id('userNameOST'));
	var viewLinkedDIOSTs = element(by.id('viewLinkedDIOSTs'));

	this.load = function () {
		//browser.get(browser.searchUrl);
		//browser.waitForAngular();
	};

    this.getOstPrincipalType = function() {
       return ostPrincipalType.getText();
    };

    this.getViewLinkedDIOST = function() {
       return viewLinkedDIOSTs.getText();
    };

    this.clickViewLinkedDIOST = function() {
       return viewLinkedDIOSTs.click();
    };

    this.getUserNameOST = function() {
       return userNameOST.getText();
    };

    this.getOstPrincipalDisplayName = function() {
       return ostPrincipalDisplayName.getText();
    };

    this.getOstPrincipalAccessKey = function() {
       return ostPrincipalAccessKey.getText();
    };

    this.getOstAccessTimeStamp = function() {
       return ostAccessTimeStamp.getText();
    };

};

module.exports = new OSTDetailsViewPage();