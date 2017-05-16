/**
 * Created by zhouwanli on 15/05/2017.
 */
'use strict';
const collectionModal = require('../domain/entity/collections');
const collectionType = require('../domain/entity/collectionType');
const _ = require('lodash');
const log = require('log4js').getLogger('index controller');

var findTop10CollectionMetaData = async function(){
    var collections = await collectionModal.findAll({
        attributes: ['id', 'title', 'introduction', 'image', 'readCount', 'collectionType', 'keyWord', 'createdAt' ],
        order:'readCount desc, id desc',
        limit:10
    });
    var result = [];
    _.each(collections, function(collection){
       result.push(collection.dataValues) ;
    });
    return result;
};

module.exports={
    findTop10CollectionMetaData: findTop10CollectionMetaData
};