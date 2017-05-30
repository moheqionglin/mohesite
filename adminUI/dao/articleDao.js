/**
 * Created by zhouwanli on 24/05/2017.
 */
'use strict';
var collectionModal = require('../../backend-app/domain/entity/collections');
const log = require('log4js').getLogger("Article dao");
const collectionType = require('../../backend-app/domain/entity/collectionType');
const em = require('../../backend-app/domain/entityManager');
const catalogModal = require('../../backend-app/domain/entity/catalog');

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
var generateParentCatalogNums = function(catalogNum){
    var nums = [];
    while(catalogNum.length >= 5){
        nums.push(catalogNum);
        catalogNum = catalogNum.slice(0, catalogNum.length - 3);
    }
    return nums;
};

var getArticleById = async(id) =>{
    var article = await collectionModal.findOne({where:{
        id: id
    }});
    if(!article){
        return null;
    }
    var article = article.dataValues;
    if(article.collectionType === collectionType.BOOK
        || article.collectionType === collectionType.SERIALIZE){
        var catalogSql = 'select catalogNum, title from catalog where catalogNum in ( :catalogs )';
        var catalogs = await em.query(catalogSql, { replacements: {catalogs: generateParentCatalogNums(article.catalogNum)}, type: em.QueryTypes.SELECT });
        for(var index in catalogs){
            var tmpCatalog = catalogs[index];
            switch (tmpCatalog.catalogNum.length){
                case 5:
                    article.bookName = tmpCatalog.title;
                    break;
                case 8:
                    article.h1Name = tmpCatalog.title;
                    break;
                case 11:
                    article.h2Name = tmpCatalog.title;
                    break;
                case 14:
                    article.h3Name = tmpCatalog.title;
                    break;
            }
        }
    }

    return article;
};

var generateSubCatalog = async (prefix) =>{
    var results = await em.query('select id, title, catalogNum from collections where catalogNum like :catalogNum and  length(catalogNum) = :catalogNumLength order by catalogNum asc',
        { replacements: {catalogNum: prefix + '%', catalogNumLength: prefix.length + 3}, type: em.QueryTypes.SELECT });
    return results;
};
var fixLength = function(value){
    if(('' + value).length > 3){
        throw new Error('catalog num length  > 3');
    }
    return value < 10 ? '00' + value:
        value < 99 ? '0' + value:
            value;
};


var generateCatalogNum = async(catalog) =>{
    if(catalog.collectionType == '01' || catalog.collectionType == '02' ){
        var validCheck = true;
        if(catalog.newBook){
            var results = await generateSubCatalog(catalog.collectionType);
            var lastCatalogNum = results[results.length -1].catalogNum;
            return lastCatalogNum.slice(0, 2) + fixLength(parseInt(lastCatalogNum.slice(2, 5)) + 1)
        }else if(catalog.newH1){
            if(!catalog.bookName){
                return null;
            }
            var results = await generateSubCatalog(catalog.bookName);
            var lastCatalogNum = results[results.length -1].catalogNum;
            return lastCatalogNum.slice(0, 5) + fixLength(parseInt(lastCatalogNum.slice(5, 8)) + 1)
        }else if(catalog.newH2){
            if(!catalog.h1){
                return null;
            }
            var results = await generateSubCatalog(catalog.h1);
            var lastCatalogNum = results[results.length -1].catalogNum;
            return lastCatalogNum.slice(0, 8) + fixLength(parseInt(lastCatalogNum.slice(8, 11)) + 1)
        }else if(catalog.newH3){
            if(!catalog.h2){
                return null;
            }
            var results = await generateSubCatalog(catalog.h2);
            var lastCatalogNum = results[results.length -1].catalogNum;
            return lastCatalogNum.slice(0, 11) + fixLength(parseInt(lastCatalogNum.slice(11, 14)) + 1)
        }
    }
    return null;
};
var createArticle = async(catalog, article) =>{
    try{
        var catalogNum = await generateCatalogNum(catalog);
        log.info(`catalogNum ${catalogNum}`)
        if(!catalogNum && (catalog.collectionType == '01' || catalog.collectionType == '02')) {
            return null;
        }
        article.catalogNum = catalogNum;
        catalog.catalogNum = catalogNum;
        article.status = 1;
        article.createdAt = new Date();
        article.updatedAt = new Date();
        var artle = await collectionModal.create(article);

        if(catalog.collectionType == '01' || catalog.collectionType == '02'){
            await catalogModal.create({
                catalogNum: catalogNum,
                title: article.title,
                introduction: article.introduction,
                displayOrder: 1,
                collectionType: catalog.collectionType,
                articleId: artle.id,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        return true;
    }catch(e){
        log.error(`${e}`);
        return null;
    }


};

var modifyArticle = async(article) =>{
    try{
        article.status = 1;
        article.updatedAt = new Date();
        log.info(`update article ${JSON.stringify(article)}`)
        await collectionModal.update(article, {
            where : {
                id: article.id
            }
        });

        return true;
    }catch(e){
        log.error(`${e}`);
        return null;
    }
};
var deleteArticle = async(id) =>{
    await collectionModal.update({status: 0, updatedAt: new Date()},
        {where:{
            id: id
        }}
    );
};
module.exports = {
    getArticleByIdOrCatalogNum: getArticleByIdOrCatalogNum,
    getArticleById: getArticleById,
    generateSubCatalog: generateSubCatalog,
    createArticle: createArticle,
    modifyArticle: modifyArticle,
    deleteArticle: deleteArticle

};