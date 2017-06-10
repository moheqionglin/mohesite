/**
 * Created by zhouwanli on 23/05/2017.
 */
'use strict';
const UUID = require('uuid');
const roles = require('../domain/entity/role').roles;
const request = require('request');
const log = require('log4js').getLogger('Facebook Oauth2 Authenticate ');
const webConf = require('../webConf');
const Oauth2AuthResponse = require('../messages/oauth2AuthResponse');

var sendRequest = function(opts){
    return new Promise(function(resolve, reject){
        request(opts, function (err, res, body) {
            if (err) {
                reject(err);
            }
            if (!res || res.statusCode !== 200) {
                reject(new Error(`Bad response code: ${res}`));
            }
            try {//access_token=1234&scope=&token_type=bearer
                log.debug(`facebook: ${body} ${res}`)
                resolve(JSON.parse(body));
            } catch (e) {
                reject(e)
            }
        });
    });
};
var sendRequestByGet = function(opts){
    return new Promise(function(resolve, reject){
        request
            .get(opts.uri)
            .on('response', function(response) {
                console.log(response ) // 200
                resolve(response)
            }) .on('error', function(err) {
            console.log(err);
            reject(err);
        });
    });
};


var generateTokenRequest = function(clientId, clientSecret, redirectUri, code){
    var a =  {
        method: 'GET',
        uri: 'https://graph.facebook.com/v2.9/oauth/access_token?client_id=' + clientId
        + '&client_secret=' + clientSecret + '&redirect_uri=' + redirectUri + '&code=' + code,
        headers:{
            Accept: 'application/json'
        },
        timeout: 15000
    };
    log.info(a.uri);
    return a;
};

var generateUserApiRequest = function(accessToken){
    return {
        method: 'GET',
        uri: 'https://api.github.com/user',
        headers: {
            Authorization: 'token ' + accessToken,
            'User-Agent': 'request'
        },
        timeout: 15000
    };
};


var oauth2Authenticate = async (code) =>  {

    var authParams = generateTokenRequest(process.env.facebook_clientId, process.env.facebook_clientSecret, process.env.facebook_redirectUri, code);
    try{

        var authResult = await sendRequestByGet(authParams);
        log.info(`Get code from facebook: ${JSON.stringify(authResult)}`);
        log.info(authResult.access_token)
        var userApiParams = generateUserApiRequest(authResult.access_token);
        var userApiResult = await sendRequest(userApiParams);
        log.info(`Get token from github ${userApiResult}`);

        var expiresAtLong = Date.now() + 1000 * Math.min(604800, authResult.expires_in);
        var expiresAt = new Date();
        expiresAt.setTime(expiresAtLong);

        var oauth2AuthResponse = new Oauth2AuthResponse(UUID.v1(), userApiResult.id, authResult.access_token,
            expiresAt, webConf.oauth2Provider.GITHUB, userApiResult.id + '@' + webConf.oauth2Provider.GITHUB,
            userApiResult.login, userApiResult.avatar_url, roles.GUEST_ROLE
        );
        return oauth2AuthResponse;
    }catch(e){
        log.error(e);
        return null;
    }

};

module.exports = {
    oauth2Authenticate: oauth2Authenticate
};