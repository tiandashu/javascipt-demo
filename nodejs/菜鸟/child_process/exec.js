var fs = require('fs');
var child_process = require('child_process');



//child_process.exec() 执行子进程
for (let i = 0; i < 3; i++) {
    var workerProcess = child_process.exec('node support.js '+i,function(err,stdout,stderr){
        if(err){
            console.log(err.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    })
    workerProcess.on('exit',function(code){
        console.log('子进程已退出，退出码 '+code);
    })
    
}

