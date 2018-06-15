
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
bin[0] = 0x48;
console.log(bin);//<Buffer 68 65 6c 6c 6f>
console.log(bin[0]);//104
console.log(bin.length);//5

var str = bin.toString('utf-8');
console.log(str);
var str1 = 'hello';
var bin1 = new Buffer(str1,'utf-8');
console.log(bin1);//<Buffer 68 65 6c 6c 6f>