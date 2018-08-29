var utils = (function(){
    var flag = 'getComputedStyle' in window;
    // 封装win方法
    function win(key,value){
        if(value == undefined){
            return document.documentElement[key]|| document.body[key]
        }
        document.documentElement[key] = value;
        document.body[key] = value
    }
    // 封装offset方法
    function offset (ele){
        let l = ele.offsetLeft;
        let t = ele.offsetTop;
        let parent = ele.offsetParent;
        while(parent){
            l+=parent.offsetLeft;
            l+=parent.clientLeft;
            t+=parent.offsetTop;
            t+=parent.clientTop;
            parent = parent.offsetParent
        }
        return {left:l,top:t}
    }
    // 封装类数组转数组
    function toArray (likeAry){
        if(flag){
            // 标准浏览器
            return [].slice.call(likeAry)
        }else{
            // ie浏览器
            let ary = [];
            for(var i=0;i<likeAry.length;i++){
                ary.push(likeAry[i])
            }
            return ary
        }
    }
    return {
        win,
        offset,
        toArray,
    }
})()