angular.module('articles').controller('editArticlesCtrl', function($scope){
    $scope.articles = [{
        id : 1,
        title : '1 如何在camel中使用ftp上传工具上传文件传文件传文件传文件'
    },{
        id : 2,
        title : '2 如何在camel中使用ftp上传工具上传文件传文件传文件传文件'
    },{
        id : 3,
        title : '3 如何在camel中使用ftp上传工具上传文件传文件传文件传文件'
    }];

    $scope.selectedArticleTitle = function(blog){
        $scope.selectedArticleId = blog.id;
    }
});