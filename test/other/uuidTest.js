/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
var UUID = require('uuid');
var ID = UUID.v1();
console.log(ID.length)
var regex =/\w{8}(-\w{4}){3}-\w{12}?/;

console.log(regex.test(ID))
var a = 1;
if(!a)
console.log(a)