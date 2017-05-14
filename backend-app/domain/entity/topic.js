/**
 * Created by zhouwanli on 08/05/2017.
 */
'use strict';
const entityManager = require('../entityManager');
const Sequelize = require('sequelize');

var Topic = entityManager.define('topic', {
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
        collectionId: {
            type: Sequelize.INTEGER,
            field: 'collection_id'
        },
        title: {
            type: Sequelize.STRING(32),
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
        tableName: 'topic'
    }
);

module.exports = Topic;