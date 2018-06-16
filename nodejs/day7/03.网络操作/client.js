
var http = require('http');
const querystring = require('querystring');
const postData = querystring.stringify({
    'key' : '18734233259'
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
    res.on('data', (chunk) => {
        data.push(chunk);
        // console.log(`响应主体: ${chunk}`);
    });
    res.on('end', () => {
        console.log('响应中已无数据。');
        console.log(data.toString());
    });
    
});


req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
});
  
// 写入数据到请求主体
req.write(postData);
req.end();