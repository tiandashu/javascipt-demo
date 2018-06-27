var http = require('http');
var path = require('path');
var fs = require('fs');
var cp =  require('child_process');
//设计
//从工程角度上讲，没有绝对可靠的系统。即使第二次迭代的代码经过反复检查后能确保没有bug，也很难说是否会因为NodeJS本身，或者是操作系统本身，甚至是硬件本身导致我们的服务器程序在某一天挂掉。因此一般生产环境下的服务器程序都配有一个守护进程，在服务挂掉的时候立即重启服务。一般守护进程的代码会远比服务进程的代码简单，从概率上可以保证守护进程更难挂掉。如果再做得严谨一些，甚至守护进程自身可以在自己挂掉时重启自己，从而实现双保险。

//因此在本次迭代时，我们先利用NodeJS的进程管理机制，将守护进程作为父进程，将服务器程序作为子进程，并让父进程监控子进程的运行状态，在其异常退出时重启子进程。


var MIME = {
    '.css':'text/css',
    '.js':'application/javascript'
}
//解析路由并返回读取文件路径
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
//验证文件路径
function validateFiles(pathnames,callback){
    (function next(i,len){
        if(i<len){
            fs.stat(pathnames[i],function(err,stats){
                if(err){
                    callback(err);
                }else if(!stats.isFile){
                    callback(new Error('not is a file'));
                }else{
                    next(i+1,len)
                }
            })
        }else{
            callback(null,pathnames);
        }
    })(0,pathnames.length)
}
//读取文件
function outputFiles(pathnames,writer){
    (function next(i,len){
        if(i<len){
            var reader = fs.createReadStream(pathnames[i]);
            reader.pipe(writer,{end:false});
            reader.on('end',function(){
                next(i+1,len);
            })
        }else{
            writer.end();
        }
    })(0,pathnames.length)
}
//创建服务并在读取文件的时候响应数据，减少响应的时间并降低内存的开销
function main(argv){
    var config = JSON.parse(fs.readFileSync(argv[0],'utf-8'));
    var port = config.port || 80;
    var root = config.root || '.';
    http.createServer(function(request,response){
        var urlInfo = parseUrl(root,request.url);
        console.log("urlInfo pathnames:"+urlInfo.pathnames);
        validateFiles(urlInfo.pathnames,function(err,pathnames){
            if(err){
                response.writeHead(404);
                response.end(err.message);
            }else{
                response.writeHead(200,{
                    'Content-Type': urlInfo.mime
                });
                outputFiles(pathnames, response);
            }
        })
    }).listen(port);
    //守护进程
    process.on('SIGTERM', function () {
        server.close(function () {
            process.exit(0);
        });
    });
}

main(process.argv.slice(2));

