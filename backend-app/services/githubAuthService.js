/**
 * Created by zhouwanli on 23/05/2017.
 */
'use strict';
const UUID = require('uuid');
const roles = require('../domain/entity/role').roles;
const request = require('request');
const log = require('log4js').getLogger('Github Oauth2 Authenticate ');
const webConf = require('../webConf');
const Oauth2AuthResponse = require('../messages/oauth2AuthResponse');

var sendRequest = function(opts){
    return new Promise(function(resolve, reject){
        request(opts, function (err, res, body) {
            if (err) {
                reject(err);
            }
            if (!res || res.statusCode !== 200) {
                reject(new Error(`Bad response code: ${res.statusCode}`));
            }
            try {//access_token=1234&scope=&token_type=bearer
                log.debug(`github: ${body}`)
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
        uri: 'https://github.com/login/oauth/access_token',
        headers:{
            Accept: 'application/json'
        },
        qs:{
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            code: code
        },
        timeout: 10000
    };
};

var generateUserApiRequest = function(accessToken){
    return {
        method: 'GET',
        uri: 'https://api.github.com/user',
        headers: {
            Authorization: 'token ' + accessToken,
            'User-Agent': 'request'
        },
        timeout: 10000
    };
};


var oauth2Authenticate = async (code) =>  {

    var authParams = generateTokenRequest(process.env.github_clientId, process.env.github_clientSecret, process.env.github_redirectUri, code);
    try{

        var authResult = await sendRequest(authParams);
        log.info(`Get code from github: ${JSON.stringify(authResult)}`);
        log.info(authResult.access_token)
        var userApiParams = generateUserApiRequest(authResult.access_token);
        var userApiResult = await sendRequest(userApiParams);
        log.info(`Get token from github ${userApiResult}`);

        var expiresAtLong = Date.now() + 1000 * 604800;
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