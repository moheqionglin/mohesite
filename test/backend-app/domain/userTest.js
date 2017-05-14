const user = require('../../../backend-app/domain/entity/users');
const _ = require('lodash');
const role = require('../../../backend-app/domain/entity/role');
var addUser = async () => {
    var u = await user.create({
        name: 'test - name',
        email:'test email',
        image: 'test image',
        password: 'test- password',
        role: role.roles.ADMIN_ROLE,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    console.log(u.dataValues);
};

var deleteUser = async () =>{

    var delUser = await user.destroy({
        where :{
            email: 'test email'
        }
    });
    console.log(delUser);
};

var updateUser = async() =>{
    var updateUser = await user.update({
        name: 'test - name',
        email:'test email',
        image: 'test image',
        password: 'test- password',
        role: role.roles.ADMIN_ROLE,
            updatedAt: new Date()
    },
    {
        where: {
            id: 10
        }
    },
    {
        silent: false,
        validate: true
    });
    console.log(updateUser);
}
updateUser();