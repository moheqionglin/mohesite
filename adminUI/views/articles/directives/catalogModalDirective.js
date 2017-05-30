/**
 * Created by zhouwanli on 26/05/2017.
 */
'use strict';
angular.module('articles').directive('catalogModal', function(){
    return {
        restrict: 'EA',
        scope:{

        },
        replace: true,
        templateUrl : '/articles/directives/catalogModalDirective.html',
        link : function(scope, elem, attrs){

            scope.$on('event:catalogModal:show', function(data){
                console.log(data)
                scope.type = data.type;
                scope.article = data.article;
                $(elem).modal();

            });
        }
    };
});