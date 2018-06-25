var fs = require('fs');

var data = '';

var readerStream = fs.createReadStream('data.txt');

readerStream.setEncoding('utf-8');

readerStream.on('data',function(chunk){
    data += chunk;
})

readerStream.on('end',function(chunk){
    console.log(data);
})

readerStream.on('error', function(err){
    console.log(err.stack);
 });

 //finish - 所有数据已被写入到底层系统时触发。读取的话不会触发
 readerStream.on('finish', function(){
    console.log('finish');
 });
 