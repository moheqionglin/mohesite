/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
const preAuth = require('../../backend-app/middleware/preAuth')();

var ctx = {};
var next = function(){
    return new Promise(function(resolve, reject){
        resolve('next function');
    });
};
(async () => {
    await preAuth(ctx, next);
})();