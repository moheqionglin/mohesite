'use strict';
angular.module('common').directive('moheMarkdownEditor', [function(){
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: '/common/directives/mhMarkdownEditor.html',
        replace: true,
        scope:{
            content: '='
        },
        link: function(scope, element, attrs) {
            var simpleMdInstance = scope.simplemde.instance;

            var clickMd = function(){
                var a = simpleMdInstance.value();
                console.log(a); // => SimpleMDE instance
                // console.log($(element).find('.editor-toolbar').html())
            }

            var init = function(){
                simpleMdInstance.value(scope.content);
                var toolbar = $(element).find('.editor-toolbar');
                toolbar.find('.fa.fa-question-circle').remove();
                toolbar.append('<a title="提交" tabindex="-1" class="fa fa-submit-content" ><span class="glyphicon glyphicon-floppy-saved" ></span></a>');
                toolbar.find('.fa.fa-submit-content').click(clickMd);
            }
            scope.clickMd = clickMd;
            init();

        }
    }
}]);

