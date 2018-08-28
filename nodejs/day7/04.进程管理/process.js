
const util = require('util');


function main(){

    console.log(process.argv);
    //主动退出程序并指定状态码22  后面程序不再运行
    process.exit(22);
    console.log('end...')
}
// main();

//标准输出
function log(){
    process.stdout.write( util.format.apply(util,arguments)+'\n');
}

// log({a:'a'},44)




