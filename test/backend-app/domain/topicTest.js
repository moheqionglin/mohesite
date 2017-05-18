const topic = require('../../../backend-app/domain/entity/topic');
const _ = require('lodash');

var addTopic = async () =>{
    var a;
    var t = await topic.create({
        userId: 21,
        collectionId:a,
        title: ' 评论标题 - ' ,
        content: '评论内容 - '  ,
        forumId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    console.log(t.dataValues);


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