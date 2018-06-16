var url = require('url');

var urlStr = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';

console.log(url.parse(urlStr));


var urlObj = {
    protocol: 'http:',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
};
console.log(url.format(urlObj));


//拼接url  只能拼接url的pathname
console.log(url.resolve(urlStr,'&name=tian'));//不是一个合法的操作

