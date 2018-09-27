function ajax(option={}){
    let {
        url=null,
        method='get',
        async=true,
        cache=true,
        data = null,
        dataType = 'json',
    }=option;
    // 如果get请求方式，需要到url地址做拼接
    if(Object.prototype.toString.call(data)==='[object Object]'){
        var str = ``;
        for(var key in data){
            str+= `${key}=${data[key]}&`
        };
        str = str.slice(0,str.length-1);
        // str = str.replace(/&$/g,'')
        if(method === 'get'){
            url+='?'+str;
        }
    }
    // 如果cache为false的时候
    if(cache === false && method==='get'){
        if(url.includes('?')){
            url+= `&_=${Math.random()}`
        }else{
            url+= `?_=${Math.random()}`
        }
    }
    let xhr = new XMLHttpRequest();
    return new Promise((resolve,reject)=>{
        xhr.open(method,url,async);
        xhr.onreadystatechange = function (){
            if(xhr.readyState ===4){
                if(/^(2|3)\d{2}$/.test(xhr.status)){
                    var newDate = null
                    if(dataType === 'json'){
                        // 将json字符串转成json对象 '<div>'
                        try{
                            newDate = JSON.parse(xhr.responseText)
                        }catch (e) {
                            newDate = xhr.responseText
                        }
                    }else if(dataType === 'xml'){
                        newDate = xhr.responseXML
                    }
                    resolve(newDate)
                }else if(/^[45]\d{2}$/.test(xhr.status)){
                    reject(xhr.statusText)
                }
            }
        }
        // 如果是post发送数据，将数据放到xhr.send参数里面
        if(method === 'post'&& data instanceof Object){
            data = JSON.stringify(data);
            xhr.send(data);
            return
        }
        xhr.send(data);
    })
}