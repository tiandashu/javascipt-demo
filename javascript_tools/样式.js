

// clientWidth 处理兼容性  获取可视区域宽高
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