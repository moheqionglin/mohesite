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
    'GET /footer/about.html': renderHtml('footer/about.html'),
    'GET /footer/contact.html': renderHtml('footer/contact.html'),
    'GET /footer/sponsor.html': renderHtml('footer/sponsor.html'),
};