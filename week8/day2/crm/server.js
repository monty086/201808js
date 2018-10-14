
let http = require('http');
let fs = require('fs');
let url = require('url');

let server = http.createServer((req,res)=>{
    // 1. 我们希望加载index.html 
    // 需要拿到请求的路径，顺便拿到请求的参数
    let {pathname,query} = url.parse(req.url,true)
    // 拿到请求的路径地址和请求参数
    // 想要访问首页
    if(pathname==='/'){
        // 读取到index.html的数据
        let home = fs.readFileSync('./index.html','utf-8');
        // 返回给前端
        res.end(home)
        return 
    }
    // 遇到这个文件直接返回空
    if(pathname==='/performance-now.js.map'|| pathname==='/favicon.ico'){
        res.end() 
        return
    }

    // 将其他的文件进行响应 // ./css/index.css  ./ajax.js
    let reg = /\.(\w+)$/g;
    if(reg.test(pathname)){
       let con = fs.readFileSync('.'+pathname,'utf-8');
       res.end(con);
       return  
    }

    // 第一步开始
    var dataUrl = './data.json';
    var dataSuc = {"code":0,"msg":"success","data":null}
    if(pathname === '/getList'){
        let con = fs.readFileSync(dataUrl,'utf-8');
        // 为了更加规范所以将数据添加到dataSuc
        dataSuc.data = con
        res.end(JSON.stringify(dataSuc));
        return
    }

})

server.listen(9999,()=>{
    console.log('端口9999已启动');
})