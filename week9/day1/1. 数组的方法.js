/* 
    forEach
    map
    for in 
    for of 
    filter
    includes
    find
    some
    every
    reduce
*/
var ary = [4,5,6,7,8,'99'];
ary.forEach((item,index,input) => {
    // console.log(this);// window
},1);

[1].forEach(function(item,index,input)  {
    console.log(this);// window
},1);

// map 将回调函数的返回值组成一个新的数组
/* var newAry = ary.map((item,index)=>{
    // return item*10
    // return '<li>'+item+'</li>'
})
console.log(newAry); */

// for in 遍历对象
/* for(var key in ary){
    console.log(key);// 数组的索引 
    console.log(ary[key]); // 数组中的每一项
} */

// for of 遍历数组,不可以遍历对象
/* for(var item of ary){
    console.log(item); // item对应是ary中的每一项
} */
// 直接遍历对象会报错，我们可以调用方法【Object.keys()】解决
/* var obj = {name:"zf",age:8}
// console.log(Object.keys(obj));
for(var item of Object.keys(obj)){
    console.log(item);
} */

// filter 过滤：将符合条件的值放到一个新的数组当中 
// 1.遍历数组 2. 将符合回调函数返回值的内容【判断为true】放入一个新的数组当中 
// 原数组不会发生改变
/* var newAry = ary.filter((item,index)=>{
    return item>6
})
var newAry = ary.map((item,index)=>{
    if(item>6){
        return item
    }
})
console.log(newAry,ary); */

// includes 判断数组当中是否有某项 有=>true 否=>false // ===
/* var newAry = ary.includes(9);
console.log(newAry); */

// find 查找 => 找到符合条件的值并返回
// 1. 遍历数组 2. 判断回调函数返回值的布尔值，返回true，停止遍历，直接将这个值【遍历数组当前项的值】返回
/* var newAry = ary.find((item,index)=>{
    return item>6
})
console.log(newAry); */

//some 找true =>遍历数组中如果回调函数返回值计算为true，停止遍历，整体返回true；全部遍历后，都没有返回true，整体返回为false
/* var newAry = ary.some((item,index)=>{
    return item>2
})
console.log(newAry,ary); */

// every 找false => 1. 遍历数组，2. 如果回调函数返回值计算结果为false，停止遍历，整体返回false
// 如果计算结果为true，继续进行遍历，直到找到false；【当遍历结束后，全部返回为true，整体返回true】,否则为true

/* var newAry = ary.every((item,index)=>{
    return item<5
})
console.log(newAry); */

// reduce 返回两次计算后的结果
// 1. 遍历数组 2. 将回调函数返回值作为第一次的计算结果【return后面的值】
//prev【初始值=>第一项的值，当循环第二次的时候=>就是计算后的结果】,
//next【数组第二项，从第二项依次向后获取】,
//index【next代表值所对应的索引】,
//input【当前数组】
// 遍历 ary.length-1 次 
// 1. prev=> 4 next=> 5 index=> 1  // 这一次的计算结果 return XXX 【对应=>prev值】
// 2. prev=> undefined  next =>6 ... // 第二次的计算结果 return XXX 【对应=>prev值】
// 3. ....
var newAry = ary.reduce((prev,next,index,input)=>{
    // console.log(prev,next,index,input);
    return prev+next 
})
console.log(newAry);

// var ary = [0,{name:'ipone5',price:1000},{name:'ipone7',price:2000},{name:'iponeX',price:3000}];
var ary = [{name:'ipone5',price:1000},{name:'ipone7',price:2000},{name:'iponeX',price:3000}];

var newAry = ary.reduce((prev,next)=>{
    // console.log(prev + next.price );// 0 1000 1000 2000 
    return prev + next.price 
},1) 
// 调用reduce内置的方法可以实现数组中含有对象求和的操作，reduce第二个参数为当前数组遍历的初始值
console.log(newAry);










