/**
 * Created by zhouwanli on 17/05/2017.
 */
'use strict';
const commentDao = require('../../dao/commentDao');
const log = require('log4js').getLogger('Comment dao');

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
}

module.exports = {
    'GET /collection/:collectionId/comments/:page/topic.html': getTopicByCollectionId
};