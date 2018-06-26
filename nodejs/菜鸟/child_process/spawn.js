var child_process = require('child_process');
var fs = require('fs');

// child_process.spawn() 创建新进程
for(var i=0;i<3;i++){
    var workerProcess = child_process.spawn('node',['support.js', i]);
    workerProcess.stdout.on('data',function(data){
        console.log('stdout: ' + data);
    });

    workerProcess.stderr.on('data',function(data){
        console.log('stder:'+data);
    });

    
    workerProcess.on('close', function (code) {
        console.log('子进程已退出，退出码 '+code);
     });

}