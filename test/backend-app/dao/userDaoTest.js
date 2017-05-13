/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
const cache = require('../../../backend-app/domain/cache/lruCache')();
const userDao = require('../../../backend-app/dao/userDao');
const User = require('../../../backend-app/messages/user');

const key = 'test- localToken';
var user = new User('id', 'name', 'email', 'localToken', 'role', 'image');
user.setExpiresAt('setExpiresAt');
user.setOauth2AuthId('setOauth2AuthId');
user.setOauth2AuthToken('setOauth2AuthToken');
user.setOauthProvider('setOauthProvider');
cache.set('test- localToken', user);
console.log(cache.has('test- localToken'));



setTimeout(function(){

    (async () =>{
        var result = await userDao.getUserByAuthToken(key);
        console.log(result);
    })()
}, 3000)