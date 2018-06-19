
//同步方式下一般按以下方式编写代码： 函数返回值
// function fn1(name){
//     console.log(name);
//     return name+"是个王八";
// }

// function fn(callback){
//     return callback('tyy');
// }

// var a = fn(fn1);
// console.log(a);

//异步一般使用回调函数的写法
function test(name,callback){
    try{
        if(name=='tyy'){
            callback(null,name+"是个王八"); 
        }else if(name == 'err'){
            throw Error('this is a err');
        }else{
            callback(null,name+"是个好人"); 
        }
    }catch(e){
        callback(e);
    }
    
}

test(process.argv.slice(2),function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})
