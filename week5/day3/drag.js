
function Drag(ele){
    this.ele = ele;
    let down = (e)=>{
        this.l = e.clientX - this.ele.offsetLeft;
        this.t = e.clientY - this.ele.offsetTop;
        document.addEventListener('mousemove',move)
    };
    let move = (e)=>{
        this.ele.style.left = e.clientX - this.l+'px';
        this.ele.style.top = e.clientY - this.t+'px'
    }
    let up =()=>{
        document.removeEventListener('mousemove',move)
    }
    this.ele.addEventListener('mousedown',down);
    this.ele.addEventListener('mouseup',up);
}

// new Drag(box)