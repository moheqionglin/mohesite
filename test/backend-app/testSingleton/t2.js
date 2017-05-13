/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
const single = require('./lruCache');

console.log('【t2 ->】 ' + JSON.stringify(single.testSingle()));
console.log('【t2 ->】 ' + JSON.stringify(single.lruCache().get('k1')))
module.exports = {
    testSing: single.testSingle(),
    testCache: single.lruCache().get('k2')
};