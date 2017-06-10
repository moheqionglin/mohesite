/**
 * Created by zhouwanli on 23/05/2017.
 */
'use strict';
const request = require('request');
const log = require('log4js').getLogger('Weibo Oauth2 Authenticate ');
const webConf = require('../webConf');
const Oauth2AuthResponse = require('../messages/oauth2AuthResponse');
const UUID = require('uuid');
const roles = require('../domain/entity/role').roles;

var sendRequest = function(opts){
    return new Promise(function(resolve, reject){
        request(opts, function (err, res, body) {
            if (err) {
                reject(err);
            }
            if (res.statusCode !== 200) {
                reject(new Error(`Bad response code: ${res.statusCode}`));
            }
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(e)
            }
        });
    });
};


var generateTokenRequest = function(clientId, clientSecret, redirectUri, code){
    return {
        method: 'POST',
        uri: 'https://api.weibo.com/oauth2/access_token',
        qs:{
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            code: code
        },
        timeout: 5000
    };
};

var generateUserApiRequest = function(accessToken, uid){
    return {
        method: 'GET',
        uri: 'https://api.weibo.com/2/users/show.json',
        headers: {
            Authorization: 'OAuth2 ' + accessToken
        },
        qs:{
            uid: uid
        },
        timeout: 5000
    };
};

var oauth2AuthenticateFromWeibo = async (code) =>  {

    var authParams = generateTokenRequest(process.env.weibo_clientId, process.env.weibo_clientSecret, process.env.weibo_redirectUri, code);
    try{

        var authResult = await sendRequest(authParams);
        log.info(`Get code from weibo: ${authResult}`);

        var userApiParams = generateUserApiRequest(authResult.access_token, authResult.uid);
        var userApiResult = await sendRequest(userApiParams);
        log.info(`Get token from weibo ${userApiResult}`);

        var expiresAtLong = Date.now() + 1000 * Math.min(604800, authResult.expires_in);
        var expiresAt = new Date();
        expiresAt.setTime(expiresAtLong);

        var oauth2AuthResponse = new Oauth2AuthResponse(UUID.v1(), authResult.uid, authResult.access_token,
            expiresAt, webConf.oauth2Provider.WEI_BO, authResult.uid + '@' + webConf.oauth2Provider.WEI_BO,
            userApiResult.name, userApiResult.profile_image_url, roles.GUEST_ROLE
        );
        return oauth2AuthResponse;
    }catch(e){
        log.error(e);
        return null;
    }

};

module.exports = {
    oauth2Authenticate : oauth2AuthenticateFromWeibo
}
