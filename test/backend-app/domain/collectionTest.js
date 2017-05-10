const co = require('../../../backend-app/domain/entity/collections');
const _ = require('lodash');
co.create({
    userId: 1,
    title: 'test-title',
    introduction: 'test- introduction',
    content: 'test- content',
    readCount: 2,
    image: 'test - image',
    type: 'type',
    parentId: -1 ,
    keyWord: 'test - key_word',
    createdAt: new Date(),
    updatedAt: new Date()
}).then(function (p) {
    co.findAll().then(function(colls){
        console.log(`find ${colls.length} `);
        _.each(colls, function(col){
            console.log(col.dataValues);
        });
    })

})