
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
        // 操作cookie
        docCookies : {
            getItem: function(sKey) {
                
            },
            setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
                
            },
            removeItem: function(sKey) {
                
            },
            hasItem: function(sKey) {
                
            },
        },
        


    }


    return new utils();

})(window)
