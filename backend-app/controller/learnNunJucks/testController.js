'use strict';
const log = require('log4js').getLogger('testController');
var items = ['网站首页' ,'公司案例', '公司相册', '团队博客', '关于我们'];

const test = async (ctx, next) => {
    log.info('Test Page');
    ctx.render('index.html', {
        items : items,
        testSet : 'Hello',
        testFun: function(a, b){
            console.log(a + '-->' + b);
            return a + '-->' + b;
        } 
    });
    await next();
};

module.exports = {
    "GET /wanli" : test
};

