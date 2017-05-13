/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
const cacheLib = require('lru-cache');
const LRU = require("lru-cache");
var value = null;
var i = 0;
var random = Math.floor(Math.random()* 10)
var testSin = function(){
    if(value == null){
        value = {
           key: 'first value',
           value: new Date().getTime(),
           random: random
        }
    }
    i++;
    console.log(`【lruCache.js】call ${i}`);
    return value;
};
//-------
var cache = null;
function initCache(){
    if(cache == null){
        var options = { max: 4,//最多存储2个元素
            length: function (n, key) { return 1;},
            dispose: function (key, n) { console.log(`delete ${key}`);
                console.log(`try to read from database`)},// 当元素被cache自动清除(可能超期或者LRU删除时候回调函数)
            maxAge: 1000 * 60 * 60,
            stale:true//如果true 那么在元素因为超时被删除后第一次get 还可以获取到元素,如果在调用就获取不到了
        }
        var cache = LRU(options);
        cache.set('k1', 'v1');
        cache.set('k2', 'v2');
        cache.set('k3', 'v3');
        cache.set('k4', 'v4');
    }
    return cache;
}


module.exports = {
    lruCache: initCache,
    testSingle: testSin
};