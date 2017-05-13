/**
 * Created by zhouwanli on 08/05/2017.
 */
'use strict';
const entityManager = require('../entityManager');
const Sequelize = require('sequelize');

var User = entityManager.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING(64),
            allowNull:  false
        },
        name: {
            type: Sequelize.STRING(32),
            allowNull:  false
        },
        password: Sequelize.STRING(64),
        image: {
            type: Sequelize.STRING(128),
            allowNull:  false
        },
        role: {
            type: Sequelize.STRING(16),
            allowNull:false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull:false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull:false
        }
    }, {
        timestamps: false
    }

);

module.exports = User;