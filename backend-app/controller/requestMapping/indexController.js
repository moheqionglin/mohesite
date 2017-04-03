'use strict';

const log = require('log4js').getLogger('index controller');

var index = async (ctx, next) => {
    log.info('index page');
    ctx.render('./index.html');
    await next();
};
module.exports = {
    "GET /index.html " : index
};