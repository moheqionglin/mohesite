/**
 * Created by zhouwanli on 18/05/2017.
 */
'use strict';
const forumModal = require('../domain/entity/forums');
const em = require('../domain/entityManager');
var getForumIdByCollectionId = async(collectionId) =>{
    if(!collectionId){
        return;
    }
    var forumId = await em.query('select id from forums where relateCatalogNum in (select substring(catalogNum,1,5) from collections where id = ? ) limit 1',
        { replacements: [collectionId], type: em.QueryTypes.SELECT });
    if(forumId[0] ){
        return forumId[0].id;
    }

   return null;
};

var findForumIdByRelateCatalogNum = async(relateCatalogNum) =>{
    if(!relateCatalogNum){
        return null;
    }
    var forumId = await em.query(' select id from forums where relateCatalogNum = ?  limit 1',
        { replacements: [relateCatalogNum], type: em.QueryTypes.SELECT });
    if(forumId[0] ){
        return forumId[0].id;
    }
    return null;
};
module.exports = {
    getForumIdByCollectionId: getForumIdByCollectionId,
    findForumIdByRelateCatalogNum: findForumIdByRelateCatalogNum
};