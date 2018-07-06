
//使用setTimeout模拟异步，最后执行fn


setTimeout(function(){
    console.log('time start');
    fn();
},2000)

function fn(){
    console.log('fn start');
}

// fn();