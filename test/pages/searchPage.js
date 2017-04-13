var SearchPage = function(){

	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
    var searchTxt = element(by.id('tbDigitalId'));
    var searchCount = element(by.id('resultsCount'));
    var searchByDIBreadCrumb = element(by.id('searchByDIBreadCrumb'));
    var searchByCardNrBreadCrumb = element(by.id('searchByCardNrBreadCrumb'));
    var searchByOSTBreadCrumb = element(by.id('searchByOSTBreadCrumb'));
    var cardNumberRadioBtn = element(by.id('CardNo'));
    var searchResults = element(by.id('searchRes'));
    var searchHintsLink = element(by.id('searchHintsLink'));
    var userNameFilterDI = element(by.id('userNameFilterDI'));
    var lastLoggedInFilterDI = element(by.id('lastLoggedInFilterDI'));
    var channelIndicatorFilterDI = element(by.id('channelIndicatorFilterDI'));
    var registrationDateFilterDI = element(by.id('registrationDateFilterDI'));
    var authenticationAttemptsFilterDI = element(by.id('authenticationAttemptsFilterDI'));
    var activatedFilterDI = element(by.id('activatedFilterDI'));
    var disabledFilterDI = element(by.id('disabledFilterDI'));

	this.load = function () {
		//browser.get(browser.searchUrl);
		//browser.waitForAngular();
	};

    this.digitalIDField = element(by.css('#tbDigitalId'));

    function enterSearchCriteria(searchCriteria) {
        searchTxt.sendKeys(searchCriteria);
    }

    this.clearSearch = function() {
        searchTxt.clear();
    };

    this.getSearchButton = function () {
        return element(by.id('search'));
    };

 	this.enterSearchDetails = function (searchCriteria) {
        enterSearchCriteria(searchCriteria);
    };

    this.getBreadCrumb = function(){
        return searchByDIBreadCrumb.getText();
    };

    this.getSearchByOSTBreadCrumb = function(){
        return searchByOSTBreadCrumb.getText();
    };

    this.getSearchByCardNrBreadCrumb = function(){
        return searchByCardNrBreadCrumb.getText();
    };

    this.getSearchHintsLink = function(){
        return searchHintsLink.getText();
    };

    this.clickSearchHintsLink = function(){
        return searchHintsLink.click();
    };

    this.btnEnabled = function() {
        return element(by.id('search')).isEnabled(true);
    };

    this.getSearchCount = function() {
        return searchCount.getText();
    };

    this.clickSearch = function(){
        helpers.scrollThenClick(element(by.buttonText('Search')));
    };

    this.clickLogOut = function() {
        helpers.scrollThenClick(element(by.id('logout')));
    };

    this.returnFirstResult = function(){
        return searchResults.getText();
    
    };

    this.clickFirstResult = function(){
        helpers.scrollThenClick(searchResults);
    };

    this.clickCardRadioBtn = function(){
        helpers.scrollThenClick(cardNumberRadioBtn);
    };

    this.userNameFilterDIEnabled = function() {
        return userNameFilterDI.isEnabled(true);
    };

    this.userNameFilterDIClick = function(){
        userNameFilterDI.click();
    };

    this.userNameFilterDIText = function() {
        return userNameFilterDI.getText();
    };

    this.lastLoggedInFilterDIEnabled = function() {
        return lastLoggedInFilterDI.isEnabled(true);
    };

    this.lastLoggedInFilterDIClick = function(){
        lastLoggedInFilterDI.click();
    };

    this.lastLoggedInFilterDIText = function() {
        return lastLoggedInFilterDI.getText();
    };

    this.channelIndicatorFilterDIEnabled = function() {
        return channelIndicatorFilterDI.isEnabled(true);
    };

    this.channelIndicatorFilterDIClick = function(){
        channelIndicatorFilterDI.click();
    };

    this.channelIndicatorFilterDIText = function() {
        return channelIndicatorFilterDI.getText();
    };

    this.registrationDateFilterDIEnabled = function() {
        return registrationDateFilterDI.isEnabled(true);
    };

    this.registrationDateFilterDIClick = function(){
        registrationDateFilterDI.click();
    };

    this.registrationDateFilterDIText = function() {
        return registrationDateFilterDI.getText();
    };

    this.authenticationAttemptsFilterDIEnabled = function() {
        return authenticationAttemptsFilterDI.isEnabled(true);
    };

    this.authenticationAttemptsFilterDIClick = function(){
        authenticationAttemptsFilterDI.click();
    };

    this.authenticationAttemptsFilterDIText = function() {
        return authenticationAttemptsFilterDI.getText();
    };

    this.activatedFilterDIEnabled = function() {
        return activatedFilterDI.isEnabled(true);
    };

    this.activatedFilterDIdClick = function(){
        authenticationAttemptsFiactivatedFilterDIlterCard.click();
    };

    this.activatedFilterDIText = function() {
        return activatedFilterDI.getText();
    };

    this.disabledFilterDIEnabled = function() {
        return disabledFilterDI.isEnabled(true);
    };

    this.disabledFilterDIClick = function(){
        disabledFilterDI.click();
    };

    this.disabledFilterDIText = function() {
        return disabledFilterDI.getText();
    };

};

module.exports = new SearchPage(); 