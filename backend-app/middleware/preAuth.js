/**
 * Created by zhouwanli on 12/05/2017.
 * add session to every request
 */
'use strict';
const log = require('log4js').getLogger("Pre Auth ");
const cookieConfig = require('../webConf').cookie;
var AuthUser = require('../messages/user');

var preAuthFilter = function(){
    return async (ctx, next) => {
        var auth_token = ctx.cookies.get(cookieConfig.AUTH_COOKIE_NAME);
        if(!auth_token){
            log.debug('invalid auth cookie will delete.');
            ctx.cookies.set(cookieConfig.AUTH_COOKIE_NAME, 'deleted', {
                path: '/',
                httpOnly: true,
                expires: new Date(0)
            });
        }
        
        var user = cache.get(auth_token);
        if()
        if(user.)




        // 给ctx绑定render函数:
        ctx.render = function (view, model) {
            // 把render后的内容赋值给response.body:
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type:
            ctx.response.type = 'text/html';
        };
        // 继续处理请求:
        await next();
    };
}

module.exports = preAuthFilter;