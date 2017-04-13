describe('ACCEPTANCE: Search entitlements', function (){
    'use strict';
    var searchEntitlementsPage = require('./../../pages/searchEntitlementsPage.js');
    var listEntitlementsDetailsPage = require('./../../pages/listEntitlementsDetailsPage.js');
    var navBar = require('./../../pages/navBar.js');
    var dashboardPage = require('./../../pages/dashboardPage.js');


    it("should take user to search by OBB page", function () {
        dashboardPage.clickOBBButton();
        browser.waitForAngular();
    });

    it("should navigate to search page", function () {
        expect(browser.getLocationAbsUrl()).toMatch('/searchSmallEnterpriseOnline');
        expect(searchEntitlementsPage.getBreadCrumb()).toEqual("Search Selection Search for OBB");
    });

    it("should display the search textbox and button", function () {
        expect(searchEntitlementsPage.getSearchByDigitalIdField()).toEqual('');
        expect(searchEntitlementsPage.getSearchBtn()).toEqual("Search");
        expect(searchEntitlementsPage.btnEnabled()).toBeFalsy();
    });

    it('should display the Logout link in the navigation bar', function () {
        expect(navBar.getLoginLink()).toEqual("Sign out");
    });

    it('should disable the search button when all input in the search by card text box has been removed', function(){
        searchEntitlementsPage.clearSearch();
        searchEntitlementsPage.enterSearchCriteria('clearing@search.com');
        searchEntitlementsPage.clearSearch();
        expect(searchEntitlementsPage.btnEnabled()).toBeFalsy();
    });

    it("should search by the text entered into the search by digital id text box", function () {
        searchEntitlementsPage.clearSearch();
        searchEntitlementsPage.enterSearchCriteria('searchingobb@text.com');
        expect(searchEntitlementsPage.getSearchValue()).toEqual('searchingobb@text.com');
    });

    it('should display a message when there are no results to show from a search', function(){
        searchEntitlementsPage.clearSearch();
        searchEntitlementsPage.enterSearchCriteria('0000000000000000');
        searchEntitlementsPage.clickSearch();
        expect(searchEntitlementsPage.getSearchCount()).toEqual("No Entitlements linked products found");
    });

    it('should redirect to view when user selects the digital ID', function(){
        searchEntitlementsPage.clearSearch();
        // searchEntitlementsPage.enterSearchCriteria('searchbyobb@e2e.com');
        searchEntitlementsPage.enterSearchCriteria('seojoanna@sb.co.za');
        searchEntitlementsPage.clickSearch();
        browser.waitForAngular();
        searchEntitlementsPage.clickFirstResult();
        browser.waitForAngular();
        expect(browser.getLocationAbsUrl()).toMatch('/listEntitlementsDetails');
        // expect(listEntitlementsDetailsPage.getDigitalID()).toEqual("Digital Id searched : SEARCHBYOBB@E2E.COM");
        expect(listEntitlementsDetailsPage.getDigitalID()).toEqual("Digital Id searched : seojoanna@sb.co.za");
    });

    it('should navigate to dash board selection page', function () {
        browser.setLocation('/dashboard');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });


});
