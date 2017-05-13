/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
const cache = require('../domain/cache/lruCache');
const AuthUser = require('../messages/user');
const userModal = require('../domain/entity/users');

var getUserByAuthToken = function(localToken){
    if(cache.has(localToken)){
        var authUser = cache.get(localToken);
        if(authUser instanceof AuthUser){
            return authUser;
        }
    }
    userModal.fin
    
}