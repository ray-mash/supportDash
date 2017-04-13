'use strict';
describe('card utility', function () {

    var ostDisplayName = 'myOST_Sui';
    var ostDisplayName2 = 'myOST_Sui1';
    var cardNumber = '123456789';
    var cardNumberSixteenDigits = '6688775544007722';
    var cardNumberEighteenDigits = '123456789087654321';
    var cardUtil;

        beforeEach(module('app.common.cardUtility.cardUtilService'));

        beforeEach(inject(function (CardUtilService) {
            cardUtil = CardUtilService;
        }));

        describe('strip card', function () {
            it('should trim card number according to business rules ', function () {
                expect(cardUtil).toBeDefined();
                expect(cardUtil.cardNumberUtil(cardNumberEighteenDigits)).toBe('789087654');
                expect(cardUtil.cardNumberUtil(cardNumberSixteenDigits)).toBe('6688775544007722');
            });
        });
        describe('exact match', function () {
            it('should return the exact matching card number ', function () {
                var matching = '123456789';
                expect(cardUtil.cardNumberExactMatchUtil(cardNumber, matching)).toBe(true);
            });
        });
        describe('match suffix', function () {
            it('should match the suffix and return only name starting with given suffix ', function () {
                var suffix = 'myOST';
                expect(cardUtil.stringStartsWithUtil(ostDisplayName, suffix)).toBe(true);
                expect(cardUtil.stringStartsWithUtil(ostDisplayName2, suffix)).toBe(true);
            });
        });

});
