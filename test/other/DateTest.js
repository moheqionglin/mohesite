/**
 * Created by zhouwanli on 15/05/2017.
 */
'use strict';

var testDate = (dateStr) =>{
    var date = new Date(dateStr);
    var today = new Date();

    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth() + 1;
    var dateDate = date.getDate();
    var dateHour = date.getHours();
    var dateMinutes = date.getMinutes();
    var minusTime = today.getTime() - date.getTime();
    if(minusTime < 1000 * 60 * 60){//小时相同 3分钟前
        return (today.getMinutes() - dateMinutes)  + '分钟前';
    }
    if(minusTime < 1000 * 60 * 60 * 24){//日相同 3小时前
        return (today.getHours() - dateHour) + '小时前';
    }
    if(minusTime < 1000 * 60 * 60 * 24 * 10){//月份相同 6天前
        return (today.getDate() - dateDate) + '天前';
    }
    if(dateYear === today.getFullYear()){//年相同 3月5日 12:30
        return dateMonth + '月' + dateDate +'日 ' + dateHour + ':' +  date.getMinutes();
    }
    //2015-01-03 12:40
    return dateYear + '-' + dateMonth + '-' + dateDate + ' ' + dateHour + ':' + dateMinutes;
};

console.log(testDate('Mon May 15 2017 22:01:04 GMT+0800 (CST)'));
console.log(testDate('Mon May 15 2017 12:01:04 GMT+0800 (CST)'));
console.log(testDate('Wed May 10 2017 22:21:09 GMT+0800 (CST)'));
console.log(testDate('Wed Mar 01 2017 22:24:19 GMT+0800 (CST)'));
console.log(testDate('Mon April 01 2007 12:01:04 GMT+0800 (CST)'));