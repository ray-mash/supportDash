describe('ACCEPTANCE: Search by OST', function () {
    'use strict';
    var loginPage = require('./../../pages/loginPage.js');
    var searchByOSTPage = require('./../../pages/searchByOSTPage.js');
    var digitalIDDetailsPage = require('./../../pages/digitalIDDetailsPage.js');
    var navBar = require('./../../pages/navBar.js');
    var dashboardPage = require('./../../pages/dashboardPage.js');
    var pagination = element(by.css('.pagination'));

    it('should take user to search by OST page', function() {
        dashboardPage.clickOSTButton();
        browser.waitForAngular();
    });

    it('should navigate to search by OST page', function () {
        expect(browser.getLocationAbsUrl()).toMatch('/searchByPrincipalType');
        expect(searchByOSTPage.getSearchByOSTBreadCrumb()).toEqual("Search Selection Search By Online Share Trading");
    });

    it("should display the search textbox", function () {
       expect(searchByOSTPage.getOSTSearchInputValue()).toEqual('');
    });

    it('should display the Logout link in the navigation bar', function () {
        expect(navBar.getLoginLink()).toEqual("Sign out");
    });

    it('should by default disable the search button when the search page is launched', function(){
        expect(searchByOSTPage.searchByOSTBtnEnabled()).toBeFalsy();
    });

    it('should enable the search button on a valid input in the search text box', function(){
        searchByOSTPage.clearOSTSearchInput();
        searchByOSTPage.enterOSTSearchCriteria('s');
        expect(searchByOSTPage.searchByOSTBtnEnabled()).toBeTruthy();
    });

    it('should disable the search button when all input in the search text box has been removed', function(){
        searchByOSTPage.clearOSTSearchInput();
        searchByOSTPage.enterOSTSearchCriteria('sdff');
        searchByOSTPage.clearOSTSearchInput();
        expect(searchByOSTPage.searchByOSTBtnEnabled()).toBeFalsy();
    });

    it("should search by text entered into the search text box", function (){
        searchByOSTPage.clearOSTSearchInput();
        searchByOSTPage.enterOSTSearchCriteria('our');
        expect(searchByOSTPage.getOSTSearchInputValue()).toEqual('our');
    });

    it('should display a message when there are no results to show from a search', function(){
        searchByOSTPage.clearOSTSearchInput();
        searchByOSTPage.enterOSTSearchCriteria('&');
        searchByOSTPage.clickSearchByOSTBtn();
        expect(searchByOSTPage.getSearchByOSTResults()).toEqual("0 results found");
    });

    it('should display the number of search results', function(){
        searchByOSTPage.clearOSTSearchInput();
        searchByOSTPage.enterOSTSearchCriteria('searchbycard');
        searchByOSTPage.clickSearchByOSTBtn();
        expect(searchByOSTPage.getSearchByOSTResults()).toEqual("2 results found");
    });

    it('should display search results after the user clicks the search button', function(){
        searchByOSTPage.clearOSTSearchInput();
        searchByOSTPage.enterOSTSearchCriteria('searchbycard');
        searchByOSTPage.clickSearchByOSTBtn();
        browser.waitForAngular();
        expect(searchByOSTPage.returnFirstOSTResult()).toBe("searchbycard1a@e2e.com");
        expect(searchByOSTPage.returnFirstSearchOSTName()).toBe("searchbycard1aa");
    });

    it('should show the buttons to allow for sorting on the search results', function(){
        searchByOSTPage.clearOSTSearchInput();
        searchByOSTPage.enterOSTSearchCriteria('searchbycard');
        searchByOSTPage.clickSearchByOSTBtn();
        browser.waitForAngular();
        expect(searchByOSTPage.ostFilterNameText()).toBe("OST Display Name");
        expect(searchByOSTPage.authenticationAttemptsFilterOSTText()).toBe("Password Count");
        expect(searchByOSTPage.channelIndicatorFilterOSTText()).toBe("Registration Channel");
        expect(searchByOSTPage.registrationDateFilterOSTText()).toBe("Registration Date");
        expect(searchByOSTPage.userNameFilterOSTText()).toBe("Digital ID");
        expect(searchByOSTPage.lastLoggedInFilterOSTText()).toBe("Last Login");
        expect(searchByOSTPage.activatedFilterOSTText()).toBe("Active");
        expect(searchByOSTPage.disabledFilterOSTText()).toBe("Disabled");
        expect(searchByOSTPage.userNameFilterOSTEnabled()).toBeTruthy();
        expect(searchByOSTPage.authenticationAttemptsFilterOSTEnabled()).toBeTruthy();
        expect(searchByOSTPage.registrationDateFilterOSTEnabled()).toBeTruthy();
        expect(searchByOSTPage.channelIndicatorFilterOSTEnabled()).toBeTruthy();
        expect(searchByOSTPage.ostFilterNameEnabled()).toBeTruthy();
        expect(searchByOSTPage.authenticationAttemptsFilterOSTEnabled()).toBeTruthy();
        expect(searchByOSTPage.lastLoggedInFilterOSTEnabled()).toBeTruthy();
        expect(searchByOSTPage.disabledFilterOSTEnabled()).toBeTruthy();
    });

    it('should redirect to view when user selects the digital ID', function(){
        searchByOSTPage.userNameFilterOSTClick();
        searchByOSTPage.clearOSTSearchInput();
        searchByOSTPage.enterOSTSearchCriteria('searchbycard');
        searchByOSTPage.clickSearchByOSTBtn();
        browser.waitForAngular();
        searchByOSTPage.clickSearchOSTResult();
        browser.waitForAngular();
        expect(browser.getLocationAbsUrl()).toMatch('/viewDigitalIdDetails');
        expect(digitalIDDetailsPage.getDigitalID()).toEqual("Details for: searchbycard@e2e.com");
    });

    it('should navigate to dash board selection page', function () {
        browser.setLocation('/dashboard');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });

});
