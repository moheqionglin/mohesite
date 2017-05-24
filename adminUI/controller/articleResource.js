/**
 * Created by zhouwanli on 24/05/2017.
 */
'use strict';
var articleDao = require('../dao/articleDao');
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
module.exports = {
    'GET /article/search/:keyword': getArticleMetaByIdOrCatalogNum,
    'GET /article/:id': getArticleById
};