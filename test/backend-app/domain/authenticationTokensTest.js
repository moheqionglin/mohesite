const authToken = require('../../../backend-app/domain/entity/authenticationTokens');
const _ = require('lodash');
var addAuthUser = async () =>{
    var date = new Date();
    date.setTime(date.getTime() + 60 * 60 * 1000 * 7 * 24);
    var authUser = await authToken.create({
        userId: 1,
        localToken: 'df681250-3b0e-11e7-96c4-af64547e098c',
        expiresAt: date,
        oauth2AuthId: '1986472333',
        oauth2AuthToken: '2.002MC8KC0pzhTy469560df73LieHXC',
        oauthProvider: 'weibo',
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

addAuthUser();
