
// node 
// let name = require('./a.js')

// console.log(name); // exports 输出，接收是一个对象
// // 如果是module.exports导出，那么导出是什么接收的就是什么


// es6

// import {a,fn} from './a.js' 
// import * as b from './a.js' 
import c from './a.js' 
// export 导出的 我们接收必须用解构赋值{a}
// console.log(a,fn);
// console.log(b); // 对象
console.log(c()); // 函数
