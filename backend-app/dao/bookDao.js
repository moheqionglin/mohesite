/**
 * Created by zhouwanli on 17/05/2017.
 */
'use strict';
const collectionModal = require('../domain/entity/collections');
const collectionType = require('../domain/entity/collectionType');
const _ = require('lodash');
const pagiationConf = require('../webConf').pagiation;
const em = require('../domain/entityManager');

var findBooksMetaByPage = async (currentPage) =>{

    var books = await collectionModal.findAndCountAll({
        attributes: ['id', 'title', 'introduction', 'image', 'readCount', 'catalogNum', 'collectionType', 'keyWord', 'createdAt' ],
        where:{
            collectionType: collectionType.BOOK,
            catalogNum: em.where(em.fn('char_length', em.col('catalogNum')), 5)
        },
        limit: pagiationConf.PAGE_SIZE,
        offset: (currentPage - 1) * pagiationConf.PAGE_SIZE
    });
    var result = {
        rows: [],
        currentPage: parseInt(currentPage),
        totalPage: Math.ceil(books.count / pagiationConf.PAGE_SIZE)
    };
    _.each(books.rows, function(book){
        result.rows.push(book.dataValues);
    });
    return result;
};


var getBookDetailByCatalogNum = async(catalogNum) =>{
    var book = await collectionModal.findOne({
        where:{
            catalogNum: catalogNum,
        }
    });
    if(book){
        return book.dataValues;
    }
    return null;

};

module.exports = {
    findBooksMetaByPage: findBooksMetaByPage,
    getBookDetailByCatalogNum: getBookDetailByCatalogNum
};