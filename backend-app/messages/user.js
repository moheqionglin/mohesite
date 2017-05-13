/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
var User = function(id, name, email, localToken, role, image){
    this.id = id;
    this.name = name;
    this.email = email;
    this.localToken = localToken;
    this.role = role;
    this.image = image;
}

User.prototype = {
    constructor: User,
    setId: function(id){
        this.id = id;
    },
    getId: function(){
        return this.id;
    },
    setName: function(name){
        this.name = name;
    },
    getName: function(){
        return this.name;
    },
    setEmail: function(email){
        this.email = email;
    },
    getEmail: function(){
        return this.email;
    },
    setLocalToken: function(localToken){
        this.localToken = localToken;
    },
    getLocalToken: function(){
        return this.localToken;
    },
    setRole: function(role){
        this.role = role;
    },
    getRole: function(){
        return this.role;
    },
    setImaghe: function(image){
        this.image = image;
    },
    getImage: function(){
        return this.image;
    },
    setExpiresAt: function(expiresAt){
        this.expiresAt = expiresAt;
    },
    getExpiresAt: function(){
        return this.expiresAt
    },
    setOauth2AuthId: function(oauth2AuthId){
        this.oauth2AuthId = oauth2AuthId;
    },
    getOauth2AuthId: function(){
        return this.oauth2AuthId;
    },
    setOauth2AuthToken: function(oauth2AuthToken){
        this.oauth2AuthToken = oauth2AuthToken;
    },
    getOauth2AuthToken: function(){
        return this.oauth2AuthToken;
    },
    setOauthProvider: function(oauthProvider){
        this.oauthProvider = oauthProvider;
    },
    getOauthProvider: function(){
        return this.oauthProvider;
    }
}

module.exports = User;
