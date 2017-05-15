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
    'GET /serilaze/:id/detail.html': renderHtml('serilaze/serilaze-detail.html'),
    'GET /serilaze/:id/list.html': renderHtml('serilaze/serilaze-grid.html')
};