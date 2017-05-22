/**
 * Created by zhouwanli on 14/05/2017.
 */
'use strict';
const answerDao = require('../../dao/answerDao');
const log = require('log4js').getLogger('Answer controller');
const commentDao = require('../../dao/commentDao');
const collectionDao = require('../../dao/collectionDao');
const collectionType = require('../../domain/entity/collectionType');
const forumDao = require('../../dao/forumDao');

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

var getTopicListByForumId = async (ctx, next) =>{
    var forumId = ctx.params.forumId;
    var currentPage = ctx.params.page || 1;
   
    if(!forumId){
        ctx.body = "404 NOT FOUND!";
        ctx.status = 404;
        return ;
    }
    log.debug(`Get topic list for forum id: ${forumId}, current page : ${currentPage}`);
    var results = await answerDao.findAllTopicsByPage(forumId, currentPage);
    ctx.render('answer/question-answer-list.html', {
        topics: results,
        forumId: forumId
    });
    next();
};

var getAnswerDetailByTopicId = async (ctx, next) =>{
    var topicId = ctx.params.topicId;
    var currentPage =  ctx.params.page || 1;
    if(!topicId){
        ctx.body = "404 NOT FOUND!";
        ctx.status = 404;
        return ;
    }
    var result = await commentDao.getTopicDetailByTopicId(topicId, currentPage);
    ctx.render('answer/question-answer-detail.html', {
        topic: result
    });
    next();
};

var redirectToSource = async (ctx, next) =>{
    var collectionId = ctx.params.collectionId;
    if(!collectionId){
        ctx.body = "404 NOT FOUND!";
        ctx.status = 404;
        return ;
    }
    var collection = await collectionDao.findCollectionMetaDataByCollectionId(collectionId);
    if(!collection || !collection.collectionType){
        ctx.body = "404 NOT FOUND!";
        ctx.status = 404;
        return ;
    }
    var url = null;
    switch(collection.collectionType){
        case  collectionType.BLOG:
            url = '/site/blogs/' + collection.id + '/detail.html'
            break;
        case collectionType.BOOK:
            url = '/site/books/' + collection.catalogNum + '/detail.html'
            break;
        case collectionType.SERIALIZE:
            url = '/site/serialize/' + collection.catalogNum + '/detail.html'
            break;
    }

    if(!url){
        ctx.body = "404 NOT FOUND!";
        ctx.status = 404;
        return ;
    }
    ctx.response.redirect(url);
};
var createNewTopic = async (ctx, next) =>{
    var forumId = ctx.params.forumId;
    var verifyTopicId = await forumDao.verifyForumId(forumId);
    if(!verifyTopicId){
        ctx.body = "404 NOT FOUND!";
        ctx.status = 404;
        return ;
    }
    ctx.render('answer/question-answer-new-q.html', {
        forumId: forumId
    });
    next();
};
module.exports = {
    'GET /answer/:page/forum.html': findForumByPage,
    'GET /answer/:topicId/:page/detail.html': getAnswerDetailByTopicId,
    'GET /answer/:forumId/:page/topic-list.html': getTopicListByForumId,
    'GET /answer/:forumId/new': createNewTopic,
    'GET /topic/source/:collectionId': redirectToSource
};