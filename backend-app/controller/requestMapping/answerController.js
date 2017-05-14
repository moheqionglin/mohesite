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
    'GET /answer/question-answer-block-list.html': renderHtml('answer/question-answer-block-list.html'),
    'GET /answer/question-answer-detail.html': renderHtml('answer/question-answer-detail.html'),
    'GET /answer/question-answer-list.html': renderHtml('answer/question-answer-list.html'),
    'GET /answer/question-answer-new-q.html': renderHtml('answer/question-answer-new-q.html'),
};