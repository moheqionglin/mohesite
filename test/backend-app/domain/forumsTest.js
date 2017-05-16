/**
 * Created by zhouwanli on 16/05/2017.
 */
'use strict';
const forumModal = require('../../../backend-app/domain/entity/forums');

var addForums = async(forum) =>{
    var forum = await forumModal.create(forum);
    console.log(forum.dataValues)
};

addForums({
    title: '编程日志',
    description : '记录编程过程中遇到的各种问题',
    createdAt: new Date(),
    updatedAt: new Date()
});
for(var i = 1 ; i < 15 ; i++){
    addForums({
        title: '跟我读书-' + i,
        description : '记录跟我读书-' + i + '教程编程过程中遇到的各种问题',
        createdAt: new Date(),
        updatedAt: new Date()
    });
}
for(var i = 1 ; i < 15 ; i++){
    addForums({
        title: '连载教程-' + i,
        description : '记录连载教程-' + i + '教程编程过程中遇到的各种问题',
        createdAt: new Date(),
        updatedAt: new Date()
    });
}
