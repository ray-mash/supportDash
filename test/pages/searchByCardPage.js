var SearchByCardPage = function(){

	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
    var searchByCardTxt = element(by.id('searchByCardTxt'));
    var cardNrSearchBtn = element(by.id('cardNrSearchBtn'));
    var breadCrumb = element(by.id('searchByCardNrBreadCrumb'));
    var cardResultsCount = element(by.id('cardResultsCount'));
    var cardUserName = element(by.id('cardUserName'));
    var searchMaskedNumber = element(by.id('searchMaskedNumber'));
    var searchCardLength = element(by.id('searchCardLength'));
    var cardNoFilterCard = element(by.id('cardNoFilterCard'));
    var userNameFilterCard = element(by.id('userNameFilterCard'));
    var lastLoggedInFilterCard = element(by.id('lastLoggedInFilterCard'));
    var channelIndicatorFilterCard = element(by.id('channelIndicatorFilterCard'));
    var registrationDateFilterCard = element(by.id('registrationDateFilterCard'));
    var authenticationAttemptsFilterCard = element(by.id('authenticationAttemptsFilterCard'));
    var activatedFilterCard = element(by.id('activatedFilterCard'));
    var disabledFilterCard = element(by.id('disabledFilterCard'));
    var searchByCardNrBreadCrumb = element(by.id('searchByCardNrBreadCrumb'));


//    var searchResults = element(by.id('searchRes'));
//
	this.load = function () {
		//browser.get(browser.searchUrl);
		//browser.waitForAngular();
	};

    this.getSearchByCardNrBreadCrumb = function(){
        return searchByCardNrBreadCrumb.getText();
    };

    this.getSearchBtn = function() {
        return cardNrSearchBtn.getText();
    };

    this.getSearchCardLength = function() {
        return searchCardLength.getText();
    };

    this.getSearchValue = function() {
        return searchByCardTxt.getAttribute('value');
    };

    this.getSearchByCardTxt = function() {
        return searchByCardTxt.getText();
    };

    this.getBreadCrumb = function(){
        return breadCrumb.getText();
    };

    this.btnEnabled = function() {
        return cardNrSearchBtn.isEnabled(true);
    };

    this.enterSearchCriteria = function(searchCriteria) {
        searchByCardTxt.sendKeys(searchCriteria);
    };

    this.clearSearch = function() {
        searchByCardTxt.clear();
    };

    this.clickSearch = function(){
        cardNrSearchBtn.click();
    };

    this.getSearchCount = function() {
        return cardResultsCount.getText();
    };

    this.returnFirstResult = function(){
        return cardUserName.getText();
    };

    this.returnFirstCardResult = function(){
        return searchMaskedNumber.getText();
    };

    this.cardNoFilterCardEnabled = function() {
        return cardNoFilterCard.isEnabled(true);
    };

    this.cardNoFilterCardClick = function(){
        cardNoFilterCard.click();
    };

    this.cardNoFilterCardText = function() {
        return cardNoFilterCard.getText();
    };

    this.userNameFilterCardEnabled = function() {
        return userNameFilterCard.isEnabled(true);
    };

    this.userNameFilterCardClick = function(){
        userNameFilterCard.click();
    };

    this.userNameFilterCardText = function() {
        return userNameFilterCard.getText();
    };

    this.lastLoggedInFilterCardEnabled = function() {
        return lastLoggedInFilterCard.isEnabled(true);
    };

    this.lastLoggedInFilterCardClick = function(){
        lastLoggedInFilterCard.click();
    };

    this.lastLoggedInFilterCardText = function() {
        return lastLoggedInFilterCard.getText();
    };

    this.channelIndicatorFilterCardEnabled = function() {
        return channelIndicatorFilterCard.isEnabled(true);
    };

    this.channelIndicatorFilterCardClick = function(){
        channelIndicatorFilterCard.click();
    };

    this.channelIndicatorFilterCardText = function() {
        return channelIndicatorFilterCard.getText();
    };

    this.registrationDateFilterCardEnabled = function() {
        return registrationDateFilterCard.isEnabled(true);
    };

    this.registrationDateFilterCardClick = function(){
        registrationDateFilterCard.click();
    };

    this.registrationDateFilterCardText = function() {
        return registrationDateFilterCard.getText();
    };

    this.authenticationAttemptsFilterCardEnabled = function() {
        return authenticationAttemptsFilterCard.isEnabled(true);
    };

    this.authenticationAttemptsFilterCardClick = function(){
        authenticationAttemptsFilterCard.click();
    };

    this.authenticationAttemptsFilterCardText = function() {
        return authenticationAttemptsFilterCard.getText();
    };

    this.activatedFilterCardEnabled = function() {
        return activatedFilterCard.isEnabled(true);
    };

    this.activatedFilterCardClick = function(){
        activatedFilterCard.click();
    };

    this.activatedFilterCardText = function() {
        return activatedFilterCard.getText();
    };

    this.disabledFilterCardEnabled = function() {
        return disabledFilterCard.isEnabled(true);
    };

    this.disabledFilterCardClick = function(){
        disabledFilterCard.click();
    };

    this.disabledFilterCardText = function() {
        return disabledFilterCard.getText();
    };

};

module.exports = new SearchByCardPage();