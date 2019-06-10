// new
// 新生成了一个对象
// 链接到原型
// 绑定 this
// 返回新对象

function self_new() {
    let obj = new Object()
    let Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype
    let result = Con.apply(obj, arguments)
    return typeof result === 'object' ? result : obj
}

// instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。
function self_instanceof(left, right) {
    // 获得类型的原型
    let prototype = right.prototype
    // 获得对象的原型
    left = left.__proto__
    // 判断对象的类型是否等于类型的原型
    while (true) {
    	if (left === null)
    		return false
    	if (prototype === left)
    		return true
    	left = left.__proto__
    }
}