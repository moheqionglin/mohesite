/**
 * Created by zhouwanli on 21/05/2017.
 */
'use strict';
$(document).ready(
    function(){
        var typeNumber = 4;
        var errorCorrectionLevel = 'L';
        var qr = qrcode(typeNumber, errorCorrectionLevel);
        var currentURL= window.location.href;
        qr.addData(currentURL);
        qr.make();
        document.getElementById('placeHolder').innerHTML = qr.createImgTag();
        //load comment
        $(".article-topic-div").on('click', '.pagination a', function(){
            $('.article-topic-div').load(this.href);
            return false;
        });

    }
);

function submitArticleComment(_this, collectionType, collectionId){
    var node = $(_this).parents(".article-comment");
    var commentNode = node.find("textarea");
    var titleNode = node.find("input");
    if(!commentNode.val() || !titleNode.val() || titleNode.val().length > 32 || commentNode.val() .length > 1024){
        return false;
    }

    var postData = {
        collectionId: collectionId,
        collectionType: collectionType,
        title: titleNode.val(),
        comment: commentNode.val()

    }
    $.post("/site/comment/submit", postData,function(result){
        node.find('.result-message').removeClass('color-danger').text('');
        loadTopic(collectionId);
        commentNode.val('');
        titleNode.val('');
    }).error(function(result) {
        node.find('.result-message').removeClass('color-logo-green')
            .addClass('color-danger').text('提交失败请重试');
    });

}

function loadTopic(articleId){
    $('.article-topic-div').load('/site/collection/' + articleId + '/comments/1/topic.html');
}

function submitTopicComment(_this, topicId){
    var textAreaNode = $(_this).siblings('textarea');
    if(!textAreaNode.val()){
        return false;
    }
    $.post("/site/comment/submit", postData,function(result){
        node.find('.result-message').removeClass('color-danger').text('');
        loadTopic(collectionId);
        commentNode.val('');
        titleNode.val('');
    }).error(function(result) {
        node.find('.result-message').removeClass('color-logo-green')
            .addClass('color-danger').text('提交失败请重试');
    });
}