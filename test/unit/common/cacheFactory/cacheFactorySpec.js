'use strict';
describe('Cache Factory', function () {

    var applicationCacheFactory;

    describe('is toggled off', function () {
        beforeEach(module('app.common.cacheFactory.applicationCacheFactory'));


        beforeEach(inject(function (_$httpBackend_, ApplicationCacheFactory) {
            applicationCacheFactory = ApplicationCacheFactory;
        }));

        describe('store data ', function () {
            it('should cache data ', function () {
                var cache = applicationCacheFactory.put('cacheId');
                expect(applicationCacheFactory.get('cacheId')).toBe(cache);
                expect(applicationCacheFactory.get('noSuchCacheId')).not.toBeDefined();
                applicationCacheFactory.put("key", "value");
                applicationCacheFactory.put("another key", "another value");
                expect(applicationCacheFactory.info()).toEqual({id: 'applicationCache', size: 2});
                applicationCacheFactory.remove("key");
                expect(applicationCacheFactory.info()).toEqual({id: 'applicationCache', size: 1});
                applicationCacheFactory.removeAll("key");
                expect(applicationCacheFactory.info()).toEqual({id: 'applicationCache', size: 0});
            });
        });
    });
});
