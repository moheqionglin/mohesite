/**
 * Created by zhouwanli on 17/05/2017.
 */
'use strict';
const serializeDao = require('../../../backend-app/dao/serializeDao');

var findSerializeMetaByPageTest = async() =>{
    var results = await serializeDao.findSerializeMetaByPage(1);
    console.log(results);
};
findSerializeMetaByPageTest();
