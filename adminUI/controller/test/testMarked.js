var marked = require('marked');
var fs = require('fs');
var data=fs.readFileSync(__dirname + '/test.md'  ,"utf-8");
// console.log(data);
console.log(marked(data));