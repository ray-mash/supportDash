
var baseActions = function() {
    'use strict';

    var helpers = require('./helpers.js');

    var errorNotification = element(by.css('.error.notification:not(.ng-hide)'));
    var visibleSuccessNotification = element(by.css('.success.notification:not(.ng-hide)'));
    var warningNotification = element(by.css('span.information:not(.ng-hide)'));
    var infoNotification = element(by.css('.info.notification:not(.ng-hide)'));
    var signedInAs = element(by.id('signedinas'));

    this.getCurrentUrl = function() {
        return browser.getLocationAbsUrl();
    };

    this.waitForSignOut = function () {
        // reloading the page (which is how we sign out) confuses protractor so we use webdriver's wait fn
        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return url.indexOf('/login') >= 0;
            });
        }, 10000);
    };

    this.getErrorMessage = function () {
        return errorNotification.getText();
    };

    this.getErrorVisibility = function () {
        return errorNotification.isDisplayed();
    };

    this.getErrorFor = function(key) {
        return element(by.css("label[for='" + key + "'] ~ .form-error:not(.ng-hide)")).getText();
    };

    this.getVisibleSuccessMessage = function () {
        return visibleSuccessNotification.getText();
    };

    this.getHiddenSuccessMessage = function () {
        return element(by.css('.success.notification')).getText();
    };

    this.getSuccessVisibility = function () {
        return visibleSuccessNotification.isDisplayed();
    };

    this.getWarningMessage = function() {
        return warningNotification.getText();
    };

    this.getInfoMessage = function() {
        return infoNotification.getText();
    };

    this.clickOnTab = function (tabName) {
        helpers.scrollThenClick(element(by.linkText(tabName)));
    };

    this.navigateToTransact = function () {
        this.clickOnTab('Transact');
    };

    this.navigateToBeneficiaries = function () {
        this.clickOnTab('Transact');
        helpers.wait(element(by.id('prepaid-history')));
        helpers.scrollThenClick(element(by.id('manage-beneficiary')));
    };

    this.navigateToApplyForAccount = function () {
        this.clickOnTab('Apply for Account');
    };


    var selectByVisibleText = function (selectElement, label) {
        helpers.scrollThenClick(selectElement.element(by.xpath("./option[text()[normalize-space()]='" + label + "']")));
    };

    this.textForInput = function (inputElement, value) {
        if (value) {
            helpers.scrollThenType(inputElement, value);
        } else {
            return inputElement.getAttribute('value');
        }
    };

};

module.exports = new baseActions();

