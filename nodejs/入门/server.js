var http = require("http");
var url = require("url");

var start = function(route,handle){
    http.createServer(function(request,response){
        var pathname = url.parse(request.url).pathname;
        var content = route(handle,pathname);
        
        response.writeHead(200,{"content-Type":"text/plain"});
        response.write(content);
        response.end();
    }).listen(8888);
}

exports.start = start;