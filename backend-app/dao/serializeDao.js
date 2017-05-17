/**
 * Created by zhouwanli on 17/05/2017.
 */
'use strict';
const collectionModal = require('../domain/entity/collections');
const collectionType = require('../domain/entity/collectionType');
const _ = require('lodash');
const pagiationConf = require('../webConf').pagiation;


var findSerializeMetaByPage = async (currentPage) =>{

    var serializes = await collectionModal.findAndCountAll({
        attributes: ['id', 'title', 'introduction', 'image', 'readCount', 'collectionType', 'keyWord', 'createdAt' ],
        where:{
            collectionType: collectionType.SERIALIZE,
            parentId: -1
        },
        limit: pagiationConf.PAGE_SIZE,
        offset: (currentPage - 1) * pagiationConf.PAGE_SIZE
    });
    var result = {
        rows: [],
        currentPage: parseInt(currentPage),
        totalPage: Math.ceil(serializes.count / pagiationConf.PAGE_SIZE)
    };
    _.each(serializes.rows, function(serialize){
        result.rows.push(serialize.dataValues);
    });
    return result;
};


module.exports = {
    findSerializeMetaByPage: findSerializeMetaByPage
};