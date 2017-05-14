const topicComment = require('../../../backend-app/domain/entity/topicComment');
const _ = require('lodash');

var addTopicComment = async () =>{
    var comment = await topicComment.create({
        userId: 4,
        topicId: 1,
        content: 'test content',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    console.log(comment.dataValues);
};

var findAllComment =  async () =>{
    var comments = await topicComment.findAll();
    _.each(comments, function(topicComment){
        console.log(topicComment.dataValues);
    });
};

findAllComment();