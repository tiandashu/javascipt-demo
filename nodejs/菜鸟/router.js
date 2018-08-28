var http = require('http');
var url = require('url');
var querystring = require('querystring');

function router(pathname){
    console.log("处理路由："+pataname);
}


http.createServer(function(request,response){
    var pathname = url.parse(request.url).pathname;
    router(pathname);
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.end('router');
}).listen(3000);