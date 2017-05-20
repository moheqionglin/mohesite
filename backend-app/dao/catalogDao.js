/**
 * Created by zhouwanli on 20/05/2017.
 */
'use strict';
const catalogModal = require('../domain/entity/catalog');
const _ = require('lodash');
const log = require('log4js').getLogger('index controller');

var getCatalogByCatalogNum = async(catalogNum) =>{
    try{
        /*
         * h1Lists: {01001: {...}, 01002:{...}}
         * h2Lists: {01001:[{},{}]}
         * h3Lists:{01001001:[{},{}]}
         *
         **/
        var catalogResult = {
            title : '',
            catalogNum: '',
            h1Lists : {},
            h2Lists : {},
            h3Lists : {}
        };
        var topCatalogNUm = catalogNum.slice(0, 5);
        var catalogRaw = await catalogModal.findAll({
            attributes: ['catalogNum', 'title', 'displayOrder', 'collectionType'],
            where: {
                catalogNum:{
                    $like: topCatalogNUm + '%'
                }
            },
            order: 'catalogNum asc'
        });

        var catalogLists = [];
        _.each(catalogRaw, function(c){
            catalogLists.push(c.dataValues);
        })

        for(var index = 0 ; index < catalogLists.length; index++){
            var cur = catalogLists[index];
            if(cur.catalogNum.length === 5){
                catalogResult.title = cur.title;
                catalogResult.catalogNum = cur.catalogNum;
            }else if(cur.catalogNum.length === 8){//一级目录
                catalogResult.h1Lists[cur.catalogNum] = cur;
            }else if(cur.catalogNum.length === 11){//二级目录
                var parentCn = cur.catalogNum.slice(0, 8);
                if(!catalogResult.h2Lists[parentCn]){
                    catalogResult.h2Lists[parentCn] = [];
                }
                catalogResult.h2Lists[parentCn].push(cur);
            }else if(cur.catalogNum.length === 14){//三级目录
                var parentCn = cur.catalogNum.slice(0, 11);
                if(!catalogResult.h3Lists[parentCn]){
                    catalogResult.h3Lists[parentCn] = [];
                }
                catalogResult.h3Lists[parentCn].push(cur);
            }
        }
        //sort 一级目录
        var sortedH1s = _.sortBy(catalogResult.h1Lists, function(h1){ return h1.displayOrder });
        catalogResult.h1Lists = {};
        _.each(sortedH1s, function(h1){
            catalogResult.h1Lists[h1.catalogNum] = h1;
        });
        //sort 二级目录
        catalogResult.h2Lists = _.each(catalogResult.h2Lists, function(h2s){
           h2s = _.sortBy(h2s, 'displayOrder');
       })
        //sort 三级目录
        catalogResult.h3Lists = _.each(catalogResult.h3Lists, function(h3s){
            h3s = _.sortBy(h3s, 'displayOrder');
        })
        return catalogResult;
    }catch(e){
        log.error(`Get catalog error for ${catalogNum}, ${e}`);
        return null;
    }

};

module.exports = {
    getCatalogByCatalogNum: getCatalogByCatalogNum
};
