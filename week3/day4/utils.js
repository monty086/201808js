var utils = (function (){
    /*
    * offset方法：求出当前元素距离body的偏移量
    * */
    function offset (ele){
        let l = ele.offsetLeft;
        let t = ele.offsetTop;
        // 如果元素的父级有定位，那么元素距离body的偏移量就不真实
        let parent = ele.offsetParent;
        while(parent){// 直到parent为null【当parent上一次循环为body的时候】 ，才进不来这个循环
            t+=parent.offsetTop + parent.clientTop;
            l+=parent.offsetLeft + parent.clientLeft;
            // 需要不断的去跟新parent,让parent重新赋值，等于父级的父级参照物
            parent = parent.offsetParent
        }
        return {left:l,top:t}
    }
    /*
    * 封装浏览器盒子模型属性
    * 想要求出浏览器的盒子模型属性
    * */
    function win(attr,value){
        // 判断第二个参数有没有传入，如果有传，证明我要是设置，如果没有传，只是来求这个值
        if(value == undefined){
            return document.documentElement[attr] || document.body[attr];
        }else{
            document.documentElement[attr]=value ;
            document.body[attr] = value;
        }

    }
    /*
    * 类数组转数组
    *
    * */
    function toArray(likeAry){
        try{
            //通过改变slice中是this，克隆一份像likeAry一样的数组
            return [].slice.call(likeAry)
        }catch(e){
            var newAry = [];
            for (var i=0;i<likeAry.length;i++){
                newAry.push(likeAry[i])
            }
            return newAry
        }
    }
    /*
    * getCss
    * 想要获取某一个元素上的样式属性
    * */
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

    return {
        offset:offset,
        win:win,
        toArray,
        getCss,
        setCss,
        setGroupCss,
        css,
    }
})();
// utils.offset(box).left  // {left:l,top:t}
// utils.win('clientHeight');
// utils.win('scrollTop',100);