/**
 * Created by zhouwanli on 14/05/2017.
 */
'use strict';
const log = require('log4js').getLogger('Book controller');
const serializeDao = require('../../dao/serializeDao');

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

module.exports = {
    'GET /serialize/:page/detail.html': renderHtml('serialize/serialize-detail.html'),
    'GET /serialize/:page/list.html': findSerializesMetaByPage
};