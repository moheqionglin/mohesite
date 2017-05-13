/**
 * Created by zhouwanli on 08/05/2017.
 */
'use strict';
const entityManager = require('../entityManager');
const Sequelize = require('sequelize');

var Collections = entityManager.define('collections', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING(32),
            allowNull: false
        },
        introduction: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        image: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        readCount: {
            type: Sequelize.INTEGER,
            field: 'read_count',
            allowNull: false
        },
        collectionType: {
            type: Sequelize.STRING(16),
            field: 'collection_type',
            allowNull: false
        },
        parentId: {
            type: Sequelize.INTEGER,
            field: 'parent_id',
            allowNull: false
        },
        keyWord: {
            type: Sequelize.STRING(256),
            field: 'key_word',
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
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
        timestamps: false
    }
);

module.exports = Collections;