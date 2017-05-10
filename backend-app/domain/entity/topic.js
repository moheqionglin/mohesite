/**
 * Created by zhouwanli on 08/05/2017.
 */
'use strict';
const entityManager = require('../entityManager');
const Sequelize = require('sequelize');

var Topic = entityManager.define('topic', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        userId: {
            type: Sequelize.BIGINT,
            field: 'user_id'
        },
        collectionId: {
            type: Sequelize.BIGINT,
            field: 'source_id'
        },
        title: Sequelize.STRING(32),
        content:Sequelize.STRING(1024),
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, {
        timestamps: false,
        tableName: 'topic'
    }

);

module.exports = Topic;