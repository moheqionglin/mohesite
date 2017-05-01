angular.module('serilaze', []).config(function($routeProvider){
    $routeProvider.when('/serilaze', {
        templateUrl : '/serilaze/editSerilaze.html',
        controller: 'editSerilazeCtrl'
    })
});