// promise 3将 catch 和all 进行添加

class Promise {
    constructor(excutor) {
        // Promise构造函数当中的内容
        this.status = 'pending';
        this.value = undefined;
        // 创建两个容器成功和失败
        this.fulfilledAry = [];
        this.rejectedAry = [];

        // 成功之后执行的方法
        let resolve = result => {
            // 添加异步代码，进行异步操作
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status === 'pending') {
                    this.status = 'fulfilled';
                    this.value = result;
                    this.fulfilledAry.forEach(item => item())
                    // item =>每一个匿名【匿名函数执行=》成功的回调函数就会执行】
                }
            }, 0);

        }
        // 失败以后执行的方法
        let reject = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status === 'pending') {
                    this.status = 'rejected';
                    this.value = reason;
                    this.rejectedAry.forEach(item => item())
                }
            }, 0);

        }
        // 需要对构造器【回调函数】进行异常捕获
        try {
            excutor(resolve, reject)
        } catch (e) {
            reject(e)
        }

    }
    // promise原型上的方法
    then(fulfilledCB, rejectedCB) {
        /* this.fulfilledAry.push(()=>{fulfilledCB(this.value)});
        this.rejectedAry.push(()=>{rejectedCB(this.value)}) */
        fulfilledCB = typeof fulfilledCB !== 'function'? ()=>{
            return this.value
        }:fulfilledCB;
        rejectedCB = typeof rejectedCB !== 'function'? ()=>{
            throw new Error(this.value)
        }:rejectedCB

        return new Promise((resolve, reject) => {
            this.fulfilledAry.push(() => {
                try {
                    let x = fulfilledCB(this.value);
                    if(x instanceof Promise){
                        x.then(resolve,reject);
                        return
                    }
                    resolve(x)
                } catch (e) {
                    reject(e)
                }

            })
            this.rejectedAry.push(() => {
                try {
                    let x = rejectedCB(this.value)
                    if(x instanceof Promise){
                        x.then(resolve,reject)
                        return 
                    }
                    resolve(x)
                } catch (e) {
                    reject(e)
                }

            })
        })
    }

    catch(rejectedCB){
        return this.then(null,rejectedCB)
    }

    // all 用来添加静态的方法
    static all(promiseAry){
        return new Promise((resolve,reject)=>{
            let index = 0 ;
            let result = [];
            for (let i = 0; i < promiseAry.length; i++) {
                promiseAry[i].then(res=>{
                    // 条件当中每一个都成功才会执行rosolve
                    index++;
                    // 每一次成功res都是每一个promise实例接收到的值，
                    result[i] = res
                    // 当index++满足数组的长度的时候，让resolve执行也就是让then的第一个方法执行
                    if(index===promiseAry.length){
                        resolve(result)
                    }    
                },rej=>{
                    reject(rej)
                })
            }
        })
    }
}
// promise2实现连then的方法
module.exports = Promise 