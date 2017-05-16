/**
 * Created by zhouwanli on 16/05/2017.
 */
'use strict';
const answerDao = require('../../../backend-app/dao/answerDao');

var finaAllDivisionByPageTest = async () =>{
    var results = await answerDao.finaAllDivisionByPage(2);
    console.log(results);
};

finaAllDivisionByPageTest();