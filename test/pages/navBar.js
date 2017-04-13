var NavBar = function(){

	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
    
    var breadCrum = element(by.id('breadCrumz'));
    var logout = element(by.id('logout'));

/*this.load = function () {
		browser.get(browser.searchUrl);
		browser.waitForAngular();
	}; */

    this.clickLogOut = function() {
        helpers.scrollThenClick(logout);
    };

    this.getLoginLink = function() {
        return logout.getText();
    };

    this.digitalIDNav = function(){
        return navDigitalIDs.getText();
    };

    this.selectSearchByDigIDNav = function(){
       return searchDID.getText();
    };

    this.selectDIDFrmNav = function(){
        element(by.id('navOption')).click();
        element(by.id('clkDID')).click();
    };

    this.activateStatus = function(type){
        return element(by.cssContainingText('.selectpicker > option', type));
    };

    this.activateComboBox = function(){
        this.activateStatus('Activate').click();
    }; 
};

module.exports = new NavBar(); 