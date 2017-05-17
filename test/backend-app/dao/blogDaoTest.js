/**
 * Created by zhouwanli on 15/05/2017.
 */
'use strict';
const blogDao = require('../../../backend-app/dao/blogDao');
const _ = require('lodash');
var getBlockListByPageTest = async () =>{
    var result = await blogDao.getBlockListByPage(1);
    _.each(result.rows, function(row){
        console.log(row);
    });
    console.log(result.totalPage);
    console.log(result.currentPage)
};

var getBlogDetailTest = async (id) => {
    var result = await blogDao.getBlogDetail(id);
    console.log(result);
};

// getBlockListByPageTest();
getBlogDetailTest(1)