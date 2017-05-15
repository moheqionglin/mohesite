/**
 * Created by zhouwanli on 03/04/2017.
 */
'use strict';
const nunjucks = require('nunjucks');
const DEFAULT_VIEW_PATH = 'views';
var env = null;
function createEnv(path, opts) {
    if(env == null){
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
    }

    return env;
}

function templating(path, opts) {
    // 创建Nunjucks的env对象:
    var env = createEnv(path, opts);
    addDataParseFilter(env);
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
function addDataParseFilter(env){
    env.addFilter('dataParse', function(dateStr) {
        var date = new Date(dateStr);
        var today = new Date();

        var dateYear = date.getFullYear();
        var dateMonth = date.getMonth() + 1;
        var dateDate = date.getDate();
        var dateHour = date.getHours();
        var dateMinutes = date.getMinutes();
        var minusTime = today.getTime() - date.getTime();
        if(minusTime < 1000 * 60 * 60){//小时相同 3分钟前
            return (today.getMinutes() - dateMinutes)  + '分钟前';
        }
        if(minusTime < 1000 * 60 * 60 * 24){//日相同 3小时前
            return (today.getHours() - dateHour) + '小时前';
        }
        if(minusTime < 1000 * 60 * 60 * 24 * 10){//月份相同 6天前
            return (today.getDate() - dateDate) + '天前';
        }
        if(dateYear === today.getFullYear()){//年相同 3月5日 12:30
            return dateMonth + '月' + dateDate +'日 ' + dateHour + ':' +  date.getMinutes();
        }
        //2015-01-03 12:40
        return dateYear + '-' + dateMonth + '-' + dateDate + ' ' + dateHour + ':' + dateMinutes;
    });
}

module.exports = templating;