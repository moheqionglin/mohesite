const topic = require('../../../backend-app/domain/entity/topic');
const _ = require('lodash');
topic.create({
    userId: 2,
    collectionId: 3,
    title: ' test title',
    content: 'test content',
    createdAt: new Date(),
    updatedAt: new Date()
}).then(function (t) {
    console.log(t)
    topic.findAll().then(function(topics){
        console.log(`find ${topics.length} `);
        _.each(topics, function(topic){
            console.log(topic.dataValues);
        });
    })

})