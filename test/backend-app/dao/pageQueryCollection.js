const Collection = require('../../../backend-app/domain/entity/collections');
const _ = require('lodash');

Collection.findAndCountAll({
    where: {
        status: true
    },
    order: 'readCount desc, id desc' ,
    limit: 10,
    offset: 0
}).then(function (result) {
    _.each(result.rows, function(row){
        console.log(row.dataValues);
    })
    console.log(result.count);
});

console.log('--->')