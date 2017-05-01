angular.module('common')
    .directive('mohePopover', function($compile){
    return {
        restrict: 'E',
        transclude:{
            btn : 'mohePopoverBtn',
            cnt : 'mohePopoverContent'
        },
        templateUrl: '/common/directives/uiPopoverDirective.html',
        link: function(scope, elem, attrs){
            var properBtn = $(elem).find('.proper-btn');
            var properContent = elem.find('.proper-content');
            var properCfg = {
                html: true,
                content: $compile(properContent.html())(scope)
            };
            if(attrs.title){
                properCfg.title = attrs.title || 'asdf';
            }
            properContent.remove();

            properBtn.popover(properCfg);
            properBtn.on('shown.bs.popover', function () {
                $('body').one('click', function(){
                    properBtn.popover('hide');
                });
            });

        }
    }
});