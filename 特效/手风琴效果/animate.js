// function animate(obj,attr,target) {
//     clearInterval(obj.timer);
//     obj.timer = setInterval(function(){
//         // var leader = obj.offsetLeft;
//         var leader = parseInt(getStyle(obj,attr)) || 0;
//         var step = (target - leader)/10;
//         step = step>0?Math.ceil(step):Math.floor(step);
//         if(leader != target){
//             obj.style[attr] = leader + step +"px";
//         }else{
//             clearInterval(obj.timer)
//         }
//     },15)
// }




// function animate(obj,json) {
//     clearInterval(obj.timer);
//     obj.timer = setInterval(function(){
//         for(var k in json){
//             //json
//             //键值对
//             //属性名:属性的期望值
//             //k:json[k]
//             var leader = parseInt(getStyle(obj,k))|| 0;
//             var target = json[k];
//             var step = step>0?Math.ceil(step):Math.floor(step);
//             if(leader != target){
//                 obj.style[k] = leader+step+"px";
//             }else{
//                 clearInterval(obj.timer)
//             }
//         }
//     },15)
// }



//改变任意对象的任意属性到目标值
//同时改变多个数值属性
// var timer = null;
function animate(obj,json) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var flag = true;
        for(var k in json){
            //json
            //键值对
            //属性名:属性的期望值
            //k:json[k]
            var leader = parseInt(getStyle(obj,k))|| 0;
            var target = json[k];
            var step = (target - leader)/10;
            var step = step>0?Math.ceil(step):Math.floor(step);
            obj.style[k] = leader+step+"px";
            if(leader != target){
                flag = false;
            }
        }
        if(flag){
            clearInterval(obj.timer)
        }
    },15)
}











//获取任意对象的任意属性（做兼容）
//obj.currentStyle是IE特有的
function getStyle(obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}
//用document.getElementById(‘element').style.xxx可以获取元素的样式信息，可是它获取的只是DOM元素style属性里的样式规则，对于通过class属性引用的外部样式表，就拿不到我们要的信息了。
// console.log(document.getElementById("box").style.width);   //结果：什么都没有