//需求：开发一个简单的静态资源合并服务器，支持的资源格式包括css、js
//http://assets.example.com/foo/??bar.js,baz.js
//步骤一：解析url
//步骤二：静态文件资源处理
//步骤三：响应请求


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
    parts = url.split('??');
    base = parts[0];
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

