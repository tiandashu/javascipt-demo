var http = require('http');
var path = require('path');
var fs = require('fs');

var MIME = {
    '.css':'text/css',
    '.js':'application/javascript'
}

function parseUrl(root,url){
    var base,pathnames,parts;
    if(url.indexOf('??')===-1){
        url = url.replace('/','/??');
    }

    parts = url.split('??');
    base = parts[0];
    console.log('base:'+base);
    pathnames = parts[1].split(',').map(function(value){
        return path.join(root,base,value);
    })

    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames:pathnames
    }
}

function combineFiles(pathnames,callback){
    var output = [];
    (function next(i,len){
        if(i<len){
            fs.readFile(pathnames[i],function(err,data){
                if(err){
                    callback(err);
                }else{
                    output.push(data);
                    next(i+1,len);
                }
            })
        }else{
            callback(null,Buffer.concat(output));
        }
    })(0,pathnames.length)
}


function main(argv){
    var config = JSON.parse(fs.readFileSync(argv[0],'utf-8'));
    var port = config.port || 80;
    var root = config.root || '.';
    http.createServer(function(request,response){
        var urlInfo = parseUrl(root,request.url);

        combineFiles(urlInfo.pathnames,function(err,data){
            if(err){
                response.writeHead(404);
                response.end(err.message);
            }else{
                response.writeHead(200,{
                    'Content-Type': urlInfo.mime
                });
                response.end(data);
            }
        })



    }).listen(port);

}

main(process.argv.slice(2));

//可以看到，第一版代码依次把请求的文件读取到内存中之后，再合并数据和输出响应。这会导致以下两个问题：
//1. 当请求的文件比较多比较大时，串行读取文件会比较耗时，从而拉长了服务端响应等待时间。
//2. 由于每次响应输出的数据都需要先完整地缓存在内存里，当服务器请求并发数较大时，会有较大的内存开销。

//对于第一个问题，很容易想到把读取文件的方式从串行改为并行。但是别这样做，因为对于机械磁盘而言，因为只有一个磁头，尝试并行读取文件只会造成磁头频繁抖动，反而降低IO效率。而对于固态硬盘，虽然的确存在多个并行IO通道，但是对于服务器并行处理的多个请求而言，硬盘已经在做并行IO了，对单个请求采用并行IO无异于拆东墙补西墙。因此，正确的做法不是改用并行IO，而是一边读取文件一边输出响应，把响应输出时机提前至读取第一个文件的时刻。这样调整后，整个请求处理过程变成下边这样。
//按上述方式解决第一个问题后，因为服务器不需要完整地缓存每个请求的输出数据了，第二个问题也迎刃而解。