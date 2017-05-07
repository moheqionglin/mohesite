angular.module('home', []).config(function($routeProvider){
    $routeProvider.when('/', {
        redirectTo: '/articles'
    });
});
    