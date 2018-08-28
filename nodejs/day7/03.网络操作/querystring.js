var querystring = require('querystring');

var urlStr = 'http://user:pass@host.com:8080/p/a/t/h?query=string&name=tian&&=test#hash';

console.log(querystring.parse(urlStr));
console.log(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }));
