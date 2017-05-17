/**
 * Created by zhouwanli on 14/05/2017.
 */
'use strict';
const blogDao = require('../../dao/blogDao');
const log = require('log4js').getLogger('Blog controller');
const _ = require('lodash');
const marked = require('marked');
const commentDao = require('../../dao/commentDao');

var getBlockList = async (ctx, next) =>{
    var currentPage = ctx.params.page || 1;
    log.debug(`Get Blog page : ${currentPage}`);

    var result = await blogDao.getBlockListByPage(currentPage);
    ctx.render('blogs/blog-list.html', {
        blogs: result
    });
    next();
};

var getBlogDetail = async(ctx, next) =>{
    var blogId = ctx.params.id;
    if(!blogId){
        ctx.body = "404 NOT FOUND!";
        return ;
    }
    log.debug(`Get Blog Detail : ${blogId}`);

    var blog = await blogDao.getBlogDetail(blogId);
    if(!blog){
        log.warn(`Could not found blog: ${blogId}`);
        ctx.body = "404 NOT FOUND!";
        return ;
    }
    var blogTopicCount = await commentDao.getTopicCountByCollectionId(blogId);
    blog.content = marked(blog.content);
    blog.topicCount = blogTopicCount;
    ctx.render('blogs/blog-details.html', {
        article: blog
    });

    next();
};

module.exports = {
    'GET /blogs/:id/detail.html': getBlogDetail,
    'GET /blogs/:page/list.html': getBlockList
};