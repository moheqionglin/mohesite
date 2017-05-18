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
    })
    next();
};

var saveComment = async(ctx, next) =>{
    var collectionId = ctx.request.body.collectionId;
    var collectionType = ctx.request.body.collectionType;
    var comment = ctx.request.body.comment;
    var title = ctx.request.body.title;
    if(!ctx.request.authUser){
        ctx.response.redirect('/authenticate/login.html');
        return;
    }
    if(!title || !comment){
        ctx.body = "您提交的标题或者内容为空或者不合法,请重试。";
        ctx.status = 400;
        return;
    }
    var forumId = null;
    if(collectionType.BLOG === collectionType){
        forumId = forumIdConfig.BLOG_ID;
    }else if('OTHER' === collectionType){
        forumId = forumIdConfig.OTHER_ID;
    }else{
        // forumId = await forumDao.getForumIdByCollectionId(collectionId);
    }

    if(forumId == null){
        forumId = forumIdConfig.OTHER_ID;
    }

    var comment = {
        userId: ctx.request.authUser.id,
        collectionId: collectionId,
        title: title,
        content: comment,
        forumId: forumId,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    await commentDao.saveComment(comment);
    ctx.status = 200;
    ctx.body = "Success";
    next();
};

module.exports = {
    'GET /collection/:collectionId/comments/:page/topic.html': getTopicByCollectionId,
    'POST /comment/submit': saveComment
};