/**
 * Created by zhouwanli on 14/05/2017.
 */
'use strict';
const log = require('log4js').getLogger('Serialize controller');
const serializeDao = require('../../dao/serializeDao');
const catalogDao = require('../../dao/catalogDao');
const bookDao = require('../../dao/bookDao');
const selfMarked = require('../../utils/selfMarked');
const commentDao = require('../../dao/commentDao');

var renderHtml = function(path){
    return async (ctx, next) =>{
        ctx.render(path);
        next();
    };
};

var findSerializesMetaByPage = async (ctx, next) =>{
    var currentPage = ctx.params.page || 1;
    log.debug(`Get Serializes page : ${currentPage}`);
    var serializes = await serializeDao.findSerializeMetaByPage(currentPage);
    ctx.render('serialize/serialize-grid.html', {
        serializes: serializes
    });
    next();

};
var getSerializeDetailByCatalogNum = async(ctx, next) =>{
    if(!ctx.params.catalogNum){
        ctx.body = "404 NOT FOUND!";
        ctx.status = 404;
        return ;
    }
    var catalogNum = ctx.params.catalogNum;
    log.debug(`Get Serialize detail for catalogNum : ${catalogNum}`);

    var catalog = await catalogDao.getCatalogByCatalogNum(catalogNum);
    if(!catalog){
        ctx.body = "404 NOT FOUND!";
        ctx.status = 404;
        return ;
    }

    var serialize = await bookDao.getBookDetailByCatalogNum(catalogNum);
    if(!serialize){
        ctx.body = "404 NOT FOUND!";
        ctx.status = 404;
        return ;
    }
    var topicCount = await commentDao.getTopicCountByCollectionId(serialize.id);
    serialize.content = selfMarked.marked(serialize.content, {renderer: selfMarked.render});
    serialize.topicCount = topicCount;
    ctx.render('serialize/serialize-detail.html', {
        catalog: catalog,
        article: serialize,
        activeCatalogNum: catalogNum
    });
    next();


};
module.exports = {
    'GET /serialize/:catalogNum/detail.html': getSerializeDetailByCatalogNum,
    'GET /serialize/:page/list.html': findSerializesMetaByPage
};