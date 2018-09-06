function Banner(ele,url,duration) {
    // 1.获取元素
    this.outer = document.getElementById(ele);
    this.swiper = this.outer.getElementsByClassName('swiper')[0];
    this.focus = this.outer.getElementsByClassName('focus')[0];
    this.imgs = this.swiper.getElementsByTagName('img');
    this.lis = this.focus.getElementsByTagName('li');
    this.left = this.outer.getElementsByTagName('a')[0];
    this.right = this.outer.getElementsByTagName('a')[1];
    this.data = null;
    this.timer = null;
    this.step = 0;
    this.isClick = true;
    this.duration = duration || 2000;
    this.init(url)
}

Banner.prototype = {
    constructor: Banner,
    init:function(url){
        this.ajax(url)
        this.auto();
        this.mousemove();
        this.click();
        this.focusClick()
    },
    // 2.获取数据
    ajax: function ajax(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, false);
        xhr.onreadystatechange =  ()=> {
            if (xhr.readyState == 4 && xhr.status == 200) {
                this.data = JSON.parse(xhr.responseText)
                this.bindHTML()
            }
        }
        xhr.send();
    },


// 3.绑定数据
    bindHTML: function bindHTML() {
        var imgStr = ``, lisStr = ``;
        for (var i = 0; i < this.data.length; i++) {
            imgStr += `<div><img data-src="img/${this.data[i].src}" alt=""></div>`;
            lisStr += `<li class="${i === 0 ? 'selected' : ''}"></li>`
        }
        imgStr += `<div><img data-src="img/${this.data[0].src}" alt=""></div>`
        this.swiper.innerHTML = imgStr;
        this.focus.innerHTML = lisStr;
        utils.css(this.swiper, 'width', 1000 * (this.data.length + 1))
        this.lazyImg()
    },

// 4.延迟加载
    lazyImg: function lazyImg() {
        for (let i = 0; i < this.imgs.length; i++) {
            let cur = this.imgs[i];
            let newImg = new Image;
            let url = cur.getAttribute('data-src');
            newImg.src = url;
            newImg.onload = function () {
                cur.src = this.src;
                newImg = null;
                animate(cur, {opacity: 1}, 300)
            }
        }
    },

// 5.开始轮播
    auto: function auto() {
        this.timer = setInterval(this.autoMove.bind(this), this.duration);
    },
    autoMove: function autoMove() {
        var that = this;
        if (this.step >= this.data.length) {
            this.step = 0;
            utils.css(this.swiper, 'left', 0)
        }
        this.step++;
        // animate中设置的动画时间必须比setInterval中的间隔时间小
        animate(this.swiper, {left: this.step * -1000}, 1000, function () {
            that.isClick = true
        });
        this.focusTip()
    },
// 6.小圆点滚动
    focusTip: function focusTip() {
        // 1 2 3 4 1
        for (var i = 0; i < this.lis.length; i++) {
            if (this.step === i) {
                this.lis[i].classList.add('selected')
            } else {
                this.lis[i].classList.remove('selected');
            }
            if (this.step === this.data.length) {
                this.lis[0].classList.add('selected')
            }
        }
    },

// 7. 滑入停止滑出继续
    mousemove: function mousemove() {
        var that = this;
        this.outer.onmouseover = function () {
            clearInterval(that.timer);
            utils.css(that.left, 'display', 'block');
            utils.css(that.right, 'display', 'block');
        }
        this.outer.onmouseout = function () {
            clearInterval(that.timer);
            that.timer = setInterval(that.autoMove.bind(that), that.duration);
            utils.css(that.left, 'display', 'none');
            utils.css(that.right, 'display', 'none');
        };
    },


// 8.左右按钮点击
    click: function click() {
        var that = this
        this.right.onclick = function () {
            if (that.isClick) {
                that.isClick = false;
                that.autoMove()
            }
        };
        this.left.onclick = function () {
            if (that.isClick) {
                that.isClick = false;
                if (that.step <= 0) {
                    that.step = that.data.length;
                    utils.css(that.swiper, 'left', that.step * -1000)
                }
                that.step--;
                animate(that.swiper, {left: -1000 * that.step}, 1000, function () {
                    that.isClick = true
                });
                that.focusTip();
            }
        }
    },

// 9.点击小圆点
    focusClick: function focusClick() {
        var that = this;
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].onclick = function () {
                if (that.isClick) {
                    that.isClick = false;
                    that.step = i - 1;
                    that.autoMove()
                }
            }
        }
    }
}


