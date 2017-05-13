/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';

{//-------回调函数
    (() => {
        var i = 0;
        function sleep(ms, callback) {
            setTimeout(function () {
                console.log('回调-执行完啦！');
                i++;
                if (i >= 2) callback(new Error('回调-i大于2'), null);
                else callback(i);
            }, ms);
        }
        console.log('回调-before')
        sleep(3000, function (val) {
            console.log(val);
        });
        console.log('回调-after')
    });
}
{//-------回调函数
    (()=>{
        var j = 0;
        function sleep(ms) {
            return new Promise(function(resolve, reject){
                setTimeout(function () {
                    console.log('promise-执行好了');
                    j++;
                    if (j >= 2) resolve('j>=2');
                    else reject(new Error('j==' + j));
                }, ms);
            });

        }
        console.log('promise-before')
        sleep(3000).then(function(val){
            console.log(val);
        }, function(v){
            console.log('v ' + v)
        });
        sleep(1000).then(function(val){
            console.log(val);
        }).catch(function(e){
            console.log('error' + e)
        });
        console.log('promise-after')
    })
}

{// await async

    var k = 0;
    function sleep(ms) {
        return new Promise(function(resolve, reject){
            setTimeout(function () {
                console.log('promise-执行好了');
                k++;
                if (k >= 2) resolve('j>=2');
                else reject(new Error('k==' + k));
            }, ms);
        });

    }
    console.log('主线程--->1');
    (async ()=>{
        try{
            console.log('before await');
            await sleep(1000);
            console.log('after await');
        }catch(e){
            console.log('error ->' + e)
        }

    })();
    console.log('主线程--->2')
}