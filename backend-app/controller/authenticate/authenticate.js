/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
const log = require('log4js').getLogger('Oauth2 Authenticate ');
const request = require('request');
const Oauth2AuthResponse = require('../../messages/oauth2AuthResponse');
const UUID = require('uuid');
const webConf = require('../../webConf');
const roles = require('../../domain/entity/role').roles;
const userDao = require('../../dao/userDao');
const cache = require('../../domain/cache/lruCache')();
const authenticateTokenDao = require('../../dao/authenticateTokenDao');
const AuthUser = require('../../messages/user');

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
            code: code,
        },
        timeout: 5000
    };
};
var deleteAuthCookie = function(cookies, cookieName){
    cookies.set(cookieName, 'deleted', {
        path: '/',
        httpOnly: true,
        expires: new Date(0)
    });
};
var gengrateUserApiRequest = function(accessToken, uid){
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
var getNeedUpdateUserField = (user, oauth2AuthResponse) =>{
    var needUpdate = {};
    var hadUpdatedField = false;
    if(user.email !== oauth2AuthResponse.email){
        needUpdate.email = oauth2AuthResponse.email;
        hadUpdatedField = true;
    }
    if(user.image !== oauth2AuthResponse.image){
        needUpdate.image = oauth2AuthResponse.image;
        hadUpdatedField = true;
    }
    if(user.name !== oauth2AuthResponse.name){
        needUpdate.name = oauth2AuthResponse.name;
        hadUpdatedField = true;
    }
    if(user.role !== oauth2AuthResponse.role){
        needUpdate.role = oauth2AuthResponse.role;
        hadUpdatedField = true;
    }
    if(hadUpdatedField){
        needUpdate.updatedAt = new Date();
        return needUpdate;
    }
    return null;
};
var oauth2AuthenticateFromWeibo = async (ctx, next) =>  {
    var authProvider = ctx.params.authProvider;
    var code = ctx.query.code;
    var fromUrl = ctx.cookies.get(webConf.cookie.LOGIN_FROM_URL);

    var authParams = generateTokenRequest(process.env.weibo_clientId, process.env.weibo_clientSecret, process.env.weibo_redirectUri, code);
    try{

        var authResult = await sendRequest(authParams);
        log.info(authResult);

        var userApiParams = gengrateUserApiRequest(authResult.access_token, authResult.uid);
        var userApiResult = await sendRequest(userApiParams);
        log.info(userApiResult);

        var expiresAtLong = Date.now() + 1000 * Math.min(604800, authResult.expires_in);
        var expiresAt = new Date();
        expiresAt.setTime(expiresAtLong);

        //localToken, oauth2AuthId, oauth2AuthToken,expiresAt, oauthProvider, email, name, image, role
        var oauth2AuthResponse = new Oauth2AuthResponse(UUID.v1(), authResult.uid, authResult.access_token,
            expiresAt, webConf.oauth2Provider.WEI_BO, authResult.uid + '@' + webConf.oauth2Provider.WEI_BO,
            userApiResult.name, userApiResult.profile_image_url, roles.GUEST_ROLE
        );

       var user = await userDao.findUserByEmail(oauth2AuthResponse.email);
       if(user == null){//如果第一次登录,那么要创建user, 否则更新user
           log.debug(`User: ${oauth2AuthResponse.email} First Login, Create it.`);
           user = await userDao.createUser(oauth2AuthResponse);
       }else{
           var updateUserFields = getNeedUpdateUserField(user, oauth2AuthResponse);
           await userDao.updateUser(updateUserFields, user.id);
           //删除之前的token
           var delToken = await authenticateTokenDao.deleteAllAuthUserFromDbAndCache(user.id);
           log.debug(`Delete from authen_token table : count: ${delToken}, userId: ${user.id}`);
       }
        //保存最新的token
        var authUser = await authenticateTokenDao.createAuthUser(oauth2AuthResponse, user.id);

        // id, name, email, localToken, role, image, expiresAt, oauth2AuthId, oauth2AuthToken, oauthProvider
        var cacheUser = new AuthUser(user.id, user.name, user.email, authUser.localToken,
            user.role, user.image, authUser.expiresAt, authUser.oauth2AuthId, authUser.oauth2AuthToken,
            authUser.oauthProvider);
        log.info(`Save to cache: ${JSON.stringify(cacheUser)}`);
        cache.set(oauth2AuthResponse.localToken, cacheUser);

        ctx.cookies.set(webConf.cookie.AUTH_COOKIE_NAME, oauth2AuthResponse.localToken, {
            path: '/',
            httpOnly: true,
            expires: new Date(oauth2AuthResponse.expiresAt)
        });
        ctx.request.authUser = authUser;
        ctx.response.redirect(fromUrl || '/');
        deleteAuthCookie(ctx.cookies, webConf.cookie.LOGIN_FROM_URL);
        next();
    }catch(e){
        log.error(e);
        ctx.response.redirect(fromUrl || '/authenticate/login.html');
        next();
    }
    log.info(`Try to Authenticate from ${authProvider}, code: ${code}, fromUrl: ${fromUrl}`);

};

var logout = async (ctx, next)=>{
    if(!ctx.request.authUser){
        await next();
        return ;
    }
    var authUser = ctx.request.authUser;
    cache.del(authUser.localToken);
    await authenticateTokenDao.deleteAllAuthUserFromDbAndCache(authUser.id);
    deleteAuthCookie(ctx.cookies, webConf.cookie.AUTH_COOKIE_NAME);
    deleteAuthCookie(ctx.cookies, webConf.cookie.LOGIN_FROM_URL);
    var forwardUrl = ctx.cookies.get(webConf.cookie.LOGIN_FROM_URL);
    ctx.response.redirect(forwardUrl || '/');
    next();
};
var login = async (ctx, next) =>{
   var forwardPage = ctx.query.forward || '/';
   log.debug(`Login From Page :  ${forwardPage}`);
   if(ctx.request.authUser){//如果已经登录,那么不允许在访问这个url
       ctx.response.redirect(forwardPage || '/');
       next();
       return;
   }
   var expiredDate = new Date();
   expiredDate.setTime(expiredDate.getTime() + webConf.cookie.TTL)
   ctx.cookies.set(webConf.cookie.LOGIN_FROM_URL, forwardPage, {
        path: '/',
        httpOnly: true,
        expires: expiredDate
   });
   ctx.render('authenticate/login.html', {
       clientId: process.env.weibo_clientId,
       redirectUri: process.env.weibo_redirectUri
   });
   next();
};
var profile = async (ctx, next) =>{
    if(!ctx.request.authUser){
        ctx.response.redirect('/site/authenticate/login');
        next();
        return;
    }
    ctx.render('authenticate/profile.html');
    next();
};
module.exports = {
    'GET /authenticate/callback/weibo' : oauth2AuthenticateFromWeibo,
    'GET /authenticate/logout': logout,
    'GET /authenticate/login': login,
    'GET /authenticate/profile': profile
}