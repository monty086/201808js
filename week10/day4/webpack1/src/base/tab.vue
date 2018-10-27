<template>
    <div>
        <div class='foot'>
            <router-link to='/home'>
                <i class="iconfont icon-yidiandiantubiao04"></i>
                首页
            </router-link>
            <router-link to='/list'>列表</router-link>
            <router-link to='/collect'>收藏</router-link>
            <router-link to='/user'>个人</router-link>
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>
<style scoped lang='less'>
    .foot{
        position: fixed;
        bottom:0;
        left:0;
        display: flex;
        align-items: center;
        justify-content: center;
        width:100%;
        height: 50px;
        background:rgb(192, 211, 83);
        a{
            flex:1;
            
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            i{
                font-size:15px;
                color:white;
            }
        }
    }
</style>

