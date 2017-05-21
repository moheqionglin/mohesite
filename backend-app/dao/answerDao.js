/**
 * Created by zhouwanli on 16/05/2017.
 */
'use strict';
const topicModal = require('../domain/entity/topic');
const topicCommentModal = require('../domain/entity/topicComment');
const collectionModal = require('../domain/entity/collections');
const collectionType = require('../domain/entity/collectionType');
const _ = require('lodash');
const log = require('log4js').getLogger('index controller');
const pagiationConf = require('../webConf').pagiation;
const forumModal = require('../domain/entity/forums');
const em = require('../domain/entityManager');

var finaAllForumsByPage = async (currentPage) =>{
    if(!currentPage || isNaN(currentPage)){
        currentPage = 1;
    }
    var forums = await forumModal.findAndCountAll({
        order: 'id asc',
        limit: pagiationConf.PAGE_SIZE,
        offset: (currentPage - 1) * pagiationConf.PAGE_SIZE
    });
    var result = {
        rows : [],
        currentPage: currentPage,
        totalPage: Math.ceil(forums.count / pagiationConf.PAGE_SIZE)
    };
    _.each(forums.rows, function(forum){
        var forumData = forum.dataValues;
        forumData.collectionType = collectionType.FORUM;
        result.rows.push(forumData);
    });
    return result;

};

var getForumTitleByForumId = async (forumId) =>{
    var forumTitle = await em.query('SELECT title from forums where id = ?',{ replacements: [forumId], type: em.QueryTypes.SELECT });
    return forumTitle[0].title;
};

var findAllTopicsByPage = async (forumId, currentPage) =>{
    var topics = topicModal.findAndCountAll({
        attributes: ['id', 'userId', 'collectionId', 'title', 'forumId', 'createdAt' ],
        where:{
            forumId: forumId
        },
        order:  'id asc',
        limit: pagiationConf.PAGE_SIZE,
        offset: (currentPage - 1) * pagiationConf.PAGE_SIZE
    });
    var countQuery = await em.query('SELECT  count(1) as count from topic where forumId = ?',{ replacements: [forumId], type: em.QueryTypes.SELECT });
    var count = countQuery[0].count;
    
    var topicsQuery = await em.query(' select t.id as topicId  ,t.title, t.createdAt, u.image, u.id userId, u.name from topic t left join users u  on t.user_id = u.id where t.forumId = ? order by topicId  desc limit ?, ?',
        { replacements: [forumId, (currentPage - 1) * pagiationConf.PAGE_SIZE, (currentPage - 1) * pagiationConf.PAGE_SIZE + pagiationConf.PAGE_SIZE], type: em.QueryTypes.SELECT });

    var forumTitle = await getForumTitleByForumId(forumId);
    var result = {
        rows : [],
        currentPage: currentPage,
        totalPage: Math.ceil(count / pagiationConf.PAGE_SIZE),
        forumTitle: forumTitle
    };
    _.each(topicsQuery, function(topic){
        result.rows.push(topic);
    });
    return result;
};


module.exports = {
    finaAllForumsByPage : finaAllForumsByPage,
    findAllTopicsByPage: findAllTopicsByPage
};