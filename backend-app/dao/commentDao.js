/**
 * Created by zhouwanli on 17/05/2017.
 */
'use strict';
const topicModal = require('../domain/entity/topic');
const pagiationConf = require('../webConf').pagiation;
const _ = require('lodash');
const commentModal = require('../domain/entity/topicComment');
const userDao = require('../dao/userDao');

var getTopicCountByCollectionId = async (collectionId) =>{
    var count = await topicModal.count({
        where: {
            collectionId: collectionId
        }
    });
    return count;
}
var findTop5CommentForTopic = async (topicId) =>{
    var comments = await commentModal.findAll({
        where:{
            topicId: topicId
        },
        sort : 'id desc',
        limit: pagiationConf.COMMENT_SIZE
    });
    var result = [];
    for(var index = 0 ; index < comments.length; index++){
        var tmpComment = comments[index].dataValues;
        var user = await userDao.findUserById(tmpComment.userId);
        tmpComment.user = user;
        result.push(tmpComment);
    };
    return result;
};

var getTopicListForCollectionByPage = async (collectionId, currentPage) => {
    currentPage = currentPage || 1;
    var topics = await topicModal.findAndCountAll({
        where:{
            collectionId: collectionId
        },
        sort: 'id desc',
        limit: pagiationConf.COMMENT_SIZE,
        offset: (currentPage - 1) * pagiationConf.COMMENT_SIZE
    });
    var result = {
        rows: [],
        collectionId: collectionId,
        currentPage: currentPage,
        totalPage: Math.ceil(topics.count / pagiationConf.COMMENT_SIZE)
    };
    for(var index = 0; index < topics.rows.length; index ++){
        var tmpTopic = topics.rows[index].dataValues;
        var topicComment = await findTop5CommentForTopic(tmpTopic.id);
        var user = await userDao.findUserById(tmpTopic.userId);
        tmpTopic.commentLists = topicComment;
        tmpTopic.user = user;
        result.rows.push(tmpTopic);
    }
    return result;

};

module.exports = {
    getTopicCountByCollectionId: getTopicCountByCollectionId,
    getTopicListForCollectionByPage: getTopicListForCollectionByPage
};