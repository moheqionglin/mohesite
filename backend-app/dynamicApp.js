'use strict';
const isProd = process.env.NODE_ENV === 'production';
const log4js = require('log4js');
const Koa = require('koa');
const server = new Koa();
const viewResolver = require('./middleware/viewResolver');
const bodyParser = require('koa-bodyparser');
const staticFile = require('koa-static');
const router = require('koa-router')();
const log = log4js.getLogger('app');
const registerController = require('./middleware/registerController');

log4js.configure('log4js.json', { reloadSecs: 300, cwd: __dirname });
{//中间件 [1] url Filter.需要放在静态资源和Router前面,监控所有请求。
    server.use(async (ctx, next) =>{
        log.info(`IP: ${ctx.request.ip} Process ${ctx.request.method} ${ctx.request.url}   ...`);
        await next();
    });
}

{//中间件 [2]静态文件不走router拦截,而是静态资源直接访问。所以要先于router加载
    const styleOpts = {
        maxage: 0, // 1年，默认为0
        hidden: false, // 能否返回隐藏文件（以`.`打头），默认false不返回
        index: 'index.html', // 默认文件名
        defer: true, // 在yield* next之后返回静态文件，默认在之前
        gzip: true // 允许传输gzip，如静态文件夹下有两个文件，index.js和index.js.gz，// 会优先传输index.js.gz，默认开启
    };
    server.use(staticFile(__dirname + '/../public',styleOpts));
}

{//中间件 [3]post body解析中间件
    server.use(bodyParser());
}

{//中间件 [4]view resolver, 一定要先于router,因为他需要在router前把html模板解析完成
    server.use(viewResolver(__dirname + '/../views',{
        noCache: !isProd,//类似于jsp缓存文件一样
        watch: !isProd
    }));
}

{//中间件 [5]加载中间件requestMapping
   server.use(registerController(router,
       [__dirname + '/controller/requestMapping/',
        __dirname + '/controller/learnNunJucks/'
   ]));
}
var port = process.argv[2] || 9988;
server.listen(port);
log.info(`App started success! port: ${port}`);