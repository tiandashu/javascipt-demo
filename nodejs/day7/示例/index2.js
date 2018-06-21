//需求：开发一个简单的静态资源合并服务器，支持的资源格式包括css、js
//http://assets.example.com/foo/??bar.js,baz.js
//步骤一：解析url
//步骤二：静态文件资源处理
//步骤三：响应请求


//优化：把读取文件的操作由串行处理改为并行处理。但是别这样做，因为对于机械磁盘而言，因为只有一个磁头，尝试并行读取文件只会造成磁头频繁抖动，反而降低IO效率。而对于固态硬盘，虽然的确存在多个并行IO通道，但是对于服务器并行处理的多个请求而言，硬盘已经在做并行IO了，对单个请求采用并行IO无异于拆东墙补西墙。因此，正确的做法不是改用并行IO，而是一边读取文件一边输出响应，把响应输出时机提前至读取第一个文件的时刻。这样调整后，整个请求处理过程变成下边这样。


var fs = require('fs');
var path = require('path');
var http = require('http');

var MIME = {
    '.css':'text/css',
    '.js':'application/javascript'
}

//步骤一：解析url
function parseURL(root,url){
    var base,pathnames,parts;
    if(url.indexOf('??')==-1){
        url = url.replace('/','??');
    }
    console.log(url);
    parts = url.split('??');
    base = parts[0];
    console.log(base);
    pathnames = parts[1].split(',').map(function(value){
        return path.join(root, base, value);
    })
    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    }
}


//步骤二：静态文件资源处理
function combinFiles(pathnames,callback){
    var output = [];
    //串行的方式执行异步程序
    (function next(i,len){
        if(i < len){
            fs.readFile(pathnames[i],function(err,data){
                if(err){
                    callback(err);
                }else{
                    output.push(data);
                    next(i+1,len)
                }
            })
        }else{
            callback(null,Buffer.concat(output));
        }
    })(0,pathnames.length)
}

//步骤三：响应请求
function main(argv){
    var config = JSON.parse(fs.readFileSync(argv[0],'utf-8'));
    var root = config.root || '.';
    var port = config.port || 80;
    http.createServer(function(req,res){
        var urlInfo = parseURL(root,req.url);
        combinFiles(urlInfo.pathnames,function(err,data){
            if(err){
                res.writeHead(404);
                res.end(err.message);
            }else{
                res.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                res.end(data);
            }
        })
    }).listen(port);
}

main(process.argv.slice(2));

