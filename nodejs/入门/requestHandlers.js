

function start(response,postData) {
    // var body = '<html>'+
    // '<head>'+
    // '<meta http-equiv="Content-Type" content="text/html; '+
    // 'charset=UTF-8" />'+
    // '</head>'+
    // '<body>'+
    // '<form action="/upload" method="post">'+
    // '<textarea name="text" rows="20" cols="60"></textarea>'+
    // '<input type="submit" value="Submit text" />'+
    // '</form>'+
    // '</body>'+
    // '</html>';
    var body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>ajax</title>
        <style>
            html,body{
                height: 100%;
            }
        </style>
    </head>
    <body>
        <p>name</p>
        <!-- <iframe src="https://www.baidu.com/" frameborder="0" width="100%" height="100%"></iframe> -->
    </body>
    </html>
    <script>
        var p = document.getElementsByTagName('p')[0];
        p.onclick = function(){
            // 实例化xhr
            var xhr = new XMLHttpRequest();
            xhr.open('get','http://localhost:8888/upload?name=get&age=15');
            xhr.send(null);
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    p.innerText = xhr.responseText;
                    console.log(xhr.responseText);
                }else{
                    console.log('eeeeeeerr');
                    p.innerText = xhr.response;
                    console.log(xhr.response);
                   
                }
    
            }
        }
        // 传统：java等一些后台语言
    
        // 前后端分离: 
        // https://www.baidu.com/  =》 ip
        // http://www.jq22.com/demo/jQueryBaidutq20170111/
        // 获取数据： 如果请求的是自己的数据(同一个域名下的数据)
        // 安全限制-浏览器的同源策略：协议相同https http //        域名相同：www.baidu.com   端口：80
    
        // 异步的获取数据ajax 
        // get 暴露不安全 大小有限制4k
       
    
    
    
    
    
    
        // 协议不同 或者 域名不同 或者 端口不同 == 跨域
        // jsonp请求  后台设置允许跨域CORS
    
    
    
    
    
    
    
    
    
    
    </script>`

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response,postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("you are send"+postData);
    response.end();
}
  
exports.start = start
exports.upload = upload;