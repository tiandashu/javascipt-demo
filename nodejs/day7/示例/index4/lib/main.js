
var cp = require('child_process');

//守护进程
var worker;
function spawn(server, config){
    worker = cp.spawn('node',[server, config]);
    worker.on('exit',function(code){
        if(code!==0){
            spawn(server, config);
        }
    })
}

function main(argv){
    //注意 ../lib/index.js路径的问题，这个路径和node执行时候的路径是相对的
    //比如在inde4文件夹下执行 node lib/main.js conf/config.json    此处应改为 ../lib/index.js
    //比如在inde4/bin文件夹下执行 node ../lib/main.js ../conf/config.json    此处应改为 ../lib/index.js
    spawn('../lib/index.js', argv[0]);
    console.log(process.pid, worker.pid);
    process.on('SIGTERM',function(){
        worker.kill();
        process.exit(0);
    })
}

main(process.argv.slice(2));
