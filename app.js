var connect = require('connect');
var serveStatic = require('serve-static');
var APP_PATH = './';
var app = connect();

app.use(serveStatic(APP_PATH));
app.listen(9999);
console.log('server running on port 9999');