/**
 * Created by zhouwanli on 24/05/2017.
 */
'use strict';
var collectionModal = require('../../backend-app/domain/entity/collections');
const log = require('log4js').getLogger("Article dao");

var getArticleByIdOrCatalogNum = async(keyword) =>{

    var article = await collectionModal.findOne({
        attributes: ['id', 'title', 'catalogNum' ],
        where:{
            $or:[{id: keyword}, {catalogNum: keyword}]
        }
    });
    if(!article){
        return null;
    }
    return article.dataValues;
};

var getArticleById = async(id) =>{
    var article = await collectionModal.findOne({where:{
        id: id
    }});
    if(!article){
        return null;
    }
    return article.dataValues;
};
module.exports = {
    getArticleByIdOrCatalogNum: getArticleByIdOrCatalogNum,
    getArticleById: getArticleById
};