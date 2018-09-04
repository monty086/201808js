var waterfall = (function(){
    // 1.获取元素
    let box = document.getElementById('box');
    let uls = box.getElementsByTagName('ul');
    uls = utils.toArray(uls);
    let data = null;
    let minUl =null;
    let winH = utils.win('clientHeight');
    let imgs = box.getElementsByTagName('img');

    // 2.请求数据
    function ajax(num){
        let xhr = new XMLHttpRequest();
        xhr.open('get','product.json',false);
        xhr.onreadystatechange = function () {
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                data = JSON.parse(xhr.responseText)
                bindHTML(num)
            }
        }
        xhr.send()
    }
    // 3.绑定数据
    function bindHTML (n){
        for (var i=0;i<n;i++){
            // 先对ul按照长度进行排序
            uls.sort((a,b)=>{
                return a.offsetHeight - b.offsetHeight
            });
            // 把最小的ul的高度给变量minUl
            minUl = uls[0].offsetHeight;
            // 取一个随机的值
            let num = Math.round(Math.random()*21);
            uls[0].innerHTML+=`<li>
            <div style="height:${data[num].height}px">
                <img data-src="${data[num].img}" alt="" style="transition: opacity 2s">
                <p>这是第${num}张图片</p>
            </div>
            </li>`
        }
    }
    // 鼠标滑到的时候，让瀑布流重新加载一轮
    function scrollFn(num){
        // 实时计算浏览器窗口卷上去的距离
        let winS = utils.win('scrollTop');
        // 当浏览器窗口+浏览器卷上去的距离大于最小的ul的时候，我们让瀑布流再加载一轮
        if(winH+winS>minUl){
            bindHTML(num)
        }
        lazyImgs()
    }
    // 让图片延迟加载
    function lazyImgs (){
        for (var i=0;i<imgs.length;i++){
            loadImg(imgs[i])
        }
    }

    function loadImg(ele){
        // 循环每一张图片，判断浏览器是否滑到这张图片
        let winS = utils.win('scrollTop');
        //拿到每一张图片距离body顶部的偏移量
        let imgT = utils.offset(ele).top;
        // 获取图片自身的高度
        let imgH = ele.offsetHeight;
        // 当浏览器窗口的高度+浏览器滚动的距离>图片距离body的上偏移量+图片自身的高度
        if(winS+winH>imgT+imgH){
            // 让图片进行延迟加载，创建一个新的图片
            let newImg = new Image;
            // 通过自定义属性获取的标签上的属性值
            let url = ele.getAttribute('data-src');
            newImg.src = url;
            // 尝试让创建的 新图片取加载拿到的图片地址，如果加载成功，把图片地址还给真实的img标签
            newImg.onload = function (){
                // 把拿到的图片地址给真实的标签赋值
                ele.src = this.src;
                ele.style.opacity=1;
                ele.parentNode.style.background = 'none'
            }
        }
    }

    return {
        init:function(n){
            ajax(n);
            window.onscroll = scrollFn.bind(null,n);
            lazyImgs()
        }
    }
})()