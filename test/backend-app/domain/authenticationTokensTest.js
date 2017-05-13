const authToken = require('../../../backend-app/domain/entity/authenticationTokens');
const _ = require('lodash');
authToken.create({
    userId: 1,
    localToken: 'test- localToken',
    expiresAt: new Date(),
    oauth2AuthId: 'test - oauth2AuthId',
    oauth2AuthToken: 'test oauth2AuthToken',
    oauthProvider: 'oauthProvi',
    createdAt: new Date(),
    updatedAt: new Date()
}).then(function (a) {
    console.log(a)
    authToken.findAll().then(function(aths){
        console.log(`find ${aths.length} `);
        _.each(aths, function(ath){
            console.log(ath.dataValues);
        });
    })

})