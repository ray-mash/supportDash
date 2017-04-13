
xdescribe('ACCEPTANCE: OSTDetailsViewPage', function () {
    'use strict';
    var loginPage = require('./../../pages/loginPage.js');
    var searchPage = require('./../../pages/searchPage.js');
    var digitalIDDetailsPage = require('./../../pages/digitalIDDetailsPage.js');
    var dashboardPage = require('./../../pages/dashboardPage');
    var cardDetailsViewPage = require('./../../pages/cardDetailsViewPage');
    var OSTDetailsViewPage = require('./../../pages/OSTDetailsViewPage');
    var removeEntryModalPage = require('./../../pages/removeEntryModalPage');

//
//    beforeEach(function () {
////        //browser.get('/view');
//        browser.get('/searchByDigitalId');
//        searchPage.clearSearch();
////        browser.waitForAngular();
////        loginPage.enterUserCredentials('sbicza01\\SA4212100', 'Sa42121PROD');
////        loginPage.clickLogin();
////        browser.waitForAngular();
////        dashboardPage.clickDigitalID();
//    });

    it('should login in taking user to the search screen', function() {
        browser.get('/login');
        browser.waitForAngular();
        loginPage.enterUserCredentials('sbicza01\\SA4212100', 'Sa42121PROD');
        loginPage.clickLogin();
        browser.waitForAngular();
        dashboardPage.clickDigitalID();
    });

    it('should navigate to the Digital ID details page', function () {
        browser.waitForAngular();
        searchPage.enterSearchDetails('scritlytesting99@nowhere.com');
        searchPage.clickSearch();
        searchPage.clickFirstResult();
        browser.waitForAngular();
        digitalIDDetailsPage.clickOstLink();
        browser.waitForAngular();
        expect(cardDetailsViewPage.getViewBankingBreadCrumb()).toBe("Search Selection Searched By Principal Type View Digital ID Selected System Principal");
        expect(browser.getLocationAbsUrl()).toMatch('/selectedBankingDetailsView');
    });

    it('should not display the linked Dis if the link has not been selected', function() {
        expect(element(by.id('linkedUserName')).isPresent()).toBe(false);
    });

    it('should display the user whos OST has been selected', function() {
        expect(OSTDetailsViewPage.getUserNameOST()).toBe("Selected OST details for: scritlytesting99@nowhere.com");
        OSTDetailsViewPage.clickViewLinkedDIOST();
    });

    it('should display the OST details that have been selected', function() {
        expect(OSTDetailsViewPage.getOstPrincipalType()).toBe("OST");
        expect(OSTDetailsViewPage.getOstPrincipalDisplayName()).toBe("strictly34me");
        expect(OSTDetailsViewPage.getOstPrincipalAccessKey()).toBe("7AAE7F10BCAC0C4DEF3C6C48FF7BCBB8879A8600146E34DDEA634561703AA486");
        expect(OSTDetailsViewPage.getOstAccessTimeStamp()).toBe("2014-11-26 07:25:06.604+0200");
    });

    it('should display the view linked devices link for the OST principal', function() {
        expect(OSTDetailsViewPage.getViewLinkedDIOST()).toBe("View Linked Digital ID's");
    });

    it('should display linked Digital IDs when link is selected', function() {
        browser.waitForAngular();
        expect(element(by.id('linkedUserName')).isPresent()).toBe(true);
        expect(cardDetailsViewPage.getLinkedUserName()).toBe("scritlytesting98@nowhere.com");
    });

    it('should display buttons to remove a linked Digital ID', function() {
        expect(cardDetailsViewPage.getRemoveLinkedDigitalId()).toBe("Remove");
        expect(cardDetailsViewPage.removeLinkedDigitalIdEnabled()).toBeTruthy();
    });

    it('should allow the user to select a linked Digital ID and view that DIs details', function() {
        browser.waitForAngular();
        cardDetailsViewPage.clickLinkedUserName();
        expect(browser.getLocationAbsUrl()).toMatch('/viewDigitalIdDetails');
        expect(digitalIDDetailsPage.getDigitalID()).toEqual("Details for: scritlytesting98@nowhere.com");
    });

    it('should display a notification message when selecting to remove a linked DI', function() {
        browser.get('/login');
        browser.waitForAngular();
        loginPage.enterUserCredentials('sbicza01\\SA4212100', 'Sa42121PROD');
        loginPage.clickLogin();
        browser.waitForAngular();
        dashboardPage.clickDigitalID();
        browser.waitForAngular();
        searchPage.enterSearchDetails('scritlytesting99@nowhere.com');
        searchPage.clickSearch();
        searchPage.clickFirstResult();
        browser.waitForAngular();
        digitalIDDetailsPage.clickOstLink();
        browser.waitForAngular();
        OSTDetailsViewPage.clickViewLinkedDIOST();
        browser.waitForAngular();
        cardDetailsViewPage.clickRemoveLinkedDigitalId();
        expect(removeEntryModalPage.getRemoveEntryHeading()).toBe("Remove Linked Digital ID");
        expect(removeEntryModalPage.getRemoveLinkedDigitalIdConfirmation()).toBe("Are you sure you want to remove Digital ID: scritlytesting98@nowhere.com?");
        expect(removeEntryModalPage.getRemoveEntryYesBtn()).toBe("Yes");
        expect(removeEntryModalPage.getRemoveEntryNoBtn()).toBe("No");
        expect(removeEntryModalPage.removeEntryYesBtnEnabled()).toBeTruthy();
        expect(removeEntryModalPage.removeEntryNoBtnEnabled()).toBeTruthy();
        expect(removeEntryModalPage.displayRemoveEntryConfirmBtn()).toBeFalsy();
        expect(removeEntryModalPage.displayRemoveEntryYesBtn()).toBeTruthy();
        expect(removeEntryModalPage.displayRemoveEntryNoBtn()).toBeTruthy();
    });

    it('should display a confirmation message when selecting YES to remove a linked DI', function() {
        browser.waitForAngular();
        removeEntryModalPage.clickRemoveEntryYesBtn();
        expect(removeEntryModalPage.getRemoveEntryHeading()).toBe("Remove Linked Digital ID");
        expect(removeEntryModalPage.getRemoveLinkedDigitalIdNotification()).toBe("Digital ID: scritlytesting98@nowhere.com will be removed.");
        expect(removeEntryModalPage.getRemoveEntryConfirmBtn()).toBe("Confirm");
        expect(removeEntryModalPage.getRemoveEntryNoBtn()).toBe("No");
        expect(removeEntryModalPage.removeEntryConfirmBtnEnabled()).toBeTruthy();
        expect(removeEntryModalPage.removeEntryNoBtnEnabled()).toBeTruthy();
        expect(removeEntryModalPage.displayRemoveEntryConfirmBtn()).toBeTruthy();
        expect(removeEntryModalPage.displayRemoveEntryYesBtn()).toBeFalsy();
        expect(removeEntryModalPage.displayRemoveEntryNoBtn()).toBeTruthy();
    });

    it('should make no changes when selecting notification to remove a linked DI', function() {
        browser.waitForAngular();
        removeEntryModalPage.clickRemoveEntryNoBtn();
        expect(cardDetailsViewPage.getLinkedUserName()).toBe("scritlytesting98@nowhere.com");
    });

    it('should remove a linked DI when confirming the removal', function() {
        browser.waitForAngular();
        cardDetailsViewPage.clickRemoveLinkedDigitalId();
        browser.waitForAngular();
        removeEntryModalPage.clickRemoveEntryYesBtn();
        removeEntryModalPage.clickRemoveEntryConfirmBtn();
        browser.waitForAngular();
        OSTDetailsViewPage.clickViewLinkedDIOST();
        browser.waitForAngular();
        expect(cardDetailsViewPage.getMoreDIsMessage()).toBe("No other linked Digital ID's");
    });


});