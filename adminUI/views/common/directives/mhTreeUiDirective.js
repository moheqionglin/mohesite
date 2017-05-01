'use strict';
angular.module('books').directive('moheTree', function(){
    return {
        templateUrl : '/common/directives/mhTreeUiDirective.html',
        replace : true,
        restrict: 'E',
        scope : {
            data: '='
        },
        controller : ['$scope', '$rootScope', function($scope, $rootScope){
            $scope.remove = function (scope) {
                scope.remove();
            };

            $scope.toggle = function (scope) {
                scope.toggle();
            };

            $scope.moveLastToTheBeginning = function () {
                var a = $scope.data.pop();
                $scope.data.splice(0, 0, a);
            };

            $scope.newSubItem = function (scope) {
                var nodeData = scope.$modelValue;
                nodeData.nodes.push({
                    id: nodeData.id * 10 + nodeData.nodes.length,
                    title: nodeData.title + '.' + (nodeData.nodes.length + 1),
                    nodes: []
                });
            };

            $scope.collapseAll = function () {
                $rootScope.$broadcast('angular-ui-tree:collapse-all');
            };

            $scope.expandAll = function () {
                $rootScope.$broadcast('angular-ui-tree:expand-all');
            };

        }],
        link: function(scope, elem, attrs){

        }
    };
});