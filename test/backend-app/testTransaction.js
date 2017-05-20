/**
 * Created by zhouwanli on 20/05/2017.
 */
'use strict';
const em = require('../../backend-app/domain/entityManager');
const forumModal = require('../../backend-app/domain/entity/forums');
const user = require('../../backend-app/domain/entity/users');

var transactionTest = async () =>{
    em.transaction( (t) =>{
        // chain all your queries here. make sure you return them.
        return user.create({
                name: '墨荷琼林',
                email:'1986472333@weibo',
                image: 'http://tva1.sinaimg.cn/crop.0.0.180.180.50/7667298djw1e8qgp5bmzyj2050050aa8.jpg',
                password: 'test- password',
                role: 'TTTT',
                createdAt: new Date(),
                updatedAt: new Date()
        }, {transaction: t}).then(function (user) {
            return forumModal.create({
                title: 'tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt'  ,
                introduction : 'tttt',
                relateCollectionId: -1,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {transaction: t});
        });

    }).then(function (result) {
        console.log(result)
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        console.log(err);
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
};

var notTransactionTest = async(t) =>{
        var u = await user.create({
            name: 'sdf',
            email:'test',
            image: ' 50aa8.jpg',
            password: 'test- password',
            role: 'TTT',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {transaction: t});
        console.log(u.dataValues);
        var f = await forumModal.create({
            title: 'ttttTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'  ,
            introduction : 'tttt',
            relateCollectionId: -1,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {transaction: t});
        console.log(f.dataValues);

}
// notTransactionTest();
transactionTest();