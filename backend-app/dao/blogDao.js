/**
 * Created by zhouwanli on 15/05/2017.
 */
'use strict';
const collectionModal = require('../domain/entity/collections');
const collectionType = require('../domain/entity/collectionType');
const pagiationConf = require('../webConf').pagiation;
const _ = require('lodash');

var getBlockListByPage = async(currentPage) =>{
    if(!currentPage || isNaN(currentPage)){
        currentPage = 1;
    }
    var blogs = await collectionModal.findAndCountAll({
        attributes: ['id', 'title', 'introduction', 'image', 'readCount', 'collectionType', 'keyWord', 'createdAt' ],
        where:{
            collectionType: collectionType.BLOG
        },
        limit: pagiationConf.PAGE_SIZE,
        offset: (currentPage - 1) * pagiationConf.PAGE_SIZE
    });
    var result = {
        rows: [],
        currentPage: parseInt(currentPage),
        totalPage: Math.ceil(blogs.count / pagiationConf.PAGE_SIZE)
    };
    _.each(blogs.rows, function(blog){
        result.rows.push(blog.dataValues);
    });
    return result;
};

module.exports = {
    getBlockListByPage : getBlockListByPage
};