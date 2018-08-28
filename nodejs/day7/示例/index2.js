var http = require('http');
var path = require('path');
var fs = require('fs');

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
}

main(process.argv.slice(2));