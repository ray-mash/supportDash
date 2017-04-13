var searchHintsModalPage = function(){

    this.baseActions = require('./baseActions.js');
    var helpers = require('./helpers.js');

    var searchHintsHeading = element(by.tagName('h3'));
    var searchHintsText1 = element(by.id('searchHintsText1'));
    var searchHintsText2 = element(by.id('searchHintsText2'));
    var searchHintsText3 = element(by.id('searchHintsText3'));
    var searchHintsText4 = element(by.id('searchHintsText4'));
    var closeSearchHints = element(by.id('closeSearchHints'));

    this.getSearchHintsHeading = function() {
       return searchHintsHeading.getText();
    };

    this.getSearchHintsText1 = function() {
       return searchHintsText1.getText();
    };

    this.getSearchHintsText2 = function() {
       return searchHintsText2.getText();
    };

    this.getSearchHintsText3 = function() {
       return searchHintsText3.getText();
    };

    this.getSearchHintsText4 = function() {
       return searchHintsText4.getText();
    };

    this.getCloseSearchHints = function() {
       return closeSearchHints.getText();
    };

    this.displayCloseSearchHints = function() {
       return closeSearchHints.isDisplayed(true);
    };

    this.closeSearchHintsEnabled = function() {
       return closeSearchHints.isEnabled(true);
    };

    this.clickCloseSearchHints = function() {
        closeSearchHints.click();
    };

};

module.exports = new searchHintsModalPage();