describe('ACCEPTANCE: digitalIDDetailsAcceptance', function () {
    'use strict';
    var loginPage = require('./../../pages/loginPage.js');
    var searchPage = require('./../../pages/searchPage.js');
    var digitalIDDetailsPage = require('./../../pages/digitalIDDetailsPage.js');
    var dashboardPage = require('./../../pages/dashboardPage');
    var cardDetailsViewPage = require('./../../pages/cardDetailsViewPage');
    var confirmationModalPage = require('./../../pages/confirmationModalPage');
    var navBar = require('./../../pages/navBar.js');
    var removeEntryModalPage = require('./../../pages/removeEntryModalPage');

    describe("digitalId", function () {

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

        it('should display the digitalID selected on the search page', function () {
            expect(digitalIDDetailsPage.getDigitalID()).toEqual("Details for: searchbydi@e2e.com");
            expect(digitalIDDetailsPage.getBreadCrumb()).toEqual("Search Selection View Digital ID Details");
        });

        it('should save the search results', function () {
            browser.navigate().back();
            expect(searchPage.returnFirstResult()).toBe("searchbydi@e2e.com");
        });

        it('should display the deactivate button and hide the activate button', function () {
            searchPage.clickFirstResult();
            browser.waitForAngular();
            expect(digitalIDDetailsPage.getDeactivateBtn.getAttribute('value')).toEqual("Deactivate");
            expect(digitalIDDetailsPage.getActivateBtn.getAttribute('value')).toEqual("Activate");
            expect(digitalIDDetailsPage.activateBtnDisplayed()).toBeFalsy();
            expect(digitalIDDetailsPage.deactivateBtnDisplayed()).toBeTruthy();
        });


        it('should provide the user with a confirmation when trying to deactivate an active account', function () {
            digitalIDDetailsPage.clickDeactivateBtn();
            browser.waitForAngular();
            expect(confirmationModalPage.getCancelButton).toBeTruthy();
            expect(confirmationModalPage.getConfirmButton).toBeTruthy();
            confirmationModalPage.clickCancelButton();
        });
        it('should deactivate the digitalID', function () {
            digitalIDDetailsPage.clickDeactivateBtn();
            browser.waitForAngular();
            confirmationModalPage.clickConfirmButton();
            expect(digitalIDDetailsPage.getDigitalID()).toEqual("Details for: searchbydi@e2e.com");
            expect(digitalIDDetailsPage.getIDStatus()).toEqual("Inactive");
        });

        it('should activate the digitalID', function () {
            digitalIDDetailsPage.clickActivateBtn();
            browser.waitForAngular();
            confirmationModalPage.clickConfirmButton();
            expect(digitalIDDetailsPage.getDigitalID()).toEqual("Details for: searchbydi@e2e.com");
            expect(digitalIDDetailsPage.getIDStatus()).toEqual("Active");
        });

        it('should display the Enabled button and hide the disable button', function () {
            browser.waitForAngular();
            expect(digitalIDDetailsPage.getEnableBtn.getAttribute('value')).toEqual("Enable");
            expect(digitalIDDetailsPage.getDisableBtn.getAttribute('value')).toEqual("Disable");
            expect(digitalIDDetailsPage.enableBtnDisplayed()).toBeFalsy();
            expect(digitalIDDetailsPage.disableBtnDisplayed()).toBeTruthy();
        });
        it('should provide the user with a confirmation when trying to enable a disabled account', function () {
            digitalIDDetailsPage.clickDisableBtn();
            browser.waitForAngular();
            expect(confirmationModalPage.getCancelButton).toBeTruthy();
            expect(confirmationModalPage.getConfirmButton).toBeTruthy();
            confirmationModalPage.clickCancelButton();
        });

        it('should disable the digitalID', function () {
            digitalIDDetailsPage.clickDisableBtn();
            browser.waitForAngular();
            confirmationModalPage.clickConfirmButton();
            expect(digitalIDDetailsPage.getDigitalID()).toEqual("Details for: searchbydi@e2e.com");
            expect(digitalIDDetailsPage.getDisabledStatus()).toEqual("Disabled");
        });

        it('should enable the digitalID', function () {
            digitalIDDetailsPage.clickEnableBtn();
            browser.waitForAngular();
            confirmationModalPage.clickConfirmButton();
            expect(digitalIDDetailsPage.getDigitalID()).toEqual("Details for: searchbydi@e2e.com");
            expect(digitalIDDetailsPage.getDisabledStatus()).toEqual("Enabled");
        });
    });

    describe("linked products", function () {

        it('should display linked BANKING system principals', function () {
            browser.waitForAngular();
            expect(digitalIDDetailsPage.getProfileTypeText()).toBe("PERSONAL");
            expect(digitalIDDetailsPage.getSystemTypeText()).toBe("BANKING");
            expect(digitalIDDetailsPage.getUniqueIdentifier()).toBe("225511446");
            expect(digitalIDDetailsPage.getDeLinkCardButton()).toBe("De-Link");
        });
        it('should display the card details on a new page when clicking on the card', function () {
            digitalIDDetailsPage.clickCardNoLink();
            browser.waitForAngular();
            expect(browser.getLocationAbsUrl()).toMatch('/selectedBankingDetailsView');
            expect(cardDetailsViewPage.getUserName()).toBe("Selected Card details for: searchbydi@e2e.com");
            expect(cardDetailsViewPage.getCardNo()).toBe("225511446");
            browser.navigate().back();
        });

        it('should give the user the option to select to de-link a card from the DigitalID', function () {
            digitalIDDetailsPage.clickDeLinkCardButton();
            browser.waitForAngular();
            expect(removeEntryModalPage.getRemoveEntryHeading()).toEqual("Remove Principal");
            expect(removeEntryModalPage.getRemoveCardStatement()).toContain("Are you sure you want to remove the profile BANKING with ID");
            expect(removeEntryModalPage.removeEntryConfirmBtnEnabled()).toBeTruthy();
            expect(removeEntryModalPage.removeEntryNoBtnEnabled()).toBeTruthy();
            expect(removeEntryModalPage.removeEntryYesBtnEnabled()).toBeTruthy();
            expect(removeEntryModalPage.getRemoveEntryNoBtn()).toEqual("No");
            expect(removeEntryModalPage.getRemoveEntryYesBtn()).toEqual("Yes");
            expect(removeEntryModalPage.displayRemoveEntryNoBtn()).toBeTruthy();
            expect(removeEntryModalPage.displayRemoveEntryYesBtn()).toBeTruthy();
            expect(removeEntryModalPage.displayRemoveEntryConfirmBtn()).toBeFalsy();
            removeEntryModalPage.clickRemoveEntryNoBtn();
            expect(digitalIDDetailsPage.getUniqueIdentifier()).toBe("225511446")
        });

//    it('should remove a card and show a message that there are no linked systems', function() {
//        digitalIDDetailsPage.clickDeLinkCardButton();
//        browser.waitForAngular();
//        removeEntryModalPage.clickRemoveEntryYesBtn();
//        removeEntryModalPage.clickRemoveEntryConfirmBtn();
//        expect(digitalIDDetailsPage.getNoSystemPrincipalText()).toEqual("No Linked Products Found");
//    });

//    it('should remove a card and leave the cards that are left', function() {
//        removeEntryModalPage.clickRemoveEntryConfirmBtn();
//        expect(digitalIDDetailsPage.getUniqueIdentifier()).toBe("**99887**");
//    });
//
    });

    describe("devices", function () {

        it('should display linked devices', function () {
            expect(digitalIDDetailsPage.getDeviceName()).toBe("MyMacForDi");
            expect(digitalIDDetailsPage.getDeviceID()).toBe("device1cc");
            expect(digitalIDDetailsPage.getRemoveDeviceBtn()).toBe("Remove");
//            expect(digitalIDDetailsPage.removeDeviceBtnEnabled()).toBeTruthy();
        });

        it('should prompt the user to confirm the removal of a device', function () {
            digitalIDDetailsPage.clickRemoveDeviceButton();
            browser.waitForAngular();
            removeEntryModalPage.clickRemoveEntryYesBtn();
            expect(removeEntryModalPage.getRemoveEntryHeading()).toBe("Remove Device");
            expect(removeEntryModalPage.getRemoveDeviceNotification()).toBe("Device: device1cc will be removed.");
            expect(removeEntryModalPage.removeEntryConfirmBtnEnabled()).toBeTruthy();
            expect(removeEntryModalPage.removeEntryNoBtnEnabled()).toBeTruthy();
            expect(removeEntryModalPage.displayRemoveEntryConfirmBtn()).toBeTruthy();
            expect(removeEntryModalPage.displayRemoveEntryYesBtn()).toBeFalsy();
            expect(removeEntryModalPage.displayRemoveEntryNoBtn()).toBeTruthy();
            expect(removeEntryModalPage.getRemoveEntryNoBtn()).toBe("No");
            expect(removeEntryModalPage.getRemoveEntryConfirmBtn()).toBe("Confirm");
            removeEntryModalPage.clickRemoveEntryNoBtn();
        });

//    it('should make no changes if the user selects the No option after selecting to remove a device', function(){
//        removeEntryModalPage.clickRemoveEntryNoBtn();
//        expect(digitalIDDetailsPage.getDeviceID()).toBe("device1cc");
//    });
//    it('should remove a device', function(){
//        removeEntryModalPage.clickRemoveEntryConfirmBtn();
//        expect(digitalIDDetailsPage.getNoDevicesFound()).toEqual("No Linked Devices Found");
//    });

    });

//    it('should log out from the search page when user selects the logout option', function(){
//        navBar.clickLogOut();
//        expect(browser.getLocationAbsUrl()).toMatch('/login');
//    });

    it('should navigate to dash board selection page', function () {
        browser.navigate().back();
        browser.setLocation('/dashboard');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });

});
