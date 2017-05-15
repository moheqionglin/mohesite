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
    'GET /answer/:id/division.html': renderHtml('answer/question-answer-block-list.html'),
    'GET /answer/:id/detail.html': renderHtml('answer/question-answer-detail.html'),
    'GET /answer/:id/list.html': renderHtml('answer/question-answer-list.html'),
    'GET /answer/:id/new': renderHtml('answer/question-answer-new-q.html'),
};