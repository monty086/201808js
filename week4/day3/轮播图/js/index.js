
// 1.获取元素
let outer = document.getElementById('outer');
let swiper = document.getElementById('swiper');
let focus = document.getElementById('focus');
let left = outer.getElementsByTagName('a')[0];
let right = outer.getElementsByTagName('a')[1];
let imgs = swiper.getElementsByTagName('img');
let lis = focus.getElementsByTagName('li');
let data =null;
let step = 0;
let timer = null;

// 2.拿到数据
let xhr = new XMLHttpRequest();
xhr.open('get','data.json',false);
xhr.onreadystatechange =function(){
    if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
        data = JSON.parse(xhr.responseText)
    }
}
xhr.send();

// 3.绑定数据
function bindHTML (){
    var imgStr = ``,lisStr =``;
    for(var i=0;i<data.length;i++){
        // 通过data的数量，给页面添加相对应的图片
        imgStr+=`<div><img data-src="img/${data[i].src}" alt=""></div>`;
        // 给页面添加相对应的小圆点，第一个小圆点默认是选中的样式
        lisStr+=`<li class="${i===0?'selected':''}"></li>`
    }
    // 在图片的末尾再增加第一张
    imgStr+=`<div><img data-src="img/${data[0].src}" alt=""></div>`;
    // 将字符串还给swiper
    swiper.innerHTML = imgStr;
    focus.innerHTML = lisStr;
    // 再给swiper这个标签设置宽度【再添加进去一张的总宽度】
    utils.css(swiper,'width',1000*(data.length+1))
    // 给focus设置居中，通过调整marginleft值
    // utils.css(focus,'marginLeft',-(focus.offsetWidth/2))
}
bindHTML();

// 延迟加载
function lazyIMG(){
    for (let i=0;i<imgs.length;i++){
        let cur = imgs[i];
        let newImg = new Image();
        let url = cur.getAttribute('data-src');
        newImg.src = url;
        // 所有的事件都是异步执行，所以当执行这个异步事件的时候，函数中的变量回向上级去找，可是上级中cur所代表imgs[i],i值已经变成最大的值
        newImg.onload = function(){
            cur.src = this.src;
            newImg=null;
            // 让图片逐渐显示出来
            animate(cur,{opacity:1},300)
        }
    }
}
lazyIMG();


// 图片滚动
    // 设置一个定时器，每2000ms执行一次，
    timer = setInterval(autoMove,2000);
    function autoMove(){
        // 当step值等于最后一张的时候
        if(step >=data.length){
            // 让step 等于最开始的初始值
            step=0;
            // 让图片瞬间回去，继续循环一轮
            utils.css(swiper,'left',0)
        }
        // 执行的时候，我们让step++，不断的跟新step值
        step++;
        // step值发生变化，通过utils改变banner的位置，让swiper不断的向左减去1000，直到最后一张的时候，我们让它切换第一张
        utils.css(swiper,'left',-1000*step);
        // 让小圆点开始滚动
        focusTip()
    }
    // 0 1 2 3 4=》0 =》瞬间切换到第一张
    // 1000 2000 3000  1000
// 小圆点滚动
    function focusTip(){
        for (var i=0;i<lis.length;i++){
            // 判断step的值，如果step和i值相等的话，我们让li添加一个类名selected
            if(step===i){
                lis[i].classList.add('selected')
            }else{
                // 如果不相等，我们就清除
                lis[i].classList.remove('selected')
            }
            // 如果step==最后一张的时候，我们让第一个li显示
            if(step===data.length){
                lis[0].classList.add('selected')
            }
        }
    }
// 滑入停止
outer.onmouseover = function(){
        //清除定时器可以让轮播图停止轮播
     clearInterval(timer);
     // 让左右按钮显示
     utils.css(left,'display','block');
     utils.css(right,'display','block');
};
// 滑出继续
outer.onmouseout = function(){
        // 滑出以后让轮播图继续轮播
      timer = setInterval(autoMove,2000);
      // 让左右按钮消失
      utils.css(left,'display','none');
      utils.css(right,'display','none');
};
// 点击小圆点跳转
function roundClick(){
    // 循环每一个li
    for (let i=0;i<lis.length;i++){
        // 给每一个li添加一个点击事件
        lis[i].onclick = function(){
            // 修改step的值，让它等于i-1
            step = i-1;
            // 再继续执行一次autoMove
            autoMove()
        }
    }
}
roundClick()
// 点击右按钮跳转
right.onclick = function(){
    autoMove()
}
// 点击左按钮跳转
left.onclick = function(){
    // 当step小于0的时候，
    if(step<=0){
        // 让step等于最后的那一张
        step=data.length;
        // 让图片瞬间跳到最后的那一张
        utils.css(swiper,'left',-1000*step)
    }
    // 点击左按钮的时候，让step递减
    step--;
    // 轮播图向左再移动1000像素
    utils.css(swiper,'left',-1000*step)
    // 让小圆点跟着显示
    focusTip()
}

