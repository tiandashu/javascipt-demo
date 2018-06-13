var fs = require('fs');

function copy(src,dis){
    fs.writeFileSync(dis,fs.readFileSync(src));
}

function main(argv){
    copy(argv[0],argv[1]);
}
main(process.argv.slice(2));