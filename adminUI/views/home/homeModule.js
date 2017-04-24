angular.module('home', [])
    .config(function($routeProvider){
        $routeProvider.when('/blogs', {
            templateUrl: '/home/about.html',
            controller: 'appCtrl'
        });
    });