var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    
    var opt = {
        hostname: 'www.apengdai.com',
        port: 80,
        path: '/encrypt/getAccessKey?key=18734233259',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }
    console.log(11);
    var main = http.request(opt,function(res){
        console.log(res);
    });
    main.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
      });
    main.write('postData');
    main.end();
    response.write("index.html");
    response.end();
}).listen(3000);