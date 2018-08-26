
// 1. 获取要操作的元素
var header = document.getElementById('header'),
    buttons = header.getElementsByTagName('a'),
    shopList = document.getElementById('shopList'),
    data = null;

// 2. 请求服务端数据进行展示
var xhr = new XMLHttpRequest();
xhr.open('get','data/product.json',false);
xhr.onreadystatechange = function(){
    if(xhr.readyState==4&& xhr.status==200){
        data = JSON.parse(xhr.responseText)
    }
};
xhr.send();
console.log(data);

// 3.将数据绑定到页面当中
function bindHtml(data){
    var str = ``;
    data.forEach(function(item,index){
        str+=`<li>
                <img src="${item.img}" alt="">
                <p class="title">${item.title}</p>
                <p class="hot">热度：${item.hot}</p>
                <del>￥9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
            </li>`
    })
    shopList.innerHTML = str
}
bindHtml(data);

// 4. 点击按钮实现排序
for (var i=0;i<buttons.length;i++){
    buttons[i].index = -1;//1 -1 1 -1
    buttons[i].onclick = function(){
        // 每次点击的时候，让元素身上 自定义属发生变化
        this.index*=-1;
        // 先循环数据排序，再绑定页面展示
        /*var ary = [{age:8},{age:18},{age:0}]
        ary.sort(function(a,b){
            // a.age-b.age
            return a.age-b.age//{age:8}-{age:18}
        })
        console.log(ary);*/
        //console.dir(this);
        var value = this.getAttribute('attrName');
        sortAry.call(this,value)
        changeColor.call(this);
        clearArrow.call(this)
    }
}

function sortAry(value,index){
    console.log(this);// buttons[i]
    var that = this;
    // 时间 、 热度 、 价格
    if(value=='time'){
        data.sort(function (a,b){
            return (new Date(a.time)- new Date(b.time))*that.index
        })
    }else{
        data.sort(function(a,b){
            return (a[value]-b[value])*that.index
        })
    }
    bindHtml(data)
}

// 5. 让按钮旁边的箭头根据正序倒序发生颜色变化
function changeColor (){
    this.index;
    var down = this.children[1];
    var up = this.children[0];
    if(this.index ===-1){
        down.classList.add('bg');
        up.classList.remove('bg');
    }else{
        up.classList.add('bg');
        down.classList.remove('bg')
    }
}

// 6. 只保留最后点击的哪个按钮，其他的按钮颜色全部清空
function clearArrow(){
    for (var i=0;i<buttons.length;i++){
        if(this != buttons[i]){
            buttons[i].children[0].classList.remove('bg')
            buttons[i].children[1].classList.remove('bg');
            buttons[i].index =-1
        }
    }
}
