

var fs = require('fs');

function copy(src,dis){
    //同步api，不适合大文件的拷贝，内存会爆仓。
    fs.writeFileSync(dis,fs.readFileSync(src));
}
// console.log(process.argv);
//[ 'D:\\WebTools\\nodejs\\node.exe','E:\\前端资料\\javascipt\\nodejs\\day7\\02.文件操作\\copy' ]
function main(argv){
    copy(process.argv[0],process.argv[1]);
}
// main(process.argv);