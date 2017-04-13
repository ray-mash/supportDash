/*global browser, by */
describe('ACCEPTANCE: Login', function () {
    'use strict';

    var loginPage = require('./../../pages/loginPage.js');
    var navBar = require('./../../pages/navBar.js');

    var credentials = {
        username : 'sbicza01\\SA4212100',
        password :  'Sa42121PROD'
    };

    it('should navigate to login page', function () {
        browser.get('/login');
        expect(browser.getLocationAbsUrl()).toMatch('/login');
    });

    it('should display the text boxes and button', function () {
        expect(loginPage.getUserName()).toEqual('');
        expect(loginPage.getPassword()).toEqual('');
        expect(loginPage.loginButtonEnabled()).toBeFalsy();
    });

    it('should login with valid credentials', function () {
        loginPage.clearLoginDetails();
        loginPage.enterUserCredentials(credentials.username, credentials.password);
        expect(loginPage.loginButtonEnabled()).toBeTruthy();
        loginPage.clickLogin();
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });

    it('should log out from the search page when user selects the logout option', function(){
        navBar.clickLogOut();
        expect(browser.getLocationAbsUrl()).toMatch('/login');
        loginPage.enterUserCredentials(credentials.username, credentials.password);
        expect(loginPage.loginButtonEnabled()).toBeTruthy();
        loginPage.clickLogin();
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });

});
