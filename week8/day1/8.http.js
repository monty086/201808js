
/* 
    我只要修改了服务端，就需要断开连接【ctrl+c】，重启启动

*/
let http = require('http'); // 内置的模块 =》在本地启动一个服务
var a = 1 
let server = http.createServer((req,res)=>{  // 开启一个web服务
    // 当前端请求我的时候，执行这个回调函数

    // req : 请求的对象
    console.log('////////////////////////////////////');
    console.log(req.url);
    console.log(req.headers);
    console.log(req.method);
    
    
    // console.log(res);
    // res : 响应的对象
    console.log('当前端请求我的时候，执行这个回调函数'+(a++));
    res.setHeader('Content-Type','text/plain;charset=utf8')
    res.end('你好，我是xxx')
})

// 0-65535 =》3000 
// http => 80   
// http://localhost/ || 127.0.0.1 => 本机的域名地址
server.listen(80,()=>{  // 监听一个端口，并且启动服务端,相对于本机进行开启服务
    console.log('服务端8080开启');
})