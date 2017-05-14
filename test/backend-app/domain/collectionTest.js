const co = require('../../../backend-app/domain/entity/collections');
const _ = require('lodash');
var addCollection = async () =>{
    var collection = await co.create({
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
    });
    console.log(collection);
};
var findAllCollection = async () =>{
    var collections = await co.findAll();
    _.each(collections, function(col){
        console.log(col.dataValues);
    });
}