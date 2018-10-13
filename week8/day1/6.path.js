let path = require('path')


console.log(path.resolve()); // 输出的当前文件夹所在的绝对路径 

// 全局变量 
console.log(__dirname);  // 当前文件所在文件夹的路径 【相对的c盘】 
console.log(__filename); // 当前文件所在的路径【相对的c盘】 

console.log(path.resolve(__dirname,'7.js'));




