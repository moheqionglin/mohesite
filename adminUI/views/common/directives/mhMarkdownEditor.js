'use strict';
angular.module('common').directive('moheMarkdownEditor', [function(){
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: '/common/directives/mhMarkdownEditor.html',
        replace: true,
        link: function(scope, element, attrs) {


            scope.clickMd = function(){
                var sd = scope.simplemde.instance;
                var a = sd.value();
                console.log(a); // => SimpleMDE instance

                console.log($(element).find('.editor-toolbar').html())
            }

            var init = function(){
                var toolbar = $(element).find('.editor-toolbar');
                toolbar.find('.fa.fa-question-circle').remove();
                toolbar.append('<a title="提交" tabindex="-1" class="fa fa-submit-content" ><span class="glyphicon glyphicon-floppy-saved" ></span></a>');
                toolbar.find('.fa.fa-submit-content').click(scope.clickMd());

                // toolbar.click(function(){
                //     alert()
                // });
            }
            init();

        }
    }
}]);

