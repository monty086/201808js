
// 组件的结构
<template>
    <div id='box'>
        <MHead>首页</MHead>
        <div class='content'>
            <Swiper></Swiper>  
            <h3>热门图书</h3>
            <ul>
                <li v-for='(item,index) in books' :key='index'>
                    <img :src="item.bookCover" :alt="item.bookInfo">
                    <div>{{item.bookName}}</div>
                    <div>￥：{{item.bookPrice}}</div>
                </li>
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
                this.books = res;
            })
        },
        data(){
            return {
                books:[]
            }
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
       h3{
           line-height: 30px;
            margin-left:15px;
       }
       ul li{
           float:left;
           width:50%;
           box-sizing: border-box;
           padding:10px;
           img{
               width: 120px;
           } 
       }
    }
</style>
