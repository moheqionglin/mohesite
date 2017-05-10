const topicComment = require('../../../backend-app/domain/entity/topicComment');
const _ = require('lodash');

topicComment.create({
    userId: 4,
    topicId: 1,
    content: 'test content',
    createdAt: new Date(),
    updatedAt: new Date()
}).then(function (c) {
    console.log(c)
    topicComment.findAll().then(function(topicComments){
        console.log(`find ${topicComments.length} `);
        _.each(topicComments, function(topicComment){
            console.log(topicComment.dataValues);
        });
    })

})