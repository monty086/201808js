
(function (){
    class Callbacks {
        has(type,fn){
            if(this[type]){
                return this[type].includes(fn)
            }
        }
        add(type,...arg){
            this[type] = this[type] || []
            arg.forEach(item=>{
                if(!this[type].includes(item) && typeof item ==='function'){
                    this[type].push(item)
                }
            })
        }
        remove(type,...arg){
            if(this[type]){
                arg.forEach(item=>{
                    if(this.has(type,item)){
                        var num = this[type].indexOf(item)
                        this[type][num]=null
                    }
                })
            }
        }
        fire(type,...arg){
            if(this[type]&&this[type].length>0){
                for (var i=0;i<this[type].length;i++) {
                    var cur = this[type][i];
                    if(typeof cur ==='function'){
                        this[type][i].call(this,...arg)
                    }else{
                        this[type].splice(i,1)
                        i--
                    }
                }

            }
        }
    }

    class Drag  extends Callbacks{
        constructor(ele){
            super()
            this.ele = ele;
            this.maxL = (document.documentElement.clientWidth||document.body.clientWidth)-this.ele.offsetWidth;
            this.maxT = (document.documentElement.clientHeight||document.body.clientHeight)-this.ele.offsetHeight;
            let down = (e)=>{
                this.l = e.clientX - this.ele.offsetLeft;
                this.t = e.clientY - this.ele.offsetTop;
                document.addEventListener('mousemove',move);
                this.ele.addEventListener('mouseup',up)
                clearInterval(this.ele.flyTimer)
                clearInterval(this.ele.dropTimer)
            }
            let move = (e) =>{
                this.ele.style.left = e.clientX - this.l+'px';
                this.ele.style.top  = e.clientY - this.t +'px'
                //this.speed()
                this.fire('mySpeed')
            }
            let up = () =>{
                document.removeEventListener('mousemove',move)
                this.ele.removeEventListener('mouseup',up)
                // this.fly()
                // this.drop()
                this.fire('ball')
            }
            this.ele.addEventListener('mousedown',down)
        }
        speed(){
            if(!this.ele.prevSpeed){
                this.ele.prevSpeed = this.ele.offsetLeft
            }else{
                this.ele.speed = this.ele.offsetLeft - this.ele.prevSpeed
                this.ele.prevSpeed = this.ele.offsetLeft
            }
        }
        jump(key1,key2){
            this.add('ball',this.fly)
            this.add('mySpeed',this.speed)
        }
        fly(){

            let flySpeed = this.ele.speed;
            this.ele.flyTimer = setInterval(()=>{
                if(Math.abs(flySpeed)<0.5){
                    clearInterval(this.ele.flyTimer)
                    return
                }
                flySpeed*=0.98
                let left = this.ele.offsetLeft+flySpeed;
                if(left >this.maxL){
                    flySpeed*=-1;
                    left = this.maxL
                }else if(left < 0){
                    flySpeed*=-1;
                    left  = 0
                }
                this.ele.style.left =  left +'px';
            },17)
        }
        drop(){
            var dropSpeed = 9.8;
            var flag = 0
            this.ele.dropTimer = setInterval(()=>{
                if(flag>2){
                    clearInterval(this.ele.dropTimer)
                    return
                }
                dropSpeed *= 0.98;
                dropSpeed += 9.8;
                let top = this.ele.offsetTop + dropSpeed;
                if(top>this.maxT){
                    dropSpeed*=-1;
                    top = this.maxT;
                    flag++
                }else{
                    flag=0
                }
                this.ele.style.top = top+'px';
            },17)
        }
    }
    window.Drag = Drag;
    window.Callbacks = Callbacks
})()

