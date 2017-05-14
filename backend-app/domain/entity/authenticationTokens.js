/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
const entityManager = require('../entityManager');
const Sequelize = require('sequelize');

var AuthenticationTokens = entityManager.define('authentication_tokens', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull:false
        },
        localToken: {
            type: Sequelize.STRING(37),
            allowNull:false
        },
        expiresAt: {
            type : Sequelize.DATE,
            allowNull:false
        },
        oauth2AuthId: {
            type: Sequelize.STRING(100),
            allowNull:false
        },
        oauth2AuthToken: {
            type: Sequelize.STRING(128),
            allowNull:true
        },
        oauthProvider: Sequelize.STRING(10),
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

module.exports = AuthenticationTokens;