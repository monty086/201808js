
let http = require('http');
let url = require('url');
let fs = require('fs');

let server = http.createServer((req,res)=>{
    // cors 跨域资源共享
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") return res.end();// 后台配置，option测试请求的连线是否已连接 
    let {pathname,query} = url.parse(req.url,true);
    // 热门图书
    if(pathname==='/hotbooks'){
        res.setHeader('content-type','application/json;charset=utf8');
        let books = fs.readFileSync('./book.json','utf-8');
        res.end(JSON.stringify(books))
        return;
    }
    // 收藏书籍
    
    if(pathname === '/collectbook'){
        var str = ``;
        req.on('data',res=>{
            str+=res
        });
        req.on('end',re=>{
        console.log(str);
            var newStr = JSON.parse(str);
            let ary = fs.readFileSync('./collectBook.json','utf-8');
            ary = JSON.parse(ary);
            ary.push(newStr)
            console.log(ary);
            
            fs.writeFileSync('./collectBook.json',JSON.stringify(ary),'utf-8',)
            res.end()
        })
    } 
});

server.listen(3000,()=>{
    console.log('3000启动成功');
    
})