
// 组件的结构
<template>
    <div id='box'>
        <MHead>首页</MHead>
        <div class='content'>
            <Swiper></Swiper>  
            <h3>热门图书</h3>
            <ul>
                <li></li>
            </ul>   
        </div>
    </div>
</template>

// 行为+数据
<script>
    import MHead from '../base/head.vue';
    import Swiper from '../base/swiper.vue';
    import {hotbooks} from '../api/ajax.js';
    export default {
        created(){            
            hotbooks().then(res=>{
                console.log(res);
            })
        },
        data(){
            return {}
        },
        methods:{

        },
        components:{
            MHead,Swiper
        }
    }
</script>

// 样式一本会适配到全局上，需要加一个属性scoped[表示当前的样式只再这个模板上用]
<style scoped lang='less'>
    #box{
        h1{
            color:red;
        }
    }
</style>
