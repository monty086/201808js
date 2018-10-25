### webpack

新建文件夹
npm init -y  // 生成package.json文件【模块清单】


安装webpack
开发环境 --save-dev
生成环境 --save
```
    npm install webpack --save-dev 
```

es6 导入导出
```
   导出 
   export let a =1
   export let fn = function(){}
   export default xxx[对象、变量]  // 默认导出

   导入 
   // export 
   import {a,fn} from '文件名.js' 
   import * as b  form '文件名.js' // b 一个对象
   // export default
   import xxx from '文件名.js'
```

node 导入导出
```
   // 导出
   exports.a = 1
   exports.fn = function(){}
   module.exports = xxx[对象、变量]   // 默认导出

   // 导入
   // export 
   let 变量名 = require(文件的路径)  // 对象
   // module.export 
   let 变量名 = require(文件的路径)  // 默认导出是什么就是什么
   【注意】: require当中，如果又路径默认导入的是自定义模块，如果没有路径，先导入是第三方模块，其次是内置模块 
```

通过npm run build  执行webapck里面的脚本 script=》属性值


为了让更多浏览器识别es6、es7语法，我们需要添加模块让它进行编译
```
 babel-core  // babel的核心模式
 babel-loader  // 主要的翻译模块 
 // 
 css-loader  // 解析css文件
 less
 less-loader  // 
 style-loader  
 url-loader 
 file-loader 
 // es6 
 babel-preset-es2015
 // es7
 babel-preset-stage-0
 // 热加载
 webpack-dev-server
```
安装的模块

```
npm install babel-core babel-loader css-loader style-loader less less-loader url-loader babel-preset-es2015 babel-preset-stage-0 webpack-dev-server html-webpack-plugin vue-loader --save-dev

```
