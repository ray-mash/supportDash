'use strict';
describe('configuration', function () {

    var serviceEndpoint, $httpBackend, rootScope;

    describe('is toggled off', function () {
        beforeEach(module('app.common.configuration.ServiceEndPoint'));

        beforeEach(inject(function (_$httpBackend_, ServiceEndPoint, $rootScope) {
            $httpBackend = _$httpBackend_;
            rootScope = $rootScope;
            serviceEndpoint = ServiceEndPoint;
        }));

        describe('makeRequest', function () {
            it('should make a call to the service ', function (done) {
                $httpBackend.expectGET(serviceEndpoint.listDigitalIds.url).respond(200, { response: true });
                serviceEndpoint.listDigitalIds.makeRequest().then(function (value) {
                    expect(rootScope).toBeDefined();
                    done();
                });
                $httpBackend.flush();
            });

            // it('should add an error to the root scope on a 500 service error', inject(function ($rootScope) {
            //     $httpBackend.expectGET(serviceEndpoint.listDigitalIds.url).respond(500, { error: true });
            //     serviceEndpoint.listDigitalIds.makeRequest();
            //     expect($rootScope).toBeDefined();
            //     $httpBackend.flush();
            // }));
        });

        it('should configure authorization endpoint to ', function () {
            expect(serviceEndpoint.listDigitalIds.url).toEqual('/di/services/v1/digital-id');
//            expect(serviceEndpoint.userAuthentication.url).toEqual('di/services/v1/health/roles');
        });
    });
});
