/**
 * Created by zhouwanli on 26/05/2017.
 */
'use strict';
angular.module('articles').directive('catalogModal', function($http){
    return {
        restrict: 'EA',
        scope:{

        },
        replace: true,
        templateUrl : '/articles/directives/catalogModalDirective.html',
        link : function(scope, elem, attrs){

            scope.movedArticle = {};
            scope.article = {};
            scope.$on('event:catalogModal:show', function(event, data){
                scope.collectionType = data.collectionType;
                scope.movedArticle = {};
                if('BLOG' !== scope.collectionType){
                    $http.get('/resources/article/catalog/' + data.catalogNum).then(function(data){
                        scope.article = data.data;
                        scope.article.collectionType = scope.collectionType;
                    });
                }
                $(elem).modal();
            });

            scope.isOriginH1Book = function(){
                return !scope.article.h3Name && !scope.article.h2Name && !scope.article.h1Name && scope.article.bookName;
            };

            scope.isOriginH1 = function(){
                return !scope.article.h3Name && !scope.article.h2Name && scope.article.h1Name;
            };

            scope.isOriginH2 = function(){
                return !scope.article.h3Name && scope.article.h2Name && scope.article.h1Name;
            };

            scope.isOriginH3 = function(){
                return scope.article.h3Name && scope.article.h2Name && scope.article.h1Name;
            };

            scope.generateSubCatalog = function(selectedType){
                switch (selectedType){
                    case 'collection':
                        var collType = scope.movedArticle.collectionType;
                        if(collType === 'BLOG'){
                            return;
                        }
                        $http.get('/resources/article/generateSubCatalog/' + collType).then(function(data){
                            scope.bookCatalogs = data.data;
                        });
                        break;
                    case 'book':
                        var selectedCatalogNum = scope.movedArticle.catalogBook;
                        if(!selectedCatalogNum || selectedCatalogNum.length != 5){
                            return;
                        }
                        $http.get('/resources/article/generateSubCatalog/' + selectedCatalogNum).then(function(data){
                            scope.catalogH1s = data.data;
                        });
                        break;
                    case 'h1':
                        var selectedCatalogNum = scope.movedArticle.catalogH1;
                        if(!selectedCatalogNum || selectedCatalogNum.length != 8){
                            return;
                        }
                        $http.get('/resources/article/generateSubCatalog/' + selectedCatalogNum).then(function(data){
                            scope.catalogH2s = data.data;
                        });
                        break;
                    case 'h2':
                        var selectedCatalogNum = scope.movedArticle.catalogH2;
                        if(!selectedCatalogNum || selectedCatalogNum.length != 11){
                            return;
                        }
                        $http.get('/resources/article/generateSubCatalog/' + selectedCatalogNum).then(function(data){
                            scope.catalogH3s = data.data;
                        });
                        break;

                }

            };

            scope.displayH1 = function(){
                var displayH1 = (scope.movedArticle.collectionType == '01' ||
                    scope.movedArticle.collectionType == '02') && scope.bookCatalogs && scope.bookCatalogs.length > 0;
                return displayH1;
            };

            scope.displayH2 = function(){
                var displayH2 = (scope.movedArticle.collectionType == '01' ||
                    scope.movedArticle.collectionType == '02')
                    && scope.catalogH1s && scope.catalogH1s.length > 0 && scope.showH2 && !scope.isOriginH1();
                return displayH2;
            };

            scope.displayH3 = function(){
                var displayH3 = (scope.movedArticle.collectionType == '01' ||
                    scope.movedArticle.collectionType == '02')
                    && scope.catalogH2s && scope.catalogH2s.length > 0 && scope.showH3 && (!scope.isOriginH2() || !scope.isOriginH1());
                return displayH3;
            };

            scope.expandSubSelection = function(type){
                if(type === 'h2'){
                    scope.showH2 = true;
                    scope.generateSubCatalog('h1')
                }else if (type === 'h3') {
                    scope.showH3 = true;
                    scope.generateSubCatalog('h2')
                }
            };

            scope.submitCatalog = function(){
                console.log('Original catalog: ' + JSON.stringify(scope.article));
                console.log('modified catalog: ' + JSON.stringify(scope.movedArticle))
                $http.post('/resources/change/catalog', {originalCatalog: scope.article, modifiedCatalog: scope.movedArticle})
                    .success(function(data){
                        scope.success = true;
                        scope.error = false;
                    }).error(function(data){
                    scope.success = false;
                    scope.error = true;

                });
            };
        }
    };
});