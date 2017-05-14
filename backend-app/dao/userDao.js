/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
const cache = require('../domain/cache/lruCache')();
const AuthUser = require('../messages/user');
const userModal = require('../domain/entity/users');
const authTokenModal = require('../domain/entity/authenticationTokens');
const log = require('log4js').getLogger("useDao ");

var getUserByAuthTokenAndCache = async function(localToken){
    
    if(cache.has(localToken)){
        var authUser = cache.get(localToken);
        if(authUser instanceof AuthUser){
            log.debug(`get Token : ${localToken} From Cache`);
            return authUser;
        }

    }
    log.debug(`get Token : ${localToken} From Database`);
    var authTokenInfo = await authTokenModal.findOne({
        where: {
            localToken: localToken
        },
        order: 'id desc'
    });
    if(authTokenInfo == null){
        return null;
    }
    var user = await userModal.findById(authTokenInfo.userId);
    if(user === null){
        return null;
    }

    var authUser = new AuthUser(user.id, user.name, user.email, authTokenInfo.localToken, user.role, user.image);
    authUser.setExpiresAt(authTokenInfo.expiresAt);
    authUser.setOauth2AuthId(authTokenInfo.oauth2AuthId);
    authUser.setOauth2AuthToken(authTokenInfo.oauth2AuthToken);
    authUser.setOauthProvider(authTokenInfo.oauthProvider);
    cache.set(localToken, authUser);
    return authUser;
};

var findUserByEmail = async (email) =>{
    if(!email){
        return null;
    }
    var user = await userModal.findOne({
        where: {
            email : email
        }
    });
    return user;
};
var createUser = async (oauth2AuthResponse) =>{
    var user = {
        name: oauth2AuthResponse.name,
        email: oauth2AuthResponse.email,
        image: oauth2AuthResponse.image,
        password: '',
        role: oauth2AuthResponse.role,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    var user = await userModal.create(user);
    return user;
};
var updateUser = async (updateUserField, userId)=>{
    if(!updateUserField || !userId){
        return ;
    }
    var updateUser = await userModal.update(updateUserField,
        {
            where: {
                id: userId
            }
        });
}
module.exports = {
    getUserByAuthTokenAndCache : getUserByAuthTokenAndCache,
    findUserByEmail: findUserByEmail,
    createUser: createUser,
    updateUser: updateUser
}