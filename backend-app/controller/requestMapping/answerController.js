/**
 * Created by zhouwanli on 14/05/2017.
 */
'use strict';
const answerDao = require('../../dao/answerDao');
const log = require('log4js').getLogger('index controller');

var renderHtml = function(path){
    return async (ctx, next) =>{
        ctx.render(path);
        next();
    };
};
var findForumByPage = async(ctx, next) =>{
    var currentPage = ctx.params.page || 1;
    log.debug(`Get Forums page : ${currentPage}`);
    var results = await answerDao.finaAllForumsByPage(currentPage);
    ctx.render('answer/question-answer-block-list.html', {
        forums: results
    });
    next();
};

module.exports = {
    'GET /answer/:page/forum.html': findForumByPage,
    'GET /answer/:page/detail.html': renderHtml('answer/question-answer-detail.html'),
    'GET /answer/:page/topic-list.html': renderHtml('answer/question-answer-list.html'),
    'GET /answer/:page/new': renderHtml('answer/question-answer-new-q.html'),
};