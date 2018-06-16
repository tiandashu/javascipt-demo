var fs = require('fs');

//获取文件的属性
// fs.stat('./fs.js',function(err,stats){
//     if(err) {
//         console.log(err);
//         return false;
//     };
//     console.log(stats);
// });


//获取一个文件内容
// fs.readFile('./fs.js', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data.toString());
//     }
// });

//获取文件内容对应的同步操作
try{
    var data = fs.readFileSync('./fs.js');
    console.log(data.toString());
}catch(e){
    console.log(e);
}
