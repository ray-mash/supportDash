//'use strict';
//describe('Filtered service', function () {
//
//    var accountStyles = [
//        {id: 1, version: 0, code: "ACH", type: "000", description: "ELITE"},
//        {id: 14, version: 0, code: "A60", type: "001", description: "CONSOLIDATOR LINKED"}
//    ];
//    var filterUtil;
//
//    beforeEach(module('app.common.filteredListServiceUtil.filteredListService'));
//
//    beforeEach(inject(function (FilteredListService) {
//        filterUtil = FilteredListService;
//    }));
//
//    describe('filter the list to get searched query', function () {
//        it('should filter the list to return the empty array ', function () {
//            expect(filterUtil).toBeDefined();
//            expect(filterUtil.getFiltered).toBeDefined();
//            expect(filterUtil.getFiltered(accountStyles, '')).toEqual(accountStyles);
//        });
//        it('should filter the list to return the query ', function () {
//            expect(filterUtil).toBeDefined();
//            var searchItem = "ELITE";
//            expect(filterUtil.getFiltered).toBeDefined();
////            console.log(JSON.stringify(accountStyles, null, 2));
//            expect(filterUtil.getFiltered(accountStyles,searchItem )).toEqual([]);
//        });
//    });
//});
