var http = require('http');
var url = require('url');


http.createServer(function (request, response) {
    console.log(request.url);
    console.log(url.parse(request.url));
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write("hello server");
    response.end();


}).listen(3000);

