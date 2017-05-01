'use strict';
angular.module('books').controller('editBooksCtrl', function($scope){
    $scope.books = [{
        id : 1,
        title : '1 如何在camel中使用ftp上传工具上传文件传文件传文件传文件'
    },{
        id : 2,
        title : '2 如何在camel中使用ftp上传工具上传文件传文件传文件传文件'
    },{
        id : 3,
        title : '3 如何在camel中使用ftp上传工具上传文件传文件传文件传文件'
    }];

    $scope.data = [
        {
            "id": 1,
            "title": "node1",
            "nodes": [
                {
                    "id": 12,
                    "title": "node1.2",
                    "nodes": []
                },
                {
                    "id": 11,
                    "title": "node1.1",
                    "nodes": [
                        {
                            "id": 2,
                            "title": "node2",
                            "nodrop": true,
                            "nodes": []
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "title": "node3",
            "nodes": [
                {
                    "id": 31,
                    "title": "node3.1",
                    "nodes": []
                }
            ]
        }
    ];
    $scope.selectedBooksTitle = function(book){
        $scope.selectedBookId = book.id;
    }
});