/**
 * Created by zhouwanli on 17/05/2017.
 */
'use strict';
const topicModal = require('../domain/entity/topic');
const pagiationConf = require('../webConf').pagiation;
const _ = require('lodash');
const topicCommentModal = require('../domain/entity/topicComment');
const userDao = require('../dao/userDao');
const em = require('../domain/entityManager');
var getTopicCountByCollectionId = async (collectionId) =>{
    var count = await topicModal.count({
        where: {
            collectionId: collectionId
        }
    });
    return count;
}
var findCommentForTopicByPage = async (topicId, currentPage) =>{
    currentPage = currentPage || 1;
    var topicCommentCountQuery = await em.query('SELECT  count(1) as count from topic_comment where topic_id = ?',{ replacements: [topicId], type: em.QueryTypes.SELECT });
    var count = topicCommentCountQuery[0].count;

    var topicCommentQuery = await em.query('select tc.id as topicCommentId, tc.content , tc.createdAt, u.id as userId, u.image, u.name  from topic_comment tc left join users u on u.id = tc.user_id where tc.topic_id = ? order by topicCommentId desc limit ?, ?',
        { replacements: [topicId, (currentPage - 1) * pagiationConf.COMMENT_SIZE, (currentPage - 1) * pagiationConf.COMMENT_SIZE + pagiationConf.COMMENT_SIZE], type: em.QueryTypes.SELECT });

    var result = [];
    for(var index = 0 ; index < topicCommentQuery.length; index++){
        var tmpComment = topicCommentQuery[index];
        tmpComment.id = tmpComment.topicCommentId
        tmpComment.user = {
            image: tmpComment.image,
            name: tmpComment.name,
            id: tmpComment.userId
        };
        result.push(tmpComment);
    };

    return {
        rows: result,
        currentPage: currentPage,
        totalPage: Math.ceil(count / pagiationConf.COMMENT_SIZE)
    };
};

var getTopicListForCollectionByPage = async (collectionId, currentPage) => {
    currentPage = currentPage || 1;
    var topics = await topicModal.findAndCountAll({
        where:{
            collectionId: collectionId
        },
        order: 'id desc',
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
        var topicComment = await findCommentForTopicByPage(tmpTopic.id, 1);
        var user = await userDao.findUserById(tmpTopic.userId);
        tmpTopic.commentLists = topicComment;
        tmpTopic.user = user;
        result.rows.push(tmpTopic);
    }
    return result;

};

var saveComment = async (comment) =>{
    await topicModal.create(comment);
};

var getForumTitleByForumId = async (forumId) =>{
    var forumTitle = await em.query('SELECT title from forums where id = ?',{ replacements: [forumId], type: em.QueryTypes.SELECT });
    return forumTitle[0].title;
};

var getTopicDetailByTopicId = async (topicId, currentPage) =>{
    var topicQuery = await topicModal.findOne({
        where: {
            id : topicId
        }
    });
    var topic = topicQuery.dataValues;

    var topicComment = await findCommentForTopicByPage(topic.id, currentPage);
    var user = await userDao.findUserById(topic.userId);

    topic.commentLists = topicComment;
    topic.user = user;
    topic.forumTitle = await getForumTitleByForumId(topic.forumId);
    return topic;
};

var createTopicComment = async(topicComment) =>{
    await topicCommentModal.create(topicComment);
};
module.exports = {
    getTopicCountByCollectionId: getTopicCountByCollectionId,
    getTopicListForCollectionByPage: getTopicListForCollectionByPage,
    saveComment: saveComment,
    getTopicDetailByTopicId: getTopicDetailByTopicId,
    createTopicComment: createTopicComment
};