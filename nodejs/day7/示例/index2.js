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