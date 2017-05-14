const topic = require('../../../backend-app/domain/entity/topic');
const _ = require('lodash');
var addTopic = async () =>{
    var topic = await topic.create({
        userId: 2,
        collectionId: 3,
        title: ' test title',
        content: 'test content',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    console.log(topic.dataValues);
};
var findAllTopic = async () => {
   var topics = await topic.findAll();
    _.each(topics, function(topic){
        console.log(topic.dataValues);
    });
}
var deleteTopic = async () =>{

}