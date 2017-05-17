/**
 * Created by zhouwanli on 17/05/2017.
 */
'use strict';
const commentDao = require('../../../backend-app/dao/commentDao');

var getTopicCountByCollectionIdTest = async (id) =>{
    var count = await commentDao.getTopicCountByCollectionId(1);
    console.log(count);
};
var getTopicListForCollectionByPageTest = async (id) =>{
    var result = await commentDao.getTopicListForCollectionByPage(id);
    console.log(result);
};
// getTopicCountByCollectionIdTest();
getTopicListForCollectionByPageTest(1);