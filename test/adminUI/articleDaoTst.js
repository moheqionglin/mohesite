/**
 * Created by zhouwanli on 29/05/2017.
 */
'use strict';
const articleDao = require('../../adminUI/dao/articleDao');

var getArticleByIdTest = async(id) =>{
    var article = await articleDao.getArticleById(id);
    console.log(article);
};
var generateSubCatalogTest = async(prefix) =>{
    var allBooks = await articleDao.generateSubCatalog(prefix);
    console.log(allBooks);
};
// getArticleByIdTest(10847);

var getArticleByIdOrCatalogNumTest = async() =>{
    var result = await articleDao.getArticleByIdOrCatalogNum(1);
    console.log(result)
};
// generateSubCatalogTest('01013');

getArticleByIdOrCatalogNumTest(1)
