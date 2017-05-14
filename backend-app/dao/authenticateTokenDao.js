/**
 * Created by zhouwanli on 14/05/2017.
 */
'use strict';
const authTokenModal = require('../domain/entity/authenticationTokens');
const _ = require('lodash');
const cache = require('../domain/cache/lruCache')();

var createAuthUser = async function(oauth2AuthResponse, userId){
    var authUser = await authTokenModal.create({
        userId: userId,
        localToken: oauth2AuthResponse.localToken,
        expiresAt: oauth2AuthResponse.expiresAt,
        oauth2AuthId: oauth2AuthResponse.oauth2AuthId,
        oauth2AuthToken: oauth2AuthResponse.oauth2AuthToken,
        oauthProvider: oauth2AuthResponse.oauthProvider,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return authUser;
};
var deleteAllAuthUserFromDbAndCache = async function (userID){
    if(!userID){
        return;
    }
    var authTokens = await authTokenModal.findAll({
        where:{
            userId:userID
        }
    });
    _.each(authTokens, function(t){
        cache.del(t.dataValues.localToken);
    });
    var delCount = await authTokenModal.destroy({
        where:{
            userId: userID
        }
    });
    return delCount;
};
module.exports = {
    createAuthUser: createAuthUser,
    deleteAllAuthUserFromDbAndCache: deleteAllAuthUserFromDbAndCache
};