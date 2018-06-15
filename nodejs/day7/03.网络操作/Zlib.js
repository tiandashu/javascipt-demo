var http = require('http');
var zlib = require('zlib');

//判断客户端是否支持gzip压缩并返回数据
http.createServer(function(req,res){

    var data = '';
    var i = 1024;
    while(i--){
        data += i+',';
    }
    if( (req.headers['accept-encoding'] || '').indexOf('gzip')!==-1){
        zlib.gzip(data,function(err,data){
            res.writeHead(200,{
                'Content-Type':'text/plain',
                'Content-Encoding':'gzip'
            })
            res.end(data);
        })
        
    }else{
        res.writeHead(200,{
            'Content-Type':'text/plain',
            'Content-Encoding':'gzip'
        })
        res.end(data);
    }






}).listen(66);