/**
 * Created by zhouwanli on 24/05/2017.
 */
'use strict';
const articleDao = require('../dao/articleDao');
const log = require('log4js').getLogger("Article resource");

var getArticleMetaByIdOrCatalogNum = async(ctx, next) => {
    var keyword = ctx.params.keyword;
    log.info(`Search article by ${keyword}`);
    var articleMeta = await articleDao.getArticleByIdOrCatalogNum(keyword);
    if(!articleMeta){
        ctx.status = 404;
        return;
    }
    ctx.response.body = articleMeta;
    next();
};

var getArticleById = async(ctx, next) =>{
    var id = ctx.params.id;
    log.info(`Get article by ${id}`);
    var article = await articleDao.getArticleById(id);
    if(!article){
        ctx.status = 404;
        return;
    }
    ctx.response.body = article;
    next();
};

var generateSubCatalog = async (ctx, next) =>{
    var catalogNum = ctx.params.catalogNum;
    log.info(`Get All Book Or Serialize by ${catalogNum}`);
    if(!catalogNum){
        ctx.status = 404;
        return;
    }
    var allBookOrSer = await articleDao.generateSubCatalog(catalogNum);
    if(!allBookOrSer){
        ctx.status = 404;
        return;
    }
    ctx.response.body = allBookOrSer;
    next();

};

var createArticle = async(ctx, next) =>{

    var catalog = ctx.request.body.catalog;
    var article = ctx.request.body.article;
    log.info(`Create article ${JSON.stringify(catalog)} \n ${JSON.stringify(article)}`);

    var result = await articleDao.createArticle(catalog, article);
    if(!result){
        ctx.status = 500;
        return;
    }
    ctx.status = 200;
    next();
};

var modifyArticle = async(ctx, next) =>{
    var article = ctx.request.body.article;
    log.info(`Modify article   ${JSON.stringify(article)}`);
    var result = await articleDao.modifyArticle(article);
    if(!result){
        ctx.status = 500;
        return;
    }
    ctx.status = 200;
    next();
};

var deleteArticle = async(ctx, next) =>{
    var id = ctx.params.id;
    log.info(`Delete article ${id}`);

    if(!id){
        ctx.status = 404;
        return;
    }
    var result = await articleDao.deleteArticle(id);
    ctx.status = 200;
    next();

};

module.exports = {
    'GET /article/search/:keyword': getArticleMetaByIdOrCatalogNum,
    'GET /article/:id': getArticleById,
    'GET /article/generateSubCatalog/:catalogNum': generateSubCatalog,
    'POST /article/create': createArticle,
    'POST /article/modify': modifyArticle,
    'GET /article/delete/:id': deleteArticle
};