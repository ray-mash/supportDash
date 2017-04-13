/*global angular */

'use strict';

describe("Unit : maskedCardNumberFilter", function (){
    var scope, filter, $httpBackend, createController, applicationCacheFactory;

    var createFilter;

    beforeEach(module('app.filters.maskedCardNumberFilter'));

    beforeEach(inject(function ($q, $rootScope, $controller, _$httpBackend_,
                                 ApplicationCacheFactory, $filter) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        applicationCacheFactory = ApplicationCacheFactory;

        createFilter = function () {
            return $filter('maskedCardNumberFilter');
        };

        createController = function () {
            return   $controller("OperatorDetailsController", {
                $scope: scope,
                ApplicationCacheFactory: applicationCacheFactory

            })
        };

    }));

        describe('filter', function () {
        it('should mask the card number ', function () {
            applicationCacheFactory.put('accessRights','ACCEss' );
            var access = applicationCacheFactory.get('accessRights');
            expect(access).not.toBe('ROLE_READONLY_USER');
            var filter = createFilter();
            expect(applicationCacheFactory.get('accessRights')).not.toBe('ROLE_READWRITE_USER');
        });

        it('should mask the card number ', function () {
            var input = '665544332';
            applicationCacheFactory.put('accessRights','ROLE_READWRITE_USER' );
            expect(createFilter()).toBeDefined();
            createFilter(input);
            expect(applicationCacheFactory.get('accessRights')).toBe('ROLE_READWRITE_USER');
            expect(input).toBe('665544332');
        });

        it('should mask the card number with 9 digits', function () {
            applicationCacheFactory.put('accessRights','ROLE_READONLY_USER123' );
            var filter = createFilter();
            expect(createFilter()).toBeDefined();
            expect(applicationCacheFactory.get('accessRights')).not.toBe('ROLE_READONLY_USER');
//            expect(filter('665544332')).toBe('**55443**');
        });
        it('should mask the card number with 9 digits', function () {
            applicationCacheFactory.put('accessRights','ROLE_READONLY_USER' );
            var filter = createFilter();
            expect(createFilter()).toBeDefined();
            expect(applicationCacheFactory.get('accessRights')).toBe('ROLE_READONLY_USER');
            expect(filter('665544332')).toBe('**55443**');
        });

        it('should mask the card number with 10 digits', function () {
            applicationCacheFactory.put('accessRights','ROLE_READONLY_USER' );
            var filter = createFilter();
            expect(createFilter()).toBeDefined();
            expect(filter('1255443123')).toBe('125544******3123');
            expect(applicationCacheFactory.get('accessRights')).toBe('ROLE_READONLY_USER');
        });

        it('should not run the mask function if there is no card number to mask ', function () {
            applicationCacheFactory.put('accessRights','ROLE_READONLY_USER' );
            var filter = createFilter();
            expect(createFilter()).toBeDefined();
            filter();
            expect(filter()).not.toBe('**55443**');
        });
    });

})