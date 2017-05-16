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

var finaAllForumsByPage = async (currentPage) =>{
    if(!currentPage || isNaN(currentPage)){
        currentPage = 1;
    }
    var forums = await forumModal.findAndCountAll({
        sort: 'id asc',
        limit: pagiationConf.PAGE_SIZE,
        offset: (currentPage - 1) * pagiationConf.PAGE_SIZE
    });
    var result = {
        rows : [],
        currentPage: currentPage,
        totalPage: Math.ceil(forums.count / pagiationConf.PAGE_SIZE)
    };
    _.each(forums.rows, function(forum){
        result.rows.push(forum.dataValues);
    });
    return result;

};

module.exports = {
    finaAllForumsByPage : finaAllForumsByPage
};