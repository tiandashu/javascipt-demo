
var events = require('events');
var eventEmitter = new events.EventEmitter();


eventEmitter.on('tyy',function(err,data){
    if(err) return console.log(err);
    console.log(data);
})

eventEmitter.emit('tyy','wangba');//传参



