/**
 * Created by zhouwanli on 12/05/2017.
 */
'use strict';
var LRU = require("lru-cache")
    , options = { max: 500
    , length: function (n, key) { return n * 2 + key.length }
    , dispose: function (key, n) { n.close() }
    , maxAge: 1000 * 60 * 60 }
    , cache = LRU(options)
    , otherCache = LRU(50) // sets just the max size

cache.set("key", "value")
console.log(cache.get("key")); // "value"

// non-string keys ARE fully supported
var someObject = {id: 1}
cache.set(someObject, someObject)

var someObject2 = {id: 2}
cache.set(someObject2, someObject2)

cache.set('[object Object]', 'a different value')
// cache.reset()\
console.log(cache.get(someObject));
console.log(cache.get({id: 1}));
console.log(cache.get(someObject2));
console.log(cache.get({id: 2}));

console.log(cache.get('[object Object]'));

// cache.reset()    // empty the cache