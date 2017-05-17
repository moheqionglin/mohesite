const topicComment = require('../../../backend-app/domain/entity/topicComment');
const _ = require('lodash');

var addTopicComment = async (id) =>{
    for(var i= 0 ; i< 6 ; i++){
        var comment = await topicComment.create({
            userId: 1,
            topicId: id,
            content: '测试内容-' + i,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    console.log(comment.dataValues);
};

var findAllComment =  async () =>{
    var comments = await topicComment.findAll();
    _.each(comments, function(topicComment){
        console.log(topicComment.dataValues);
    });
};
addTopicComment(1);
addTopicComment(2);
addTopicComment(3);
addTopicComment(4);
addTopicComment(5);
addTopicComment(6);
addTopicComment(7);
addTopicComment(8);
addTopicComment(9);
addTopicComment(10);
