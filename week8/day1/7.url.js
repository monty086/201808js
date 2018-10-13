let url = require('url');

var urlPath = url.parse('https://www.zhufengpeixun.com:8080/index.html?wd=zf&ps=123#box')
console.log(urlPath);
/* 
Url {
  protocol: 'https:', // 协议
  slashes: true,    // 双斜杠
  auth: null,    // 
  host: 'www.zhufengpeixun.com:8080',   // 域名+端口
  port: '8080',   // 端口
  hostname: 'www.zhufengpeixun.com',  // 域名
  hash: '#box',   
  search: '?wd=zf&ps=123',   // ？携带参数
  query: 'wd=zf&ps=123',   // 只是参数
  pathname: '/index.html',   // 路径 
  path: '/index.html?wd=zf&ps=123',  // 路径+？+参数 
  href: 'https://www.zhufengpeixun.com:8080/index.html?wd=zf&ps=123#box' }

*/

var urlPath = url.parse('https://www.zhufengpeixun.com:8080/index.html?wd=zf&ps=123#box',true);
console.log(urlPath);


// query: { wd: 'zf', ps: '123' },