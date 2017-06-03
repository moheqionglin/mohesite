/**
 * Created by zhouwanli on 03/06/2017.
 */
'use strict';
var isBook = (article) =>{
    return article.bookName && !article.h1Name && !article.h2Name && !article.h3Name;
};
var isH1 = (article) =>{
    return article.bookName && article.h1Name && !article.h2Name && !article.h3Name;
};
var isH2 = (article) =>{
    return article.bookName && article.h1Name && article.h2Name && !article.h3Name;
};
var isH3 = (article) =>{
    return article.bookName && article.h1Name && !article.h2Name && article.h3Name;
};
module.exports={
    isBook : isBook,
    isH1 : isH1,
    isH2 : isH2,
    isH3 : isH3
}