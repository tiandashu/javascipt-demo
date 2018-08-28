

var str = 'hello world';
var num = 4;

console.log(num.toString(2));//十进制的转别的进制
console.log(parseInt(100,2));//别的进制转十进制

//nodejs 目前支持的字符编码包括：
//ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
//utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
//utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
//ucs2 - utf16le 的别名。
//base64 - Base64 编码。
//latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。
//binary - latin1 的别名。
//hex - 将每个字节编码为两个十六进制字符。

//创建buffer类 node v6以后api出现变化以下是新的
//Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
var buf1 = Buffer.alloc(5);
console.log(buf1); //<Buffer 00 00 00 00 00>

//Buffer.allocUnsafe(size)：返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
var buf2 = Buffer.allocUnsafe(5);
console.log(buf2); //不是固定的

//Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
var buf3 = Buffer.from([1,2,3,4,'tyy']);
console.log(buf3);//<Buffer 01 02 03 04 00>

//Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
var buf4 = Buffer.from(buf3);
console.log(buf4); //<Buffer 01 02 03 04 00>

//返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。
var buf5 = buf1.write('buf5',2);
console.log(buf5);
console.log(buf1);

//读取buffe数据
var str1 = buf3.toString('utf-8');
console.log(str1);

//转化成json对象 //当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该 toJSON()。
var json = buf2.toJSON();
console.log(json);

//缓冲区合并
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());

//缓冲区比较
var buffer1 = Buffer.from('a');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}