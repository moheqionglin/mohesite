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
replServer.defineCommand('saybye', function saybye() {
    console.log('Goodbye!');
    this.close();
});

// cache.set("key-1", "value-1");
// cache.set("key-2", "value-2");
// cache.set("key-3", "value-3");
// console.log(cache.get("key-1")); // "value"
// console.log(cache.get("key-2")); // "value"
// console.log(cache.get("key-3"));




// var someObject = {id: 1}
// cache.set(someObject, someObject)
//
// var someObject2 = {id: 2}
// cache.set(someObject2, someObject2)
// cache.reset()    // empty the cache
// console.log(cache.get(someObject));
// console.log(cache.get({id: 1}));
// console.log(cache.get(someObject2));
// console.log(cache.get({id: 2}));
// console.log(cache.get('[object Object]'));