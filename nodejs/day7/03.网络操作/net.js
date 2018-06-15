var net = require('net');


net.createServer(function(conn){
    conn.on('data',function(data){
        conn.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World 0'
        ].join('\n'));
    });
}).listen(80);

