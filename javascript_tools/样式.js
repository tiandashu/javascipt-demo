

// clientWidth 处理兼容性  获取可视区域宽高,不包含浏览器的工具栏，也不包含f12调试窗口的高度（浏览器可用窗口的高度）
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}


// 获取浏览器卷去的高度
function scrollTop() {
    //对于有doctype声明或者相对标准的浏览器的页面则可以使用 document.documentElement.scrollTop
    //safari 比较特别，有自己获取scrollTop的函数 ： window.pageYOffset
    //对于没有doctype声明的页面里可以使用  document.body.scrollTop 来获取 scrollTop高度
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

    //注意为什么将window.pageYOffset放在中间的位置
    //因为在ie中当scrollTop为0时，window.pageYOffset会返回undefined； undefined || 0 》》0;0 ||undefined》》undefined
    //为了避免在ie中计算出错 所以将window.pageYOffset放在中间的位置
}

//获得文档的大小（区别与视口）,与上面获取视口大小的方法如出一辙
function getDocumentPort () {
    if(document.compatMode == "BackCompat") {//混杂模式
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        };
    } else {
        return {
            width: Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth),
            height: Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)
        }
    }
}

// 只读
function offset() {
    return {
        height: document.documentElement.offsetHeight || document.body.offsetHeight, // 页面的高度包含卷去的部分
        width: document.documentElement.offsetWidth || document.body.offsetWidth, // 页面的宽度包含卷去的部分
        left: document.body.offsetLeft,
        top: document.body.offsetTop
    }
}

// 屏幕的宽高
function screen() {
    return {
        availHeight : window.screen.availHeight, //  浏览器的整体高度，不包含系统任务栏的高度
        availWidth : window.screen.availWidth,  //  浏览器的整体高度，不包含系统任务栏的高度
        width: window.screen.width,  //  屏幕的宽度
        height: window.screen.height  //  屏幕的高度
    }
}
