
setTimeout(() => {
    console.log(200);
}, 0);

async function fn(){
   return 400;
}
fn().then(res=>{
    console.log(res);
})

new Promise ((res,rej)=>{
    // setTimeout(() => {
        res(100)
    // }, 0);
}).then(res=>{
    console.log(res);
})

process.nextTick(res=>{
    // node提供的一个定时器，放在异步最开头的位置
    console.log(1000);
    process.nextTick(res=>{
        // node提供的一个定时器，放在异步最开头的位置
        console.log(2000);
    })
})

console.log(10000);







