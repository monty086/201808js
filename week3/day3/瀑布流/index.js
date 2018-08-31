// 1. 获取元素
let box = document.getElementById('box');
let uls = box.getElementsByTagName('ul');
uls = utils.toArray(uls);
let data = null;
let minH = null;
let stop = 0;
let imgs = box.getElementsByTagName('img');

// 2. 请求数据
ajax()
function ajax(){
    let xhr = new XMLHttpRequest();
    xhr.open('get','product.json',false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            data = utils.toJSON(xhr.responseText);
            // 请求完数据，让页面展示绑定好的数据
            bindHtml(20)
        }
    }
    xhr.send()
}
// 3. 绑定数据在页面显示
function bindHtml (n){
    // n是几，我们就循环几项，就向页面插入多少项
    for (var i=0;i<n;i++){
        // 每一次循环的时候，我都求出5个ul当中，长度最短的那一个
        uls.sort(function (a,b){
            // 通过js盒子模型上的属性 offsetHeight
            return a.offsetHeight - b.offsetHeight
        })
        // 需要求出一个随机数【根据我们的json数据内容给定的】
        let num = utils.getRandom(0,21);
        // 长度最短的那个就是索引0
        uls[0].innerHTML+=`
            <li>
            <div style="height:${data[num].height}px">
                <img data-src="${data[num].img}" alt="">
            </div>
            <p>这是第${num}张图片</p> 
        </li>
        `
        minH = uls[0].offsetHeight
    }
}
let winH = utils.win('clientHeight');
// 4. 滑动到底部重新再加载一屏
window.onscroll = function(){ // 触发onscroll事件
    // 要对浏览器滚动条进行判断
    // 滚动条卷出去的距离+ 浏览器一屏的高度 > uls[0]【最长的ul的高度】
    // 我们再请求一次数据
    let winT = utils.win('scrollTop');//不断变化的值
    if(winH+winT>minH){
        stop++;
        if(stop>10){
            alert('已经没有更多了');
            window.onscrll=null;
            return
        }
        ajax();
    }
    // 便利每一张图片，然后对图片进行延迟加载
    // 滑动到底部的时候，执行延迟加载
    lazy()
};
// 让首屏显示图片，
lazy()
function lazy(){
    for (var i=0;i<imgs.length;i++){
        lazyImg(imgs[i])
    }
}

// 5. 将网站的图片进行延迟加载
function lazyImg(ele){
    if(ele.load)return;
    // 计算每一张图片距离body顶部的偏移量
    let imgT = utils.offset(ele).top;
    //计算每一张图片自身的高度
    let imgH = ele.offsetHeight;
    // 计算屏幕卷出去的高度
    let winT = utils.win('scrollTop');
    // 开始判断
    // 浏览器的高度+ 浏览器卷上去的高度> 图片自身的高度+图片距离body的上偏移量
    if(winT+winH>imgH+imgT){
        // 创建一个新的图片
        let newImg = new Image;
        // 获取行内样式中的data-src上的真实图片
        let url = ele.getAttribute('data-src');
        //获取到赋值给新图片的src属性
        newImg.src = url;
        // 尝试让newImg加载，如果加载成功，把这个地址还给真实img图片
        newImg.onload = function () {
            ele.src = this.src;
            // 可以进行一些性能优化
            newImg=null;
            ele.load = true;// 给图片一个自定义属性，下次再碰到这张图片的时候，直接不要再继续加载了、
            ele.parentNode.style.background = 'none'// 图片已经有了，就不需要loading图了，我直接去掉它就好
            fadeIn(ele)
        }
    }
}
//6. 让图片进行渐隐渐显显示
function fadeIn(ele){
    // 先获取真实图片的透明度
    let opacity = utils.css(ele,'opacity');
    // 设置定时器让图片逐渐显示
    ele.timer = setInterval(()=>{
        opacity+=0.04;
        // 透明度加完之后还给ele图片标签
        utils.css(ele,'opacity',opacity)
        // 当图片透明度大于等于1的时候让定时器停止
        if(opacity>=1){
            clearInterval(ele.timer);
            utils.css(ele,'opacity',1);
        }
    },13)
}



