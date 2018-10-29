
<template>
    <div>
        <router-view></router-view>
        <Tab></Tab>
    </div> 
</template>

<script>
    import Home from './page/home.vue';
    import Tab from './base/tab.vue';
    import './css/base.css';
    export default {
        data(){
            return {msg:'zf'}
        },
        methods:{

        },
        components:{
            Home,Tab
        }
    }
</script>  

<style lang='less'>
    *{
        margin: 0;
        padding: 0;
    }
    .content{
        width:100%;
        position: fixed;
        top:50px;
        bottom:50px;
        left:0;
        overflow: auto;
    }
</style>   