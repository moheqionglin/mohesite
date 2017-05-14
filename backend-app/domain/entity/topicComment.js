/**
 * Created by zhouwanli on 08/05/2017.
 */
'use strict';
const entityManager = require('../entityManager');
const Sequelize = require('sequelize');

var TopicComment = entityManager.define('topic_comment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            field: 'user_id',
            allowNull: false
        },
        topicId: {
            type: Sequelize.INTEGER,
            field: 'topic_id',
            allowNull: false
        },
        content: {
            type: Sequelize.STRING(1024),
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'topic_comment'
    }

);

module.exports = TopicComment;