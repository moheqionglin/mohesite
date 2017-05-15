/**
 * Created by zhouwanli on 15/05/2017.
 */
'use strict';
const collectionDao = require('../../../backend-app/dao/collectionDao');
const _ = require('lodash');
var findTop10CollectionMetaDataTest = async () =>{
    var collecations = await collectionDao.findTop10CollectionMetaData();
    _.each(collecations , function(collection){
        var date = new Date(collection.createdAt);
        console.log();
    });
    console.log(collecations);
};
findTop10CollectionMetaDataTest();
