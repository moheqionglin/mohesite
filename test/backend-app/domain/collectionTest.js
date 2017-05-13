const co = require('../../../backend-app/domain/entity/collections');
const _ = require('lodash');
co.create({
    title: 'test-title',
    introduction: 'test- introduction',
    content: 'test- content',
    readCount: 1,
    image: 'test - image',
    collectionType: 'type',
    parentId: -1 ,
    status: true,
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

});