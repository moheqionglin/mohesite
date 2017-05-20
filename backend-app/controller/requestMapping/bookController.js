/**
 * Created by zhouwanli on 14/05/2017.
 */
'use strict';
const bookDao = require('../../dao/bookDao');
const log = require('log4js').getLogger('Book controller');
const catalogDao = require('../../dao/catalogDao');
const selfMarked = require('../../utils/selfMarked');
const commentDao = require('../../dao/commentDao');

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
var getBookDetailByCatalogNum = async(ctx, next) =>{
    if(!ctx.params.catalogNum){
        ctx.body = "404 NOT FOUND!";
        ctx.status = 404;
        return ;
    }
    var catalogNum = ctx.params.catalogNum;
    log.debug(`Get book detail for catalogNum : ${catalogNum}`);

    var catalog = await catalogDao.getCatalogByCatalogNum(catalogNum);
    if(!catalog){
        ctx.body = "404 NOT FOUND!";
        ctx.status = 404;
        return ;
    }

    var book = await bookDao.getBookDetailByCatalogNum(catalogNum);
    if(!book){
        ctx.body = "404 NOT FOUND!";
        ctx.status = 404;
        return ;
    }
    var blogTopicCount = await commentDao.getTopicCountByCollectionId(book.id);
    book.content = selfMarked.marked(book.content, {renderer: selfMarked.render});
    book.topicCount = blogTopicCount;
    ctx.render('books/book-detail.html', {
            catalog: catalog,
            article: book,
            activeCatalogNum: catalogNum
    });
    next();


};
module.exports = {
    'GET /books/:catalogNum/detail.html': getBookDetailByCatalogNum,
    'GET /books/:page/list.html': findBooksMetaByPage
};
