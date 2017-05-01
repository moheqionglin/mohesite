angular.module('books', []).config(function($routeProvider){
    $routeProvider.when('/books', {
        templateUrl : '/books/editBooks.html',
        controller : 'editBooksCtrl'
    });
});