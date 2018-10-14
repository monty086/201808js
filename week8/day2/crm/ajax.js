function ajax(option={}){
    let {
        url=null,
        method='get',
        async=true,
        data=null,
        cache = true,
        dataType='json'
    }= option;

    // post 将接口参数变成一个对象
    // cache 在get后面添加一个随机数
    // dataType 如果是xml的时候，需要转化为xhr.responseXML
    
    return new Promise((res,rej)=>{
        var xhr = new XMLHttpRequest();
        xhr.open(method,url,async);
        xhr.onreadystatechange =function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    if(dataType=='json'){
                        try{
                            res(JSON.parse(xhr.responseText))
                        }catch(e){
                            res(xhr.responseText)
                        }
                    }                 
                }else{
                    rej(xhr.statusText)
                }
            }
        }
        xhr.send(data)
    })
}