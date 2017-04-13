"use strict";

var servicesModule = require('./_index_errorMessagesFactory.js');

/**
 * @ngInject
 */
function errorMessagesFactory() {
    return {
        roleId1: 'Capturer',
        loginSuccess: 'Invalid Login User Name or Password',
        loginFailed: 'Incorrect login please try again',
        logoutSuccess: 'Authentication logout Success',
        sessionTimeout: 'Authentication session Timeout',
        notAuthenticated: 'Authentication not Authenticated',
        notAuthorized: 'Authentication not Authorized',
        updateFailed: 'Failed to update details, Please try again later',
        error502: 'A communication error has occurred',
        error1102: 'The System Principal with id '
    };
}

servicesModule.factory('errorMessagesFactory', errorMessagesFactory);
