const authToken = require('../../../backend-app/domain/entity/authenticationTokens');
const _ = require('lodash');
var addAuthUser = async () =>{
    var authUser = await authToken.create({
        userId: 1,
        localToken: 'test- localToken',
        expiresAt: new Date(),
        oauth2AuthId: 'test - oauth2AuthId',
        oauth2AuthToken: 'test oauth2AuthToken',
        oauthProvider: 'oauthProvi',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    console.log();
};

var findAdllAuthUser = async () =>{
    var aus = await authToken.findAll();
    _.each(aus, function(ath){
        console.log(ath.dataValues);
    });
};

var delteAuthUser = async () =>{
    var delAs = await authToken.destroy({
        where : {
            localToken: 'test- localToken'
        }
    });
    console.log(delAs);
};

delteAuthUser();
