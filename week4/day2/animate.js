(function(){
   // utils这个方法
   let utils = (function(){
       function getCss(ele,attr){
           let value = window.getComputedStyle(ele)[attr];
           // 获取到的value 是一个字符串，需要转数字
           // 而且我们需要拿到这个值进行计算，带有单位的值，需要去掉单位
           // ‘12px’ ‘red’  '13'  '0.5'
           var reg = /^-?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem|%)?$/i;
           if(reg.test(value)){
               value =parseFloat(value)
           }
           return value
       }
       /*
       * setCss
       * 给一个元素设置相对应的样式
       * */
       function setCss(ele,attr,value){
           // width 100px  opacity 0.5px
           // 需要给能够添加像素单位的属性名进行过滤
           // margin: 50  marginLeft marginRight  position :left top bottom right
           var reg = /^(width|height|fontSize|(margin|padding)|(margin|padding)?(left|top|bottom|right))$/i;
           if(reg.test(attr)){
               /px/.test(value.toString())?null:value+='px';
           }
           ele.style[attr]=value
       }
       /*
       * setGroupCss
       * 批量给元素设置样式
       * */

       function setGroupCss(ele,obj={}){
           if(Object.prototype.toString.call(obj)==='[object Object]'){
               for(var key in obj){
                   // for in 循环是循环对象上的可枚举属性【对象的私有属性+给对象设置的公有属性】，天生自带的公有属性是不包括的
                   if(obj.hasOwnProperty(key)){// 判断obj中的值是否的私有的
                       setCss(ele,key,obj[key])
                   }
               }
           }
       }
       /*
       * css
       * 把三个属性合成到一起调用
       * */
       function css(...arg){
           if(arg.length===3){
               // arg [1,2,3]  ...[1,2,3] // setCss(1,2,3)
               setCss(...arg)
           }else if(arg.length===2){
               if(arg[1] instanceof Object){
                   setGroupCss(...arg)
               }else{
                   return getCss(...arg)
               }
           }
       }
       return {css:css}
   })()
   // 匀速直线运动
   let linear = function(time,duration,change,begin){
       return time/duration*change+begin
   }
   // 1. 当前元素 2.元素运动的终点 3. 花费的时间 4. callback，动画完成之后的回调函数
   window.animate =function(ele,target={},duration,callback){
       // 如果没有给时间，但是设置回调函数
       if(typeof duration ==='function'){
           // 就让形参callback等于 设置的那个函数
           callback = duration;
           // 时间给一个默认值 2000
           duration = 2000;
       }
       // 开始给change进行设置
       let change={},timer=0,begin={};
       // 需要循环target里面的每一项
       for(var key in target){
           // 拿到begin这个对象中的属性键值对，就是元素一开始身上原有的属性值
           begin[key] = utils.css(ele,key);
           // 计算change【要改变的属性】，通过让终点的值减去起点的值
           change[key] = target[key]-begin[key]
       }
       // 在元素的自定义属性上添加一个定时器
       ele.timer = setInterval(()=>{
           // 定时执行的时候，让timer每一次都加17
           timer+=17;
           // 当timer时间大于 我们设置的终点时间时
           if(timer>=duration){
               // 清除定时器
               clearInterval(ele.timer);
               // 把元素设置为终点的值
               utils.css(ele,target);
               // 判断回调函数存在，让回调函数执行，让回调函数中的this变成当前的元素
               callback && callback.call(ele);
               // 加return不再让下面的代码执行
               return
           }
           // 要让元素发生动画，需要循环change
           for(var key in change){
               // 求出每一项要改变的属性值通过匀速直线运动公式
               var cur = linear(timer,duration,change[key],begin[key]);
               // 通过utils给元素设置上
               utils.css(ele,key,cur)
           }
       },17)
   }


})();