
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
        // 操作location中的query 字符串转对象
        getQueryStringArgs: function(){
            var qs = location.search.length>0?location.search.substring(1):"",
            args = {},
            items = qs.length ? qs.split("&"):[],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
            for(i;i<len;i++){
                item = items[i].split("=");
                name = decodeURIComponent(item[0]);
                value = decodeURIComponent(item[1]);
                if(name.length){
                    args[name] = value;
                }
            }
            return args;
        }

    }


    return new utils();

})(window)
