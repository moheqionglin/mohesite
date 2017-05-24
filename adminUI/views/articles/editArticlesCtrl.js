angular.module('articles').controller('editArticlesCtrl', function($scope, $http){
    $scope.articles = [];

    $scope.menus = [{
        id: 'blog',
        title: '编程日志'
    },{
        id: 'books',
        title: '跟我读书'
    },{
        id: 'serialize',
        title: '连载教程'
    }];

    $scope.books = [{
        id: 1,
        title: '图书/序列1'
    },{
        id: 2,
        title: '图书/序列2'
    },{
        id: 3,
        title: '图书/序列3'
    },{
        title: '新增图书/序列'
    }];

    $scope.head1s = [{
        id: 1,
        title: '一级标题1'
    },{
        id: 2,
        title: '一级标题2'
    },{
        id: 3,
        title: '一级标题3'
    },{
        title: '新增一级标题'
    }];

    $scope.head2s = [{
        id: 1,
        title: '二级标题1'
    },{
        id: 2,
        title: '二级标题2'
    },{
        id: 3,
        title: '二级标题3'
    },{
        title: '新增二级标题'
    }];

    $scope.head3s = [{
        id: 1,
        title: '三级标题1'
    },{
        id: 2,
        title: '三级标题2'
    },{
        id: 3,
        title: '三级标题3'
    },{
        title: '新增三级标题'
    }];

    var position = {
        menu : 'blog',
        book : 1,
        head1: 1,
        head2: 1,
        head3: 1
    };

    $scope.selectedArticleTitle = function(blog){
        $scope.selectedArticleId = blog.id;
    };


    $scope.selectedMenu = function(){
        console.log($scope.article.position.menu);
        if('blog' === $scope.article.position.menu){
            $scope.article.position.book = undefined;
        }
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

});