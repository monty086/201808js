
let Promise = require('./promise3')

let p1 = new Promise((resolve,reject)=>{
    // var var ;
    resolve(100)
    reject()

    setTimeout(() => {
        Math.random()>0.5?resolve(100):reject(200);
    }, 0);
})

 let p2 = p1.then(res=>{
    console.log(res);
    // throw new Error('lose1')
    // return res+1
    return new Promise((res,rej)=>{
        rej(300)
    })
},rej=>{
    console.log(rej);
}) 

p2.then(res=>{
    console.log(res);
},rej=>{
    console.log(rej);
})
console.log(500); 

let p2 = new Promise((res,rej)=>{
    setTimeout(() => {
       res(100)
    }, 0);
})

Promise.all([p1,p2]).then(res=>{
    console.log(res);
},rej=>{
    console.log(rej);
})

