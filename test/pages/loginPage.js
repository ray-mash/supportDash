var LoginPage = function () {

    this.baseActions = require('./baseActions.js');
    var helpers = require('./helpers.js');
    var loginError = element(by.id('loginError'));
//    var hBreadCrumb = element(by.css('.breadcrumb ng-isolate-scope'));
    var Username = element(by.id('Username'));
    var Password = element(by.id('Password'));

    this.load = function () {
        browser.get(browser.loginUrl);
        browser.waitForAngular();
    };

    this.getUserName = function(){
        return Username.getText();
    };

    this.getPassword = function(){
        return Password.getText();
    };

    this.enterUserCredentials = function (username, password) {
        enterUserName(username);
        enterPassword(password);
    };

    this.clickLogin = function(){
        helpers.scrollThenClick(element(by.buttonText('Login')));
    };

    this.getTitle = function () {
        return browser.getTitle();
    };

    this.clearLoginDetails = function () {
        Username.clear();
        Password.clear();
    };

    this.loginButtonEnabled = function() {
        return element(by.id('login')).isEnabled(true);
    };

    this.loginWith = function (credentials) {
        this.load();
        this.enterUserCredentials(credentials.username, credentials.password);
        browser.waitForAngular();
    };

    this.getResetPasswordMessage = function(){
        return element(by.css('div[ng-show="isSuccessful"]')).getText();
    };

    this.canLogin = function () {
        return element(by.id('login')).getAttribute('disabled') == null;
    };

    function enterUserName(username) {
        Username.sendKeys(username);
    }

    function enterPassword(password) {
        Password.sendKeys(password);
    }

};

module.exports = new LoginPage();
