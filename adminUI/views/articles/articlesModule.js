angular.module('articles', []).config(function($routeProvider){
    $routeProvider.when('/articles', {
        templateUrl:'/articles/editArticles.html',
        controller:'editArticlesCtrl'
    })
});
