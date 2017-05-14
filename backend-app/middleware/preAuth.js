/**
 * Created by zhouwanli on 12/05/2017.
 * add session to every request
 */
'use strict';
const log = require('log4js').getLogger("Pre Auth ");
const cookieConfig = require('../webConf').cookie;
const userDao = require('../dao/userDao');
var deleteAuthCookie = function(cookies, cookieName){
    cookies.set(cookieName, 'deleted', {
        path: '/',
        httpOnly: true,
        expires: new Date(0)
    });
};

var preAuthFilter = function(){
    return async (ctx, next) => {
        var auth_token = ctx.cookies.get(cookieConfig.AUTH_COOKIE_NAME);
        if(!auth_token){
            log.trace(`There is not exists ${cookieConfig.AUTH_COOKIE_NAME} into cookie.`);
            await next();
            return;
        }
        
        var authUser = await userDao.getUserByAuthTokenAndCache(auth_token);
        if(authUser == null){
            log.debug(`Delete invalid auth cookie from browser for token: ${auth_token}, because no auth user into database.`);
            deleteAuthCookie(ctx.cookies, cookieConfig.AUTH_COOKIE_NAME);
            await next();
            return;

        }else if(authUser.getExpiresAt() < new Date()){
            log.debug(`Delete invalid auth cookie from browser for token: ${auth_token}, because token had expired: ${authUser.getExpiresAt()}.`);
            deleteAuthCookie(ctx.cookies, cookieConfig.AUTH_COOKIE_NAME);
            await next();
            return;
        }
        
        log.trace(`Add auth user info into ctx.request: ${JSON.stringify(authUser)} for token: ${auth_token}`);
        ctx.request.authUser = authUser;

        // 继续处理请求:
        await next();
    };
};

module.exports = preAuthFilter;