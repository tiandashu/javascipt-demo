本章介绍和说明了 JavaScript 中所有的标准的内置对象、以及它们的方法和属性。

全局的对象（ global objects ）或称标准内置对象，不要和 "全局对象（global object）" 混淆。这里说的全局的对象是说在全局作用域里的对象。

"全局对象 （global object）” 是一个Global类的对象。可以在全局作用域里，用this访问（但只有在非严格模式下才可以，在严格模式下得到的是 undefined）。实际上，全局作用域包含了全局对象的属性，还有它可能继承来的属性。

 
全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。浏览器作为最常见的宿主程序，其所提供的宿主对象的说明可以在这里找到：API 参考。 关于 DOM 和核心 JavaScript 之间的区别，可参阅 JavaScript 技术概述 来了解更详细的信息。

### 标准内置对象的分类

1. 值属性
这些全局属性返回一个简单值，这些值没有自己的属性和方法。

Infinity
NaN
undefined
null 字面量

2. 函数属性
全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。

eval()
uneval() 
isFinite()
isNaN()
parseFloat()
parseInt()
decodeURI()
decodeURIComponent()
encodeURI()
encodeURIComponent()
escape() 
unescape() 
Link to section基本对象
顾名思义，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

Object
Function
Boolean
Symbol
Error
EvalError
InternalError
RangeError
ReferenceError
SyntaxError
TypeError
URIError
Link to section数字和日期对象
用来表示数字、日期和执行数学计算的对象。

Number
Math
Date
Link to section字符串
用来表示和操作字符串的对象。

String
RegExp
Link to section可索引的集合对象
这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。

Array
Int8Array
Uint8Array
Uint8ClampedArray
Int16Array
Uint16Array
Int32Array
Uint32Array
Float32Array
Float64Array
Link to section使用键的集合对象
这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。

Map
Set
WeakMap
WeakSet
Link to section矢量集合
SIMD 矢量集合中的数据会被组织为一个数据序列。

SIMD 
SIMD.Float32x4 
SIMD.Float64x2 
SIMD.Int8x16 
SIMD.Int16x8 
SIMD.Int32x4 
SIMD.Uint8x16 
SIMD.Uint16x8 
SIMD.Uint32x4 
SIMD.Bool8x16 
SIMD.Bool16x8 
SIMD.Bool32x4 
SIMD.Bool64x2 
Link to section结构化数据
这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON （JavaScript Object Notation）编码的数据。

ArrayBuffer
SharedArrayBuffer 
Atomics 
DataView
JSON
Link to section控制抽象对象
Promise
Generator
GeneratorFunction
 AsyncFunction
Link to section反射
Reflect
Proxy
Link to section国际化
为了支持多语言处理而加入ECMAScript的对象。

Intl
Intl.Collator
Intl.DateTimeFormat
Intl.NumberFormat
Link to sectionWebAssembly
WebAssembly
WebAssembly.Module
WebAssembly.Instance
WebAssembly.Memory
WebAssembly.Table
WebAssembly.CompileError
WebAssembly.LinkError
WebAssembly.RuntimeError
Link to section其他
arguments