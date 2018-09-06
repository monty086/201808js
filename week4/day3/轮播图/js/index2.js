(function(){
    function banner(id,url,duration){
        // 1.获取元素
        let outer = document.getElementById(id);
        let swiper = outer.getElementsByClassName('swiper')[0];
        let focus = outer.getElementsByClassName('focus')[0];
        let imgs = swiper.getElementsByTagName('img');
        let lis = focus.getElementsByTagName('li');
        let left = outer.getElementsByTagName('a')[0];
        let right = outer.getElementsByTagName('a')[1];
        let data = null;
        let timer = null;
        let step = 0;
        let isClick = true;
        duration= duration ||2000;
        // 2.获取数据
        function ajax(url){
            var xhr = new XMLHttpRequest();
            xhr.open('get',url,false);
            xhr.onreadystatechange = function(){
                if(xhr.readyState==4&& xhr.status==200){
                    data = JSON.parse(xhr.responseText)
                    bindHTML()
                }
            }
            xhr.send();
        }


// 3.绑定数据
        function bindHTML(){
            var imgStr = ``,lisStr=``;
            for (var i=0;i<data.length;i++){
                imgStr+=`<div><img data-src="img/${data[i].src}" alt=""></div>`;
                lisStr+=`<li class="${i===0?'selected':''}"></li>`
            }
            imgStr+=`<div><img data-src="img/${data[0].src}" alt=""></div>`
            swiper.innerHTML = imgStr;
            focus.innerHTML = lisStr;
            utils.css(swiper,'width',1000*(data.length+1))
            lazyImg()
        }

// 4.延迟加载
        function lazyImg(){
            for (let i=0;i<imgs.length;i++){
                let cur = imgs[i];
                let newImg = new Image;
                let url = cur.getAttribute('data-src');
                newImg.src = url;
                newImg.onload = function(){
                    cur.src = this.src;
                    newImg=null;
                    animate(cur,{opacity:1},300)
                }
            }
        }

// 5.开始轮播
        function auto(){
            timer = setInterval(autoMove,duration);
        }

        function autoMove(){
            if(step>=data.length){
                step=0;
                utils.css(swiper,'left',0)
            }
            step++;
            // animate中设置的动画时间必须比setInterval中的间隔时间小
            animate(swiper,{left:step*-1000},1000,function(){
                isClick=true
            });
            focusTip()
        }
// 6.小圆点滚动
        function focusTip(){
            // 1 2 3 4 1
            for (var i=0;i<lis.length;i++){
                if(step===i){
                    lis[i].classList.add('selected')
                }else{
                    lis[i].classList.remove('selected');
                }
                if(step === data.length){
                    lis[0].classList.add('selected')
                }
            }
        }

// 7. 滑入停止滑出继续
        function mousemove(){
            outer.onmouseover = function(){
                clearInterval(timer);
                utils.css(left,'display','block');
                utils.css(right,'display','block');
            }
            outer.onmouseout = function(){
                clearInterval(timer);
                timer = setInterval(autoMove,duration);
                utils.css(left,'display','none');
                utils.css(right,'display','none');
            };
        }


// 8.左右按钮点击
        function click(){
            right.onclick = function(){
                if(isClick){
                    isClick=false;
                    autoMove()
                }
            };
            left.onclick = function(){
                if(isClick){
                    isClick=false;
                    if(step<=0){
                        step = data.length;
                        utils.css(swiper,'left',step*-1000)
                    }
                    step--;
                    animate(swiper,{left:-1000*step},1000,function(){
                        isClick=true
                    });
                    focusTip();
                }
            }
        }

// 9.点击小圆点
        function focusClick(){
            for (let i=0;i<lis.length;i++){
                lis[i].onclick = function(){
                    if(isClick){
                        isClick=false;
                        step=i-1;
                        autoMove()
                    }
                }
            }
        }

        ajax();
        auto();
        mousemove();
        click();
        focusClick();
    }
   window.banner =banner
})()

