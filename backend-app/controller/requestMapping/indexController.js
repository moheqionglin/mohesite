'use strict';

const log = require('log4js').getLogger('index controller');
const Collection = require('../../domain/entity/collections');
const pagiation = require('../../webConf').pagiation;

var index = async (ctx, next) => {
    ctx.render('./index.html');
    await next();
};

module.exports = {
    "GET /index.html" : index
};