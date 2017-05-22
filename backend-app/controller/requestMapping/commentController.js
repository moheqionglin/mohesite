/**
 * Created by zhouwanli on 17/05/2017.
 */
'use strict';
const commentDao = require('../../dao/commentDao');
const log = require('log4js').getLogger('Comment dao');
const collectionType = require('../../domain/entity/collectionType');
const forumIdConfig = require('../../webConf').forumId;
const forumDao = require('../../dao/forumDao');

var getTopicByCollectionId = async (ctx, next) =>{
    var collectionId = ctx.params.collectionId;
    var currentPage = ctx.params.page || 1;
    if(!collectionId){
        ctx.body = "暂无评论";
        return ;
    }
    log.debug(`Load topic collection id: ${collectionId}, currentPage: ${currentPage}`);
    var topics = await commentDao.getTopicListForCollectionByPage(collectionId, currentPage);
    ctx.render('common/_comment_list.html', {
        topics: topics,
        collectionId: collectionId
    });
    next();
};

var saveComment = async(ctx, next) =>{
    if(!ctx.request.authUser){
        ctx.response.redirect('/authenticate/login.html');
        return;
    }
    var comment = ctx.request.body.comment;
    var title = ctx.request.body.title;
    if(!title || !comment){
        ctx.body = "您提交的标题或者内容为空或者不合法,请重试。";
        ctx.status = 400;
        return;
    }

    var userId = ctx.request.authUser.id;
    var collectionId = ctx.request.body.collectionId;
    var collectionType = ctx.request.body.collectionType;

    //从 问答模块来的
    var requestFromAnswer = ctx.request.body.requestFromAnswer;
    var forumId = ctx.request.body.forumId;

    if(requestFromAnswer){
        if(!forumId){
            ctx.body = "您提交的标题或者内容为空或者不合法,请重试。";
            ctx.status = 400;
            return;
        }
    }else{
        if(collectionType.BLOG === collectionType){
            forumId = await forumDao.findForumIdByRelateCatalogNum(forumIdConfig.BLOG_ID);
        }else if('OTHER' === collectionType){
            forumId = await forumDao.findForumIdByRelateCatalogNum(forumIdConfig.OTHER_ID);
        }else{
            forumId = await forumDao.getForumIdByCollectionId(collectionId);
        }

        if(forumId == null){
            forumId = await forumDao.findForumIdByRelateCatalogNum(forumIdConfig.OTHER_ID);
        }
    }

    var comment = {
        userId: userId,
        collectionId: collectionId,
        title: title,
        content: comment,
        forumId: forumId,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    await commentDao.saveComment(comment);

    if(requestFromAnswer){
        ctx.response.redirect('/site/answer/' + forumId + '/1/topic-list.html');
        return;
    }

    ctx.status = 200;
    ctx.body = "Success";
    next();
};

var createTopicComment = async(ctx, next) =>{
    if(!ctx.request.authUser){
        ctx.response.redirect('/authenticate/login.html');
        return;
    }
    var userId = ctx.request.authUser.id;

    var topicId = ctx.params.topicId;
    var content = ctx.request.body.content;
    if(!content){
        ctx.body = "您提交的内容为空或者不合法,请重试。";
        ctx.status = 400;
        return;
    }
    commentDao.createTopicComment({
        userId: userId,
        topicId: topicId,
        content: content,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    ctx.response.redirect('/site/answer/' + topicId + '/1/detail.html');
    return;

};
module.exports = {
    'GET /collection/:collectionId/comments/:page/topic.html': getTopicByCollectionId,
    'POST /comment/submit': saveComment,
    'POST /create/topic/:topicId/comment': createTopicComment
};