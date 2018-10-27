
// 组件的结构
<template>
    <div id='box'>
        <h1>你好我是首页</h1>
    </div>
</template>

// 行为+数据
<script>
    export default {
        data(){
            return {}
        },
        methods:{

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
