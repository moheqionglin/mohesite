/**
 * Created by zhouwanli on 08/05/2017.
 */
'use strict';
const entityManager = require('../entityManager');
const Sequelize = require('sequelize');

var TopicComment = entityManager.define('topic_comment', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        userId: {
            type: Sequelize.BIGINT,
            field: 'user_id'
        },
        topicId: {
            type: Sequelize.BIGINT,
            field: 'topic_id'
        },
        content: Sequelize.STRING(1024),
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, {
        timestamps: false,
        tableName: 'topic_comment'
    }

);

module.exports = TopicComment;