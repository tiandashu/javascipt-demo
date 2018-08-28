/**
 * Created by Administrator on 2017/12/20.
 * 封装一个请求库
 * 使用最新的fetch api
 * async和await关键字
 */
var baseUrl = 'http:///www.baidu.com'
export default async(url = '', data = {}, type = 'GET', method = 'fetch')=>{
    type = type.toUpperCase();
    url = baseUrl + url;
    /*处理请求参数 统一以对象的形式传参*/
    if(type === 'GET'){
        let datastr = '';
        Object.keys(data).forEach(function (key) {
            datastr += key+'='+data[key]+'&';
        })
        /*截取最后一个的&*/
        if(datastr !== ''){
            datastr = datastr.substr(0,datastr.lastIndexOf('&'));
            url = url+'?'+datastr;
        }
    }

    /*使用fetch api*/
    if( window.fetch && method == 'fetch'){
        let requestConfig = {
            credentials:'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            cache: "force-cache"
        }
        /*如果是post请求的话就改写参数*/
        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }

        try{
            const response = await fetch(url,requestConfig);
            const responseJson = await response.json();
            return responseJson;
        }catch (err){
            throw new Error(err)
        }
    }else {
        /*如果不支持fetch的就使用传统的方式*/
        return new Promise(function (resolve,reject) {
            let ajax;
            if(window.XMLHttpRequest){
                ajax = new XMLHttpRequest();
            }else {
                /* 兼容ie8*/
                ajax = new ActiveXObject;
            }
            let senddata = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            } else {
                senddata = null;
                url = url + datastr;
            }
            /*第三个参数设置true异步 默认true*/
            ajax.open(type,url,true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send(senddata);
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200){
                    let obj = ajax.response;
                    if (typeof obj !== 'object') {
                        obj = JSON.parse(obj);
                    }
                    resolve(obj)
                }else {
                    reject(ajax)
                }
            }



        })
    }

}
