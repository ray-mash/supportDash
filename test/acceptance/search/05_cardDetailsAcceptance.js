describe('ACCEPTANCE: CardDetailsViewPage', function () {
    'use strict';
    var loginPage = require('./../../pages/loginPage.js');
    var searchPage = require('./../../pages/searchPage.js');
    var digitalIDDetailsPage = require('./../../pages/digitalIDDetailsPage.js');
    var dashboardPage = require('./../../pages/dashboardPage');
    var cardDetailsViewPage = require('./../../pages/cardDetailsViewPage');
    var confirmationModalPage = require('./../../pages/confirmationModalPage');
    var navBar = require('./../../pages/navBar.js');
    var removeEntryModalPage = require('./../../pages/removeEntryModalPage');
    var cardNumberModalPage = require('./../../pages/cardNumberModalPage');


    it('should take user to search by digitalId page', function () {
        dashboardPage.clickDigitalID();
        expect(browser.getLocationAbsUrl()).toMatch('/searchByPrincipalType');
        expect(searchPage.getBreadCrumb()).toEqual("Search Selection Search By Digital ID");
        expect(searchPage.digitalIDField.getAttribute('value')).toEqual('');
        expect(searchPage.btnEnabled()).toBeFalsy();
    });

    it('should navigate to the Digital ID details page', function () {
        browser.waitForAngular();
        searchPage.enterSearchDetails('searchbydi@e2e.com');
        searchPage.clickSearch();
        searchPage.clickFirstResult();
        browser.waitForAngular();
        expect(browser.getLocationAbsUrl()).toMatch('/viewDigitalIdDetails');
    });


    it('should display the user whose card has been selected', function() {
        digitalIDDetailsPage.clickCardNoLink();
        browser.waitForAngular();
        expect(browser.getLocationAbsUrl()).toMatch('/selectedBankingDetailsView');
        expect(cardDetailsViewPage.getUserName()).toBe("Selected Card details for: searchbydi@e2e.com");
        expect(cardDetailsViewPage.getCardNo()).toBe("225511446");
        expect(cardDetailsViewPage.getChangeCardButton()).toBe("Change Card Number");
        expect(cardDetailsViewPage.changeCardButtonEnabled()).toBeTruthy();
        expect(cardDetailsViewPage.getViewLinkedDI()).toBe("View Linked Digital ID's");
    });
    it('should display linked Digital IDs when link is selected', function() {
        cardDetailsViewPage.clickViewLinkedDI();
        browser.waitForAngular();
        expect(element(by.id('linkedUserName')).isPresent()).toBe(true);
        expect(cardDetailsViewPage.getLinkedUserName()).toBe("searchbydi2@e2e.com");
        expect(cardDetailsViewPage.getRemoveLinkedDigitalId()).toBe("Remove");
        expect(cardDetailsViewPage.removeLinkedDigitalIdEnabled()).toBeTruthy();

    });

    it('should allow the user to select a linked Digital ID and view that DIs details', function() {
        cardDetailsViewPage.clickLinkedUserName();
        expect(browser.getLocationAbsUrl()).toMatch('/viewDigitalIdDetails');
        expect(digitalIDDetailsPage.getDigitalID()).toEqual("Details for: searchbydi2@e2e.com");
    });

    it('should allow the user the option to change a card number', function() {
        digitalIDDetailsPage.clickCardNoLink();
        browser.waitForAngular();
        cardDetailsViewPage.clickChangeCardButton();
        expect(cardNumberModalPage.replaceCardHeadingText()).toBe("Replace Old Card Number with New Card Number");
        expect(cardNumberModalPage.cancelChangeCardModalBtnEnabled()).toBeTruthy();
        expect(cardNumberModalPage.confirmChangeCardModalBtnEnabled()).toBeFalsy();
        expect(cardNumberModalPage.getCancelChangeCardModalBtn()).toBe("Cancel");
        expect(cardNumberModalPage.getConfirmChangeCardModalBtn()).toBe("Confirm");
        expect(cardNumberModalPage.newCardNumberInputEnabled()).toBeTruthy();
    });

    it('should not enable the confirm button on the modal if 8 or less digits are entered into the new card number text box', function() {
        cardNumberModalPage.enterNewCardNumber('12345678');
        expect(cardNumberModalPage.confirmChangeCardModalBtnEnabled()).toBeFalsy();
    });

    it('should display the selected card number and an empty input area on the modal after selecting to change a card number', function() {
        cardNumberModalPage.clearNewCardNumber();
        expect(cardNumberModalPage.getOldNumberTxt()).toBe("225511446");
        expect(cardNumberModalPage.getNewCardNumberInput()).toBe("");
    });

    it('should enable the confirm button on the modal if 9 or more digits are entered into the new card number text box', function() {
        cardNumberModalPage.clearNewCardNumber();
        cardNumberModalPage.enterNewCardNumber('123456781');
        expect(cardNumberModalPage.confirmChangeCardModalBtnEnabled()).toBeTruthy();
    });

    it('should make no changes when selecting the cancel option on the confirmation modal', function() {
        cardNumberModalPage.clearNewCardNumber();
        cardNumberModalPage.clickCancelChangeCardModalBtn();
    });

    it('should not allow the user to enter the same card number as that that is being changed', function() {
        cardDetailsViewPage.clickChangeCardButton();
        browser.waitForAngular();
        cardNumberModalPage.enterNewCardNumber('225511446');
        cardNumberModalPage.clickConfirmChangeCard();
        browser.waitForAngular();
        expect(cardNumberModalPage.replaceCardHeadingText()).toBe("Invalid card number");
        expect(cardNumberModalPage.getInvalidCardErrorMessage()).toBe("Please enter a valid card number");
        expect(cardNumberModalPage.getInvalidCardErrorCancelBtn()).toBe("Close");
        expect(cardNumberModalPage.invalidCardErrorCancelBtnEnabled()).toBeTruthy();
        cardNumberModalPage.clickInvalidCardErrorCancelBtn();
    });

    it('should not enable the confirm button when alpha characters are entered', function() {
        browser.waitForAngular();
        cardDetailsViewPage.clickChangeCardButton();
        browser.waitForAngular();
        cardNumberModalPage.enterNewCardNumber('343483s392423253');
        expect(cardNumberModalPage.confirmChangeCardModalBtnEnabled()).toBeFalsy();
    });

    it('should not allow the user to enter a card number with special characters', function() {
        browser.waitForAngular();
        cardNumberModalPage.clearNewCardNumber();
        cardNumberModalPage.enterNewCardNumber('519612226042747#');
        expect(cardNumberModalPage.confirmChangeCardModalBtnEnabled()).toBeFalsy();
    });

    it('should not allow the user to enter blank spaces when changing a card number', function() {
        browser.waitForAngular();
        cardNumberModalPage.clearNewCardNumber();
        cardNumberModalPage.enterNewCardNumber('519612226 427473');
        expect(cardNumberModalPage.confirmChangeCardModalBtnEnabled()).toBeFalsy();
    });

    it('should not allow the user to enter a card number more than 9 but less than 16 characters', function() {
        browser.waitForAngular();
        cardNumberModalPage.clearNewCardNumber();
        cardNumberModalPage.enterNewCardNumber('519612226427473');
        cardNumberModalPage.clickConfirmChangeCard();
        expect(cardNumberModalPage.getInvalidCardErrorMessage()).toBe("Please enter a valid card number");
        cardNumberModalPage.clickInvalidCardErrorCancelBtn();
        browser.waitForAngular();
        expect(cardDetailsViewPage.getCardNo()).toBe("225511446");
    });

    it('should not allow the user to enter a card number more than 18 characters', function() {
        browser.waitForAngular();
        cardDetailsViewPage.clickChangeCardButton();
        browser.waitForAngular();
        cardNumberModalPage.enterNewCardNumber('99887766554433221100');
        browser.waitForAngular();
        expect(cardNumberModalPage.getNewCardValue()).toBe("998877665544332211");
        cardNumberModalPage.clickCancelChangeCardModalBtn();
    });

//    it('should allow the user to change a card number and update the linked DIs', function() {
//        browser.waitForAngular();
//        cardDetailsViewPage.clickChangeCardButton();
//        browser.waitForAngular();
//        cardNumberModalPage.enterNewCardNumber('0000887766550000');
//        cardNumberModalPage.clickConfirmChangeCard();
//        expect(cardDetailsViewPage.getCardNo()).toBe("0000887766550000");
//        browser.waitForAngular();
//        cardDetailsViewPage.clickChangeCardButton();
//        browser.waitForAngular();
//        cardNumberModalPage.enterNewCardNumber('0012345678954433');
//        cardNumberModalPage.clickConfirmChangeCard();
//        expect(cardDetailsViewPage.getCardNo()).toBe("0012345678954433");
//        browser.waitForAngular();
//        cardDetailsViewPage.clickViewLinkedDI();
//        expect(cardDetailsViewPage.getLinkedUserName()).toBe("searchbydi2@e2e.com");
//    });

    it('should display a notification message when selecting to remove a linked DI', function() {
        browser.waitForAngular();
        cardDetailsViewPage.clickViewLinkedDI();
        browser.waitForAngular();
        cardDetailsViewPage.clickRemoveLinkedDigitalId();
        expect(removeEntryModalPage.getRemoveEntryHeading()).toBe("Remove Linked Digital ID");
        expect(removeEntryModalPage.getRemoveLinkedDigitalIdConfirmation()).toBe("Are you sure you want to remove Digital ID: searchbydi@e2e.com?");
        expect(removeEntryModalPage.getRemoveEntryYesBtn()).toBe("Yes");
        expect(removeEntryModalPage.getRemoveEntryNoBtn()).toBe("No");
        expect(removeEntryModalPage.removeEntryYesBtnEnabled()).toBeTruthy();
        expect(removeEntryModalPage.removeEntryNoBtnEnabled()).toBeTruthy();
        expect(removeEntryModalPage.displayRemoveEntryConfirmBtn()).toBeFalsy();
        expect(removeEntryModalPage.displayRemoveEntryYesBtn()).toBeTruthy();
        expect(removeEntryModalPage.displayRemoveEntryNoBtn()).toBeTruthy();
    });

//    it('should display a confirmation message when selecting YES to remove a linked DI', function() {
//        browser.waitForAngular();
//        removeEntryModalPage.clickRemoveEntryYesBtn();
//        expect(removeEntryModalPage.getRemoveEntryHeading()).toBe("Remove Linked Digital ID");
//        expect(removeEntryModalPage.getRemoveLinkedDigitalIdNotification()).toBe("Digital ID: searchbydi2@e2e.com will be removed.");
//        expect(removeEntryModalPage.getRemoveEntryConfirmBtn()).toBe("Confirm");
//        expect(removeEntryModalPage.getRemoveEntryNoBtn()).toBe("No");
//        expect(removeEntryModalPage.removeEntryConfirmBtnEnabled()).toBeTruthy();
//        expect(removeEntryModalPage.removeEntryNoBtnEnabled()).toBeTruthy();
//        expect(removeEntryModalPage.displayRemoveEntryConfirmBtn()).toBeTruthy();
//        expect(removeEntryModalPage.displayRemoveEntryYesBtn()).toBeFalsy();
//        expect(removeEntryModalPage.displayRemoveEntryNoBtn()).toBeTruthy();
//    });
//
//    it('should remove a linked DI when confirming the removal', function() {
//        browser.waitForAngular();
//        cardDetailsViewPage.clickRemoveLinkedDigitalId();
//        browser.waitForAngular();
//        removeEntryModalPage.clickRemoveEntryYesBtn();
//        removeEntryModalPage.clickRemoveEntryConfirmBtn();
//        browser.waitForAngular();
//        expect(cardDetailsViewPage.getLinkedUserName()).toBe("searchbydi2@e2e.com");
//    });
//
//    it('should check that the card was actually removed from the DI', function() {
//        browser.get('/dashboard');
////        browser.waitForAngular();
////        loginPage.enterUserCredentials('sbicza01\\SA4212100', 'Sa42121PROD');
////        loginPage.clickLogin();
//        browser.waitForAngular();
//        dashboardPage.clickDigitalID();
//        browser.waitForAngular();
//        searchPage.enterSearchDetails('strictlytesting1@nowhere.com');
//        searchPage.clickSearch();
//        searchPage.clickFirstResult();
//        browser.waitForAngular();
//        expect(viedigitalIDDetailsPagewPage.getNoSystemPrincipalText()).toEqual("No Linked Products Found");
//    });
//
//    it('should display that there are no extra linked DIs', function() {
//        browser.get('/dashboard');
////        browser.waitForAngular();
////        loginPage.enterUserCredentials('sbicza01\\SA4212100', 'Sa42121PROD');
////        loginPage.clickLogin();
//        browser.waitForAngular();
//        dashboardPage.clickDigitalID();
//        searchPage.clearSearch();
//        searchPage.enterSearchDetails('scritlytesting@nowhere.com');
//        searchPage.clickSearch();
//        searchPage.clickFirstResult();
//        browser.waitForAngular();
//        digitalIDDetailsPage.clickCardNoLink();
//        cardDetailsViewPage.clickViewLinkedDI();
//        expect(cardDetailsViewPage.getMoreDIsMessage()).toBe("No other linked Digital ID's");
//    });

    it('should navigate to dash board selection page', function () {
        browser.navigate().back(); 
        browser.setLocation('/dashboard');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });

});
