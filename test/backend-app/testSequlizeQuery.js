/**
 * Created by zhouwanli on 18/05/2017.
 */
'use strict';
const em = require('../../backend-app/domain/entityManager');

var testRawQuery = async () =>{
  var user = await em.query('select * from users where id = ?',
      { replacements: [1], type: em.QueryTypes.SELECT });
    console.log(user);
};

var testTypeQuery = async () =>{
    var user = await em.query('select * from users where id = :id',
        { replacements: {id: 1}, type: em.QueryTypes.SELECT });
    console.log(user);
};


testTypeQuery();