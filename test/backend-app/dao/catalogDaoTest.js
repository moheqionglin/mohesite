/**
 * Created by zhouwanli on 20/05/2017.
 */
'use strict';
const catalogDao = require('../../../backend-app/dao/catalogDao');

var getCatalogByCatalogNumTest = async ()=>{
    var result = await catalogDao.getCatalogByCatalogNum('01001008001005');

    console.log(result.h1Lists);
    console.log(result.h2Lists);
    console.log(result.h3Lists);

};
getCatalogByCatalogNumTest();