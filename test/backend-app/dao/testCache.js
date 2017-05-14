/**
 * Created by zhouwanli on 12/05/2017.
 */
'use strict';
var LRU = require("lru-cache");
var User = require('../../../backend-app/messages/user');
var options = { max: 2,//最多存储2个元素
    length: function (n, key) {console.log(`-${n} ${key}-`); return 1;},
    dispose: function (key, n) { console.log(`delete ${key}`);
        console.log(`try to read from database`)},// 当元素被cache自动清除(可能超期或者LRU删除时候回调函数)
    maxAge: 1000 * 60 * 60,
    stale:true//如果true 那么在元素因为超时被删除后第一次get 还可以获取到元素,如果在调用就获取不到了
}
var cache = LRU(options);
const repl = require('repl');

const replServer = repl.start({prompt: '> '});
replServer.defineCommand('put', {
    help: 'Say put',
    action(key) {
        this.lineParser.reset();
        this.bufferedCommand = '';
        var pars = key.split(' ')
        console.log(`Put  ${pars[0]}-${pars[1]}`);
        cache.set(pars[0], pars[1]);
        this.displayPrompt();
    }
});
replServer.defineCommand('get', {
    help: 'Say get',
    action(key) {
        this.lineParser.reset();
        this.bufferedCommand = '';
        var val_ =  cache.get(key);
        console.log(`Get  ${key} = ${val_}`);

        this.displayPrompt();
    }
});
replServer.defineCommand('allKeys', {
    help: 'Say allKeys',
    action() {
        this.lineParser.reset();
        var allKey = cache.keys();
        console.log(`All keys:  ${allKey}`);

        this.displayPrompt();
    }
});
replServer.defineCommand('allValues', {
    help: 'Say allValues',
    action() {
        this.lineParser.reset();
        var values = cache.values();
        console.log(`All values:  ${values}`);

        this.displayPrompt();
    }
});
replServer.defineCommand('putUser', {
    help: 'Say putUser',
    action(key) {
        this.lineParser.reset();
        var user = new User('id', 'name', 'email', 'localToken', 'role', 'image');
        user.setExpiresAt('setExpiresAt');
        user.setOauth2AuthId('setOauth2AuthId');
        user.setOauth2AuthToken('setOauth2AuthToken');
        user.setOauthProvider('setOauthProvider');
        console.log(user);
        cache.set(key, user);
        console.log(`All values:  ${key} ${user}`);

        this.displayPrompt();
    }
});
replServer.defineCommand('getUser', {
    help: 'Say getUser',
    action(key) {
        this.lineParser.reset();
        var user = cache.get(key);

        console.log(`Get User:  ${key} ${JSON.stringify(user)}, \n\r user instanceof User: ${user instanceof User}`);

        this.displayPrompt();
    }
});
replServer.defineCommand('hasKey', {
    help: 'Say hasKey',
    action(key) {
        this.lineParser.reset();
        var obj = cache.get(key);

        console.log(`Has key:  ${cache.has(key)} , key is : ${JSON.stringify(obj)}`);

        this.displayPrompt();
    }
});
replServer.defineCommand('deleteKey', {
    help: 'Say deleteKey',
    action(key) {
        this.lineParser.reset();
        cache.del(key);
        console.log(`delete key:  ${key} , key is : ${JSON.stringify(cache.get(key))}`);

        this.displayPrompt();
    }
});
replServer.defineCommand('saybye', function saybye() {
    console.log('Goodbye!');
    this.close();
});


/*
*
* set(key, value, maxAge)

 get(key) => value

 Both of these will update the "recently used"-ness of the key. They do what you think. maxAge is optional and overrides the cache maxAge option if provided.

 If the key is not found, get() will return undefined.

 The key and val can be any value.

 peek(key)

 Returns the key value (or undefined if not found) without updating the "recently used"-ness of the key.

 (If you find yourself using this a lot, you might be using the wrong sort of data structure, but there are some use cases where it's handy.)

 del(key)

 Deletes a key out of the cache.

 reset()

 Clear the cache entirely, throwing away all values.

 has(key)

 Check if a key is in the cache, without updating the recent-ness or deleting it for being stale.

 forEach(function(value,key,cache), [thisp])

 Just like Array.prototype.forEach. Iterates over all the keys in the cache, in order of recent-ness. (Ie, more recently used items are iterated over first.)

 rforEach(function(value,key,cache), [thisp])

 The same as cache.forEach(...) but items are iterated over in reverse order. (ie, less recently used items are iterated over first.)

 keys()

 Return an array of the keys in the cache.

 values()

 Return an array of the values in the cache.

 length

 Return total length of objects in cache taking into account length options function.

 itemCount

 Return total quantity of objects currently in cache. Note, that stale (see options) items are returned as part of this item count.

 dump()

 Return an array of the cache entries ready for serialization and usage with 'destinationCache.load(arr)`.

 load(cacheEntriesArray)

 Loads another cache entries array, obtained with sourceCache.dump(), into the cache. The destination cache is reset before loading new entries

 prune()

 Manually iterates over the entire cache proactively pruning old entries
*
*
* */