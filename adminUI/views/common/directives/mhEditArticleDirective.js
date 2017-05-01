'use strict';
angular.module('common').directive('moheArticle', function(){
    return {
        restrict : 'E',
        replace : true,
        templateUrl : '/common/directives/mhEditArticleDirective.html',
        scope : {},
        link : function(scope){
            
        }
    };
});