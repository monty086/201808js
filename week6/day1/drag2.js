(function () {
    class Callbacks{
        has(type,fn){ // 判断事件池当中是否有这个方法
            if(this[type]&& this[type] instanceof Array){
                return this[type].includes(fn)//判断数组中是否有此参数，返回布尔值
            }
        }
        add(type,...arg){// 向事件池当中添加相对应的方法
            this[type] = (this[type] && this[type] instanceof Array) || [] //如果实例上的type属性没有，或者不是函数，我都让它为空数组
            arg.forEach(item=>{
                if(typeof item ==='function' && !this[type].includes(item)){
                    // 判断要向事件池当中添加的属性是否是一个函数，或者之前是否已经添加过了
                    this[type].push(item)
                }
            })
        }
        remove(type,...arg){
            if(this[type]&& this[type] instanceof Array){
                // 循环我要移除的函数数组
                for(let i=0;i<arg.length;i++){
                    var cur = arg[i]// cur就是要移除的每一个函数
                    if(this[type].includes(cur)){
                        var n = this[type].indexOf(cur);// 找出重复的那一项在事件池当中的索引位置
                        this[type][n] = null // 将事件池当中的那一项清除即可
                    }
                }
            }
        }
        fire(type,...arg){// type是哪个事件池，...arg是函数执行的参数集合
            if(this[type]){
                for(var i=0;i<this[type].length;i++){
                    var cur = this[type][i]//表示事件池当中的每一项
                    if(typeof cur === 'function'){
                        cur.apply(this,arg)// 让是函数的值执行，并且传参，再改变函数中的this
                    }else{
                        this[type].splice(i,1);
                        i--;
                    }
                }
            }
        }
    }
    class Drag extends Callbacks{
        constructor(ele){
            super()
            this.ele = ele;
            // 计算盒子运行最大的宽度
            this.maxL = (document.documentElement.clientWidth||document.body.clientWidth) - this.ele.offsetWidth;
            this.maxT = (document.documentElement.clientHeight||document.body.clientHeight) - this.ele.offsetHeight;
            window.addEventListener('resize', ()=>{
                this.maxL = (document.documentElement.clientWidth||document.body.clientWidth) - this.ele.offsetWidth;
                this.maxT = (document.documentElement.clientHeight||document.body.clientHeight) - this.ele.offsetHeight;
            })
            // 按住小球
            let down = (e)=>{
                // 求出鼠标距离盒子内边框的距离
                this.l = e.clientX - this.ele.offsetLeft;
                this.t = e.clientY - this.ele.offsetTop;
                // 按住小球实现拖动，【为防止鼠标丢失，给document添加方法】
                document.addEventListener('mousemove',move)
                // 添加小球抬起的时候的方法
                this.ele.addEventListener('mouseup',up);
                clearInterval(this.ele.flyTimer);
                clearInterval(this.ele.dropTimer);
            };
            let move = (e)=>{
                // 小球运动的绝对定位的值
                this.ele.style.left = e.clientX - this.l+'px';
                this.ele.style.top = e.clientY - this.t+'px';
                //this.getSpeed()
                this.fire('mySpeed')
            };
            let up = ()=>{
                document.removeEventListener('mousemove',move);
                // 抬起以后将其清除
                //this.ele.removeEventListener('mouseup',up);
                // 松手后让盒子飞
                // this.fly()
                // this.drop()
                this.fire('ball')
            };
            this.ele.addEventListener('mousedown',down)
            this.ele.removeEventListener('mouseup',up);
        }
        getSpeed(){
            // 求出小球最后移动的距离=>速度
            if(!this.prevSpeed){
                // 如果一开始没有速度，我们先记录第一次的速度
                this.prevSpeed = this.ele.offsetLeft
            }else{
                // 有了速度之后，把新的速度减去老的速度就是我们要求的值
                this.speed = this.ele.offsetLeft - this.prevSpeed;
                // 计算之后，新的速度马上变成老的速度
                this.prevSpeed = this.ele.offsetLeft;
            }
        }
        // 弹性势能动画的方法
        jump(){
            this.add('ball',this.fly,this.drop);// 把两个方法添加到ball这个事件池当中
            this.add('mySpeed',this.getSpeed)// 把speed方法添加到mySpeed事件池当中
        }
        fly(){ // 盒子左右运动
            var flySpeed = this.speed;
            this.ele.flyTimer = setInterval(()=>{
                // 清除定时器 => 盒子停止的时候 => flySpeed<0.5会被盒子模型属性舍弃掉
                if(Math.abs(flySpeed)<0.5){
                    clearInterval(this.ele.flyTimer);
                    return;
                }
                flySpeed*=0.98;// 0.98=> 指数衰减的值，会不断的减小。
                let L = this.ele.offsetLeft+flySpeed;
                // 13属性=> 四舍五入的整数
                // 盒子飞到【浏览器最大的宽度】时，让盒子掉头
                if(L>=this.maxL){
                    flySpeed*=-1;
                    L = this.maxL // 盒子到头的时候，直接等于终点，就不会超出
                }else if(L<=0){ // 当盒子飞到初始的位置，让盒子掉头
                    flySpeed*=-1;
                    L = 0
                }
                this.ele.style.left = L+'px';
            },17)
        }
        // 垂直降落
        drop(){
            var dropSpeed = 9.8;
            var flag = 0;
            this.ele.dropTimer = setInterval(()=>{
                // 当flag的值大于等于2的时候，说明盒子已经两次循环停留在最底部了，盒子已经静止了，我们需要清除定时器
                if(flag>=2){
                    clearInterval(this.ele.dropTimer);
                    return
                }
                dropSpeed += 9.8; // 向下降落
                dropSpeed *= 0.98; // 指数衰减向下降落
                var T = this.ele.offsetTop+dropSpeed;
                // 希望小球到底部再弹起来
                if(T>=this.maxT){
                    dropSpeed*=-1;
                    T = this.maxT
                    flag++
                }else{
                    flag=0
                }
                this.ele.style.top = T +'px'
            },17)
        }
    }
    window.Callbacks = Callbacks;
    window.Drag =Drag;
})()