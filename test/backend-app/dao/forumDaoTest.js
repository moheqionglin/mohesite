/**
 * Created by zhouwanli on 18/05/2017.
 */
'use strict';
const forumDao = require('../../../backend-app/dao/forumDao');

var getForumIdByCollectionIdTest = async(id) =>{
    var result = await forumDao.getForumIdByCollectionId(id);
    console.log(result);
};

var findForumIdByRelateCatalogNumTest = async(id) =>{
    var result = await forumDao.findForumIdByRelateCatalogNum(id);
    console.log(result);
}

// getForumIdByCollectionIdTest(9770);
// findForumIdByRelateCatalogNumTest('-2');

var verifyForumIdTest = async(forumId) => {
    var verify = await forumDao.verifyForumId(forumId);
    console.log(verify);
};

verifyForumIdTest(1);