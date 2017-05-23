/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
const log = require('log4js').getLogger('Oauth2 Authenticate controller');
const Oauth2AuthResponse = require('../../messages/oauth2AuthResponse');
const UUID = require('uuid');
const webConf = require('../../webConf');
const roles = require('../../domain/entity/role').roles;
const userDao = require('../../dao/userDao');
const cache = require('../../domain/cache/lruCache')();
const authenticateTokenDao = require('../../dao/authenticateTokenDao');
const AuthUser = require('../../messages/user');
const weiboAuthService = require('../../services/weiboAuthService');
const qqAuthService = require('../../services/qqAuthService');
const githubAuthService = require('../../services/githubAuthService');
const facebookAuthService = require('../../services/facebookAuthService');

var deleteAuthCookie = function(cookies, cookieName){
    cookies.set(cookieName, 'deleted', {
        path: '/',
        httpOnly: true,
        expires: new Date(0)
    });
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
    var authProvider = ctx.params.provider;
    var code = ctx.query.code;
    var fromUrl = ctx.cookies.get(webConf.cookie.LOGIN_FROM_URL);
    if(!authProvider){
        ctx.response.redirect(fromUrl || '/');
        return;
    }
    log.info(`Try to Authenticate from ${authProvider}, code: ${code}, fromUrl: ${fromUrl}`);

    try{
        var oauth2AuthResponse;
        switch (authProvider){
            case webConf.oauth2Provider.WEI_BO:
                oauth2AuthResponse = await weiboAuthService.oauth2Authenticate(code);
                break;
            case webConf.oauth2Provider.QQ:
                oauth2AuthResponse = await qqAuthService.oauth2Authenticate(code);
                break;
            case webConf.oauth2Provider.GITHUB:
                oauth2AuthResponse = await githubAuthService.oauth2Authenticate(code);
                break;
            case webConf.oauth2Provider.FACEBOOK:
                oauth2AuthResponse = await facebookAuthService.oauth2Authenticate(code);
                break;
        }

       if(!oauth2AuthResponse){
            ctx.response.redirect(fromUrl || '/');
            return;
       }
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

};

var logout = async (ctx, next)=>{
    if(!ctx.request.authUser){
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
       weiboClientId: process.env.weibo_clientId,
       weiboRedirectUri: process.env.weibo_redirectUri,
       githubClientId: process.env.github_clientId,
       githubRedirectUri: process.env.github_redirectUri,
       qqClientId: process.env.qq_clientId,
       qqRedirectUri: process.env.qq_redirectUri,
       facebookClientId: process.env.facebook_clientId,
       facebookRedirectUri: process.env.facebook_redirectUri
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
    'GET /authenticate/callback/:provider' : oauth2AuthenticateFromWeibo,
    'GET /authenticate/logout': logout,
    'GET /authenticate/login': login,
    'GET /authenticate/profile': profile
}