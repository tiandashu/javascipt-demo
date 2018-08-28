var os = require('os');

console.log(os.cpus());
console.log(os.cpus().length);
console.log(os.networkInterfaces());

var path = require('path');
console.log(path.normalize(__dirname));
console.log(__dirname);
console.log(path.sep);