/**
 * Created by zhouwanli on 15/05/2017.
 */
'use strict';
const collectionModal = require('../domain/entity/collections');
const collectionType = require('../domain/entity/collectionType');
const pagiationConf = require('../webConf').pagiation;
const _ = require('lodash');
const log = require('log4js').getLogger('Blog dao');

var getBlockListByPage = async(currentPage) =>{
    if(!currentPage || isNaN(currentPage)){
        currentPage = 1;
    }
    var blogs = await collectionModal.findAndCountAll({
        attributes: ['id', 'title', 'introduction', 'image', 'readCount', 'collectionType', 'keyWord', 'createdAt' ],
        order:'readCount desc, id desc',
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

var getBlogDetail = async(blogId) =>{
    var blog = await collectionModal.findOne({
        where:{
            id: blogId,
            collectionType: collectionType.BLOG
        }
    });
    if(blog){
        try{
            await blog.updateAttributes({
                readCount: blog.readCount + 1
            });
        }catch(e){
            log.warn(`Update blog [${blogId}] read count error: ${e}`);
        }
        return blog.dataValues;
    }
    return null;

}
module.exports = {
    getBlockListByPage : getBlockListByPage,
    getBlogDetail: getBlogDetail
};