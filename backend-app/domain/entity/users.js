/**
 * Created by zhouwanli on 08/05/2017.
 */
'use strict';
const entityManager = require('../entityManager');
const Sequelize = require('sequelize');

var User = entityManager.define('users', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        name: Sequelize.STRING(32),
        password: Sequelize.STRING(64),
        role: Sequelize.STRING(16),
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, {
        timestamps: false
    }

);

module.exports = User;