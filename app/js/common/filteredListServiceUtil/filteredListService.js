//'use strict';
//
//var servicesModule = require('./_index_filteredListService.js');
//var lodash = require('lodash');
//
///**
//* @ngInject
//*/
//function FilteredListService() {
//
//    return {
//        getFiltered: function (list, searchItem) {
//            console.log(JSON.stringify(searchItem, null, 2));
//            console.log(JSON.stringify(searchItem.code, null, 2));
//            if (searchItem === ''){
//                return list;
//            }
//            var filtered = [];
//                        console.log(searchItem.toString().toLowerCase()+'< Ray '+JSON.stringify(list, null, 2));
//
//            lodash.forEach(list, function (item) {
//                if (item.toString().toLowerCase().indexOf(searchItem.toString().toLowerCase()) > -1)
//                {
//                    console.log(JSON.stringify(item, null, 2));
//
//                    filtered.push(item);
//                }else{
//                    console.log(searchItem.toString().toLowerCase()+'< else > '+JSON.stringify(item.description.toString().toLowerCase(), null, 2));
//                }
//            });
//            return filtered;
//        }
//    };
//}
//
//servicesModule.service('FilteredListService', FilteredListService);