var ListEntitlementsDetailsPage = function() {

    this.baseActions = require('./baseActions.js');
    var helpers = require('./helpers.js');

    var digitalID = element(by.id('digitalId'));

    this.getDigitalID = function(){
        return digitalID.getText();
    };

};
module.exports = new ListEntitlementsDetailsPage();