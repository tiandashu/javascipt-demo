//需求：开发一个简单的静态资源合并服务器，支持的资源格式包括成寿寺、js

var fs = require('fs');
var path = require('path');
var http = require('http');

var MIME = {
    '.css':'text/css',
    '.js':'application/javascript'
}

function combinFiles(pathnames,callback){
    var output = [];
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

function main(argv){
    var config = JSON.parse(fs.readFileSync(argv[0],'utf-8'));
    console.log(config);
}
main(process.argv.slice(2));

function parseURL(root,url){
    var base,pathnames,parts;
}