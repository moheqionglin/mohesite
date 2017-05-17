const topic = require('../../../backend-app/domain/entity/topic');
const _ = require('lodash');

var addTopic = async () =>{
    for(var i = 1 ; i < 15 ; i++){
        var t = await topic.create({
            userId: 21,
            collectionId: 1,
            title: ' 评论标题 - ' + i,
            content: '评论内容 - ' + i,
            forumId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log(t.dataValues);
    }


};

var findAllTopic = async () => {
   var topics = await topic.findAll();
    _.each(topics, function(topic){
        console.log(topic.dataValues);
    });
}

var deleteTopic = async () =>{

}
addTopic();