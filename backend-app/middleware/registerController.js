/**
 * Created by zhouwanli on 03/04/2017.
 */
'use strict';
const fs = require('fs');
const _ = require('underscore');
var _s = require("underscore.string");
const log = require('log4js').getLogger("registerController");
//必须要传路径
var register = function(router, controllerDirs){

    _.each(controllerDirs, function(controllerDir){
        log.trace(`process controller dir : ${controllerDir}...`);
        var js_files = getAllControllerFile(controllerDir);
        _.each(js_files, function(f){
            log.debug(`process controller: ${f} ...`);
            let mapping = require(controllerDir + '/' + f);
            for (var url in mapping) {
                if (url.startsWith('GET ')) {
                    var path = _s(url.substring(4)).trim().value();
                    router.get(path, mapping[url]);
                    log.info(`register URL mapping: GET [${path}]`);
                } else if (url.startsWith('POST ')) {
                    var path =  _s(url.substring(5)).trim().value();
                    router.post(path, mapping[url]);
                    log.info(`register URL mapping: POST [${path}]`);
                } else if (url.startsWith('DELETE ')) {
                    var path =  _s(url.substring(7)).trim().value();
                    router.delete(path, mapping[url]);
                    log.info(`register URL mapping: DELETE [${path}]`);
                } else if (url.startsWith('PUT ')) {
                    var path =  _s(url.substring(4)).trim().value();
                    router.post(path, mapping[url]);
                    log.info(`register URL mapping: PUT [${path}]`);
                } else {
                    // 无效的URL:
                    log.warn(`invalid URL: ${url}`);
                }
            }
        });

    });
    addHtmlController(router);
    return router.routes();
}

function getAllControllerFile (dir){
    var files = fs.readdirSync(dir);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    return js_files;
}

function addHtmlController (router){
    router.get('/:page', async(ctx, next) =>{
        if(ctx.params.page.endsWith('.html')){
            log.trace(`Process html : page is : ${ctx.params.page}`);
            ctx.render('./' + ctx.params.page);
        }
        await next();
    });
    //add regex to html
    router.get('/:dir1/:page', async(ctx, next) =>{
        if(ctx.params.page.endsWith('.html')){
            log.trace(`Process html : dir1 is : ${ctx.params.dir1}, page is : ${ctx.params.page}`);
            ctx.render(ctx.params.dir1 + '/' + ctx.params.page);
        }
        await next();
    });
    router.get('/:dir1/:dir2/:page', async(ctx, next) =>{
        if(ctx.params.page.endsWith('.html')){
            log.trace(`Process html : dir1 is : ${ctx.params.dir1}, dir2 is : ${ctx.params.dir2}, page is : ${ctx.params.page}`);
            ctx.render(ctx.params.dir1 + '/' + ctx.params.dir2 + '/' + ctx.params.page);
        }
        await next();
    });
    router.get('/:dir1/:dir2/dir3/:page', async(ctx, next) =>{
        if(ctx.params.page.endsWith('.html')){
            log.trace(`Process html : dir1 is : ${ctx.params.dir1}, dir2 is : ${ctx.params.dir2}, dir3 is : ${ctx.params.dir3}, page is : ${ctx.params.page}`);
            ctx.render(ctx.params.dir1 + '/' + ctx.params.dir2 + '/' + ctx.params.dir3 + '/' + ctx.params.page);
        }
        await next();
    });
}
module.exports = register;
