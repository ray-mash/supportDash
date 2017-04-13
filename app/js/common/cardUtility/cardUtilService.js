'use strict';

var servicesModule = require('./_index_cardUtilService.js');

/**
 * @ngInject
 */
function CardUtilService() {
    var cardLengthEighteen = 18;
    var numLength = 0;
    return {
        cardNumberUtil: function (cardNumber) {
            numLength = cardNumber.length;
            if (cardLengthEighteen === numLength) {
                cardNumber = cardNumber.substring(6, 15);
            }
            return  cardNumber;
        },
        cardNumberExactMatchUtil: function (string, prefix) {
            return string === prefix;
        },
        stringStartsWithUtil: function (string, prefix) {
        return string.indexOf(prefix) === 0;
        }
    };
}

servicesModule.service('CardUtilService', CardUtilService);