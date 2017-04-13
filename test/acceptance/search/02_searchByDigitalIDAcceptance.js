describe('ACCEPTANCE: Search by DI', function () {
    'use strict';
    var loginPage = require('./../../pages/loginPage.js');
    var searchPage = require('./../../pages/searchPage.js');
    var digitalIDDetailsPage = require('./../../pages/digitalIDDetailsPage.js');
    var navBar = require('./../../pages/navBar.js');
    var dashboardPage = require('./../../pages/dashboardPage.js');
    var searchHintsModalPage = require('./../../pages/searchHintsModalPage.js');
    var pagination = element(by.css('.pagination'));

    it('should take user to search by digitalId page', function() {
        dashboardPage.clickDigitalID();
        expect(browser.getLocationAbsUrl()).toMatch('/searchByPrincipalType');
        expect(searchPage.getBreadCrumb()).toEqual("Search Selection Search By Digital ID");
        expect(searchPage.digitalIDField.getAttribute('value')).toEqual('');
        expect(searchPage.btnEnabled()).toBeFalsy();
    });

    it('should display the Logout link in the navigation bar', function () {
        expect(navBar.getLoginLink()).toEqual("Sign out");
    });

    it('should display the Hints link', function () {
        expect(searchPage.getSearchHintsLink()).toEqual("Search Hints");
    });

    it('should open the Hints Modal when clicking on the Hints link', function () {
        searchPage.clickSearchHintsLink();
        expect(searchHintsModalPage.getSearchHintsHeading()).toBe("Search Hints");
        expect(searchHintsModalPage.getSearchHintsText1()).toBe("%@standardbank%");
        expect(searchHintsModalPage.getSearchHintsText2()).toBe("Using '%' before and after your input will return all the results that contain that specific text somewhere in it.");
        expect(searchHintsModalPage.getSearchHintsText3()).toBe("%jack@_bank.co.za%");
        expect(searchHintsModalPage.getSearchHintsText4()).toBe("Using '_' together with '%' fills in missing information for you and will return all information that has that text with anything else in the '_' space.");
        expect(searchHintsModalPage.getCloseSearchHints()).toBe("Close");
        expect(searchHintsModalPage.displayCloseSearchHints()).toBeTruthy();
        expect(searchHintsModalPage.closeSearchHintsEnabled()).toBeTruthy();
    });

    it('should enable the search button on a valid input in the search text box', function(){
        searchHintsModalPage.clickCloseSearchHints();
        searchPage.clearSearch();
        searchPage.enterSearchDetails('s');
        expect(searchPage.btnEnabled()).toBeTruthy();
    });

    it('should disable the search button when all input in the search text box has been removed', function(){
        searchPage.clearSearch();
        searchPage.enterSearchDetails('sdff');
        searchPage.clearSearch();
        expect(searchPage.btnEnabled()).toBeFalsy();
    });

    it("should search by text entered into the search text box", function () {
        searchPage.clearSearch();
        searchPage.digitalIDField.sendKeys('11163');
        expect(searchPage.digitalIDField.getAttribute('value')).toEqual('11163');
    });

    it('should display a message when there are no results to show from a search', function(){
        searchPage.clearSearch();
        searchPage.enterSearchDetails('&');
        searchPage.clickSearch();
        expect(searchPage.getSearchCount()).toEqual("0 results found");
    });

    it('should display the number of search results', function(){
        searchPage.clearSearch();
        searchPage.enterSearchDetails('searchbydi@e2e.com');
        searchPage.clickSearch();
        expect(searchPage.getSearchCount()).toEqual("1 results found");
    });

    it('should display search results after the user clicks the search button', function(){
        searchPage.clearSearch();
        searchPage.enterSearchDetails('searchbydi@e2e.com');
        searchPage.clickSearch();
        browser.waitForAngular();
        expect(searchPage.returnFirstResult()).toBe("searchbydi@e2e.com");
    });

    it('should show the buttons to allow for sorting on the search results', function(){
        searchPage.clearSearch();
        searchPage.enterSearchDetails('searchbydi@e2e.com');
        searchPage.clickSearch();
        browser.waitForAngular();
        expect(searchPage.userNameFilterDIText()).toBe("Digital ID");
        expect(searchPage.lastLoggedInFilterDIText()).toBe("Last Login");
        expect(searchPage.channelIndicatorFilterDIText()).toBe("Registration Channel");
        expect(searchPage.registrationDateFilterDIText()).toBe("Registration Date");
        expect(searchPage.authenticationAttemptsFilterDIText()).toBe("Password Count");
        expect(searchPage.activatedFilterDIText()).toBe("Active");
        expect(searchPage.disabledFilterDIText()).toBe("Disabled");
        expect(searchPage.userNameFilterDIEnabled()).toBeTruthy();
        expect(searchPage.lastLoggedInFilterDIEnabled()).toBeTruthy();
        expect(searchPage.channelIndicatorFilterDIEnabled()).toBeTruthy();
        expect(searchPage.registrationDateFilterDIEnabled()).toBeTruthy();
        expect(searchPage.authenticationAttemptsFilterDIEnabled()).toBeTruthy();
        expect(searchPage.activatedFilterDIEnabled()).toBeTruthy();
        expect(searchPage.disabledFilterDIEnabled()).toBeTruthy();
    });

    it('should filter the results when selecting the filter options', function(){
        expect(searchPage.returnFirstResult()).toBe("searchbydi@e2e.com");
        searchPage.userNameFilterDIClick();
        expect(searchPage.returnFirstResult()).toBe("searchbydi@e2e.com");
        searchPage.userNameFilterDIClick();
        searchPage.registrationDateFilterDIClick();
        searchPage.registrationDateFilterDIClick();
        expect(searchPage.returnFirstResult()).toBe("searchbydi@e2e.com");
    });

    it('should redirect to view when user selects the digital ID', function(){
        searchPage.clearSearch();
        searchPage.enterSearchDetails('searchbydi@e2e.com');
        searchPage.clickSearch();
        browser.waitForAngular();
        searchPage.clickFirstResult();
        browser.waitForAngular();
        expect(browser.getLocationAbsUrl()).toMatch('/viewDigitalIdDetails');
        expect(digitalIDDetailsPage.getDigitalID()).toEqual("Details for: searchbydi@e2e.com");
    });

    it('should navigate to dash board selection page', function () {
        browser.setLocation('/dashboard');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });
});
