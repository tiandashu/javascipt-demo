
var utils = (function(window){

    function utils() {

    }

    utils.prototype = {
        // 阻止冒泡
        stopPropagation : function (e) {
            if( e && e.stopPropagation ) {
                e.stopPropagation();
            }else{
                window.event.cancelable = true;
            }
        },
        // 阻止默认行为
        stopDefault : function (e) {
            console.log(e);
            if ( e && e.preventDefault ){
                e.preventDefault();
            }else{
                window.event.returnValue = false; 
                return false;
            }
        },
        getClient : function () {
            return {
                width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            }
        },
        scrollTop : function() {
            return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        }



    }


    return new utils();

})(window)


var cookie = (function(){
    
})()

var localStorage = (function(){
    
})()

var sessionStorage = (function(){
    
})()