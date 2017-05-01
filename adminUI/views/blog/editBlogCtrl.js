angular.module('blog').controller('editBlogCtrl', function($scope){
    $scope.blogs = [{
        id : 1,
        title : '1 如何在camel中使用ftp上传工具上传文件传文件传文件传文件'
    },{
        id : 2,
        title : '2 如何在camel中使用ftp上传工具上传文件传文件传文件传文件'
    },{
        id : 3,
        title : '3 如何在camel中使用ftp上传工具上传文件传文件传文件传文件'
    }];

    $scope.selectedBlogTitle = function(blog){
        $scope.selectedBlogId = blog.id;
    }
});