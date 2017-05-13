/**
 * Created by zhouwanli on 08/05/2017.
 */
'use strict';
const entityManager = require('../entityManager');
const Sequelize = require('sequelize');

var Collections = entityManager.define('collections', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        title: Sequelize.STRING(32),
        introduction: Sequelize.STRING(128),
        image:Sequelize.STRING(128),
        content: Sequelize.TEXT,
        readCount: {
           type: Sequelize.BIGINT,
           field: 'read_count'
        },
        collectionType: {
            type: Sequelize.STRING(16),
            field: 'collection_type'
        },
        parentId: {
            type: Sequelize.BIGINT,
            field: 'parent_id'
        } ,
        keyWord: {
            type: Sequelize.STRING(256),
            field: 'key_word'
        },
        status: Sequelize.BOOLEAN,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, {
        timestamps: false
    }

);

module.exports = Collections;