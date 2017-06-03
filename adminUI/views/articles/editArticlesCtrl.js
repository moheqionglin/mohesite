angular.module('articles').controller('editArticlesCtrl', function($scope, $http){
    $scope.articles = [];
    $scope.createdCatalog = {};
    $scope.selectedArticleTitle = function(blog){
        $scope.selectedArticleId = blog.id;
    };


    $scope.selectedCollectionType = function(){
        console.log($scope.article.collectionType);
    };

    $scope.search = function(){
        $scope.articles = [];
        $http.get('/resources/article/search/' + $scope.keyWord).then(function(data){
            $scope.articles.push(data.data);
        });
    };

    $scope.editArticle = function(article){
        $http.get('/resources/article/' + article.id).then(function(data){
            $scope.article = data.data;
        });
    };

    $scope.createArticle = function(){
        $scope.createArticleFlag = true;
        $scope.article = {};
        $scope.createdArticle = {};
        $scope.showCreatedName = false;
        $scope.showCreatedH1 = false;
        $scope.showCreatedH2 = false;
        $scope.showCreatedH3 = false;
        $scope.bookCatalogs = undefined;
        $scope.catalogH1s = undefined;
        $scope.catalogH2s = undefined;
        $scope.catalogH3s = undefined;
    };

    $scope.newBookCatalog = function(){
        console.log('a')
    };

    $scope.generateSubCatalog = function(selectedType){
        switch (selectedType){
            case 'collection':
                var collType = $scope.createdArticle.collectionType;
                if(collType === 'BLOG'){
                    return;
                }
                $http.get('/resources/article/generateSubCatalog/' + collType).then(function(data){
                    $scope.bookCatalogs = data.data;
                });
                break;
            case 'book':
                var selectedCatalogNum = $scope.createdArticle.catalogBook;
                if(!selectedCatalogNum || selectedCatalogNum.length != 5){
                    return;
                }
                $http.get('/resources/article/generateSubCatalog/' + selectedCatalogNum).then(function(data){
                    $scope.catalogH1s = data.data;
                });
                break;
            case 'h1':
                var selectedCatalogNum = $scope.createdArticle.catalogH1;
                if(!selectedCatalogNum || selectedCatalogNum.length != 8){
                    return;
                }
                $http.get('/resources/article/generateSubCatalog/' + selectedCatalogNum).then(function(data){
                    $scope.catalogH2s = data.data;
                });
                break;
            case 'h2':
                var selectedCatalogNum = $scope.createdArticle.catalogH2;
                if(!selectedCatalogNum || selectedCatalogNum.length != 11){
                    return;
                }
                $http.get('/resources/article/generateSubCatalog/' + selectedCatalogNum).then(function(data){
                    $scope.catalogH3s = data.data;
                });
                break;

        }

    };


    $scope.displayH1 = function(){
        var displayH1 = !$scope.showCreatedName && ($scope.createdArticle.collectionType == '01' ||
            $scope.createdArticle.collectionType == '02') && $scope.bookCatalogs && $scope.bookCatalogs.length > 0;
        return displayH1;
    };

    $scope.displayH2 = function(){
        var displayH2 = !$scope.showCreatedName && !$scope.showCreatedH1 && ($scope.createdArticle.collectionType == '01' ||
            $scope.createdArticle.collectionType == '02') && $scope.catalogH1s && $scope.catalogH1s.length > 0;
        return displayH2;
    };

    $scope.displayH3 = function(){
        var displayH3 = !$scope.showCreatedName && !$scope.showCreatedH1 && !$scope.showCreatedH2 && ($scope.createdArticle.collectionType == '01' ||
            $scope.createdArticle.collectionType == '02') && $scope.catalogH2s && $scope.catalogH2s.length > 0;
        return displayH3;
    };

    $scope.showCreatedNameInput = function(){
        $scope.showCreatedName = true;
    };
    $scope.showH1Input = function(){
        $scope.showCreatedH1 = true;
    };
    $scope.showH2Input = function(){
        $scope.showCreatedH2 = true;
    };
    $scope.showH3Input = function(){
        $scope.showCreatedH3 = true;
    };

    var submitCreateArticle = function(content){
        var catalog = {
            collectionType: $scope.createdArticle.collectionType
        };
        if($scope.createdArticle.collectionType !== 'BLOG'){
            var validCheck = true;
            if($scope.showCreatedName){
                catalog.bookName = $scope.article.title;
                catalog.newBook = true;
                validCheck = !!catalog.bookName;
            }else if($scope.showCreatedH1){
                catalog.bookName = $scope.createdArticle.catalogBook;
                catalog.h1 = $scope.article.title;
                catalog.newH1 = true;
                validCheck = !!catalog.bookName || !!catalog.h1;
            }else if($scope.showCreatedH2){
                catalog.bookName = $scope.createdArticle.catalogBook;
                catalog.h1 = $scope.createdArticle.catalogH1;
                catalog.h2 = $scope.article.title;
                catalog.newH2 = true;
                validCheck = !!catalog.bookName || !!catalog.h1 || !!catalog.h2;
            }else if($scope.showCreatedH3){
                catalog.bookName = $scope.createdArticle.catalogBook;
                catalog.h1 = $scope.createdArticle.catalogH1;
                catalog.h2 = $scope.createdArticle.catalogH2;
                catalog.h3 = $scope.article.title;
                catalog.newH3 = true;
                validCheck = !!catalog.bookName || !!catalog.h1 || !!catalog.h2 || !!catalog.h3;
            }
            if(!validCheck){
                return;
            }
        }


        console.log(catalog);
        console.log('-----')
        $scope.article.content = content;
        $scope.article.readCount = 0;
        $scope.article.collectionType = $scope.createdArticle.collectionType != 'BLOG' ?
            ($scope.createdArticle.collectionType === '01' ? 'BOOK' :
            $scope.createdArticle.collectionType === '02' ? 'SERIALIZE' : '') :
            $scope.createdArticle.collectionType;;
        
        console.log($scope.article)

        $http.post('/resources/article/create',{
            article: $scope.article,
            catalog: catalog
        });
    };

    var submitModifyArticle = function(content){
        $scope.article.content = content;
        $http.post('/resources/article/modify',{
            article: $scope.article
        });
    };

    $scope.submitArticle = function(submitArticle){
        if($scope.createArticleFlag){
            submitCreateArticle(submitArticle);
        }else{
            submitModifyArticle(submitArticle);
        }
    };

    $scope.deleteArticle = function(article){
        $http.get('/resources/article/delete/' + article.id);
    };

    $scope.moveArticle = function(article){
        $scope.$broadcast('event:catalogModal:show', article);
    };


});