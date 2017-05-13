'use strict';

const log = require('log4js').getLogger('index controller');
const Collection = require('../../domain/entity/collections');
const pagiation = require('../webConst').pagiation;

var index = async (ctx, next) => {
    await Collection.findAndCountAll({
        where: {
            status: true
        },
        order: 'readCount desc, id desc' ,
        limit: pagiation.PAGE_SIZE,
        offset: 0
    }).then(function (result) {
        log.debug(result.rows);
        log.debug(result.count);
    });
    ctx.render('./index.html');
    next();
};

module.exports = {
    "GET /index.html " : index,
    "GET /" : index
};