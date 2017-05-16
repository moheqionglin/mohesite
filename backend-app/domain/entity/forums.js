/**
 * Created by zhouwanli on 09/05/2017.
 */
'use strict';
const entityManager = require('../entityManager');
const Sequelize = require('sequelize');

var Forums = entityManager.define('forums', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING(32),
            allowNull: false
        },
        introduction: {
            type: Sequelize.STRING(128),
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
        tableName: 'forums'
    }
);

module.exports = Forums;