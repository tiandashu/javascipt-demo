第四次迭代
在我们解决了服务器本身的功能、性能和可靠性的问题后，接着我们需要考虑一下代码部署的问题，以及服务器控制的问题。

设计
一般而言，程序在服务器上有一个固定的部署目录，每次程序有更新后，都重新发布到部署目录里。而一旦完成部署后，一般也可以通过固定的服务控制脚本启动和停止服务。因此我们的服务器程序部署目录可以做如下设计。

```
- index4/
    - bin/
        startws.sh
        killws.sh
    + conf/
        config.json
    + lib/
        daemon.js
        server.js
```
在以上目录结构中，我们分类存放了服务控制脚本、配置文件和服务器代码。

### 注意
```
// lib/main.js
function main(argv){
    //注意 ../lib/index.js路径的问题，这个路径和node执行时候的路径是相对的
    //比如在inde4文件夹下执行 node lib/main.js conf/config.json    此处应改为 ../lib/index.js
    //比如在inde4/bin文件夹下执行 node ../lib/main.js ../conf/config.json    此处应改为 ../lib/index.js
    spawn('../lib/index.js', argv[0]);
    console.log(process.pid, worker.pid);
    process.on('SIGTERM',function(){
        worker.kill();
        process.exit(0);
    })
}

main(process.argv.slice(2));
```