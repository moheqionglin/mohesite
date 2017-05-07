angular.module('statistics', []).config(function($routeProvider){
    $routeProvider.when('/statistics', {
        templateUrl : '/statistics/statistics.html',
        controller : 'StatisticsCtrl'
    });
});