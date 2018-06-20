//Node.js里面的许多对象都会分发事件：一个net.Server对象会在每次有新连接时分发一个事件， 一个fs.readStream对象会在文件被打开的时候发出一个事件。 
//所有这些产生事件的对象都是 events.EventEmitter 的实例。

var events = require('events');

var EventEmitter = new events.EventEmitter();

EventEmitter.on('hand',function(err,data){
    console.log('some_event 事件触发'); 
});

setTimeout(function(){
    EventEmitter.emit('hand');
},1000)
