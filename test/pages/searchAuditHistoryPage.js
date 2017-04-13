var SearchAuditHistoryPage = function() {

    this.baseActions = require('./baseActions.js');
    var helpers = require('./helpers.js');
    var searchForAuditHistoryBreadCrumb = element(by.id('searchByDIBreadCrumb'));
    var historySearchBtn = element(by.id('searchHistory'));
    var searchByDigitalIdField = element(by.id('historyDigitalId'));
    var dIResultsCount = element(by.id('resultsCount'));
    var searchResults = element(by.id('searchRes'));
    var historyResultsCount = element(by.id('historyResultsCount'));


    this.getBreadCrumb = function () {
        return searchForAuditHistoryBreadCrumb.getText();
    };


    this.getSearchByDigitalIdField = function() {
        return searchByDigitalIdField.getText();
    };

    this.getHistorySearchBtn = function() {
        return historySearchBtn.getText();
    };

    this.btnEnabled = function() {
        return historySearchBtn.isEnabled(true);
    };

    this.clickSearch = function(){
        historySearchBtn.click();
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
        return dIResultsCount.getText();
    };

    this.clickFirstResult = function(){
        helpers.scrollThenClick(searchResults);
    };

    this.getHistoryResultsCount = function() {
        return historyResultsCount.getText();
    };

};
module.exports = new SearchAuditHistoryPage();