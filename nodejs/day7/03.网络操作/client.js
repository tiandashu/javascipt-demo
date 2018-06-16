
var http = require('http');
const querystring = require('querystring');

const postData = querystring.stringify({
    'year' : '2018'
});
  
const options = {
    hostname: 'api.apengdai.com',
    port: 80,
    path: '/api/v2/data/newData',
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};
  
const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    var data = [];
<<<<<<< HEAD
    res.on('data', (chunk) => {
        data.push(chunk);
        // console.log(`响应主体: ${chunk}`);
    });
    res.on('end', () => {
        console.log('响应中已无数据。');
        console.log(data.toString());
=======
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        data.push(chunk);
        console.log(`响应主体: ${chunk}`);
    });
    res.on('end', () => {
        console.log(data);
        console.log('响应全部数据完成......');
>>>>>>> 182b34030cae9bb3c1570fea63ffa39281939332
    });
    
});


req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
});
  
// 写入数据到请求主体
req.write(postData);
req.end();