'use strict';

var servicesModule = require('./_index_maskedCardNumberFilter.js');

/**
 * @ngInject
 */

servicesModule.filter('maskedCardNumberFilter', function (ApplicationCacheFactory) {
    return function (input) {
        var access = ApplicationCacheFactory.get('accessRights');
        if (access === 'ROLE_READONLY_USER') {
            if (!!input) {
                if (input.length === 9) {
                    input = "**" + input.substr(2, 5) + "**";
                }
                else {
                    input = input.substr(0, 6) + "******" + input.substr(input.length - 4, input.length);
                }
            }
        }
        return input;
    };
});