'use strict';

angular.module('common').directive('mohePagination', function(){
	return {
		restrict : 'EA',
		templateUrl: '/common/directives/paginationDirective.html',
		replace: true,
		scope:{
			totalPage : '=',
			retrieving : '=',
			loadData : '&'
		},
		link : function(scope){
			scope.page = 1;

			scope.pageCount = scope.totalPage || scope.page;

			scope.isFirst = function(){
				return scope.page === 1;
			};

			scope.isRetrieving = function(){
				return scope.retrieving;
			};

			scope.isLast = function(){
				return scope.page === scope.pageCount;
			};
			scope.firstPage = function(){
				scope.loadData({currentPage: 1});
			};

			scope.previousPage = function(){
				scope.page = scope.isFirst() ? 1 : scope.page - 1;
				scope.loadData({currentPage: scope.page });
			};

			scope.nextPage = function(){
				scope.page = scope.isLast() ? scope.pageCount : scope.page + 1;
				scope.loadData({currentPage: scope.page });
			};

			scope.lastPage = function(){
				scope.page = scope.pageCount;
				scope.loadData({currentPage: scope.page});
			}
		}
	};
});
