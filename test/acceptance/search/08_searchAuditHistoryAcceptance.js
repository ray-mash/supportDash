describe('ACCEPTANCE: Search Audit History', function () {
    'use strict';
    var searchAuditHistoryPage = require('./../../pages/searchAuditHistoryPage.js');
    var navBar = require('./../../pages/navBar.js');
    var dashboardPage = require('./../../pages/dashboardPage.js');

    it("should take user to search audit history for digital ID page", function () {
        dashboardPage.clickAuditHistoryButton();
        browser.waitForAngular();
        expect(browser.getLocationAbsUrl()).toMatch('/searchAndViewAuditHistory');
        expect(searchAuditHistoryPage.getBreadCrumb()).toEqual("Search Selection Search By Digital ID for Audit History");
    });

    it("should display the search textbox and button", function () {
        expect(searchAuditHistoryPage.getSearchByDigitalIdField()).toEqual('');
        expect(searchAuditHistoryPage.getHistorySearchBtn()).toEqual("History");
        expect(searchAuditHistoryPage.btnEnabled()).toBeFalsy();
    });

    it('should display the Logout link in the navigation bar', function () {
        expect(navBar.getLoginLink()).toEqual("Sign out");
    });

    it('should disable the search button when all input in the search by digital ID has been removed', function(){
        searchAuditHistoryPage.clearSearch();
        searchAuditHistoryPage.enterSearchCriteria('clearing@search.com');
        searchAuditHistoryPage.clearSearch();
        expect(searchAuditHistoryPage.btnEnabled()).toBeFalsy();
    });

    it('should display a message when there are no results to show from a search', function(){
        searchAuditHistoryPage.clearSearch();
        searchAuditHistoryPage.enterSearchCriteria('0000000000000000');
        searchAuditHistoryPage.clickSearch();
        expect(searchAuditHistoryPage.getSearchCount()).toEqual("No results found");
    });

    it("should search by the text entered into the search by digital id text box", function () {
        searchAuditHistoryPage.clearSearch();
        searchAuditHistoryPage.enterSearchCriteria('seojoanna@sb.co.za');
        expect(searchAuditHistoryPage.getSearchValue()).toEqual('seojoanna@sb.co.za');
    });

    // it('should display the number of search results', function(){
    //     searchAuditHistoryPage.clearSearch();
    //     searchAuditHistoryPage.enterSearchCriteria('test2@sit1.com');
    //     searchAuditHistoryPage.clickSearch();
    //     expect(searchAuditHistoryPage.getSearchCount()).toEqual("1 results found");
    // });

    it('should display audit history', function(){
        searchAuditHistoryPage.clearSearch();
        searchAuditHistoryPage.enterSearchCriteria('seojoanna@sb.co.za');
        searchAuditHistoryPage.clickSearch();
        browser.waitForAngular();
        searchAuditHistoryPage.clickFirstResult();
        browser.waitForAngular();
        expect(searchAuditHistoryPage.getHistoryResultsCount()).toEqual("Audit History");
    });
    // it('should display no audit history', function(){
    //     searchAuditHistoryPage.clearSearch();
    //     searchAuditHistoryPage.enterSearchCriteria('test');
    //     searchAuditHistoryPage.clickSearch();
    //     browser.waitForAngular();
    //     searchAuditHistoryPage.clickFirstResult();
    //     browser.waitForAngular();
    //     expect(searchAuditHistoryPage.getHistoryResultsCount()).toEqual("No Audit History");
    // });

    it('should navigate to dash board selection page', function () {
        browser.setLocation('/dashboard');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });


});
