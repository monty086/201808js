
// 1.获取元素
var header = document.getElementById('header');
var buttons =  header.getElementsByTagName('a');
var shopList = document.getElementById('shopList');
var data = null;

// 2.请求数据
var xhr = new XMLHttpRequest();
xhr.open('get','data/product.json',false);
xhr.onreadystatechange = function(){
    if(xhr.readyState==4&&xhr.status==200){
        data= JSON.parse(xhr.responseText)
    }
}
xhr.send()
console.log(data);

// 3.将数据绑定到页面当中
function bindHtml(data){
    var str = ``;
    data.forEach(function(item,index){
        //console.log(item);
        str+=`<li>
                <div>
                <img src="${item.img}" alt="">
                <p class="title">${item.title}</p>
                <p class="hot">热度 ${item.hot}</p>
                <del>￥9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
                </div>
            </li>`
    })
    shopList.innerHTML = str
}
bindHtml(data);

// 4.给每一个按钮添加点击事件实现排序
for (var i = 0; i < buttons.length; i++) {
    buttons[i].index = -1;// 1 -1 1
    buttons[i].onclick = function(){
        this.index*=-1;
        var value = this.getAttribute('attrName')// hot
        productSort.call(this,value)
        changeArrow.call(this)
        clearArrow.call(this)
    }
}

function productSort(value){
    var _this = this;
    if(value === 'time'){
        // 如果点击的是时间的话，我们需要将时间转换成毫秒数来进行相减
        data.sort(function(a,b){
            return (new Date(a.time)-new Date(b.time))*_this.index
        })
    }else{
        // 如果不是时间，直接相减
        data.sort(function(a,b){
            // 我们可以再对象后面加一个[变量]
            return (a[value]-b[value])*_this.index;
        })
    }
    bindHtml(data)
}

// 5.点击的时候让箭头显示
function changeArrow(){
    // this.index// 1 升序 -1 降序
    // 通过 获取this下的元素子节点对应的所有，找到up和down两个元素，
    var down = this.children[1];
    var up = this.children[0];
    if(this.index<0){
        // 根据a标签上的行内自定义属性所对应的属性值变换，判断是否为升序还是降序
        // down.className = 'bg down';
        down.classList.add('bg')
        up.classList.remove('bg')
    }else{
        down.classList.remove('bg')
        up.classList.add('bg')
    }
}

// 6.清除其他箭头的颜色
function clearArrow(){
    for (var i = 0; i < buttons.length; i++) {
        // 判断当前点击的元素是否是循环中的一个元素
        // 如果 循环的三个点击按钮不是我当前点击的元素时，我将其清除掉bg类名
        if(this != buttons[i]){
            buttons[i].children[0].classList.remove('bg')
            buttons[i].children[1].classList.remove('bg')
            buttons[i].index = -1
        }
    }
}
