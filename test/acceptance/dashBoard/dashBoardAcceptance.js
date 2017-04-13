/*global browser, by */
describe('ACCEPTANCE: DashboardViewPage', function () {
    'use strict';

    var loginPage = require('./../../pages/loginPage.js');
    var dashboardPage = require('./../../pages/dashboardPage.js');
    var navBar = require('./../../pages/navBar.js');
    var searchPage = require('./../../pages/searchPage.js');
    var searchByOSTPage = require('./../../pages/searchByOSTPage.js');
    var SearchByOnlineBusinessBankingPage = require('./../../pages/searchByOnlineBusinessBankingPage.js');
    var searchByCardPage = require('./../../pages/searchByCardPage.js');

    it('should log in and navigate to the dashboard page', function () {
        browser.get('/login');
        browser.waitForAngular();
        loginPage.enterUserCredentials('sbicza01\\SA4212100', 'Sa42121PROD');
        loginPage.clickLogin();
        browser.waitForAngular();
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });

    it('should display the search type selection buttons', function () {
        expect(dashboardPage.getCardNumberButton()).toEqual('Card Number');
        expect(dashboardPage.getDigitalIdButton()).toEqual('Digital ID');
        expect(dashboardPage.getOSTButton()).toEqual('Online Share Trading');
        expect(dashboardPage.getOBBButton()).toEqual('Online Banking for Business');
    });

    it('should enable the search type selection buttons', function () {
        expect(dashboardPage.digitalIDBtnEnabled()).toBeTruthy();
        expect(dashboardPage.cardNrBtnEnabled()).toBeTruthy();
    });

    it('should display the Sign out link in the navigation bar', function () {
        expect(navBar.getLoginLink()).toEqual("Sign out");
    });

    it('should navigate to the search by Digital ID page', function () {
        dashboardPage.clickDigitalID();
        expect(searchPage.getBreadCrumb()).toBe('Search Selection Search By Digital ID');
        expect(browser.getLocationAbsUrl()).toMatch('/searchByPrincipalType');
    });

    it('should navigate to the search by Card Number page', function () {
        browser.get('/login');
        expect(browser.getLocationAbsUrl()).toMatch('/login');
        browser.waitForAngular();
        loginPage.enterUserCredentials('sbicza01\\SA4212100', 'Sa42121PROD');
        loginPage.clickLogin();
        browser.waitForAngular();
        dashboardPage.clickCardNumberButton();
        expect(searchByCardPage.getSearchByCardNrBreadCrumb()).toBe('Search Selection Search By Card Number');
        expect(browser.getLocationAbsUrl()).toMatch('/searchByPrincipalType');
    });


    it('should navigate to the search by Online Share Trading button page', function () {
        browser.get('/login');
        browser.waitForAngular();
        loginPage.enterUserCredentials('sbicza01\\SA4212100', 'Sa42121PROD');
        loginPage.clickLogin();
        browser.waitForAngular();
        dashboardPage.clickOSTButton();
        expect(searchByOSTPage.getSearchByOSTBreadCrumb()).toBe('Search Selection Search By Online Share Trading');
        expect(browser.getLocationAbsUrl()).toMatch('/searchByPrincipalType');
    });

    it('should navigate to the search by Online Business Banking page', function () {
        browser.get('/login');
        browser.waitForAngular();
        loginPage.enterUserCredentials('sbicza01\\SA4212100', 'Sa42121PROD');
        loginPage.clickLogin();
        browser.waitForAngular();
        dashboardPage.clickOBBButton();
        expect(SearchByOnlineBusinessBankingPage.getSearchByOBBBreadCrumb()).toBe('Search Selection Search for OBB');
        expect(browser.getLocationAbsUrl()).toMatch('/searchSmallEnterpriseOnline');
    });

});
