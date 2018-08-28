
// 遍历数组的同步方法
var arr = [1,2,3,4,5,65,7600,7,8];
var len = arr.length;
var i = 0;
var j = 0;

for(i;i<len;i++){

    //如果函数是异步执行的，以上代码就无法保证循环结束后所有数组成员都处理完毕了。
}

//如果数组成员必须一个接一个串行处理，则一般按照以下方式编写异步代码：
function ts(ms,callback){
    setTimeout(function(){
        try{
            callback(null,ms); 
        }catch(e){
            callback(e);
        }
    },ms)
   
}
// (function next(i,len,callback){
//     if(i<len){
//         ts(arr[i],function(err,data){
//             if(err) return err;
//             console.log(data);
//             next(i+1,len,callback);
//         })
//     }else{
//         callback();
//     }
// })(0,arr.length,function(){
//     console.log('所有的异步程序串行处理完成了！可以执行别的操作了');
// })


//所有的异步操作改成并行处理的，但是后续的程序仍然需要异步完成后再执行
(function(i,len,count,callback){
    for(i;i<len;i++){
        (function(i){
            ts(arr[i],function(err,data){
                if(err) return err;
                console.log(data);
                if(++count==len){
                    callback();
                }
            })
        })(i)
    }
})(0,arr.length,0,function(){
    console.log('所有的异步程序并行处理完成了！可以执行别的操作了');
});
