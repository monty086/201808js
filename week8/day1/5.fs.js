/* 
    fs :文件系统  【同步异步之分】
    fs.mkdir(路径，回调函数) //创建文件夹 
    fs.readdir(路径，回调函数) // 读取文件的目录 
    fs.readfile(路径，读取格式，回调函数) // 读取文件
    fs.writefile(路径，写入的内容，写入的格式，回调函数) // 写入文件【写入文件属于覆盖】
    fs.appendfile(路径，追加的内容，写入的格式，回调函数) // 在当前文件后添加内容 
    fs.copyfile(路径1，路径2，回调函数) // 拷贝文件
    fs.unlink(路径，回到函数) // 删除文件
    ... 
    Code Runner //模块插件
    cls win  clear mac // 清屏
*/

let fs = require('fs');

/* fs.mkdir('./test',err=>{
    if(err){
        console.log(err);
        return
    }
    console.log('ok');
}) */

/* fs.writeFile('./test/1.js','console.log("haha")','utf-8',err=>{
    if(err){
        console.log(err);
        return
    }
    console.log('ok'); 
}) */

/* fs.appendFile('./test/1.js',' ;console.log("heihei")','utf-8',err=>{
    if(err){
        console.log(err);
        return
    }
    console.log('ok'); 
}) */

/* fs.readdir('./test',(err,result)=>{
    if(err){
        console.log(err);
        return
    }
    console.log(result); }
) */

/* fs.readFile('./test/1.js','utf-8',(err,result)=>{
    if(err){
        console.log(err);
        return
    }
    console.log(result); 
}
) */

var read = fs.readFileSync('./test/1.js','utf-8')
console.log(read);

/* fs.unlink('./test/2.js',err=>{
    if(err){
        console.log(err);
        return
    }
    console.log('ok'); 
}) */

fs.copyFile('./test/1.js','./test/3.js','utf-8',err=>{
    if(err){
        console.log(err);
        return
    }
    console.log('ok'); 
})

