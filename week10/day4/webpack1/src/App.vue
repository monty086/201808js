
<template>
    <div>
        {{msg}}
        <Home></Home>    
        <router-view></router-view>
    </div> 
</template>

<script>
    import Home from './page/home.vue';
    export default {
        data(){
            return {msg:'zf'}
        },
        methods:{

        },
        components:{
            Home
        }
    }
</script>  

<style>

</style>   