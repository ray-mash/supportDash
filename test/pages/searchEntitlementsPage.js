var SearchEntitlementsPage = function(){

    this.baseActions = require('./baseActions.js');
    var helpers = require('./helpers.js');

    var searchByOBBBreadCrumb = element(by.id('searchByOBBBreadCrumb'));
    var obbSearchBtn = element(by.id('search'));
    var searchByDigitalIdField = element(by.id('tbDigitalId'));
    var obbResultsCount = element(by.id('obbResultsCount'));
    var searchResults = element(by.id('searchRes'));

    this.getBreadCrumb = function(){
        return searchByOBBBreadCrumb.getText();
    };

    this.getSearchByDigitalIdField = function() {
        return searchByDigitalIdField.getText();
    };

    this.getSearchBtn = function() {
        return obbSearchBtn.getText();
    };

    this.btnEnabled = function() {
        return obbSearchBtn.isEnabled(true);
    };

    this.clickSearch = function(){
        obbSearchBtn.click();
    };

    this.enterSearchCriteria = function(searchCriteria) {
        searchByDigitalIdField.sendKeys(searchCriteria);
    };

    this.clearSearch = function() {
        searchByDigitalIdField.clear();
    };

    this.getSearchValue = function() {
        return searchByDigitalIdField.getAttribute('value');
    };

    this.getSearchCount = function() {
        return obbResultsCount.getText();
    };

    this.clickFirstResult = function(){
        helpers.scrollThenClick(searchResults);
    };

};
module.exports = new SearchEntitlementsPage();