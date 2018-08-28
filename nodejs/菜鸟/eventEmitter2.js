

var events = require('events');
var emitter = new events.EventEmitter();
var listener1 = function listener1() {
    console.log('监听器 on1执行。')
 }
emitter.on('connection',listener1)

emitter.on('connection',function(){
    console.log('监听器 on2执行。')
})

emitter.addListener('connection', function(){
    console.log('监听器 addListener1执行。')
});

emitter.addListener('connection', listener1);

console.log("一共有"+emitter.listeners('connection').length+"个监听");
console.log("一共有"+events.EventEmitter.listenerCount(emitter, 'connection')+"个监听");


emitter.emit('connection');

emitter.removeListener('connection',function(){

});
// emitter.removeAllListeners('connection', listener1);
console.log("listener1 不再受监听。");
console.log("。。。。。。。。。。。。。。。。。。。。。。");
emitter.emit('connection');
console.log("一共有"+emitter.listeners('connection').length+"个监听");
console.log("一共有"+events.EventEmitter.listenerCount(emitter, 'connection')+"个监听");

//总结：