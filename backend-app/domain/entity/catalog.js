/**
 * Created by zhouwanli on 20/05/2017.
 */
'use strict';
const entityManager = require('../entityManager');
const Sequelize = require('sequelize');

var Catalog = entityManager.define('catalog', {
        catalogNum: {
            type: Sequelize.STRING(12),
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
        displayOrder: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        collectionType: {
            type: Sequelize.STRING(16),
            field: 'collection_type',
            allowNull: false
        },
        articleId: {
            type: Sequelize.INTEGER,
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
        tableName: 'catalog'
    }
);

module.exports = Catalog;