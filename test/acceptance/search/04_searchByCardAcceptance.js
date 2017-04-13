describe('ACCEPTANCE: SearchByCard', function () {
    'use strict';
    var loginPage = require('./../../pages/loginPage.js');
    var searchByCardPage = require('./../../pages/searchByCardPage.js');
    var digitalIDDetailsPage = require('./../../pages/digitalIDDetailsPage.js');
    var navBar = require('./../../pages/navBar.js');
    var dashboardPage = require('./../../pages/dashboardPage.js');
    var pagination = element(by.css('.pagination'));

    it('should take user to search by card page', function() {
        dashboardPage.clickCardNumberButton();
        browser.waitForAngular();
    });

    it('should navigate to search by card page', function () {
        expect(browser.getLocationAbsUrl()).toMatch('/searchByPrincipalType');
        expect(searchByCardPage.getSearchByCardNrBreadCrumb()).toEqual("Search Selection Search By Card Number");
    });

    it("should display the search by card number text box and button", function () {
       expect(searchByCardPage.getSearchByCardTxt()).toEqual('');
       expect(searchByCardPage.getSearchBtn()).toEqual("Search");
       expect(searchByCardPage.btnEnabled()).toBeFalsy();
    });

    it('should display the Logout link in the navigation bar', function () {
        expect(navBar.getLoginLink()).toEqual("Sign out");
    });

    it('should not enable the search button if less than 9 digits are entered', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('1234567');
        expect(searchByCardPage.btnEnabled()).toBeFalsy();
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('1234');
        expect(searchByCardPage.btnEnabled()).toBeFalsy();
    });

    it('should enable the search button if 9 or more digits are entered', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('123456789');
        expect(searchByCardPage.btnEnabled()).toBeTruthy();
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('12345678901234');
        expect(searchByCardPage.btnEnabled()).toBeTruthy();
    });

    it('should disable the search button when all input in the search by card text box has been removed', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('1234567890');
        searchByCardPage.clearSearch();
        expect(searchByCardPage.btnEnabled()).toBeFalsy();
    });

    it("should search by the text entered into the search by card number text box", function () {
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('12345678');
        expect(searchByCardPage.getSearchValue()).toEqual('12345678');
    });

    it('should display a message when there are no results to show from a search', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('0000000000000000');
        searchByCardPage.clickSearch();
        expect(searchByCardPage.getSearchCount()).toEqual("0 results found");
    });

    it('should display the number of search results with a 16 digit search', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('0012345678954433');
        searchByCardPage.clickSearch();
        expect(searchByCardPage.getSearchCount()).toEqual("1 results found");
    });

    it('should allow to search by 9 digits', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('123456789');
        searchByCardPage.clickSearch();
        expect(searchByCardPage.getSearchCount()).toEqual("1 results found");
    });

    it('should display the search results with the card numbers masked', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('0012345678954433');
        searchByCardPage.clickSearch();
        expect(searchByCardPage.returnFirstResult()).toBe("searchbycard@e2e.com");
        expect(searchByCardPage.returnFirstCardResult()).toBe("0012345678954433");
    });

    it('should search by 18 digits which are stripped to return 9 digit cards which are masked', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('0012345678954433');
        searchByCardPage.clickSearch();
        browser.waitForAngular();
        expect(searchByCardPage.returnFirstResult()).toBe("searchbycard@e2e.com");
        expect(searchByCardPage.returnFirstCardResult()).toBe("0012345678954433");
    });

    it('should provide an error message if less than 16 but more than 9 digits are entered', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('998877665544332');
        searchByCardPage.clickSearch();
        browser.waitForAngular();
        expect(searchByCardPage.getSearchCardLength()).toEqual("Search by full card number: 9, 16 or 18 digits only");
    });

    it('should not allow for more than 18 digits to be entered', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('99887766554433221123453');
        searchByCardPage.clickSearch();
        browser.waitForAngular();
        expect(searchByCardPage.getSearchValue()).toBe("998877665544332211");
    });

    it('should provide an error message if 17 digits are entered', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('99887766554433221');
        searchByCardPage.clickSearch();
        browser.waitForAngular();
        expect(searchByCardPage.getSearchCardLength()).toEqual("Search by full card number: 9, 16 or 18 digits only");
    });

    it('should show no error message if the correct digits are entered', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('9988776655443322');
        searchByCardPage.clickSearch();
        browser.waitForAngular();
        expect(searchByCardPage.getSearchCardLength()).toEqual("");
    });

    it('should show the buttons to allow for sorting on the search results', function(){
        searchByCardPage.clearSearch();
        searchByCardPage.enterSearchCriteria('0012345678954433');
        searchByCardPage.clickSearch();
        browser.waitForAngular();
        expect(searchByCardPage.cardNoFilterCardText()).toBe("Card Number");
        expect(searchByCardPage.userNameFilterCardText()).toBe("Digital ID");
        expect(searchByCardPage.lastLoggedInFilterCardText()).toBe("Last Login");
        expect(searchByCardPage.channelIndicatorFilterCardText()).toBe("Registration Channel");
        expect(searchByCardPage.registrationDateFilterCardText()).toBe("Registration Date");
        expect(searchByCardPage.authenticationAttemptsFilterCardText()).toBe("Password Count");
        expect(searchByCardPage.activatedFilterCardText()).toBe("Active");
        expect(searchByCardPage.disabledFilterCardText()).toBe("Disabled");
        expect(searchByCardPage.cardNoFilterCardEnabled()).toBeTruthy();
        expect(searchByCardPage.userNameFilterCardEnabled()).toBeTruthy();
        expect(searchByCardPage.lastLoggedInFilterCardEnabled()).toBeTruthy();
        expect(searchByCardPage.channelIndicatorFilterCardEnabled()).toBeTruthy();
        expect(searchByCardPage.registrationDateFilterCardEnabled()).toBeTruthy();
        expect(searchByCardPage.authenticationAttemptsFilterCardEnabled()).toBeTruthy();
        expect(searchByCardPage.activatedFilterCardEnabled()).toBeTruthy();
        expect(searchByCardPage.disabledFilterCardEnabled()).toBeTruthy();
    });

    it('should navigate to dash board selection page', function () {
        browser.setLocation('/dashboard');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });
});
