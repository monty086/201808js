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
    })();
    // 匀速直线运动
    let linear = function(time,duration,change,begin){
        return time/duration*change+begin
    }
    function animate (ele,target={},duration,callback){
        if(typeof duration === 'function'){
            // 将第三参数为函数的给callback这个形参
            callback = duration ;
            duration = 2000
        }
        let begin={},change={},time = 0;
        for(var key in target){
            // 我们可以拿到元素最开始的值，赋值给begin
            begin[key]= utils.css(ele,key);
            // 可以求出元素要改变的距离
            change[key] = target[key] - begin[key]
        };
        // 在下一个进行设置的定时器，我们需要把上一个定时器进行清除
        clearInterval(ele.timer);
        ele.timer = setInterval(()=>{
            time+=17;
            // 如果时间到达之后，清除定时器
            if(time>=duration){
                clearInterval(ele.timer);
                utils.css(ele,target);
                // 检测回调函数是否是一个函数，如果是的话，让回调函数执行，并且改变回调函数中的this，让this等于当前操作的元素
                if(typeof callback ==='function'){
                    callback.call(ele)
                }
                return;
            }
            for(var key in change){
                //循环change中的每一项，拿到我们要设置的值，cur会根据time的不同，不断的进行跟新；
                var cur = linear(time,duration,change[key],begin[key]);
                // 拿到每次跟新的值，设置给操作的元素
                utils.css(ele,key,cur)
            }
        },17)
    }
    // 通过给全局变量赋值，我们可以在外面进行调用
    window.animate = animate;
    window.utils = utils;
})();