var fs = require('fs');

//读取数据流
// var data = '';
// var readerStream = fs.createReadStream('data/input.txt');
// readerStream.setEncoding('utf-8');
// readerStream.on('data',function(chunk){
//     data += chunk;
// })
// readerStream.on('end',function(chunk){
//     console.log(data);
// })
// readerStream.on('error', function(err){
//     console.log(err.stack);
//  });
//  //finish - 所有数据已被写入到底层系统时触发。读取的话不会触发
//  readerStream.on('finish', function(){
//     console.log('finish');
//  });
 

//写入数据
// var data = 'write a msg bu tl';
// var writerStream = fs.createWriteStream('data/output.txt');

// writerStream.write(data,'utf-8');
// writerStream.end();
// writerStream.on('finish',function(){
//     console.log('写入完成！');
// })
// writerStream.on('error', function(err){
//     console.log(err.stack);
// });

//管道流
// var readerStream = fs.createReadStream('data/input.txt');
// var writeStream = fs.createWriteStream('data/output2.txt');
// readerStream.pipe(writeStream);

//链式
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('data/input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('data/input.txt.gz'));
  
console.log("文件压缩完成。");