/**
 * Created by zhouwanli on 17/05/2017.
 */
'use strict'

const bookDao = require('../../../backend-app/dao/bookDao');

var findBooksMetaByPageTest = async () => {
    var results = await bookDao.findBooksMetaByPage(1);
    console.log(results);
};

// findBooksMetaByPageTest();

var getBookDetailByCatalogNumTest = async() =>{
    var book = await bookDao.getBookDetailByCatalogNum('01001007005002');
    console.log(book);
};
getBookDetailByCatalogNumTest();