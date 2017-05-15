/**
 * Created by zhouwanli on 14/05/2017.
 */
'use strict';
const blogDao = require('../../dao/blogDao');
const log = require('log4js').getLogger('index controller');
const _ = require('lodash');

var renderHtml = function(path){
    return async (ctx, next) =>{
        ctx.render(path);
        next();
    };
};
var getBlockList = async (ctx, next) =>{
    var currentPage = ctx.params.page || 1;
    log.info(`----> ${currentPage}`);
    var result = await blogDao.getBlockListByPage(currentPage);
    ctx.render('blogs/blog-list.html', {
        blogs: result
    });
    log.debug(result);
    next();
};

module.exports = {
    'GET /blogs/:page/detail.html': renderHtml('blogs/blog-details.html'),
    'GET /blogs/:page/list.html': getBlockList
};