/**
 * Created by zhouwanli on 03/04/2017.
 */
'use strict';
const nunjucks = require('nunjucks');
const DEFAULT_VIEW_PATH = 'views';

function createEnv(path, opts) {

    var autoescape = opts.autoescape === undefined ? true : opts.autoescape;
    var noCache = opts.noCache || false;
    var watch = opts.watch || false;
    var throwOnUndefined = opts.throwOnUndefined || false;
    var nunjucksFileLoader = new nunjucks.FileSystemLoader(path || DEFAULT_VIEW_PATH, {
        noCache: noCache,
        watch: watch,
    });
    var env = new nunjucks.Environment(nunjucksFileLoader , {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });

    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    // 创建Nunjucks的env对象:
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        // 给ctx绑定render函数:
        ctx.render = function (view, model) {
            // 把render后的内容赋值给response.body:
            var model = model || {};
            if(ctx.request.authUser){
                model.authUser = ctx.request.authUser;
            }
            
            ctx.response.body = env.render(view, model);
            // 设置Content-Type:
            ctx.response.type = 'text/html';
        };
        // 继续处理请求:
        await next();
    };
}

module.exports = templating;