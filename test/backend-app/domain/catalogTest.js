/**
 * Created by zhouwanli on 20/05/2017.
 */
'use strict';
const catalogModal = require('../../../backend-app/domain/entity/catalog');

var createCatalog = async() =>{
    var catalogItme = await catalogModal.create({
        catalogNum: 'catalogNum',
        title: 'title',
        introduction: 'introduction',
        displayOrder: 1,
        collectionType: 'collectionType',
        articleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    console.log(catalogItme.dataValues);
};
createCatalog();