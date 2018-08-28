


//使用流的方式拷贝一个大文件
var fs = require('fs');
var big = fs.createReadStream('../README.md');

big.on('data',function(chunk){
    
})
