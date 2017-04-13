var SearchByRTCPage = function(){

	this.baseActions = require('./baseActions.js');
	var helpers = require('./helpers.js');
  var searchByRTCBreadCrumb = element(by.id('searchByRTCBreadCrumb'));
  var searchByStaticDataBtn = element(by.id('staticButton'));
  var searchByRefNumberBtn = element(by.id('referenceNumberButton'));
  var searchByCardNumberBtn = element(by.id('cardNumberButton'));
  var searchByAccNumberBtn = element(by.id('accountNumberButton'));
  var participatingBanksMenu = element(by.id('participatingBanks'));
  var accountStylesMenu = element(by.id('accountStyles'));
  var paymentChargeMenu = element(by.id('paymentCharge'));
  var paymentLimitMenu = element(by.id('paymentLimit'));
  var productAvailabilityMenu = element(by.id('productAvailability'));
  var searchPendingPaymentsMenu = element(by.id('pendingPayments'));
  var searchAuditLogMenu = element(by.id('auditLogButton'));

  this.getSearchRTCBreadCrumb = function(){
      return searchByRTCBreadCrumb.getText();
  };

  this.getSearchByStaticDataBtn = function() {
      return searchByStaticDataBtn.getText();
  };

  this.clickSearchByStaticDataBtn = function(){
      searchByStaticDataBtn.click();
  };

  this.getSearchByRefNumberBtn = function() {
      return searchByRefNumberBtn.getText();
  };

  this.getSearchByCardNumberBtn = function() {
      return searchByCardNumberBtn.getText();
  };

  this.getSearchByAccNumberBtn = function() {
      return searchByAccNumberBtn.getText();
  };

  this.getParticipatingBanksMenu = function() {
      return participatingBanksMenu.getText();
  };

  this.clickParticipatingBanksMenu = function(){
      participatingBanksMenu.click();
  };

  this.getAccountStylesMenu = function() {
      return accountStylesMenu.getText();
  };

  this.clickAccountStylesMenu = function(){
      accountStylesMenu.click();
  };

  this.getPaymentChargeMenu = function() {
      return paymentChargeMenu.getText();
  };

  this.clickPaymentChargeMenu = function(){
      paymentChargeMenu.click();
  };

  this.getPaymentLimitMenu = function() {
      return paymentLimitMenu.getText();
  };

  this.clickPaymentLimitMenu = function(){
      paymentLimitMenu.click();
  };

  this.getProductAvailabilityMenu = function() {
      return productAvailabilityMenu.getText();
  };

  this.clickProductAvailabilityMenu = function(){
      productAvailabilityMenu.click();
  };


  this.getSearchPendingPaymentsMenu = function() {
      return searchPendingPaymentsMenu.getText();
  };

  this.clickSearchPendingPaymentsMenu = function(){
      searchPendingPaymentsMenu.click();
  };

  this.clickSearchAuditLogMenu = function(){
      searchAuditLogMenu.click();
  };

};

module.exports = new SearchByRTCPage();
