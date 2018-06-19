## 一天学会nodejs是不可能的，每天练习

node 的版本管理工具： nvm(独立于node环境的工具) 和 n(是npm的一个模块)
npm包管理器 ：nrm(是npm的一个模块)管理npm的镜像源工具

### node的模块系统，一个js文件就是一个模块 
require():
引入模块，可以是相对路径也可以是绝对路径（E:/前端资料/javascipt/nodejs/day7/data.json）。
另外，模块名中的.js扩展名可以省略。

exports
exports对象是当前模块的导出对象，用于导出模块公有方法和属性。别的模块通过require函数使用当前模块时得到的就是当前模块的exports对象。

module
通过module对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。
```
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: 'E:\\前端资料\\javascipt\\nodejs\\day7\\index.js',
  loaded: false,
  children:
   [ Module {
       id: 'E:\\前端资料\\javascipt\\nodejs\\day7\\01.模块\\index.js',
       exports: [Object],
       parent: [Circular],
       filename: 'E:\\前端资料\\javascipt\\nodejs\\day7\\01.模块\\index.js',
       loaded: true,
       children: [],
       paths: [Array] },
     Module {
       id: 'E:\\前端资料\\javascipt\\nodejs\\day7\\data.json',
       exports: [Object],
       parent: [Circular],
       filename: 'E:\\前端资料\\javascipt\\nodejs\\day7\\data.json',
       loaded: true,
       children: [],
       paths: [Array] } ],
  paths:
   [ 'E:\\前端资料\\javascipt\\nodejs\\day7\\node_modules',
     'E:\\前端资料\\javascipt\\nodejs\\node_modules',
     'E:\\前端资料\\javascipt\\node_modules',
     'E:\\前端资料\\node_modules',
     'E:\\node_modules' ] }
```
模块的初始化：一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。
主模块
通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其它模块完成工作。例如通过以下命令启动程序时，main.js就是主模块。

### 模块路径解析规则
1.内置模块
如果传递给require函数的是NodeJS内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如require('fs')。

2.node_modules目录
NodeJS定义了一个特殊的node_modules目录用于存放模块。例如某个模块的绝对路径是/home/user/hello.js，在该模块中使用require('foo/bar')方式加载模块时，则NodeJS依次尝试使用以下路径。
```
 /home/user/node_modules/foo/bar
 /home/node_modules/foo/bar
 /node_modules/foo/bar
 ```
 3.NODE_PATH环境变量
与PATH环境变量类似，NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径。NODE_PATH环境变量中包含一到多个目录路径，路径之间在Linux下使用:分隔，在Windows下使用;分隔。例如定义了以下NODE_PATH环境变量：
当使用require('foo/bar')的方式加载模块时，则NodeJS依次尝试以下路径。
```
 /home/user/lib/foo/bar
 /home/lib/foo/bar
```

 >从项目的根位置递归搜寻 node_modules 目录，直到文件系统根目录的 node_modules，如果还没有查找到指定模块的话，就会去 NODE_PATH中注册的路径中查找。

 ### package(包)
 我们已经知道了JS模块的基本单位是单个JS文件，但复杂些的模块往往由多个子模块组成。为了便于管理和使用，我们可以把由多个子模块组成的大模块称做包，并把所有子模块放在同一个目录里。在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象。
1.按照加载模块的方式加载package的入口文件,需要指定到包的入口文件
2.将包的入口文件更名为index.js，默认加载包下面的index
3.在包的根目录下添加package.json文件指定包的入口文件以及路径，直接加载包就可以
```
//package.json
{
    "name": "cat",
    "main": "./lib/main.js"
}
```
>如果同时存在index.js并且package中的入口文件不是index.js，优先按照package


### 命令行程序
windows环境下主要依靠.cmd文件来执行，将自己编写的cmd文件添加到node的path路径下，即可在任意位置执行。
后期深入研究...

### NPM
NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：
1.允许用户从NPM服务器下载别人编写的三方包到本地使用。
2.允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
3.允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

```
npm docs <packageName> 查看包文档
npm install argv@0.0.1  //指定版本号安装
npm install argv@0.0.1 -S 或者 npm install argv@0.0.1 --save    添加依赖到  dependencies
npm install argv@0.0.1 -D 或者 npm install argv@0.0.1 --saveDD-de-dev    添加依赖到  devDependencies

```
从NPM服务上下载安装一个命令行程序的方法与三方包类似。
```
npm install node-echo -g //安装到全局
```
package版本号
语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。
>如果只是修复bug，需要更新Z位。
如果是新增了功能，但是向下兼容，需要更新Y位。
如果有大变动，向下不兼容，需要更新X位。

版本号有了这个保证后，在申明三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如"argv": "0.0.x"表示依赖于0.0.x系列的最新版argv。NPM支持的所有版本号范围指定方式可以查看官方文档。

### node基础API
1.Buffer（数据块）
>JS语言自身只有字符串数据类型，没有二进制数据类型，因此NodeJS提供了一个与String对等的全局构造函数Buffer来提供对二进制数据的操作。除了可以读取文件得到Buffer的实例外，还能够直接构造
```
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
console.log(bin);//<Buffer 68 65 6c 6c 6f>
console.log(bin[0]);//104
console.log(bin.length);//5

//Buffer与字符串能够互相转化
var str = bin.toString('utf-8');
console.log(str);//hello
var str1 = 'world';
var bin1 = new Buffer(str1,'utf-8');
console.log(bin1);//<Buffer 77 6f 72 6c 64>
```
>Buffer与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。至于Buffer，更像是可以做指针操作的C语言数组。例如，可以用[index]方式直接修改某个位置的字节。
也因此，如果想要拷贝一份Buffer，得首先创建一个新的Buffer，并通过.copy方法把原Buffer中的数据复制过去。这个类似于申请一块新的内存，并把已有内存中的数据复制过去。以下是一个例子。
```
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;
console.log(bin); // => <Buffer 68 65 6c 6c 6f>
console.log(dup); // => <Buffer 48 65 65 6c 6f>
```
总之，Buffer将JS的数据处理能力从字符串扩展到了任意二进制数据。

2.Stream（数据流）
>当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，我们就需要用到数据流。NodeJS中通过各种Stream来提供对数据流的操作。
```
//采用数据流的机制固然比较好，但也需要优化
//思考一：如果代码中data事件会源源不断地被触发，不管doSomething函数是否处理得过来。
//思考二：如果写入的操作跟不上读取的速度，依然会爆仓
var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);

rs.on('data', function (chunk) {
    if (ws.write(chunk) === false) {
        rs.pause();
    }
});

rs.on('end', function () {
    ws.end();
});

ws.on('drain', function () {
    rs.resume();
});

//以上代码实现了数据从只读数据流到只写数据流的搬运，并包括了防爆仓控制。因为这种使用场景很多，例如上边的大文件拷贝程序，NodeJS直接提供了.pipe方法来做这件事情，其内部实现方式与上边的代码类似。
```
3.fs
>NodeJS通过fs内置模块提供对文件的操作。fs模块提供的API基本上可以分为以下三类：
- 文件属性读写:其中常用的有fs.stat、fs.chmod、fs.chown等等。
- 文件内容读写:其中常用的有fs.readFile、fs.readdir、fs.writeFile、fs.mkdir等等。
- 底层文件操作:其中常用的有fs.open、fs.read、fs.write、fs.close等等。
NodeJS最精华的异步IO模型在fs模块里有着充分的体现，例如上边提到的这些API都通过回调函数传递结果。
```
fs.readFile('./fs.js', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString('utf-8'));
    }
});
```
fs模块的所有异步API都有对应的同步版本，用于无法使用异步操作时，或者同步操作更方便时的情况。同步API除了方法名的末尾多了一个Sync之外，异常对象与执行结果的传递方式也有相应变化。
```
try{
    var data = fs.readFileSync('./fs.js');
    console.log(data.toString());
}catch(e){
    console.log(e);
}
```
>文件的编码：使用NodeJS编写前端工具时，操作得最多的是文本文件，因此也就涉及到了文件编码的处理问题。我们常用的文本编码有UTF8和GBK两种，并且UTF8文件还可能带有BOM。在读取不同编码的文本文件时，需要将文件内容转换为JS使用的UTF8编码字符串后才能正常处理。

需要注意是：
- BOM的移除
- GBK转UTF8
NodeJS支持在读取文本文件时，或者在Buffer转换为字符串时指定文本编码，但遗憾的是，GBK编码不在NodeJS自身支持范围内。因此，一般我们借助iconv-lite这个三方包来转换编码。
- 单字节编码

4.path
>操作文件时难免不与文件路径打交道。NodeJS提供了path内置模块来简化路径相关操作，并提升代码可读性。

5.http
>http模块提供两种使用方式：
1.作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应。
2.作为客户端使用时，发起一个HTTP客户端请求，获取服务端响应。

6.https
>https模块与http模块极为类似，区别在于https模块需要额外处理SSL证书。
```
//https的服务端
var options = {
    key: fs.readFileSync('./ssl/default.key'),
    cert: fs.readFileSync('./ssl/default.cer')
};

var server = https.createServer(options, function (request, response) {
    // ...
});

//https的客户端
var options = {
    hostname: 'www.example.com',
    port: 443,
    path: '/',
    method: 'GET'
};
var request = https.request(options, function (response) {});
request.end();
```
>但如果目标服务器使用的SSL证书是自制的，不是从颁发机构购买的，默认情况下https模块会拒绝连接，提示说有证书安全问题。在options里加入rejectUnauthorized: false字段可以禁用对证书有效性的检查，从而允许https模块请求开发环境下使用自制证书的HTTPS服务器。

7.url
>url模块用来解析url、生成URL，以及拼接URL。
```
                           href
 -----------------------------------------------------------------
                            host              path
                      --------------- ----------------------------
 http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
 -----    ---------   --------   ---- -------- ------------- -----
protocol     auth     hostname   port pathname     search     hash
                                                ------------
                                                   query
```
- url.parse('http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash') 将url字符串解析成url对象。传给.parse方法的不一定要是一个完整的URL，例如在HTTP服务器回调函数中，request.url不包含协议头和域名，但同样可以用.parse方法解析。
.parse方法还支持第二个和第三个布尔类型可选参数。第二个参数等于true时，该方法返回的URL对象中，query字段不再是一个字符串，而是一个经过querystring模块转换后的参数对象。第三个参数等于true时，该方法可以正确解析不带协议头的URL，例如//www.example.com/foo/bar。
- url.format()
```
url.format({
    protocol: 'http:',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
});
结果：
//'http://www.example.com/p/a/t/h?query=string'

```
8.querystring
>querystring模块用于实现url参数的字符串和对象的互相转换

9.net
初学node对于http、net有点傻傻分不清楚
>net模块可用于创建Socket服务器或Socket客户端。网络上的两个程序通过一个双向的通信连接实现数据的交换，这个连接的一端称为一个socket。形象的说socket就像是平时的打电话，拨通电话后（建立连接之后）可以你一言我一语，服务器和客户端进行双向通信。之前的http更像是发短信沟通，而且只能是客户端向服务端发送，服务端收到信息后再回复，服务端不能主动给客户端发送信息。

### 异步编程

