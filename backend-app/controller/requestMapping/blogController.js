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
    'GET /blogs/blog-details.html': renderHtml('blogs/blog-details.html'),
    'GET /blogs/blog-list.html': renderHtml('blogs/blog-list.html')
};