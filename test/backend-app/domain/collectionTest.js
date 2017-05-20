const co = require('../../../backend-app/domain/entity/collections');
const _ = require('lodash');
const fs = require('fs');
const collectionType = require('../../../backend-app/domain/entity/collectionType');
const em = require('../../../backend-app/domain/entityManager');
var readFile = function(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, (err, data) => {
            if (err) reject(err);;
            resolve(data);
        });
    });
}

var addBlogCollection = async () =>{
    var content = await readFile('./all.md');
    var imgPath = 'http://opkhviyav.bkt.clouddn.com/image/test/';
        var collection = await co.create({
            title: '如何在Camel中使用swagger实现REST SDL',
            introduction: '随着微服务的推进, REST协议逐渐成为微服务框架中不可缺少的一个法宝,如何快速的开发TEST,如何定义REST SDL成为了非常重要的一环',
            content: content,
            readCount: 10,
            image: imgPath + '2.jpg',
            collectionType: collectionType.BLOG,
            status: true,
            catalogNum:'catalogNum',
            keyWord: 'camel, REST DSL',
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log(collection.dataValues);

};

var addBookOrSerilzeCollection = async (type, imgPath) =>{
    var content = await readFile('./all.md');

    for(var i = 1 ; i < 11 ; i++){
        var collection = await co.create({
            title: '连载教程教程名-三级目录'+ i,
            introduction: '连载教程教程名-三级目录'+ i + '连载教程教程名结合Web2.0以来Web开发领域的最新形势和特点，介绍了网站性能问题的现状、产生的原因，以及改善或解决性能问题的原则。',
            content: content,
            readCount: 12,
            image: imgPath ,
            collectionType: type,
            status: true,
            keyWord: 'camel, REST DSL',
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log(collection.dataValues);
    }

};

var findAllCollection = async () =>{
    var collections = await co.findAll({
    });
    if(collections.length > 0){
        console.log(collections)
    }
    _.each(collections, function(col){
        console.log(col.dataValues);
    });
};
//增加新书
// addBookOrSerilzeCollection(collectionType.SERILAZE, 'http://opkhviyav.bkt.clouddn.com/image/test/b1.jpg' );
// //增加一级目录
// addBookOrSerilzeCollection(collectionType.SERILAZE, 'http://opkhviyav.bkt.clouddn.com/image/test/AWS_ac_ra_ecommerce_marketing_15.gif' );
// //增加二级目录
// for(var i = 1132 ; i<= 1132 ; i++){
//     addBookOrSerilzeCollection(collectionType.SERILAZE, 'http://opkhviyav.bkt.clouddn.com/image/test/AWS_ac_ra_ecommerce_marketing_15.gif' );
// }

// //增加三级目录
// for(var i= 1133; i<= 1142; i++){
//     addBookOrSerilzeCollection(collectionType.SERILAZE, 'http://opkhviyav.bkt.clouddn.com/image/test/AWS_ac_ra_ecommerce_marketing_15.gif' );
// }
// addBlogCollection();

    // addBookOrSerilzeCollection(collectionType.SERIALIZE, 'http://opkhviyav.bkt.clouddn.com/image/test/b1.jpg' );

// addBlogCollection();


(async () =>{
    var result = await co.findAndCountAll({
        attributes: ['id', 'title', 'introduction', 'image', 'readCount','catalogNum', 'collectionType', 'keyWord', 'createdAt' ],
        where:{
            collectionType: collectionType.BOOK,
            'catalogNum': em.where(em.fn('char_length', em.col('catalogNum')), 3)
        },
        limit: 5,
        offset: 0
    });
    _.each(result.rows, function(ite) {
        console.log(ite.dataValues)
    })
})();
