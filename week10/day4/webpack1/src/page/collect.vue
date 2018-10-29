<template>
    <div>
        <MHead>收藏</MHead>   
        <div class="content">
            <ul class='list'>
                <li v-for='(item,index) in books' :key='index'>
                    <img :src='item.bookCover' :alt='item.bookInfo'/>
                    <div class='right'>
                        <h4>{{item.bookName}}</h4>
                        <div>{{item.bookPrice}}</div> 
                    </div>
                </li>
            </ul>         
        </div>     
    </div> 
</template>

<script>
    import MHead from '../base/head.vue';
    import {hotbooks} from '../api/ajax.js';
    export default{
        created(){
            hotbooks().then(res=>{
                this.books = res;
            })
        },
        data(){
            return{
               books:[] ,
               listTitle:this.$route.params.title
            }
        },
        components:{
            MHead
        }
    }
</script>

<style scoped lang='less'>
 .list{
     li{
         box-sizing: border-box;
         padding:5px;

        img{
         width: 40%;
        }
     .right{
         width: 60%;
         float:right;
         text-align: left;
         line-height: 30px;
         font-size:20px;
         button{
             width: 80px;
             height: 30px;
         }
      }  
     }
    
 }
</style>



