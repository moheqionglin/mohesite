const user = require('../../../backend-app/domain/entity/users');
const _ = require('lodash');
const role = require('../../../backend-app/domain/entity/role');
user.create({
    name: 'test - name',
    email:'test email',
    image: 'test image',
    password: 'test- password',
    role: role.roles.ADMIN_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
}).then(function (u) {
    console.log(u)
    user.findAll().then(function(users){
        console.log(`find ${users.length} `);
        _.each(users, function(user){
            console.log(user.dataValues);
        });
    })

})