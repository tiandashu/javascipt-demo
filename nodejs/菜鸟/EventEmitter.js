//Node.js里面的许多对象都会分发事件：一个net.Server对象会在每次有新连接时分发一个事件， 一个fs.readStream对象会在文件被打开的时候发出一个事件。 
//所有这些产生事件的对象都是 events.EventEmitter 的实例。

var events = require('events');
var emitter = new events.EventEmitter();
emitter.setMaxListeners(20);

emitter.addListener('hand',function(){
    console.log('addListener事件触发');
})
emitter.removeListener('hand',function(data){
    console.log('移除hand事件'); 
});

emitter.on('hand',function(data){
    console.log('one事件触发'); 
    data();
});
emitter.on('hand',function(data){
    console.log('two事件触发'); 
});
emitter.on('hand',function(data){
    console.log('three事件触发'); 
});


// emitter.once('hand',function(){
//     console.log('once事件触发'); //使用once绑定的事件触发一次后就移除了
// });

console.log(emitter.listeners('hand').length);
emitter.emit('hand',function(){
    console.log('传入的回调执行了一次');
});

setTimeout(function(){
    console.log('....................');
    emitter.emit('hand',function(){
        console.log('传入的回调执行了二次');
    });
},3000)

//事件触发的时候可以传入任意类型的参数