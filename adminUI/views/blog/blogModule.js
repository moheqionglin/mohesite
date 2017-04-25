angular.module('blog', []).config(function($routeProvider){
    $routeProvider.when('/blogs', {
        templateUrl:'/blog/editBlog.html',
        controller:''
    })
});
