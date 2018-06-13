## 一天学会nodejs

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
