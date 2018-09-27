class Drag{
    constructor(ele){
        this.ele = ele;
        this.ele.addEventListener("mousedown",this.down.bind(this),false);
    }
    down(e){
        e.preventDefault();
        this.x = this.ele.offsetLeft;
        this.y = this.ele.offsetTop;
        this.mx = e.clientX;
        this.my = e.clientY;
        this.MOVE = this.move.bind(this);
        this.UP = this.up.bind(this);
        document.addEventListener("mousemove",this.MOVE,false);
        document.addEventListener("mouseup",this.UP,false);
        fire.call(this.ele,"dragStart",e);
    }
    move(e){
        this.ele.style.left = this.x+(e.clientX - this.mx)+"px";
        this.ele.style.top = this.y+(e.clientY-this.my)+"px";
        fire.call(this.ele,"dragMove",e);
    }
    up(e){
        document.removeEventListener("mousemove",this.MOVE,false);
        document.removeEventListener("mouseup",this.UP,false);
        fire.call(this.ele,"dragUp",e);
    }
}