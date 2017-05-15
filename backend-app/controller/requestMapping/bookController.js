/**
 * Created by zhouwanli on 14/05/2017.
 */
'use strict';
var renderHtml = function(path){
    return async (ctx, next) =>{
        ctx.render(path);
        next();
    };
};
module.exports = {
    'GET /books/:id/detail.html': renderHtml('books/book-detail.html'),
    'GET /books/:id/list.html': renderHtml('books/book-grid.html')
};
