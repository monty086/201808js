function Waterfall (){
    this.box = document.querySelector('#box');
    this.uls = box.getElementsByTagName('ul');
    this.uls = utils.toArray(this.uls);
    this.imgs = document.getElementsByTagName('img');
    this.data = null;
    this.minH = null;
    this.a = 0;
    this.winH = utils.win('clientHeight');
    this.init= function(){
        this.ajax();
        window.onscroll = this.scrollFn.bind(this);
        this.loadImg()
    }
}
Waterfall.prototype = {
    constructor:Waterfall,
    ///////ajax
    ajax: function ajax(){
        let xhr= new XMLHttpRequest();
    xhr.open('get','product.json',false);
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState==4&&xhr.status==200){
            this.data = JSON.parse(xhr.responseText);
            this.bindHtml(10)
        }
    }
    xhr.send();
},
/////////bindHtml
bindHtml: function (n){
    for (var i=0;i<n;i++){
        this.uls.sort(function(a,b){
            return a.offsetHeight-b.offsetHeight
        })
        var str =``
        let value = utils.getRandom(0,21);
        str+=`
            <li >
            <div style="height:${this.data[value].height}px" >
            <img data-src="${this.data[value].img}" alt="">
</div>
            
            <p>这是第${value}张</p>
            </li>
            `
        this.uls[0].innerHTML+=str;
        this.minH = this.uls[0].offsetHeight;
    }
},
/////////scroll
scrollFn:function(){
    let winS = utils.win('scrollTop');
    if(this.winH+winS>this.minH){
        //console.log('winH: '+winH+'winS: '+winS+'minH: '+minH)
        this.bindHtml(15)
    }
     this.loadImg()
},
/////////loadImg
loadImg:function (){
    for (var i=0;i<this.imgs.length;i++){
        this.lazyImg(this.imgs[i])
    }
},
//////////lazyImg
lazyImg: function lazyImg(ele){
    let that = this;
    let winS = utils.win('scrollTop');
    //console.log(ele);
    let eleT = utils.offset(ele).top;
    let eleH = ele.offsetHeight;
    if(this.winH+winS>eleT+eleH){
        let newImg = new Image;
        let value = ele.getAttribute('data-src');
        newImg.src = value;
        newImg.onload = function(){
            ele.parentNode.style.background ='none'
            ele.src = this.src;
            that.fadeIn(ele)
        }
    }
},
/////////fadeIn
    fadeIn:function fadeIn(ele){
        let opacity = utils.css(ele,'opacity');
        ele.timer =setInterval(()=>{
        opacity+=0.05;
        if(opacity>=1){
            clearInterval(ele.timer);
            utils.css(ele,'opacity',1)
            return;
        }
        utils.css(ele,'opacity',opacity)
    },13)
},
}








