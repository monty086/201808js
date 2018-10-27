
<template>
    <div>
        {{msg}}
        <Home></Home>    
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

<style>
</style>   