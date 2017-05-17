/**
 * Created by zhouwanli on 14/05/2017.
 */
'use strict';
const bookDao = require('../../dao/bookDao');
const log = require('log4js').getLogger('Book controller');

var renderHtml = function(path){
    return async (ctx, next) =>{
        ctx.render(path);
        next();
    };
};

var findBooksMetaByPage = async (ctx, next) =>{
    var currentPage = ctx.params.page || 1;
    log.debug(`Get Blog page : ${currentPage}`);
    var books = await bookDao.findBooksMetaByPage(currentPage);
    ctx.render('books/book-grid.html', {
        books: books
    });
    next();
    
};
module.exports = {
    'GET /books/:page/detail.html': renderHtml('books/book-detail.html'),
    'GET /books/:page/list.html': findBooksMetaByPage
};
