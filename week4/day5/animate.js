(function(){
    let utils = (function(){
        function getCss(ele,attr){
            let value = window.getComputedStyle(ele)[attr];
            let reg = /^-?(\d+|[1-9]\d+)(\.\d+)?(px|pt|em|rem)?$/
            if(reg.test(value)){
                value = parseFloat(value)
            }
            return value;
        }
        function setCss(ele,attr,value){
            let reg = /^(width|height|fontSize|(margin|padding)(left|right|top|bottom)?|(margin|padding))$/;
            if(reg.test(attr)){
                /px/.test(value.toString())?null:value+='px'
            }
            ele.style[attr]=value
        }
        function setGroupCss(ele,obj={}){
            if(obj instanceof  Object){
                for(var key in obj){
                    if(obj.hasOwnProperty(key)){
                        setCss(ele,key,obj[key])
                    }
                }
            }
        }
        function css(...arg){
            if(arg.length===3){
                setCss(...arg)
            }else{
                if(Object.prototype.toString.call(ary[1])==='[object Object]'){
                    setGroupCss(...arg)
                }else{
                    return getCss(...arg)
                }
            }
        }
        return {
            css
        }
    })();
    let linear = function(time,duration,change,begin){
        return time/duration*change+begin
    }
    window.animate =function(ele,target,duration,callback){
        if(typeof duration ==='function'){
            callback= duration;
            duration = 2000
        }
        let begin={},change={},time=0;
        for(var key in target){
            begin[key] = utils.css(ele,key);
            change[key] = target[key]-begin[key]
        }
        ele.timer = setInterval(()=>{
            time+=17;
            if(time>=duration){
                clearInterval(ele.timer)
                utils.css(ele,target)
                if(typeof callback==='function'){
                    callback.call(ele)
                }
            }
            for(var key in change){
                let cur = linear(time,duration,change[key],begin[key]);
                utils.css(ele,key,cur)
            }
        },17)
    };
    window.utils = utils;
    window.animate = animate;
})();