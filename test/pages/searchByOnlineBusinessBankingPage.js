var SearchByOnlineBusinessBankingPage = function(){

	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
    var searchByCardTxt = element(by.id('searchByCardTxt'));
    var searchByOBBBreadCrumb = element(by.id('searchByOBBBreadCrumb'));
    var obbSearchInput = element(by.id('obbSearchInput'));
    var searchByOBBButton = element(by.id('searchByOBBButton'));
    var searchOBBResult = element(by.id('searchOBBResult'));

    this.getSearchByOBBBreadCrumb = function(){
        return searchByOBBBreadCrumb.getText();
    };



    this.getOBBSearchInputValue = function() {
        return obbSearchInput.getAttribute('value');
    };

     this.clearOBBSearchInput = function() {
        obbSearchInput.clear();
    };

    this.getSearchByOSTBtn = function() {
        return searchByOBBButton.getText();
    };


};

module.exports = new SearchByOnlineBusinessBankingPage();