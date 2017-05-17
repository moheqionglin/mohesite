/**
 * Created by zhouwanli on 17/05/2017.
 */
'use strict'

const bookDao = require('../../../backend-app/dao/bookDao');

var findBooksMetaByPageTest = async () => {
    var results = await bookDao.findBooksMetaByPage(1);
    console.log(results);
};
findBooksMetaByPageTest();