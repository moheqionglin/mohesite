/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
const cacheLib = require('lru-cache');
const log = require('log4js').getLogger('LRU cache');
const webConstCache = require('../../webConf').cache;


var cache = null;
function initCache(){
    if(cache == null){
        var options = getOpts();
        var cache = cacheLib(options);
    }
    return cache;
}
//TODO should make it configurable
function getOpts(){
    return {
        max: webConstCache.MAX,                      //最多存1000个元素(因为 legth函数返回值是1),无论元素大小因为
            length: function (n, key) {
            log.debug(`add Item into cache, key: ${key}, value: ${n}`);
            return 1;
        },
        dispose: function (key, n) {
            log.debug(`delete ${key}`);
            log.debug(`try to read from database`)
        },                              // 当元素被cache自动清除(可能超期或者LRU删除时候回调函数)
        maxAge: webConstCache.MAX_AGE
        // ,stale:true                  //如果true 那么在元素因为超时被删除后第一次get 还可以获取到元素,如果在调用就获取不到了
    }
}

module.exports = initCache;