global.name = "tian";

//全局的api
//console.log(__dirname);
//console.log(__filename);
process.title = "tianlu";
console.log('进程号:', process.pid);

setTimeout(function(){

},200000)
process.on('exit',function(code){
    console.log('进程号:', process.pid);
    console.log('退出码为:', code);
})
console.log(process.platform);
console.log(process.cwd());
console.log(process.memoryUsage());
console.log(process.uptime());