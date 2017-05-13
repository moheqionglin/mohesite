/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
var User = require('../../backend-app/messages/user');

var user = new User('id', 'name', 'email', 'localToken', 'role', 'image');
user.setExpiresAt('setExpiresAt');
user.setOauth2AuthId('setOauth2AuthId');
user.setOauth2AuthToken('setOauth2AuthToken');
user.setOauthProvider('setOauthProvider');

console.log(user.id)
console.log(user)