var SearchByOSTPage = function(){

	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
    var searchByCardTxt = element(by.id('searchByCardTxt'));
    var searchByOSTBreadCrumb = element(by.id('searchByOSTBreadCrumb'));
    var ostSearchInput = element(by.id('ostSearchInput'));
    var searchByOSTBtn = element(by.id('searchByOSTBtn'));
    var searchByOSTResults = element(by.id('searchByOSTResults'));
    var searchOSTResult = element(by.id('searchOSTResult'));
    var searchOSTName = element(by.id('searchOSTName'));
    var ostFilterName = element(by.id('ostFilterName'));
    var userNameFilterOST = element(by.id('userNameFilterOST'));
    var lastLoggedInFilterOST = element(by.id('lastLoggedInFilterOST'));
    var channelIndicatorFilterOST = element(by.id('channelIndicatorFilterOST'));
    var registrationDateFilterOST = element(by.id('registrationDateFilterOST'));
    var authenticationAttemptsFilterOST = element(by.id('authenticationAttemptsFilterOST'));
    var activatedFilterOST = element(by.id('activatedFilterOST'));
    var disabledFilterOST = element(by.id('disabledFilterOST'));

	this.load = function () {
		//browser.get(browser.searchUrl);
		//browser.waitForAngular();
	};

    this.getSearchByOSTBreadCrumb = function(){
        return searchByOSTBreadCrumb.getText();
    };

    this.getSearchByOSTResults = function(){
        return searchByOSTResults.getText();
    };

    this.getOSTSearchInputValue = function() {
        return ostSearchInput.getAttribute('value');
    };

    this.getOSTSearchInput = function() {
        return ostSearchInput.getText();
    };

     this.clearOSTSearchInput = function() {
        ostSearchInput.clear();
    };

    this.getSearchByOSTBtn = function() {
        return searchByOSTBtn.getText();
    };

    this.searchByOSTBtnEnabled = function() {
        return searchByOSTBtn.isEnabled(true);
    };

    this.enterOSTSearchCriteria = function(searchCriteria) {
        ostSearchInput.sendKeys(searchCriteria);
    };

    this.clickSearchByOSTBtn = function(){
        searchByOSTBtn.click();
    };

    this.returnFirstOSTResult = function(){
        return searchOSTResult.getText();
    };

    this.clickSearchOSTResult = function(){
        searchOSTResult.click();
    };

    this.returnFirstSearchOSTName = function(){
        return searchOSTName.getText();
    };

    this.userNameFilterOSTEnabled = function() {
        return userNameFilterOST.isEnabled(true);
    };

    this.userNameFilterOSTClick = function(){
        userNameFilterOST.click();
    };

    this.registrationDateFilterOSTClick = function(){
        registrationDateFilterOST.click();
    };

    this.userNameFilterOSTText = function() {
        return userNameFilterOST.getText();
    };

    this.authenticationAttemptsFilterOSTText = function() {
        return authenticationAttemptsFilterOST.getText();
    };

    this.registrationDateFilterOSTText = function() {
        return registrationDateFilterOST.getText();
    };

    this.channelIndicatorFilterOSTText = function() {
        return channelIndicatorFilterOST.getText();
    };

    this.ostFilterNameText = function() {
        return ostFilterName.getText();
    };

    this.authenticationAttemptsFilterOSTText = function() {
        return authenticationAttemptsFilterOST.getText();
    };

    this.lastLoggedInFilterOSTText = function() {
        return lastLoggedInFilterOST.getText();
    };

    this.disabledFilterOSTText = function() {
        return disabledFilterOST.getText();
    };

    this.activatedFilterOSTText = function() {
        return activatedFilterOST.getText();
    };

    this.disabledFilterOSTEnabled = function() {
        return disabledFilterOST.isEnabled(true);
    };

    this.lastLoggedInFilterOSTEnabled = function() {
        return lastLoggedInFilterOST.isEnabled(true);
    };

    this.authenticationAttemptsFilterOSTEnabled = function() {
        return authenticationAttemptsFilterOST.isEnabled(true);
    };

    this.ostFilterNameEnabled = function() {
        return ostFilterName.isEnabled(true);
    };

    this.channelIndicatorFilterOSTEnabled = function() {
        return channelIndicatorFilterOST.isEnabled(true);
    };

    this.registrationDateFilterOSTEnabled = function() {
        return registrationDateFilterOST.isEnabled(true);
    };

    this.authenticationAttemptsFilterOSTEnabled = function() {
        return authenticationAttemptsFilterOST.isEnabled(true);
    };

    this.userNameFilterOSTEnabled = function() {
        return userNameFilterOST.isEnabled(true);
    };
};

module.exports = new SearchByOSTPage();