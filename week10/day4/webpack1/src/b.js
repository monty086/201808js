
// 求和
export default function (...ary){
    let count = 0
    for(var i=0;i<ary.length;i++){
        if(!isNaN(ary[i])){
            count+=Number(ary[i])
        }
    }
    return count
}