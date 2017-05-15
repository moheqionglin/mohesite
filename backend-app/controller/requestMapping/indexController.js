'use strict';

const log = require('log4js').getLogger('index controller');
const Collection = require('../../domain/entity/collections');
const pagiation = require('../../webConf').pagiation;
const collectionDao = require('../../dao/collectionDao');
    
var index = async (ctx, next) => {
    var collections = await collectionDao.findTop10CollectionMetaData();
    ctx.render('./index.html', {collections: collections});
    await next();
};

module.exports = {
    "GET /index.html" : index
};