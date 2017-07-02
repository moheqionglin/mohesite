/**
 * Created by zhouwanli on 19/05/2017.
 */
'use strict';
const collectionModal = require('../../backend-app/dao/commentDao');
const cache = require('../domain/cache/lruCache');

var loadCatalogToCache = async () =>{
    // var booksOrSerializeIds = await collectionModal.findBooksOrSerializeIds();
    // var result = {};
    // for(var booksOrSerializeId in booksOrSerializeIds){
    //     var id = booksOrSerializeIds[booksOrSerializeId];
    //     var bookOrSerilaizeCatalog = await collectionModal.loadBooksOrSerializeCatalog(booksOrSerializeId.id);
    //     var key = 'catalog-' + booksOrSerializeId.id;
    //     cache.set(key, bookOrSerilaizeCatalog);
    //     result[key] = bookOrSerilaizeCatalog;
    // }


};


module.exports = {
    loadCatalogToCache: loadCatalogToCache
};