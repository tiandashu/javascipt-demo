var http = require("http");
var url = require("url");

var start = function(route,handle){
    http.createServer(function(resquest,response){
        var postData = "";
        resquest.setEncoding("utf8");
        var pathname = url.parse(resquest.url).pathname;
        resquest.addListener("data",function(postDataChunk){
            postData += postDataChunk;
        })
        resquest.addListener("end",function(){
            route(handle,pathname,response,postData);
        });
       
    }).listen(8888);
}

exports.start = start;