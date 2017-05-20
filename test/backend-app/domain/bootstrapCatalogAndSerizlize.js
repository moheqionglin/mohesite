/**
 * Created by zhouwanli on 20/05/2017.
 */
'use strict';
const co = require('../../../backend-app/domain/entity/collections');
const _ = require('lodash');
const fs = require('fs');
const collectionType = require('../../../backend-app/domain/entity/collectionType');
const catalog = require('../../../backend-app/domain/entity/catalog');

var readFile = function(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
var getImg = () =>{
    var imgPath = 'http://opkhviyav.bkt.clouddn.com/image/test/';
    var index = Math.ceil(Math.random() * 10);
    return imgPath + index + '.jpg';
};

//新增文章 然后建立 目录
var createArticle = async (title, introduction, collectionType, catalogNum) =>{
    var content = await readFile('./all.md');

    var collection = await co.create({
        title: title,
        introduction: introduction,
        content: content,
        readCount: 10,
        image: getImg(),
        collectionType: collectionType,
        status: true,
        catalogNum: catalogNum,
        keyWord: 'camel, REST DSL',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    var result = collection.dataValues;
    return result;
};

var creteCatalog = async (catalogItem) =>{
    var catalogItem = await catalog.create(catalogItem);
    return catalogItem.dataValues;
};
var getCataNumPart = function(num){
    if(num > 100){
        throw new Error('不能超过100');
    }
    return num < 10 ? '00' + num :
            num > 10 && num < 100? '0' + num : num + '';

}
var createABookAndAsignCatalog = async (ctype, bookCount) =>{
    //创建图书
    var catalogBook = [];
    for(var i = 1 ; i<= bookCount; i++){
        var title = '高性能网站-' + ctype + '-' + i ;
        var introduce = '标题: ' + title ;
        var catalogNum = collectionType.catalogID[ctype] + getCataNumPart(i);
        var article = await createArticle(title, introduce, ctype, catalogNum);

        var catalogItem = {
            catalogNum: catalogNum,
            title: title,
            introduction: introduce,
            displayOrder: i,
            collectionType: ctype,
            articleId: article.id,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        var cb = await creteCatalog(catalogItem);
        catalogBook.push(cb);
    }
    console.log(catalogBook);
    //创建一级目录
    var catalogH1Book = [] ;
    for(var index in catalogBook){
        var bookCatalog = catalogBook[index];
        for(var i = 1 ; i<= 9; i++){
            var title = '高性能网站-' + ctype + '-' + bookCatalog.catalogNum + '-一级标题-' + i ;
            var introduce = '标题: ' + title ;
            var catalogNum = bookCatalog.catalogNum + getCataNumPart(i);
            var article = await createArticle(title, introduce, ctype, catalogNum);

            var catalogItem = {
                catalogNum: catalogNum,
                title: title,
                introduction: introduce,
                displayOrder: i,
                collectionType: ctype,
                articleId: article.id,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            var ch1b = await creteCatalog(catalogItem);
            catalogH1Book.push(ch1b);
            console.log(ch1b)
        }
    }
    //创建二级目录
    var catalogH2Book = [];
    for(var index in catalogH1Book){
        var bookCatalog = catalogH1Book[index];
        for(var i = 1 ; i<= 5; i++){
            var title = '高性能网站-' + ctype + '-' + bookCatalog.catalogNum  +'二级-' + i ;
            var introduce = '标题: ' + title ;
            var catalogNum = bookCatalog.catalogNum + getCataNumPart(i);
            var article = await createArticle(title, introduce, ctype, catalogNum);

            var catalogItem = {
                catalogNum: catalogNum,
                title: title,
                introduction: introduce,
                displayOrder: i,
                collectionType: ctype,
                articleId: article.id,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            var ch2b = await creteCatalog(catalogItem);
            catalogH2Book.push(ch2b);
        }
    }
    //创建三级目录
    for(var index in catalogH2Book){
        var bookCatalog = catalogH2Book[index];
        for(var i = 1 ; i<= 5; i++){
            var title = '高性能网站-' + ctype + '-' + bookCatalog.catalogNum  +'三级-' + i ;
            var introduce = '标题: ' + title ;
            var catalogNum = bookCatalog.catalogNum + getCataNumPart(i);
            var article = await createArticle(title, introduce, ctype, catalogNum);

            var catalogItem = {
                catalogNum: catalogNum,
                title: title,
                introduction: introduce,
                displayOrder: i,
                collectionType: ctype,
                articleId: article.id,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            var ch3b = await creteCatalog(catalogItem);
        }
    }

};

// createABookAndAsignCatalog(collectionType.BOOK, 20);
createABookAndAsignCatalog(collectionType.SERIALIZE, 5);