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
        { replacements: {id: 5}, type: em.QueryTypes.SELECT });
    console.log(user);
};


// testTypeQuery();
(async () =>{
    var count = await em.query('SELECT  count(1) as count from topic where forumId = ?',{ replacements: [2], type: em.QueryTypes.SELECT });
    console.log(count[0].count)
})();
(async () =>{
    var currentPage = 1;
    var PAGE_SIZE = 4;
var topicsQuery = await em.query(' select t.id as topicId  ,t.title, t.createdAt, u.image, u.id userId, u.name from topic t left join users u  on t.user_id = u.id where t.forumId = ? order by topicId  desc limit ?, ?',
    { replacements: [2, (currentPage - 1) * PAGE_SIZE, (currentPage - 1) * PAGE_SIZE + PAGE_SIZE], type: em.QueryTypes.SELECT });
console.log(topicsQuery)
})();